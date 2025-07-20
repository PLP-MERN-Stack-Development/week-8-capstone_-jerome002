## Restaurant Management System – MERN Stack Capstone Project

##  Project Overview

This is a **comprehensive full-stack MERN (MongoDB, Express.js, React.js, Node.js)** application built to demonstrate proficiency in full-stack development. The project serves as a restaurant management system, enabling restaurant staff to manage menus, inventory, orders, staff authentication, and real-time updates.


## Features

- Staff Registration and Login with JWT Authentication
- Menu Management (Add, Update, Delete Items)
- Order Management
- Real-time Dashboard with Inventory Tracking
- Role-Based Access Control
- Real-time Notifications (via Socket.IO)
-  PDF Invoice/Report Export (optional)
- Responsive Frontend with React & Bootstrap

---

## Tasks Completed

### Task 1: Project Planning and Design
- Chose a real-world problem: restaurant order and inventory management
- Wireframes and mockups created with Figma
-  MongoDB schema design with Mongoose validation
-  API endpoints planned using REST conventions
-  Roadmap documented in GitHub Projects
-  Technical architecture defined

###  Task 2: Backend Development
-  MongoDB with Mongoose schemas (User, MenuItem, Order)
- RESTful API with Express.js
-  JWT-based authentication with Bcrypt password hashing
-  Middleware for authentication, logging, and validation
-  Real-time order update tracking with Socket.IO
-  Basic unit and integration tests with Jest and Supertest

###  Task 3: Frontend Development
- Responsive UI using React.js and Tailwind/Bootstrap
-  Client-side routing with React Router DOM
-  Reusable components with props and hooks
-  Data fetching via Axios from backend
-  Form validation using custom logic and libraries like Yup
- Real-time updates displayed in order dashboard

###  Task 4: Testing and QA
- Unit tests for backend and critical frontend logic
-  Integration tests for API routes
-  Manual testing across major browsers and devices
-  Accessibility features implemented
- Code reviews and refactoring performed

###  Task 5: Deployment and Documentation
-  Backend deployed to Render
-  Frontend deployed to Vercel
-  CI/CD configured using GitHub Actions
-  Monitoring and error logging using console logs (extendable to Sentry)
-  This README serves as part of technical documentation

---

## 🧱 Technical Stack

| Layer        | Technology             |
|--------------|------------------------|
| Frontend     | React, Tailwind/Bootstrap, Axios |
| Backend      | Node.js, Express.js    |
| Database     | MongoDB (Mongoose ORM) |
| Auth         | JWT, Bcrypt            |
| Real-Time    | Socket.IO              |
| Deployment   | Vercel (Frontend), Render (Backend) |
| Testing      | Jest, Supertest        |
| CI/CD        | GitHub Actions         |

---

##  Live Demo

 **Frontend**: [https://restaurant-client.vercel.app](https://restaurant-client.vercel.app)  
 **Backend API**: [https://restaurant-api.onrender.com/api](https://restaurant-api.onrender.com/api)

---

## Screenshots

> Add actual screenshots of key features from your deployed app here.

---

##  Running the App Locally

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
git clone https://github.com/yourusername/restaurant-backend.git
cd restaurant-backend
npm install
touch .env
Add this to .env:

env
Copy
Edit
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
Then run:

bash
Copy
Edit
npm run dev
Frontend Setup
bash
Copy
Edit
git clone https://github.com/yourusername/restaurant-frontend.git
cd restaurant-frontend
npm install
npm start
API Documentation
The backend exposes RESTful API routes for:

Endpoint	Method	Description
/api/users/register	POST	Register a new user
/api/users/login	POST	Login and get token
/api/menu	GET	Get all menu items
/api/menu	POST	Add a new menu item
/api/orders	POST	Create a new order
/api/orders/:id	PUT	Update order status

Protected routes require JWT in Authorization header.

Architecture Overview
scss
Copy
Edit
React (Frontend)
│
│  axios requests
↓
Express (API Server)
│
↓
MongoDB (Database)
Auth Middleware validates JWT tokens

Real-time updates via Socket.IO

Frontend receives updates and rerenders automatically

 Demo Video
Watch 5-10 Minute Walkthrough

Submission Checklist
 Backend and frontend deployed

 Code pushed to GitHub repo regularly

 Comprehensive README

 Unit and integration tests written

 Final project presentation prepared

Possible Improvements
Add admin dashboard for managing users

Integrate payment gateways

Add analytics for sales and orders

Implement notification service via email/SMS

 Author
Jerome Kapkor Kimosop
📧 jkapkor@gmail.com
📞 +254745515976
🔗 GitHub Profile

🪪 License
MIT License – Use freely for learning and personal development.