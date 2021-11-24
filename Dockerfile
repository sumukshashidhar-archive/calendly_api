FROM node:16.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src/ .

EXPOSE 1234

CMD ["node", "server"]
