FROM node:16-alpine as base

WORKDIR /app/

COPY package.json yarn.lock .npmrc ./
RUN yarn install --frozen-lockfile --production


FROM base as builder

ARG NODE_CONFIG_ENV
ENV NODE_CONFIG_ENV=$NODE_CONFIG_ENV

RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN yarn build:prod


FROM base

ENV NODE_ENV=production

COPY . .
COPY --from=builder /app/.next /app/.next

EXPOSE 3000

CMD yarn start
