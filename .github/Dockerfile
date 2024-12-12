FROM node:lts-alpine

LABEL version="main"
LABEL description="D-Dev's Homepage built as docker image for production ready"

WORKDIR /homepage

COPY . .

# Reduce image size by remove npm cache
# RUN npm install && npm run build && rm -rf /root/.config /root/.npm
RUN npm install \
    && npm run build \
    && rm -rf /root/.config /root/.npm node_modules \
    && cp -r public .next/standalone/ \
    && cp -r .next/static .next/standalone/.next/ \
    && cp -r .next/standalone app \
    && rm -rf .next

# It is better to setup running as normal user instead of root user

CMD [ "node" , "app/server.js" ]

EXPOSE 3000
