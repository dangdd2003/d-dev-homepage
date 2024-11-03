FROM node:lts-alpine

LABEL version="prod"
LABEL description="D-Dev's Homepage built as docker container for production ready"

WORKDIR /d-dev-homepage

COPY . .

# Reduce image size by remove npm cache
RUN npm install && npm run build && rm -rf /root/.config /root/.npm
# It is better to setup running as normal user instead of root user

CMD = [ "npm", "start" ]

EXPOSE 3000
