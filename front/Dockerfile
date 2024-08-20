# Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]