# 🐳 Todo App — Docker Learning Project
https://todo-docker-frontend-buhx.onrender.com

A simple fullstack app to learn Docker. Built with **React** + **Node.js**.

---

## 📁 Project Structure

```
todo-docker-app/
├── backend/
│   ├── server.js        ← Express API
│   ├── package.json
│   └── Dockerfile       ← Backend Docker instructions
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/index.html
│   ├── package.json
│   └── Dockerfile       ← Frontend Docker instructions
├── docker-compose.yml   ← Runs BOTH containers together
└── README.md
```

---

## 🚀 How to Run

### Option 1: Docker Compose (Recommended for learning!)

```bash
# Start everything with one command!
docker-compose up

# Or run in background (detached mode)
docker-compose up -d

# Stop everything
docker-compose down
```

Then open: **http://localhost:3000**

---

### Option 2: Run Containers Manually (to understand how Docker works)

```bash
# Step 1: Build backend image
docker build -t todo-backend ./backend

# Step 2: Build frontend image
docker build -t todo-frontend ./frontend

# Step 3: Create a network so they can talk
docker network create todo-network

# Step 4: Run backend container
docker run -d \
  --name todo-backend \
  --network todo-network \
  -p 5000:5000 \
  todo-backend

# Step 5: Run frontend container
docker run -d \
  --name todo-frontend \
  --network todo-network \
  -p 3000:3000 \
  -e CHOKIDAR_USEPOLLING=true \
  todo-frontend
```

---

## 🐳 Key Docker Concepts Used Here

| Concept | Where |
|---|---|
| `FROM` | Base image (node:18-alpine) |
| `WORKDIR` | Sets working directory inside container |
| `COPY` | Copies files into container |
| `RUN` | Runs commands during build (npm install) |
| `EXPOSE` | Documents which port the container uses |
| `CMD` | Command to run when container starts |
| `docker-compose` | Manages multiple containers together |
| `networks` | Allows containers to talk to each other |
| `depends_on` | Start order between services |
| `ports` | Maps host port → container port |

---

## 🔍 Useful Docker Commands

```bash
# See running containers
docker ps

# See all containers (including stopped)
docker ps -a

# See logs from a container
docker logs todo-backend
docker logs todo-frontend

# Enter a running container (like SSH)
docker exec -it todo-backend sh

# See all images
docker images

# Remove everything and start fresh
docker-compose down --volumes --rmi all
```

---

## 🌐 API Endpoints (Backend)

| Method | URL | Description |
|---|---|---|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create a todo |
| PUT | /api/todos/:id | Toggle done |
| DELETE | /api/todos/:id | Delete a todo |

---

Happy learning Docker! 🐳
