const presets = [
    // Stable Orbit 1
    [
        { mass: 1000, x: -100, y: 0, vx: 0, vy: 1.5, color: "#e74c3c" },
        { mass: 1000, x: 100, y: 0, vx: 0, vy: -1.5, color: "#8e44ad" },
        { mass: 1000, x: 0, y: 173, vx: 1.5, vy: 0, color: "#f39c12" }
    ],
    // Stable Orbit 2
    [
        { mass: 1000, x: -150, y: 0, vx: 0, vy: 1.2, color: "#e74c3c" },
        { mass: 1000, x: 150, y: 0, vx: 0, vy: -1.2, color: "#8e44ad" },
        { mass: 500, x: 0, y: 250, vx: 1, vy: 0, color: "#f39c12" }
    ],
    // Stable Orbit 3
    [
        { mass: 800, x: -200, y: 0, vx: 0, vy: 1.0, color: "#e74c3c" },
        { mass: 800, x: 200, y: 0, vx: 0, vy: -1.0, color: "#8e44ad" },
        { mass: 600, x: 0, y: 300, vx: 0.8, vy: 0, color: "#f39c12" }
    ],
    // Stable Orbit 4
    [
        { mass: 1200, x: -100, y: 0, vx: 0, vy: 1.4, color: "#e74c3c" },
        { mass: 1200, x: 100, y: 0, vx: 0, vy: -1.4, color: "#8e44ad" },
        { mass: 800, x: 0, y: 200, vx: 1.2, vy: 0, color: "#f39c12" }
    ],
    // Stable Orbit 5
    [
        { mass: 1500, x: -250, y: 0, vx: 0, vy: 0.9, color: "#e74c3c" },
        { mass: 1500, x: 250, y: 0, vx: 0, vy: -0.9, color: "#8e44ad" },
        { mass: 700, x: 0, y: 350, vx: 0.6, vy: 0, color: "#f39c12" }
    ],
    // Euler's Collinear Solutions
    [
        { mass: 1000, x: -200, y: 0, vx: 0, vy: 1.2, color: "#e74c3c" },
        { mass: 1000, x: 0, y: 0, vx: 0, vy: 0, color: "#8e44ad" },
        { mass: 1000, x: 200, y: 0, vx: 0, vy: -1.2, color: "#f39c12" }
    ],
    // Lagrange's Equilateral Triangle
    [
        { mass: 1000, x: -100, y: -173, vx: 1.0, vy: 0.577, color: "#e74c3c" },
        { mass: 1000, x: 100, y: -173, vx: -1.0, vy: 0.577, color: "#8e44ad" },
        { mass: 1000, x: 0, y: 0, vx: 0, vy: -1.154, color: "#f39c12" }
    ],
    // Figure-8 Orbit (corrected for stability and scaled up)
    [
        { mass: 1000, x: 0.97000436 * 100, y: -0.24308753 * 100, vx: 0.466203685 * 10, vy: 0.43236573 * 10, color: "#e74c3c" },
        { mass: 1000, x: -0.97000436 * 100, y: 0.24308753 * 100, vx: 0.466203685 * 10, vy: 0.43236573 * 10, color: "#8e44ad" },
        { mass: 1000, x: 0, y: 0, vx: -0.93240737 * 10, vy: -0.86473146 * 10, color: "#f39c12" }
    ]
];
