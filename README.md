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

👉 [https://todo-list-e7ej.onrender.com/api/users/register](https://todolist-restapi-s.onrender.com/)

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

