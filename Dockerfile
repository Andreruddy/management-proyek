# Gunakan Node.js v20 image sebagai base image
FROM node:20

# Setup working directory
WORKDIR /src

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
