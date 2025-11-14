# Stage 1: Build
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20 AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

# Copy built files
COPY --from=build /usr/src/app/dist ./dist

# Optional: copy env file (if you want to bake it in)
# COPY .env .env

EXPOSE 8113

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
