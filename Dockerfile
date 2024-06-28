# Stage 1: Build the project
FROM node:20.11.0-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Run the application
FROM node:20.11.0-alpine
WORKDIR /app
COPY --from=build-stage /app .
EXPOSE 8080
CMD ["npm", "run", "start"]
