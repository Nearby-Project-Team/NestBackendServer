FROM node:18-alpine3.15

RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm install --force

EXPOSE 3000
CMD ["npm", "run", "start:dev"]