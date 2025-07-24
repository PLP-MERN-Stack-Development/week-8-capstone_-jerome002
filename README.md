## Restaurant Management System – MERN Stack Capstone Project

## Project Overview

-- This is a comprehensive full-stack MERN (MongoDB, Express.js, React.js, Node.js) application built to demonstrate proficiency in full-stack development. The project serves as a restaurant management system, enabling restaurant staff to manage menus, inventory, orders, staff authentication, and real-time updates.

## Features

-- Staff Registration and Login with JWT Authentication

-- Menu Management (Add, Update, Delete Items)

-- Order Management

-- Real-time Dashboard with Inventory Tracking

-- Role-Based Access Control

-- Real-time Notifications (via Socket.IO)

--PDF Invoice/Report Export (optional)

-- Responsive Frontend with React & Bootstrap/Tailwind CSS

## Technical Stack


## Technology

## Frontend

--React, Tailwind/Bootstrap, Axios

## Backend

--Node.js, Express.js

# Database

--MongoDB (Mongoose ORM)

## Auth

-- JWT, Bcrypt

## Real-Time

--Socket.IO

## Deployment

--Vercel (Frontend), Render (Backend)

## Testing

-- Jest, Supertest

## CI/CD

--GitHub Actions

## Live Demo

-- Frontend: https://restaurant-frontend-jet.vercel.app/
-- Backend API: https://restaurant-backend-gcmg.onrender.com/api
  
## Screenshots

--Add actual screenshots of key features from your deployed app here.

## Running the App Locally

## Prerequisites

--Node.js

--MongoDB (local or Atlas)

--Git

## Backend Setup

git clone https://github.com/yourusername/restaurant-backend.git
cd restaurant-backend
npm install
touch .env

Add the following to your .env file:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

Then run the development server:

npm run dev

## Frontend Setup

git clone https://github.com/yourusername/restaurant-frontend.git
cd restaurant-frontend
npm install
touch .env

Add the following to your .env file:

VITE_API_BASE_URL=https://restaurant-api.onrender.com

Then run:

npm run dev

## API Documentation

## The backend exposes RESTful API routes for:

Endpoint

Method

Description

/api/users/register

POST

Register a new user

/api/users/login

POST

Login and get token

/api/menu

GET

Get all menu items

/api/menu

POST

Add a new menu item

/api/orders

POST

Create a new order

/api/orders/:id

PUT

Update order status

Protected routes require JWT in Authorization header.

Architecture Overview

React (Frontend)
  └─ axios requests
       └─ Express (API Server)
            └─ MongoDB (Database)

Auth Middleware validates JWT tokens

Real-time updates via Socket.IO

Frontend receives updates and rerenders automatically

🎥 Demo Video

Watch 5-10 Minute Walkthrough (Link to be added)

Submission Checklist



Possible Improvements

Add admin dashboard for managing users

Integrate payment gateways

Add analytics for sales and orders

Implement notification service via email/SMS

## Author

Jerome Kapkor Kimosop📧 jkapkor@gmail.com📞 +254745515976