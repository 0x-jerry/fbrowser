FROM node:12.18-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN yarn server:build

EXPOSE 3000

ENV NODE_ENV production

CMD ["yarn", "start"]
