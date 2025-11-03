# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock, etc.)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
# This command runs the "build" script from your package.json
# and creates the 'dist' folder with the static files.
RUN npm run build

# The primary purpose of this Dockerfile is to act as a build environment.
# The user will copy the 'dist' folder out of a container created from this image.