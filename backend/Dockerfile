FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only package files first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 3000

# Run NestJS in development mode (auto-reload)
CMD ["npm", "run", "start:dev"]
