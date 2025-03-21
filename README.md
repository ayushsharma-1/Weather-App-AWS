# 🌦️ Weather Management System

[![Build Status](http://localhost:8080/job/Weather/lastBuild/badge/icon)](http://localhost:8080/job/Weather/)  
[![License](https://img.shields.io/github/license/ayushsharma-1/Weather-Management-System)](https://github.com/ayushsharma-1/Weather-Management-System/blob/main/LICENSE)  
[![GitHub Stars](https://img.shields.io/github/stars/ayushsharma-1/Weather-Management-System?style=social)](https://github.com/ayushsharma-1/Weather-Management-System/stargazers)  
[![GitHub Forks](https://img.shields.io/github/forks/ayushsharma-1/Weather-Management-System?style=social)](https://github.com/ayushsharma-1/Weather-Management-System/network/members)  
[![GitHub Issues](https://img.shields.io/github/issues/ayushsharma-1/Weather-Management-System)](https://github.com/ayushsharma-1/Weather-Management-System/issues)

---

## 🚀 Overview

The **Weather Management System** is a full-stack web application providing real-time weather information for various cities.  
It implements an automated **CI/CD pipeline** using Jenkins that builds Docker images and deploys on an AWS EC2 instance.

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
- User-friendly search  
- Weather metrics: temperature, humidity, wind speed  
- **CI/CD Pipeline** using Jenkins  
- Dockerized frontend and backend  
- Deployed on AWS EC2 with automated deployment

---

## ✅ CI/CD Pipeline (Jenkins)

- **Trigger** ➜ GitHub webhook on `main` branch push  
- **Steps**:
  1. Checkout source code
  2. Build Docker images (`backend` + `frontend`)
  3. Push Docker images to DockerHub
  4. SSH into AWS EC2 and deploy containers

### Jenkins Build Status  
[![Build Status](http://localhost:8080/job/Weather/lastBuild/badge/icon)](http://localhost:8080/job/Weather/)

---

## 🐳 DockerHub Images and Stats

### Backend  
[![Docker Pulls](https://img.shields.io/docker/pulls/ayush180/weather-backend)](https://hub.docker.com/r/ayush180/weather-backend)  
[![Docker Stars](https://img.shields.io/docker/stars/ayush180/weather-backend)](https://hub.docker.com/r/ayush180/weather-backend)

### Frontend  
[![Docker Pulls](https://img.shields.io/docker/pulls/ayush180/weather-frontend)](https://hub.docker.com/r/ayush180/weather-frontend)  
[![Docker Stars](https://img.shields.io/docker/stars/ayush180/weather-frontend)](https://hub.docker.com/r/ayush180/weather-frontend)

---

## 📦 Installation (Manual)

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

## 🐳 Running with Docker Compose (Local)

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

## 🤝 Contributing

Contributions are welcome!  
Open an issue or submit a PR.  

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/ayushsharma-1/Weather-Management-System/blob/main/LICENSE).


### Author  
👤 **Ayush Sharma**  
- GitHub: [ayushsharma-1](https://github.com/ayushsharma-1)
