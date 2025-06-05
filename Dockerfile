FROM node:latest

WORKDIR /app
COPY docker-build/ .
COPY src ./src

RUN chmod +x /entrypoint.sh

# Install all dependencies, including devDependencies
RUN npm ci

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "build"]