# 🚗 Vehicle Lookup App

A web application that allows users to search for vehicle models by selecting a car make, manufacture year, and vehicle type.

Built with **.NET Core 9** (Backend) and **React.js** (Frontend), containerized with **Docker**.

---

## 📋 Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Docker Desktop | Latest | [docker.com](https://www.docker.com/products/docker-desktop) |
| Git | Latest | [git-scm.com](https://git-scm.com) |

> **.NET SDK** and **Node.js** are NOT required — Docker handles everything.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/qasemzoubii/vehicle-lookup-app.git
cd vehicle-lookup-app
```

### 2. Start the Application

```bash
docker-compose up --build
```

### 3. Open the Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5215/api/vehicle/makes |

---

## 🛑 Stop the Application

```bash
docker-compose down
```

---

## 📁 Project Structure
vehicle-lookup-app/
├── VehicleLookup/                 # .NET Core Backend
│   ├── Controllers/
│   │   └── VehicleController.cs
│   ├── Services/
│   │   └── NhtsaService.cs
│   ├── Models/
│   │   └── NhtsaModels.cs
│   ├── Program.cs
│   └── Dockerfile
├── vehicle-lookup-frontend/       # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── VehicleLookup.jsx
│   │   │   └── VehicleLookup.css
│   │   ├── App.js
│   │   └── index.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicle/makes` | Get all car makes |
| GET | `/api/vehicle/types/{makeId}` | Get vehicle types for a make |
| GET | `/api/vehicle/models/{makeId}/{year}` | Get models by make and year |

---

## 🌐 Data Source

All vehicle data is retrieved from the **NHTSA (National Highway Traffic Safety Administration)** public API:
- https://vpic.nhtsa.dot.gov/api/