# ---- Backend Dockerfile ----
# Step 1: Use official Node.js image as base
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files first (for better layer caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the source code
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 5000

# Step 7: Command to start the app
CMD ["node", "server.js"]
