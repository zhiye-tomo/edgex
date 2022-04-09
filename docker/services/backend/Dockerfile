FROM node:alpine
RUN apk add mysql mysql-client
WORKDIR /var/backend
COPY ./backend .
RUN npm install 
CMD ["npm", "run", "start:dev"]