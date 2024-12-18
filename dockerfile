FROM node:22.2.0

WORKDIR /app

COPY company-review/package.json company-review/package-lock.json ./

RUN npm install

COPY company-review ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]