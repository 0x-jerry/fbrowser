FROM node:12.18-alpine

WORKDIR /app

ENV NODE_ENV production

COPY . .

VOLUME [ "/app/data" ]

EXPOSE 3000

CMD ["yarn", "start"]
