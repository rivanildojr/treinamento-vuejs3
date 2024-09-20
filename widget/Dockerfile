FROM node:22.4.1-alpine as build

WORKDIR /

COPY . .

ENV VITE_NODE_ENV=production
RUN npm install --production
RUN npm run build

FROM nginx:1.18.0-alpine as final

WORKDIR /
COPY --from=build ./dist /usr/share/nginx/html