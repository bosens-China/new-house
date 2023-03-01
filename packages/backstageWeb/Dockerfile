# 以Nginx为基础镜像
FROM nginx:1.23.3

# 复制构建后的文件
COPY ./dist /usr/share/nginx/html

# RUN RUN rm /etc/nginx/conf.d/default.conf
# 复制Nginx配置文件
COPY ./templates /etc/nginx/templates

# 暴露端口
EXPOSE 80

# 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]
