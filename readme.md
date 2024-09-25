# Three-Body Problem Simulation

This project simulates the three-body problem, a classical problem in physics and mathematics that involves predicting the motion of three celestial bodies based on their mutual gravitational attraction.

## Features

- **Dynamic Simulation**: Visualize the motion of three bodies under the influence of gravity.
- **Adjustable Simulation Speed**: Control the speed of the simulation with speed up and down buttons.
- **Zoom In/Out**: Zoom in and out to get a better view of the motion.
- **Auto Stop**: Automatically stop the simulation when certain conditions are met.
- **Bounding Box**: Toggle the bounding box for the simulation area.
- **Predefined Scenarios**: Explore various predefined scenarios of the three-body problem.
- **Help Modal**: Get detailed information about the simulation, scenarios, and controls.

## Scenarios

The simulation includes several predefined scenarios:

1. **Stable Orbit 1**: Three bodies in a stable orbit.
2. **Stable Orbit 2**: Another configuration of three bodies in a stable orbit.
3. **Stable Orbit 3**: Yet another stable orbit configuration.
4. **Stable Orbit 4**: A different stable orbit setup.
5. **Stable Orbit 5**: A fifth stable orbit configuration.
6. **Euler's Collinear Solutions**: Three bodies aligned in a straight line.
7. **Lagrange's Equilateral Triangle**: Three bodies forming an equilateral triangle.
8. **Figure-8 Orbit**: Three bodies following a figure-8 path.

## Controls

- **Start/Stop**: Start or stop the simulation.
- **Reset**: Reset the simulation to the initial state.
- **Speed Up/Down**: Increase or decrease the simulation speed.
- **Zoom In/Out**: Zoom in or out of the simulation view.
- **Auto Stop**: Automatically stop the simulation when certain conditions are met.
- **Bounding Box**: Toggle the bounding box for the simulation area.
- **Help**: Open the help modal for detailed information.

## How to Use

1. **Start the Simulation**: Click the start button to begin the simulation.
2. **Select a Scenario**: Choose a predefined scenario by clicking one of the scenario buttons.
3. **Adjust Settings**: Use the control buttons to adjust the simulation speed, zoom level, and other settings.
4. **Get Help**: Click the help button to open the help modal and learn more about the simulation and controls.

## Installation

To run the simulation locally, follow these steps:

1. **Clone the Repository**

    ```sh
    git clone [<repository-url>]
    cd [<repository-url>]
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
