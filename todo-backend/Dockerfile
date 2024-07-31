FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

ENV PORT=8084

ENV PGHOST=postgres PGDATABASE=project PGUSER=admin PGPASSWORD=mydockerpassword

EXPOSE 8084

CMD ["npm", "start"]