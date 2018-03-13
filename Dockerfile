FROM quay.io/lumavate/widget-base-vue:image as build

WORKDIR /app

COPY assets/ ./assets
COPY components/ ./components
COPY layouts/ ./layouts
COPY middleware/ ./middleware
COPY pages/ ./pages
COPY plugins/ ./plugins
COPY server/ ./server
COPY static/ ./static
COPY store/ ./store
COPY .eslintrc.js backpack.config.js nuxt.config.js ./

RUN npm run build

FROM node:8.9-alpine

WORKDIR /app

COPY --from=build /app/build/ ./build
COPY --from=build /app/.nuxt/ ./.nuxt
COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/package.json /app/nuxt.config.js ./

CMD [ "npm", "run", "start" ]
