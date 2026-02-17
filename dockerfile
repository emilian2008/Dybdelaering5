FROM node:lts-alpine-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm", "start"]