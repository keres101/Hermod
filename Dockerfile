FROM node:18

COPY ["package.json","pnpm-lock.yaml","/usr/src/"]

WORKDIR /usr/src

RUN npm install -g pnpm
RUN pnpm install

COPY [".","/usr/src/"]

EXPOSE 3000

CMD ["node","app.js"]