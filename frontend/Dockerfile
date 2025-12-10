FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm ci || yarn install --frozen-lockfile || pnpm i --frozen-lockfile
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
COPY frontend/nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html
EXPOSE 8443
CMD ["nginx", "-g", "daemon off;"]
