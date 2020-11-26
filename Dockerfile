# pull official base image
FROM node:15.3.0-alpine3.10

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

# start app
CMD ["npm", "start"]
