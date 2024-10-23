FROM node:22.9.0

WORKDIR  /app

COPY ./package*.json ./

RUN npm install

COPY ./src ./src

COPY tsconfig.json ./

CMD [ "npm", "start" ]