# 🌦️ Weather Management System

[![Build Status](https://primate-smart-silkworm.ngrok-free.app/job/Weather/badge/icon)](https://primate-smart-silkworm.ngrok-free.app/job/Weather/)
[![License](https://img.shields.io/github/license/ayushsharma-1/Weather-Management-System)](https://github.com/ayushsharma-1/Weather-Management-System/blob/main/LICENSE)  
[![GitHub Stars](https://img.shields.io/github/stars/ayushsharma-1/Weather-Management-System?style=social)](https://github.com/ayushsharma-1/Weather-Management-System/stargazers)  
[![GitHub Forks](https://img.shields.io/github/forks/ayushsharma-1/Weather-Management-System?style=social)](https://github.com/ayushsharma-1/Weather-Management-System/network/members)  
[![GitHub Issues](https://img.shields.io/github/issues/ayushsharma-1/Weather-Management-System)](https://github.com/ayushsharma-1/Weather-Management-System/issues)

---

## 🚀 Overview

The **Weather Management System** is a full-stack web application providing real-time weather information for various cities.  
It implements an automated **CI/CD pipeline** using Jenkins that builds Docker images and deploys them on an AWS EC2 instance.

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-Frontend-blue)  
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)  
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)  
![Docker](https://img.shields.io/badge/Docker-Containerization-blue)  
![Jenkins](https://img.shields.io/badge/Jenkins-CI/CD-red)  
![AWS EC2](https://img.shields.io/badge/AWS-EC2-orange)

---

## 🔥 Features

- Real-time weather data retrieval  
- User-friendly search functionality  
- Weather metrics: temperature, humidity, wind speed  
- **CI/CD Pipeline** using Jenkins  
- Dockerized frontend and backend  
- Deployed on AWS EC2 with automated deployment  
- Jenkins exposed via **Ngrok** for remote access  

---

## ✅ CI/CD Pipeline (Jenkins)

- **Trigger** ➜ GitHub webhook on `main` branch push  
- **Steps**:
  1. Checkout source code from GitHub
  2. Build Docker images (`backend` + `frontend`)
  3. Push Docker images to DockerHub
  4. SSH into AWS EC2 and deploy containers
  5. Jenkins exposed via ngrok tunnel for remote management

### Jenkins Build Status  
[![Build Status](https://primate-smart-silkworm.ngrok-free.app/job/Weather/badge/icon)](https://primate-smart-silkworm.ngrok-free.app/job/Weather/)

---

## 🐳 DockerHub Images and Stats

### Backend  
[![Docker Pulls](https://img.shields.io/docker/pulls/ayush180/weather-backend)](https://hub.docker.com/r/ayush180/weather-backend)  
[![Docker Stars](https://img.shields.io/docker/stars/ayush180/weather-backend)](https://hub.docker.com/r/ayush180/weather-backend)

### Frontend  
[![Docker Pulls](https://img.shields.io/docker/pulls/ayush180/weather-frontend)](https://hub.docker.com/r/ayush180/weather-frontend)  
[![Docker Stars](https://img.shields.io/docker/stars/ayush180/weather-frontend)](https://hub.docker.com/r/ayush180/weather-frontend)

---

## 🌐 Architecture Diagram

The diagram below illustrates the architecture and CI/CD pipeline flow of the Weather Management System.

![Architecture Diagram](https://your-image-link.com/architecture-diagram.png)

---

## 📦 Installation (Manual Setup)

### Clone the Repository
```bash
git clone https://github.com/ayushsharma-1/Weather-Management-System.git
cd Weather-Management-System
```

### Run Backend Locally
```bash
cd backend
npm install
node server.js
```

### Run Frontend Locally
```bash
cd frontend
npm install
npm start
```

---

## 🐳 Running Locally with Docker Compose

```bash
docker-compose up
```

- Starts MongoDB, backend, and frontend  
- Access frontend ➜ `http://localhost:3000`

---

## 🌐 Live Deployment (AWS EC2)

Frontend ➜ `http://<your-ec2-public-ip>:3000`  
Backend ➜ `http://<your-ec2-public-ip>:5000`

Automatically deployed via Jenkins CI/CD pipeline from GitHub ➜ DockerHub ➜ EC2.

---

## 📖 API Documentation

Base URL:  
```
http://13.234.66.183:5000/api/weather?cities=${cities}
```

### Endpoints

| Method | Endpoint                                            | Description                 |
|--------|-----------------------------------------------------|-----------------------------|
| GET    | `/api/weather?cities=${cities}`                    | Get weather for cities      |
| GET    | `/api/weather/:id`                                 | Get weather by city ID      |
| POST   | `/api/weather`                                     | Add new weather data        |
| PUT    | `/api/weather/:id`                                 | Update weather data by ID   |
| DELETE | `/api/weather/:id`                                 | Delete weather data by ID   |

### Example Request
```bash
curl -X GET "http://13.234.66.183:5000/api/weather?cities=London"
```

### Example Response
```json
[
  {
    "city": "London",
    "temperature": "15°C",
    "humidity": "60%",
    "windSpeed": "5 km/h"
  }
]
```

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open an issue or submit a pull request.  

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/ayushsharma-1/Weather-Management-System/blob/main/LICENSE).

---

## 👤 Author

**Ayush Sharma**  
- GitHub: [ayushsharma-1](https://github.com/ayushsharma-1)
```
