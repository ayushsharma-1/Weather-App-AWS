# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file into the container
COPY .env ./

# Expose the port the app runs on (adjust if your app runs on a different port)
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
