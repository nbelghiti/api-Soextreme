FROM node:latest

# Create app directory

RUN mkdir /usr/src/app
COPY build/docker/api /usr/src/app

RUN npm set progress=false 
RUN npm config set depth 0 
RUN npm cache clean --force
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

WORKDIR /usr/src/app
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source

EXPOSE 4040
CMD [ "npm", "start" ]