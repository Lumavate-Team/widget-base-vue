FROM node:8.9-alpine as build

COPY package.json package-lock.json /tmp/

RUN cd /tmp \
  && npm install \
  && mkdir -p /app \
  && mv node_modules /app/node_modules \
  && mv package.json /app \
  && rm -rf package-lock.json

WORKDIR /app
COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]
