FROM node:22-buster-slim
WORKDIR /app
COPY app/package*.json ./
RUN npm install --only=production
COPY app .
CMD ["node", "src/index.js"]
