# weCare – Backend

**weCare** is a community-driven event management platform that allows users to create events, join community activities, and manage subscriptions. This repository contains the backend application responsible for API management, database operations, authentication, and event-related functionalities.

## ✨ Key Features

- **Event Management:** Create, retrieve, update, and delete community events.
- **Joined Events:** Manage events that users have joined and keep track of participation.
- **Subscription Management:** Handle user subscription-related functionalities.
- **Authentication & Authorization:** Protect private API endpoints using authentication middleware.
- **User-Specific Data:** Manage events and joined activities associated with individual users.
- **MongoDB Integration:** Store and manage application data using MongoDB.
- **RESTful API:** Provide structured API endpoints for seamless frontend and backend communication.
- **Secure API Access:** Apply authentication middleware to protect restricted operations.

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- JavaScript
- JWT Authentication
- Jose (JWT Verification)

## 📁 Project Structure

```text
weCare-backend/
│
├── app/
│   ├── controllers/
│   │   ├── eventsController.js
│   │   ├── joinedEventsControllers.js
│   │   └── SubscriptionController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── eventsModel.js
│   │   ├── joinedEventsModel.js
│   │   └── SubscriptionModel.js
│   │
│   └── routers/
│       └── api.js
│
├── node_modules/
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

## 📌 Main Functionalities

### 1. Event Management

- Handle event-related API requests.
- Manage event information and records.
- Support event-related CRUD operations.

### 2. Joined Events

- Manage user event participation.
- Store joined event information.
- Retrieve joined event records.

### 3. Subscription Management

- Handle subscription-related requests.
- Manage subscription information.
- Maintain subscription records.

### 4. Authentication Middleware

- Verify authentication tokens.
- Protect private API routes.
- Prevent unauthorized API access.

## 🔐 Security

- Authentication middleware for protected routes.
- JWT verification for secure API access.
- Environment variables for sensitive configuration.
- User authentication checks before restricted operations.

## 🎯 Project Purpose

The purpose of **weCare** is to build a connected and supportive community where people can organize events, participate in activities, and engage with others. This backend provides the essential API infrastructure to support these features efficiently and securely.

---

**weCare – Connect, Participate, and Make a Difference. ❤️**
