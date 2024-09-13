# **Mobile POS for Restaurants** 🍽

This is a full-stack mobile application project designed to handle the point of sale (POS) system for restaurants. The project consists of two main parts: a **frontend** mobile application built with React Native and TypeScript, and a **backend** built with Node.js, Express and MongoDB atlas. The backend handles API requests, authentication, and data management.

---

## **Table of Contents**
1. [Project Description](#project-description)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Project Structure](#project-structure)
8. [Third-Party Services](#third-party-services)
9. [Schedule of Work](#schedule-of-work)
10. [Contributing](#contributing)
11. [License](#license)

---

## **Project Description**

This project is a mobile restaurant POS system that helps streamline order processing, manage inventory and generate real-time reports. The mobile app (built in React Native) allows restaurant staff to manage orders, while the backend API (Node.js + MongoDB) manages data storage and business logic.

---

## **Tech Stack**

### **Frontend (Mobile App)**:
- React Native
- TypeScript
- Expo
- Expo router (For routing/navigation)

### **Backend (Server)**:
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM for MongoDB)
- TypeScript

### **Development Tools**:
- Nodemon and Postman
- Axios for HTTP requests
- Moment.js for handling dates

---

## **Features**

- **Order Management**: Add, update, and remove items from orders.
- **Menu Management**: Create,edit and delete menu item with ease.
- **User Authentication**: Employee signup/signin.
- **Reporting**: Generate real-time sales and also transcations history.
- **Receipt Generation**: Print and share receipts.
- **Mobile-first**: Optimized for mobile devices used by restaurant staff.

---

## **Installation and Setup**

### **Prerequisites**
- Node.js (>=14.x)
- MongoDB
- Expo CLI

### **1. Clone the Repository**

```bash
git clone https://github.com/khalifahnur/MobilePOS.git
cd MobilePOS
```

### **2. Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```bash
   touch .env
   ```

4. Add the following environment variables:
   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=3002
   ```

5. Start the backend server:
   ```bash
   npm run devStart
   ```

### **3. Frontend Setup (React Native)**

1. Navigate to the main directory:
   ```bash
   cd .
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. . Start the app
   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

---

## **Usage**

1. **Start the backend server**:
   ```bash
   npm run devStart
   ```

2. **Run the frontend mobile app**:
   ```bash
   npx expo start
   ```

3. Use an Android emulator or a physical device to interact with the POS system.

---

## **API Endpoints**

### **Authentication**
- **POST** `/api/auth/signup`: Register a new employee.
- **POST** `/api/auth/sign`: Login for employees and admins.
- **POST** `/api/auth/:userId/updateRestaurantDetails`: For updating restaurant name.
- **POST** `/api/auth/forgot-password`: forgot password.
- **POST** `/api/auth/verify-code`: Verify the new code.
- **POST** `/api/auth/reset-password`: Reset new password.

### **Inventory**
- **GET** `/api/menu/createMenu/:restaurantId`: Get all orders for a restaurant.
- **POST** `/api/data/fetchMenu`: fetch all inventory items.
- **DELETE** `/api/menu/remove`: Delete an item.
- **PUT** `/api/menu/update`: edit and item.

### **Orders**
- **POST** `/api/sales/createSales`: Add new new order.
- **GET** `/api/fetchSales`: Get all order.
- **GET** `/api/filteredSales`: fetch filtered order.

---

## **Project Structure**

### **Backend (Node.js + Express + MongoDB)**

```
backend/
│
├── controllers/       # Business logic
│   └── authController.js
│   └── orderController.js
│   └── inventoryController.js
│
├── models/            # Mongoose models
│   └── User.js
│   └── Order.js
│   └── Inventory.js
│
├── routes/            # API routes
│   └── authRoutes.js
│   └── orderRoutes.js
│   └── inventoryRoutes.js
│
│
├── utils/             # Utility functions
├── app.json          # Express app setup
├── server.js         # Server entry point
└── .env               # Environment variables
```
---

## **Third-Party Services**

- **MongoDB Atlas**: Cloud database service for storing restaurant data.
- **Expo Application Services (EAS)**: Used for building and deploying the mobile app.
- **JWT (JSON Web Tokens)**: For secure user authentication.

---

## **Challenges**

- Implementing real-time reporting.
- Synchronizing communication between the mobile app and the backend.
- Ensuring cross-platform compatibility (Android/iOS).
- Efficient state management for complex user interactions.

---

## **Contributing**

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to the project.

---

## **License**

This project is licensed under the MIT License.

--- 
