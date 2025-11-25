import { canvas, colorPicker, textInput, statusDiv, annotationsList } from './elements.js';
import { fabricCanvas } from './fabric-canvas.js';
import { addToHistory } from './state.js';

export function updateAnnotationsList() {
    annotationsList.innerHTML = '';

    const objects = fabricCanvas.getObjects();
    
    objects.forEach((obj, index) => {
        const item = document.createElement('div');
        item.className = 'annotation-item';
        
        let type = obj.type;
        let details = '';

        if (obj.type === 'i-text' || obj.type === 'text') {
            type = 'Text Label';
            details = `"${obj.text.substring(0, 20)}"${obj.text.length > 20 ? '...' : ''}`;
        } else if (obj.type === 'path') {
            type = 'Drawn Path';
            details = `${obj.path.length} points`;
        } else if (obj.type === 'line') {
            type = 'Line';
            details = 'Straight line';
        } else if (obj.type === 'rect') {
            type = 'Rectangle';
            details = `${Math.round(obj.width)}x${Math.round(obj.height)}`;
        } else if (obj.type === 'circle') {
            type = 'Circle';
            details = `r: ${Math.round(obj.radius)}`;
        }

        item.innerHTML = `
            <div class="annotation-item-type">${type}</div>
            <div class="annotation-item-details">${details}</div>
        `;

        item.addEventListener('click', () => {
            fabricCanvas.setActiveObject(obj);
            fabricCanvas.renderAll();
            
            // Update selected state in list
            document.querySelectorAll('.annotation-item').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
        });

        annotationsList.appendChild(item);
    });
}

export function handleTextInput(e) {
    if (!textInput.value.trim()) {
        statusDiv.textContent = 'Enter text before placing label';
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const text = new fabric.Text(textInput.value, {
        left: x,
        top: y,
        fontSize: 16,
        fill: colorPicker.value,
        fontFamily: 'Arial',
        editable: true
    });

    fabricCanvas.add(text);
    fabricCanvas.renderAll();
    textInput.value = '';
    addToHistory(fabricCanvas.toJSON());
}
