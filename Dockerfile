# Use the official Node.js image as base
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app/be

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Expose port
EXPOSE 4000

# Command to run the application
CMD ["node", "index.js"]
