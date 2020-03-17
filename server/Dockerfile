FROM node:lts-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 5000

# You can change this
CMD [ "npm", "run", "dev" ]