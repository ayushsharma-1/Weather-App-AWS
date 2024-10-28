# Use the official Node.js image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
