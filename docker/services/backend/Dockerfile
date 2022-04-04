FROM node:alpine
RUN apk add mysql mysql-client
WORKDIR /var/backend
COPY ./backend .
# RUN npm install
RUN npm install && \
  mv ./node_modules /
CMD ["npm", "run", "start:dev"]