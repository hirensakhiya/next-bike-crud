# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm.lock) to install dependencies
COPY package*.json ./
COPY pnpm*.json ./

# Install dependencies
RUN npm install -g pnpm

RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the Next.js app
# RUN pnpm build

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "dev"]
