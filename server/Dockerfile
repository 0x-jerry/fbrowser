FROM node:12.18-alpine

ENV NODE_ENV production

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

VOLUME [ "/app/data" ]

EXPOSE 3000

CMD ["node", "dist/index.js"]
