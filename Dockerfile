FROM node:12

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose publc port and run npm command
EXPOSE 3000
CMD ["npm", "start"]