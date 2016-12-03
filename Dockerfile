FROM node:6

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/node-software-test/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/node-software-test
RUN npm install --production

USER root
COPY . $HOME/node-software-test
RUN chown -R app:app $HOME/*
USER app

EXPOSE 8000

CMD ["node", "api.js"]
