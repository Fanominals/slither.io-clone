# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build both server and client
RUN npm run build:server
RUN npm run build:client

# ---- Production Stage ----
FROM node:18-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/common ./common

# Expose the port your server runs on
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000

# Start the production server
CMD ["node", "dist/server/index.js"] 