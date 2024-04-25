FROM  node:16 as build 

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build 


FROM nginx


COPY default.conf /etc/nginx/


COPY --from=build  app/dist/counter-ngrx-16  /usr/share/nginx/html


EXPOSE 80
