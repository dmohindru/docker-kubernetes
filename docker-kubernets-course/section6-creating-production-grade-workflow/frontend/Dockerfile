# We specify build phase using below syntax. Note builder is just an arbitrary name
FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
# Here we are copying build directory created in builder image to nginx container
COPY --from=builder /app/build  /usr/share/nginx/html
