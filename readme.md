# Three Body Problem Simulation

This project simulates the three-body problem using HTML, CSS, and JavaScript. The simulation is visualized on a canvas element, with interactive controls for adjusting the simulation speed, resetting positions, and configuring individual body properties.

## Features

- **Start/Stop Simulation**: Toggle the simulation.
- **Reset Positions**: Reinitialize the positions and velocities of the bodies without changing their masses.
- **Settings**: Open the settings modal to adjust properties of each body (mass, position, velocity).
- **Speed Control**: Adjust the simulation speed with normal and 10x speed buttons.
- **Click and Drag**: Click on a body and drag it to reposition.
- **Escape Velocity**: Bodies that move at a velocity exceeding the escape velocity are marked as "escaped".
- **Zoom In/Out**: Adjust the view to show all bodies or zoom in for a closer look.
- **Simulated Canvas Size**: Display the simulated size of the canvas, which changes with zoom levels.

## Controls

- **Start/Stop Simulation**: Press the start/stop button to toggle the simulation.
- **Reset Positions**: Press the reset button to reinitialize the positions and velocities of the bodies.
- **Settings**: Press the settings button to open a modal where you can adjust properties of each body.
- **Zoom Out and Center**: Press the zoom out button to adjust the scale and center all bodies within the canvas.
- **Zoom In**: Press the zoom in button to zoom in on the bodies.
- **Speed Control**: Use the speed up/down buttons to adjust the simulation speed. Use the 10x buttons for larger adjustments.

## How to Use

1. **Clone the Repository**

    ```sh
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install Dependencies**

    Make sure you have Node.js installed. Then, run:

    ```sh
    npm install
    ```

3. **Run the Server**

    ```sh
    node server.js
    ```

4. **Open the Application**

    Open your browser and navigate to `http://localhost:3000`.

## File Structure

```sh
.
├── public/
│   ├── index.html
│   ├── style.css
│   ├── simulation.js
│   ├── settings.js
├── server.js
└── README.md
```