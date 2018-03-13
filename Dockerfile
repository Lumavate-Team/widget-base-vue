FROM quay.io/lumavate/widget-base-vue:image

WORKDIR /app

RUN npm run build

CMD [ "npm", "run", "start" ]
