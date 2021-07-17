FROM node:13
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]