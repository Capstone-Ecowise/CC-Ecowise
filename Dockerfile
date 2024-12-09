FROM node:18

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY . .

RUN npm install

COPY ./capstone-ecowise-a475c60120e8.json /app/capstone-ecowise-a475c60120e8.json

ENV GOOGLE_APPLICATION_CREDENTIALS="/app/capstone-ecowise-a475c60120e8.json"

RUN npx prisma generate

RUN npx prisma db push

RUN npm run seed

EXPOSE 8080

CMD ["npm", "run", "start"]