FROM node:12
WORKDIR /home/node/app
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD /wait-for-it.sh mysql:3306 -- node .build/main