FROM node:20-buster-slim

LABEL org.label-schema.name="tether-chand" \
  org.label-schema.description="tether-chand" \
  org.label-schema.vendor="tether-chand" \
  maintainer="Amir Rezaei <im.amirezaei@gmail.com>"

ARG PROXY_ADDR=""

ENV http_proxy=$PROXY_ADDR \
  https_proxy=$PROXY_ADDR \
  LANG=en_US.utf8 \
  LC_ALL=C.UTF-8

RUN apt-get update -y \
  && apt-get -y upgrade && apt-get install -y --no-install-recommends curl build-essential \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* && rm -rf /tmp && mkdir /tmp && chmod 777 /tmp && truncate -s 0 /var/log/*.log

ADD app /app

RUN cd /app/; \
  npm ci --only=production; \
  rm -rf package-lock.json

EXPOSE 9000/tcp

STOPSIGNAL SIGTERM

WORKDIR /app

CMD ["npm", "start"]
