FROM node


WORKDIR /app

COPY package*.json ./



RUN npm install next

RUN npm install

COPY . .

EXPOSE 3001

CMD npm run dev