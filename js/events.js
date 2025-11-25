import {
    canvas,
    toolButtons,
    colorPicker,
    brushSize,
    textInput,
    statusDiv,
    undoBtn,
    sidebarToggle,
    sidebar,
    modeToggle,
    deleteBtn,
    mapContainer
} from './elements.js';
import { fabricCanvas } from './fabric-canvas.js';
import {
    isDrawing,
    startX,
    startY,
    currentTool,
    drawMode,
    setIsDrawing,
    setStartX,
    setStartY,
    setCurrentTool,
    setDrawMode,
    addToHistory,
    popHistory,
    getHistory
} from './state.js';
import { redrawCanvas, drawLine, drawRect, drawCircle } from './drawing.js';
import { updateAnnotationsList, handleTextInput } from './annotations.js';
import { saveAnnotations, loadAnnotations } from './storage.js';

export function setupToolButtons() {
    Object.entries(toolButtons).forEach(([toolName, button]) => {
        button.addEventListener('click', () => {
            setCurrentTool(toolName);
            
            // Update active button
            Object.values(toolButtons).forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (toolName === 'pen') {
                fabricCanvas.isDrawingMode = true;
                canvas.style.cursor = 'crosshair';
            } else if (toolName === 'text') {
                fabricCanvas.isDrawingMode = false;
                canvas.style.cursor = 'text';
            } else {
                fabricCanvas.isDrawingMode = false;
                canvas.style.cursor = 'crosshair';
            }
        });
    });
}

export function setupColorPicker() {
    colorPicker.addEventListener('change', (e) => {
        fabricCanvas.freeDrawingBrush.color = e.target.value;
    });
}

export function setupBrushSize() {
    brushSize.addEventListener('input', (e) => {
        const sizeValue = document.getElementById('size-value');
        sizeValue.textContent = e.target.value + 'px';
        fabricCanvas.freeDrawingBrush.width = parseInt(e.target.value);
    });
}

export function setupCanvasEvents() {
    canvas.addEventListener('mousedown', (e) => {
        if (!drawMode) return;
        if (currentTool === 'pen') return;
        if (currentTool === 'text') {
            handleTextInput(e);
            return;
        }

        setIsDrawing(true);
        const rect = canvas.getBoundingClientRect();
        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
        addToHistory(fabricCanvas.toJSON());
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!drawMode) return;
        if (!isDrawing || currentTool === 'pen' || currentTool === 'text') return;

        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        redrawCanvas();

        if (currentTool === 'line') {
            drawLine(startX, startY, currentX, currentY);
        } else if (currentTool === 'rect') {
            drawRect(startX, startY, currentX, currentY);
        } else if (currentTool === 'circle') {
            drawCircle(startX, startY, currentX, currentY);
        }
    });

    canvas.addEventListener('mouseup', () => {
        setIsDrawing(false);
    });
}

export function setupUndoButton() {
    undoBtn.addEventListener('click', () => {
        const history = getHistory();
        if (history.length > 1) {
            popHistory();
            fabricCanvas.loadFromJSON(history[history.length - 1], () => {
                fabricCanvas.renderAll();
                statusDiv.textContent = 'Undo successful';
            });
        }
    });
}

export function setupDeleteButton() {
    deleteBtn.addEventListener('click', () => {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject) {
            fabricCanvas.remove(activeObject);
            fabricCanvas.renderAll();
            addToHistory(fabricCanvas.toJSON());
            statusDiv.textContent = 'Annotation deleted';
        } else {
            statusDiv.textContent = 'Select an annotation to delete';
        }
    });
}

export function setupSidebarToggle() {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

export function setupModeToggle() {
    modeToggle.addEventListener('click', () => {
        setDrawMode(!drawMode);
        const canvasEl = canvas;
        
        if (drawMode) {
            // Draw mode
            modeToggle.textContent = '✏️ Draw';
            modeToggle.classList.remove('nav-mode');
            canvasEl.classList.remove('disabled');
            statusDiv.textContent = 'Draw mode active';
        } else {
            // Navigation mode
            modeToggle.textContent = '🗺️ Navigate';
            modeToggle.classList.add('nav-mode');
            canvasEl.classList.add('disabled');
            statusDiv.textContent = 'Navigation mode - pan the map';
        }
    });
}

export function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts if typing in text input
        if (document.activeElement === textInput) return;

        const shortcuts = {
            'p': 'pen',
            'l': 'line',
            'r': 'rect',
            'c': 'circle',
            't': 'text',
            'z': 'undo',
            'Delete': 'delete'
        };

        const key = e.key.toLowerCase();
        
        if (shortcuts[key]) {
            e.preventDefault();
            
            if (key === 'z') {
                undoBtn.click();
            } else if (key === 'Delete') {
                deleteBtn.click();
            } else {
                // Activate tool
                toolButtons[shortcuts[key]].click();
            }
        }
    });
}

export function setupCanvasResize() {
    function resizeCanvas() {
        const container = mapContainer;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        fabricCanvas.setWidth(canvas.width);
        fabricCanvas.setHeight(canvas.height);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

export function setupFabricCanvasEvents() {
    fabricCanvas.on('object:added', () => {
        addToHistory(fabricCanvas.toJSON());
        updateAnnotationsList();
        saveAnnotations();
    });

    fabricCanvas.on('object:modified', () => {
        addToHistory(fabricCanvas.toJSON());
        updateAnnotationsList();
        saveAnnotations();
    });

    fabricCanvas.on('object:removed', () => {
        updateAnnotationsList();
        saveAnnotations();
    });
}

export function initializeBrush() {
    fabricCanvas.freeDrawingBrush.color = colorPicker.value;
    fabricCanvas.freeDrawingBrush.width = parseInt(brushSize.value);
}

export async function setupInitialization() {
    setupToolButtons();
    setupColorPicker();
    setupBrushSize();
    setupCanvasEvents();
    setupUndoButton();
    setupDeleteButton();
    setupSidebarToggle();
    setupModeToggle();
    setupKeyboardShortcuts();
    setupCanvasResize();
    setupFabricCanvasEvents();
    initializeBrush();

    // Load annotations after a short delay to ensure DOM is ready
    setTimeout(loadAnnotations, 1000);
}
