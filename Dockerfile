# Step 1: Build the application
FROM node:latest as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Step 2: Serve the application using a static server
FROM node:latest as serve-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app
RUN yarn global add serve
EXPOSE 8001
CMD ["serve", "-s", ".", "-l", "8001"]
