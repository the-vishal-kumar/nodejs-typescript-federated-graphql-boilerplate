# Use a Node.js base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /gateway

# # Copy package.json and package-lock.json to the container
COPY package*.json .

# Install dependencies
RUN npm i

# Copy the rest of the application code to the container
COPY . .

# # Build the TypeScript code
# RUN npm run build

# Expose port
EXPOSE 4000

# Start the application
CMD [ "npm", "start"]
