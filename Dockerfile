FROM node:12.18-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV production

VOLUME [ "/app/data" ]

EXPOSE 3000

CMD ["yarn", "start"]
