FROM node:alpine as builder

WORKDIR /usr/app

RUN yarn
COPY . .
RUN yarn build

FROM nginx
COPY --from=builder /app/builder /usr/share/nginx/html