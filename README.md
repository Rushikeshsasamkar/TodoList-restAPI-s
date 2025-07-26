Great! Here's the full `README.md` content you can **copy all at once** 👇

---

````markdown
# 📝 TODO-List REST API

## 📦 Installation

**Requirements:**
- Node.js
- MongoDB

### Setup:
1. **Install dependencies**
   ```bash
   npm install
````

2. **Start the server**

   ```bash
   npm run start
   ```

---

## 🌐 Live Demo

👉 [https://todo-list-e7ej.onrender.com/api/users/register](https://todo-list-e7ej.onrender.com/api/users/register)

---

## 👤 User Authentication

| Route                 | Method | Body                                                  | Description         |
| --------------------- | ------ | ----------------------------------------------------- | ------------------- |
| `/api/users/register` | `POST` | `{ "username": "Rushikesh", "password": "pass@123" }` | Register a new user |
| `/api/users/login`    | `GET`  | `{ "username": "Rushikesh", "password": "pass@123" }` | Login and get token |

---

## 📋 Task List Operations

> **Bearer token required in headers**

| Route            | Method   | Body                                                               | Description              |
| ---------------- | -------- | ------------------------------------------------------------------ | ------------------------ |
| `/api/tasks`     | `POST`   | `{ "title": "health", "description": "Dentist visit" }`            | Add a new task list      |
| `/api/tasks`     | `GET`    | –                                                                  | Get all task lists       |
| `/api/tasks/:id` | `DELETE` | –                                                                  | Delete a task list by ID |
| `/api/tasks/:id` | `PATCH`  | `{ "title": "Purchase new clothes", "description": "shopping" }`   | Edit a task list by ID   |
| `/api/lists`     | `POST`   | `[{"title": "Study", "description": "solve 2 leetcode question"}]` | Add multiple task lists  |

---

## ✅ Individual Task Operations

| Route                       | Method   | Body                     | Description               |
| --------------------------- | -------- | ------------------------ | ------------------------- |
| `/api/tasks/:listId`        | `POST`   | `{ "title": "task 22" }` | Add a new task to a list  |
| `/api/tasks/status/:taskId` | `PATCH`  | `{ "status": true }`     | Update task status        |
| `/api/tasks/task/:taskId`   | `DELETE` | –                        | Delete a task from a list |
| `/api/tasks/:listId`        | `GET`    | –                        | Get all tasks of a list   |

---

## 🔐 Auth Note

To access task list or task routes, **include the bearer token** in the header:

```
Authorization: Bearer <your_jwt_token>
```

```

---

✅ You can now paste this directly into your `README.md` file.

Let me know if you'd like to add Postman collection info, screenshots, or API example responses too.
```
