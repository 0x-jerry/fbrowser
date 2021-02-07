# 建议开启 BuildKit 构建
# https://docs.docker.com/develop/develop-images/build_enhancements/#to-enable-buildkit-builds

FROM arm32v7/node:alpine3.12

ENV NODE_ENV production

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

VOLUME [ "/app/data" ]

EXPOSE 3000

CMD ["node", "dist/index.js"]
