# Use the official Node.js image as base
FROM node:14-alpine as builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image as base
FROM nginx:alpine

# Copy the built React application
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copy SSL/TLS certificates
COPY /etc/letsencrypt/live/todolistact.art/privkey.pem /etc/nginx/conf.d/privkey.pem
COPY /etc/letsencrypt/live/todolistact.art/fullchain.pem /etc/nginx/conf.d/fullchain.pem

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]