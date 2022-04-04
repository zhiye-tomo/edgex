FROM node:alpine
WORKDIR /var/frontend
COPY ./frontend .
# RUN npm install
RUN npm install && \
  mv ./node_modules /
CMD ["npm", "run", "dev"]