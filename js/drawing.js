import { canvas, ctx, colorPicker, brushSize } from './elements.js';
import { fabricCanvas } from './fabric-canvas.js';

export function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fabricCanvas.renderAll();
}

export function drawLine(startX, startY, currentX, currentY) {
    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = 'transparent';
    ctx.lineWidth = parseInt(brushSize.value);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
}

export function drawRect(startX, startY, currentX, currentY) {
    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = 'transparent';
    ctx.lineWidth = parseInt(brushSize.value);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.strokeRect(startX, startY, width, height);
}

export function drawCircle(startX, startY, currentX, currentY) {
    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = 'transparent';
    ctx.lineWidth = parseInt(brushSize.value);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}
