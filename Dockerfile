FROM node:lts-alpine AS build

COPY . .

RUN npm i

RUN npm run build-only


FROM node:lts-alpine AS production

COPY --from=build ./dist ./dist

EXPOSE 5000

CMD ["npx", "-y", "serve", "-s","-p","5000", "dist"]

 