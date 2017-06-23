# create a file named Dockerfile
FROM node:8
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./src /app
EXPOSE 3000
CMD ["npm", "start"]
