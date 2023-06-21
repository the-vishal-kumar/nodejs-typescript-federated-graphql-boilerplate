# Use a MongoDB base image
FROM mongo:6

# Set working directory
WORKDIR /data/db

# Declare an argument MONGO_URI
ARG MONGO_URI

# Set the environment variable MONGO_URI to the value provided for the MONGO_URI build argument
ENV MONGO_URI ${MONGO_URI}

# COPY sockets.seed.data /sockets.seed.data
COPY sockets.seed.data /sockets.seed.data

# Expose port
EXPOSE 27017

# Seed sockets collection
CMD mongoimport --uri ${MONGO_URI} --collection sockets --drop --file /sockets.seed.data
