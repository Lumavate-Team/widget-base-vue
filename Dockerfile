FROM node:8.9-alpine as build

COPY package.json package-lock.json /tmp/

RUN cd /tmp \
  && npm install \
  && mkdir -p /app \
  && mv node_modules /app/node_modules \
  && mv package.json /app \
  && rm -rf package-lock.json

WORKDIR /app

COPY assets/ ./assets
COPY components/ ./components
COPY config/ ./config
COPY layouts/ ./layouts
COPY middleware/ ./middleware
COPY pages/ ./pages
COPY plugins/ ./plugins
COPY server/ ./server
COPY static/ ./static
COPY config/ ./config
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
