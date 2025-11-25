import { canvas } from './elements.js';

export let fabricCanvas = new fabric.Canvas('annotation-canvas', {
    isDrawingMode: true,
    backgroundColor: 'transparent'
});
