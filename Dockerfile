FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY dist ./dist

RUN npm build

CMD ["npm", "start"]