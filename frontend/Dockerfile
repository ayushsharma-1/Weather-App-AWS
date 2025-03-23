# Stage 1: Build the React/Vite app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock file to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy everything else (including src/, vite.config.js, etc.)
COPY . .

# Optional: copy env file if required by build
COPY .env .env

# Build the production-ready files (this will output to /app/dist by default)
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the production build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
