# Use a node image as a base
FROM node:18.19.0

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./

RUN npm install -g npm@latest

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
