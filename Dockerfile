FROM nginx:latest

WORKDIR /

EXPOSE 80
EXPOSE 443

COPY nginx/wishr.conf /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]