FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

ENV BACKEND_URL=http://host.docker.internal:8083/todos
ENV PORT=8081

EXPOSE 8081

CMD ["npm", "start"]