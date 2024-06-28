# Stage 1: Build the frontend
FROM node:14-alpine as build-frontend
WORKDIR /app
COPY ./apps/crawler-front ./apps/crawler-front
WORKDIR /app/apps/crawler-front
RUN npm ci
RUN npm run build

# Stage 2: Build the backend
FROM node:14-alpine as build-backend
WORKDIR /app
COPY ./apps/crawler-back ./apps/crawler-back
COPY --from=build-frontend /app/apps/crawler-front/dist ./apps/crawler-back/dist
WORKDIR /app/apps/crawler-back
RUN npm ci
RUN npm run build

# Stage 3: Run the application
FROM node:14-alpine
WORKDIR /app
COPY --from=build-backend /app .
EXPOSE 3000
CMD ["node", "apps/crawler-back/dist/main.js"]
