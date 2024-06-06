document.getElementById('startStopBtn').addEventListener('click', () => {
    running = !running;
    document.getElementById('startStopBtn').innerHTML = running ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
});

document.getElementById('resetBtn').addEventListener('click', () => {
    bodies.forEach(body => {
        body.x = Math.random() * canvas.width;
        body.y = Math.random() * canvas.height;
        body.vx = Math.random() * 2 - 1;
        body.vy = Math.random() * 2 - 1;
        body.escaped = false;
    });
    trails = bodies.map(() => []); // Clear trails on reset
    zoomOutAndCenter();
});

document.getElementById('speedUpBtn').addEventListener('click', () => {
    timeFactor += 0.1;
});

document.getElementById('speedDownBtn').addEventListener('click', () => {
    timeFactor = Math.max(0.1, timeFactor - 0.1);
});

document.getElementById('speedUp10xBtn').addEventListener('click', () => {
    timeFactor += 1;
});

document.getElementById('speedDown10xBtn').addEventListener('click', () => {
    timeFactor = Math.max(0.1, timeFactor - 1);
});

document.getElementById('zoomOutBtn').addEventListener('click', () => {
    zoomOutAndCenter();
});

document.getElementById('zoomInBtn').addEventListener('click', () => {
    zoomIn();
});

document.getElementById('autoStopBtn').addEventListener('click', () => {
    autoStop = !autoStop;
    document.getElementById('autoStopBtn').classList.toggle('activated');
    if (!autoStop) {
        document.getElementById('autoStopBtn').classList.remove('triggered');
        autoStopTriggered = false;
    }
});

document.getElementById('preset1Btn').addEventListener('click', () => {
    initBodies(1);
});

document.getElementById('preset2Btn').addEventListener('click', () => {
    initBodies(2);
});

document.getElementById('preset3Btn').addEventListener('click', () => {
    initBodies(3);
});

document.getElementById('preset4Btn').addEventListener('click', () => {
    initBodies(4);
});

document.getElementById('preset5Btn').addEventListener('click', () => {
    initBodies(5);
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    for (const body of bodies) {
        if (body.isClicked(mouseX, mouseY)) {
            selectedBody = body;
            offsetX = mouseX - ((body.x / scaleFactor) + canvas.width / 2);
            offsetY = mouseY - ((body.y / scaleFactor) + canvas.height / 2);
            isDragging = true;
            break;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && selectedBody) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        selectedBody.x = (mouseX - offsetX - canvas.width / 2) * scaleFactor;
        selectedBody.y = (mouseY - offsetY - canvas.height / 2) * scaleFactor;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    selectedBody = null;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    selectedBody = null;
});
