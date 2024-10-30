# Weather Management System

## Overview

The Weather Management System is a web application that provides real-time weather information for different locations. Users can search for weather data, view current conditions, and get detailed forecasts.

## Features

- Real-time weather data retrieval
- User-friendly interface for searching locations
- Display of various weather metrics, including temperature, humidity, wind speed, and more.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Docker**: For containerization

## Installation

To run this project locally, follow the steps below:

### Prerequisites

- **Node.js** (version 16 or higher)
- **MongoDB** (if running locally)
- **Docker** (optional, for containerized deployment)

### Clone the Repository

```bash
git clone https://github.com/ayushsharma-1/Weather-Management-System.git
cd Weather-Management-System
```

### Running the Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    node server.js
    ```

### Running the Frontend

1. Open a new terminal window and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm start
    ```

### Running with Docker

If you prefer to run the application using Docker, you can use Docker Compose to start both the frontend and backend services along with MongoDB.

1. Make sure you have Docker and Docker Compose installed.

2. In the root directory of the project, run the following command:

    ```bash
    docker-compose up
    ```

This command will build the Docker images and start the containers for the backend, frontend, and MongoDB. You can access the application at `http://localhost:3000`.

### Docker Images

You can also pull the Docker images for the frontend and backend from Docker Hub:

- **Backend**: [ayush180/weather-backend](https://hub.docker.com/repository/docker/ayush180/weather-backend)
- **Frontend**: [ayush180/weather-frontend](https://hub.docker.com/repository/docker/ayush180/weather-frontend)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.

---
