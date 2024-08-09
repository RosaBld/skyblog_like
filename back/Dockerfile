# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# use nodemon to restart the server every time there is a change
RUN npm install -g nodemon

## add curl mf
RUN apk update && apk add bash && apk add curl

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]