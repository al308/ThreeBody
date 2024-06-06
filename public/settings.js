function openSettings() {
    const modal = document.getElementById('settingsModal');
    const settingsForm = document.getElementById('settingsForm');
    settingsForm.innerHTML = ''; // Clear previous settings

    bodies.forEach((body, index) => {
        const bodySettings = document.createElement('div');
        bodySettings.innerHTML = `
            <h3 style="color: ${body.color}">Body ${index + 1}</h3>
            <label>Mass: <input type="number" id="mass${index}" step="100" value="${body.mass.toFixed(1)}"></label><br>
            <label>Position X: <input type="number" id="posX${index}" step="100" value="${body.x.toFixed(1)}"></label><br>
            <label>Position Y: <input type="number" id="posY${index}" step="100" value="${body.y.toFixed(1)}"></label><br>
            <label>Velocity X: <input type="number" id="velX${index}" step="0.1" value="${body.vx.toFixed(2)}"></label><br>
            <label>Velocity Y: <input type="number" id="velY${index}" step="0.1" value="${body.vy.toFixed(2)}"></label><br>
        `;
        settingsForm.appendChild(bodySettings);
    });

    modal.style.display = "block";
}

function applySettings() {
    bodies.forEach((body, index) => {
        body.mass = parseFloat(document.getElementById(`mass${index}`).value);
        body.x = parseFloat(document.getElementById(`posX${index}`).value);
        body.y = parseFloat(document.getElementById(`posY${index}`).value);
        body.vx = parseFloat(document.getElementById(`velX${index}`).value);
        body.vy = parseFloat(document.getElementById(`velY${index}`).value);
        body.escaped = false; // Reset escaped status when settings are applied
    });

    const modal = document.getElementById('settingsModal');
    modal.style.display = "none";
    zoomOutAndCenter(); // Ensure all bodies are visible after applying settings
}

document.getElementById('settingsBtn').addEventListener('click', () => {
    openSettings();
});

document.getElementById('applySettingsBtn').addEventListener('click', () => {
    applySettings();
});

document.querySelector('.closeBtn').addEventListener('click', () => {
    const modal = document.getElementById('settingsModal');
    modal.style.display = "none";
});

window.onclick = function(event) {
    const modal = document.getElementById('settingsModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
