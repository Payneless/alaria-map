// DOM Element References
export const canvas = document.getElementById('annotation-canvas');
export const ctx = canvas.getContext('2d');

export const toolButtons = {
    pen: document.getElementById('tool-pen'),
    line: document.getElementById('tool-line'),
    rect: document.getElementById('tool-rect'),
    circle: document.getElementById('tool-circle'),
    text: document.getElementById('tool-text')
};

export const colorPicker = document.getElementById('color-picker');
export const brushSize = document.getElementById('brush-size');
export const sizeValue = document.getElementById('size-value');
export const textInput = document.getElementById('text-input');
export const statusDiv = document.getElementById('status');
export const undoBtn = document.getElementById('undo-btn');
export const sidebarToggle = document.getElementById('sidebar-toggle');
export const sidebar = document.getElementById('sidebar');
export const modeToggle = document.getElementById('mode-toggle');
export const deleteBtn = document.getElementById('delete-btn');
export const annotationsList = document.getElementById('annotations-list');
export const mapContainer = document.getElementById('map-container');
