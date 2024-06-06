document.getElementById('settingsBtn').addEventListener('click', () => {
    const settingsModal = document.getElementById('settingsModal');
    const settingsForm = document.getElementById('settingsForm');
    settingsForm.innerHTML = `
        <label for="maxTrailLength">Max Trail Length:</label>
        <input type="number" id="maxTrailLength" value="${maxTrailLength}">
        <br>
        <label for="trailOpacityDecay">Trail Opacity Decay:</label>
        <input type="number" step="0.01" id="trailOpacityDecay" value="${trailOpacityDecay}">
        <br>
        <label for="deltaT">Delta T (Simulation Speed):</label>
        <input type="number" step="0.01" id="deltaT" value="${deltaT}">
    `;
    settingsModal.style.display = 'block';
});

document.getElementById('applySettingsBtn').addEventListener('click', () => {
    maxTrailLength = parseInt(document.getElementById('maxTrailLength').value);
    trailOpacityDecay = parseFloat(document.getElementById('trailOpacityDecay').value);
    deltaT = parseFloat(document.getElementById('deltaT').value);
    document.getElementById('settingsModal').style.display = 'none';
});

// Close the settings modal when clicking outside of it
window.onclick = function(event) {
    const settingsModal = document.getElementById('settingsModal');
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
};
