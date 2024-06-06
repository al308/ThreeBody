const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

let bodies = [];
let running = false;
let timeFactor = 1.0;
let scaleFactor = 1.0;
const colors = ['#e74c3c', '#8e44ad', '#f39c12'];
let selectedBody = null;
let isDragging = false;
let offsetX, offsetY;
const G = 1; // Gravitational constant for our simulation

class Body {
    constructor(mass, x, y, vx, vy, color) {
        this.mass = mass;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
        this.ay = 0;
        this.color = color;
        this.escaped = false;
    }

    applyForce(fx, fy) {
        this.ax += fx / this.mass;
        this.ay += fy / this.mass;
    }

    update(dt) {
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.ax = 0;
        this.ay = 0;
        this.checkEscape();
    }

    checkEscape() {
        let totalEscapeVelocity = 0;
        bodies.forEach(body => {
            if (body !== this) {
                const dx = body.x - this.x;
                const dy = body.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const escapeVelocity = Math.sqrt((2 * G * body.mass) / distance);
                totalEscapeVelocity += escapeVelocity;
            }
        });
        const currentVelocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.escaped = currentVelocity > totalEscapeVelocity;
    }

    draw(ctx) {
        const radius = Math.sqrt(this.mass / 1000) * 10 / scaleFactor; // Adjust size based on mass and scale
        const screenX = (this.x / scaleFactor) + canvas.width / 2;
        const screenY = (this.y / scaleFactor) + canvas.height / 2;
        if (screenX > 0 && screenX < canvas.width && screenY > 0 && screenY < canvas.height) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fillText(this.escaped ? '(escaped)' : '', screenX + radius, screenY);
        } else {
            this.drawArrow(ctx, screenX, screenY);
        }
    }

    drawArrow(ctx, screenX, screenY) {
        const arrowSize = 10;
        let edgeX = screenX;
        let edgeY = screenY;
        let distanceText = "";

        if (screenX < 0) edgeX = 0;
        if (screenX > canvas.width) edgeX = canvas.width;
        if (screenY < 0) edgeY = 0;
        if (screenY > canvas.height) edgeY = canvas.height;

        const dx = screenX - edgeX;
        const dy = screenY - edgeY;
        const distance = Math.sqrt(dx * dx + dy * dy).toFixed(1);
        distanceText = `${distance}${this.escaped ? " (escaped)" : ""}`;

        ctx.beginPath();
        ctx.moveTo(edgeX, edgeY);
        if (screenX < 0) {
            ctx.lineTo(edgeX + arrowSize, edgeY - arrowSize / 2);
            ctx.lineTo(edgeX + arrowSize, edgeY + arrowSize / 2);
        } else if (screenX > canvas.width) {
            ctx.lineTo(edgeX - arrowSize, edgeY - arrowSize / 2);
            ctx.lineTo(edgeX - arrowSize, edgeY + arrowSize / 2);
        } else if (screenY < 0) {
            ctx.lineTo(edgeX - arrowSize / 2, edgeY + arrowSize);
            ctx.lineTo(edgeX + arrowSize / 2, edgeY + arrowSize);
        } else if (screenY > canvas.height) {
            ctx.lineTo(edgeX - arrowSize / 2, edgeY - arrowSize);
            ctx.lineTo(edgeX + arrowSize / 2, edgeY - arrowSize);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.fillText(distanceText, Math.max(5, Math.min(edgeX + 5, canvas.width - 50)), Math.max(15, Math.min(edgeY + 15, canvas.height - 5)));
    }

    isClicked(mouseX, mouseY) {
        const radius = Math.sqrt(this.mass / 1000) * 10 / scaleFactor;
        const screenX = (this.x / scaleFactor) + canvas.width / 2;
        const screenY = (this.y / scaleFactor) + canvas.height / 2;
        const dx = screenX - mouseX;
        const dy = screenY - mouseY;
        return dx * dx + dy * dy <= radius * radius;
    }
}

function calculateGravitationalForce(b1, b2) {
    const G = 1;
    const dx = b2.x - b1.x;
    const dy = b2.y - b1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) {
        return { fx: 0, fy: 0 };
    }
    const force = (G * b1.mass * b2.mass) / (distance * distance);
    const angle = Math.atan2(dy, dx);
    return {
        fx: force * Math.cos(angle),
        fy: force * Math.sin(angle)
    };
}

