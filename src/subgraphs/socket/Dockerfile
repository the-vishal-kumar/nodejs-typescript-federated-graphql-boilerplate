# Use a Node.js base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /subgraph/socket

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install dependencies
RUN npm i

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Copy cow.txt
COPY /src/config/cow.txt /subgraph/socket/build/config/cow.txt

# Copy graphql.schema
COPY /src/app/node-server/schema.graphql /subgraph/socket/build/app/node-server/schema.graphql

# Start the application
CMD [ "node", "build/index.js"]
