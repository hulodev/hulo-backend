FROM node:20

# Set the working directory in the Docker container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the /app directory in the Docker container
COPY package*.json ./

# Install any needed non-dev packages specified in package.json
# If you are building your code for production
RUN npm ci --omit=dev

# Bundle app source inside the Docker container
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app when the Docker container launches
CMD [ "npm", "start" ]
