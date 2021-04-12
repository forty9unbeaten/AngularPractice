FROM node:14-alpine

EXPOSE 4200

WORKDIR /app/src

COPY package.json package-lock.json* ./

RUN npm install @angular/cli

RUN npm install && npm cache clean --force 

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]
