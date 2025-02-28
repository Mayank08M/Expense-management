# Use official Node.js image
FROM node:20 as dev

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project (excluding files in .dockerignore)
COPY . . 

# Expose the port for Vite (default: 5173)
EXPOSE 5173

# Ensure Vite listens on all network interfaces
ENV VITE_BASE_URL="http://localhost:8000/"
ENV HOST=0.0.0.0

# Start the React development server
CMD ["npm", "run", "dev", "--", "--host"]
