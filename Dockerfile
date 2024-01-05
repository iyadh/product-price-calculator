# Step 1: Build the application
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Step 2: Serve the application using a Python HTTP server
FROM python:3-alpine
WORKDIR /app
COPY --from=build-stage /app/dist /app
EXPOSE 8001
CMD ["python3", "-m", "http.server", "8001"]
