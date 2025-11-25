import { db } from './database.js';
import { fabricCanvas } from './fabric-canvas.js';
import { statusDiv } from './elements.js';
import { addToHistory, getHistory } from './state.js';

export async function saveAnnotations() {
    try {
        const annotationData = fabricCanvas.toJSON();
        await db.collection('alaria-map').doc('annotations').set({
            data: annotationData,
            timestamp: new Date(),
            version: 1
        });
    } catch (error) {
        console.error('Auto-save error:', error);
    }
}

export async function loadAnnotations() {
    try {
        const doc = await db.collection('alaria-map').doc('annotations').get();
        if (doc.exists && doc.data().data) {
            fabricCanvas.loadFromJSON(doc.data().data, () => {
                fabricCanvas.renderAll();
                statusDiv.textContent = 'Annotations loaded';
            });
            addToHistory(doc.data().data);
        } else {
            statusDiv.textContent = 'No saved annotations';
        }
    } catch (error) {
        statusDiv.textContent = 'Load failed: ' + error.message;
        console.error('Load error:', error);
    }
}
