# 🏨 Hotel Management System

A full-stack Hotel Management System developed using React.js, Redux Toolkit, Node.js, Express.js, and PostgreSQL. This application allows users to manage hotel information through a responsive interface with CRUD operations, image uploads, search, filtering, pagination, and interactive maps.

## 📌 Project Overview

The Hotel Management System provides an interface to manage hotel details efficiently. Users can add new hotels, update existing information, view hotel details, and delete hotel records.

The application uses React.js for the frontend, Node.js and Express.js for backend API development, and PostgreSQL for database management.

## 🚀 Features

- **Hotel Management (CRUD):** Add, view, edit, and delete hotel details.
- **Image Upload:** Upload hotel images with image preview functionality.
- **Search:** Search hotels by hotel name.
- **Price Filtering:** Filter hotels based on minimum and maximum price.
- **Pagination:** Display hotel records across multiple pages.
- **Hotel Details:** View individual hotel information.
- **Interactive Map:** Display hotel locations using latitude and longitude.
- **Form Validation:** Validate hotel name, description, coordinates, price, and image.
- **State Management:** Manage hotel data using Redux Toolkit.
- **SEO:** Dynamic page titles and metadata.

## 🛠️ Technologies Used

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- HTML5
- CSS3
- React Leaflet
- React Helmet Async

### Backend
- Node.js
- Express.js
- Multer
- PostgreSQL
- pg (PostgreSQL Node.js client)
- CORS
- dotenv

## 📁 Project Structure

```text
hotel-management-learning/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── hotelController.js
│   ├── database/
│   │   └── hotel_management.sql
│   ├── routes/
│   │   └── hotelRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── public/
│
├── src/
│   ├── component/
│   ├── data/
│   ├── redux/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Jayaram25-cyber/StayFinder.git
```

Navigate to the project directory:

```bash
cd hotel-management-learning
```

### 2. Database Setup

1. Open PostgreSQL using pgAdmin or psql.
2. Create a database named:

```sql
CREATE DATABASE hotel_management;
```

3. Connect to the newly created database.
4. Execute the SQL script available at:

```text
backend/database/hotel_management.sql
```

This script contains the hotel table structure and exported hotel records.

### 3. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder.

Configure the database connection variables according to `backend/config/db.js`.

Example configuration (use the exact variable names expected by your `db.js`):

```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_NAME=hotel_management
```

Start the backend server:

```bash
npm start
```

Backend API runs at:

```text
http://localhost:5000
```

### 4. Frontend Setup

Open another terminal in the project root directory.

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## 🔗 API Endpoints

Base URL:

```text
http://localhost:5000/api/hotels
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/hotels` | Get all hotels |
| GET | `/api/hotels/:id` | Get a hotel by ID |
| POST | `/api/hotels` | Add a new hotel |
| PUT | `/api/hotels/:id` | Update hotel details |
| DELETE | `/api/hotels/:id` | Delete a hotel |

The GET endpoint also supports search, price filtering, and pagination.

## 🗺️ Hotel Location

The application uses React Leaflet and OpenStreetMap to display hotel locations based on their latitude and longitude coordinates.

## 🖼️ Image Storage

Hotel images are uploaded using Multer and stored on the backend server in:

```text
backend/uploads/
```

The corresponding image path is stored in the PostgreSQL database.

## 🔐 Environment Variables

Sensitive configuration files such as `.env` are excluded from GitHub using `.gitignore`.

Create your own backend `.env` file before starting the application.

## 👨‍💻 Developer

Developed as a full-stack Hotel Management System project using React.js, Redux Toolkit, Node.js, Express.js, and PostgreSQL.

---

**Thank you for visiting this project!**