function initBodies(preset) {
    switch (preset) {
        case 1:
            // Hierarchical System
            bodies = [
                new Body(1000, -100, 0, 0, 1.5, colors[0]), // Body 1
                new Body(1000, 100, 0, 0, -1.5, colors[1]), // Body 2
                new Body(1, 0, 300, 2, 0, colors[2]) // Body 3 (much lighter and far away)
            ];
            break;
        case 2:
            // Equilateral Triangle
            const mass = 1000;
            const sideLength = 300;
            const height = Math.sqrt(3) / 2 * sideLength;
            const speed = Math.sqrt(G * mass / (sideLength / Math.sqrt(3)));
            bodies = [
                new Body(mass, -sideLength / 2, 0, speed, 0, colors[0]), // Body 1
                new Body(mass, sideLength / 2, 0, -speed, 0, colors[1]), // Body 2
                new Body(mass, 0, height, 0, -speed, colors[2]) // Body 3
            ];
            break;
        case 3:
            // Binary with Distant Orbit (Adjusted)
            const binarySpeed = Math.sqrt(G * 1000 / 100);
            bodies = [
                new Body(1000, -100, 0, 0, binarySpeed, colors[0]), // Body 1
                new Body(1000, 100, 0, 0, -binarySpeed, colors[1]), // Body 2
                new Body(100, 0, 500, 0.75, 0, colors[2]) // Body 3
            ];
            break;
        case 4:
            // Circular Orbits
            bodies = [
                new Body(1000, 0, 0, 0, 0, colors[0]), // Central Body
                new Body(10, 150, 0, 0, 1.5, colors[1]), // Orbiting Body 1
                new Body(10, 0, 200, -1, 0, colors[2]) // Orbiting Body 2
            ];
            break;
        case 5:
            // Chaotic Start
            bodies = [
                new Body(1000, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 - 1, Math.random() * 2 - 1, colors[0]),
                new Body(1000, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 - 1, Math.random() * 2 - 1, colors[1]),
                new Body(1000, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 - 1, Math.random() * 2 - 1, colors[2])
            ];
            break;
        default:
            // Default (Hierarchical System)
            bodies = [
                new Body(1000, -100, 0, 0, 1.5, colors[0]), // Body 1
                new Body(1000, 100, 0, 0, -1.5, colors[1]), // Body 2
                new Body(1, 0, 300, 2, 0, colors[2]) // Body 3 (much lighter and far away)
            ];
            break;
    }
    zoomOutAndCenter();
    console.log(bodies); // Log the bodies to ensure they are initialized correctly
}

function updateSimulation() {
    if (running) {
        for (let i = 0; i < bodies.length; i++) {
            for (let j = 0; j < bodies.length; j++) {
                if (i !== j) {
                    const force = calculateGravitationalForce(bodies[i], bodies[j]);
                    bodies[i].applyForce(force.fx, force.fy);
                }
            }
        }

        for (const body of bodies) {
            body.update(0.1 * timeFactor);
        }
    }
}

function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const body of bodies) {
        body.draw(ctx);
    }
    document.getElementById('speedDisplay').textContent = `Speed: ${timeFactor.toFixed(1)}`;
    document.getElementById('sizeDisplay').textContent = `Size: ${(canvas.width * scaleFactor).toFixed(0)} x ${(canvas.height * scaleFactor).toFixed(0)}`;
}

function loop() {
    updateSimulation();
    drawSimulation();
    requestAnimationFrame(loop);
}

function zoomOutAndCenter() {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    bodies.forEach(body => {
        if (body.x < minX) minX = body.x;
        if (body.x > maxX) maxX = body.x;
        if (body.y < minY) minY = body.y;
        if (body.y > maxY) maxY = body.y;
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const width = maxX - minX;
    const height = maxY - minY;
    const maxDimension = Math.max(width, height);

    scaleFactor = Math.max(maxDimension / canvas.width, maxDimension / canvas.height) * 2;
    bodies.forEach(body => {
        body.x -= midX;
        body.y -= midY;
        body.escaped = false;
    });
}

function zoomIn() {
    scaleFactor /= 2;
    bodies.forEach(body => {
        body.escaped = false;
    });
}

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

// Preset Buttons
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

initBodies(1);
loop();
