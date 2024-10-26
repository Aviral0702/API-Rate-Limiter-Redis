#Use node.js 18 as the base image
FROM node:18

#set working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy all files
COPY . .

#expose port 5000
EXPOSE 5000

#command to start the app
CMD ["node", "server.js"]