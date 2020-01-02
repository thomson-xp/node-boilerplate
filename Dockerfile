FROM node:8-alpine
# LABEL maintainer="anoop.pr@experionglobal.com"
RUN apk add --no-cache git
RUN mkdir -p /usr/src/profile
COPY . /usr/src/profile
WORKDIR /usr/src/profile
RUN yarn
EXPOSE 5001
CMD [ "node", "server.js" ]