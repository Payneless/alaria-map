// State variables
export let isDrawing = false;
export let startX, startY;
export let currentTool = 'pen';
export let history = [];
export let selectionMode = false;
export let drawMode = true; // Start in draw mode

// Setters for state
export function setIsDrawing(value) {
    isDrawing = value;
}

export function setStartX(value) {
    startX = value;
}

export function setStartY(value) {
    startY = value;
}

export function setCurrentTool(value) {
    currentTool = value;
}

export function setDrawMode(value) {
    drawMode = value;
}

export function addToHistory(item) {
    history.push(item);
    if (history.length > 50) history.shift();
}

export function popHistory() {
    return history.pop();
}

export function getHistory() {
    return history;
}
