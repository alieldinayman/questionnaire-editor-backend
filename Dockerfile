# Stage 1 - Building
FROM node:alpine AS builder
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json pnpm-lock.yaml ./
RUN npm i
COPY . .
RUN npm run build

# Stage 2 - Production
FROM node:alpine as production
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm i --only=production
COPY . .
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3001

ARG MONGODB_CONNECTION_STRING
ENV MONGODB_CONNECTION_STRING=${MONGODB_CONNECTION_STRING}
ARG REQUEST_SIZE_LIMIT
ENV REQUEST_SIZE_LIMIT=${REQUEST_SIZE_LIMIT}

CMD ["node", "dist/main"]
