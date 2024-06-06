const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

let bodies = [];
let running = false;
let timeFactor = 1.0;
let deltaT = 0.1;
let scaleFactor = 1.0;
let autoStop = false;
let autoStopTriggered = false;
let boundingBox = false;
const colors = ['#e74c3c', '#8e44ad', '#f39c12'];
let selectedBody = null;
let isDragging = false;
let offsetX, offsetY;
const G = 1; // Gravitational constant for our simulation
let trails = [];
let maxTrailLength = 100; // Increased default trail length
let trailOpacityDecay = 0.01; // Adjusted opacity decay for better visibility

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

        // Handle bounding box collisions
        if (boundingBox) {
            const screenX = (this.x / scaleFactor) + canvas.width / 2;
            const screenY = (this.y / scaleFactor) + canvas.height / 2;

            if (screenX <= 0 || screenX >= canvas.width) {
                this.vx *= -1;
                this.x = (screenX <= 0) ? -canvas.width / 2 * scaleFactor : canvas.width / 2 * scaleFactor;
            }

            if (screenY <= 0 || screenY >= canvas.height) {
                this.vy *= -1;
                this.y = (screenY <= 0) ? -canvas.height / 2 * scaleFactor : canvas.height / 2 * scaleFactor;
            }
        }
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
                if (distance < 10 && autoStop) {
                    running = false;
                    autoStopTriggered = true;
                    document.getElementById('autoStopBtn').classList.add('triggered');
                }
            }
        });
        const currentVelocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.escaped = currentVelocity > totalEscapeVelocity;
    }

    draw(ctx) {
        // Adjust size based on mass and ensure it is within the specified range
        const radius = Math.min(100, Math.max(2, Math.sqrt(this.mass / 1000) * 10 / scaleFactor));
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
    const bodiesConfig = presets[preset - 1];
    bodies = bodiesConfig.map(p => new Body(p.mass, p.x, p.y, p.vx, p.vy, p.color));
    trails = bodies.map(() => []); // Initialize trails for each body
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
            body.update(deltaT * timeFactor); // Use deltaT for updates
        }

        // Update trails only when running
        bodies.forEach((body, index) => {
            trails[index].push({ x: body.x, y: body.y, opacity: 1 });
            if (trails[index].length > maxTrailLength) {
                trails[index].shift();
            }
        });
    }
}

function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrails();
    for (const body of bodies) {
        body.draw(ctx);
    }
    document.getElementById('speedDisplay').textContent = `Speed: ${timeFactor.toFixed(1)}`;
    document.getElementById('deltaTDisplay').textContent = `Delta T: ${deltaT.toFixed(3)}`;
    document.getElementById('sizeDisplay').textContent = `Size: ${(canvas.width * scaleFactor).toFixed(0)} x ${(canvas.height * scaleFactor).toFixed(0)}`;
}

function drawTrails() {
    trails.forEach((trail, index) => {
        trail.forEach((point, i) => {
            const nextPoint = trail[i + 1];
            if (nextPoint) {
                const screenX = (point.x / scaleFactor) + canvas.width / 2;
                const screenY = (point.y / scaleFactor) + canvas.height / 2;
                const nextScreenX = (nextPoint.x / scaleFactor) + canvas.width / 2;
                const nextScreenY = (nextPoint.y / scaleFactor) + canvas.height / 2;
                ctx.beginPath();
                ctx.moveTo(screenX, screenY);
                ctx.lineTo(nextScreenX, nextScreenY);
                ctx.strokeStyle = `rgba(${hexToRgb(colors[index])}, ${point.opacity})`;
                ctx.stroke();
                point.opacity -= trailOpacityDecay;
            }
        });
    });
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
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

// Initialize the simulation with the first preset
initBodies(1);
loop();
