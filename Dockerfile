# Jancadoes — static site + enhance API + SQLite, in one container.
# Debian "slim" (glibc) so better-sqlite3 installs a prebuilt binary
# without needing a compiler in the image.
FROM node:20-slim

WORKDIR /app

# Install deps first for better layer caching.
COPY package.json ./
RUN npm install --omit=dev

# App source (see .dockerignore for what stays out).
COPY . .

EXPOSE 8000

# Healthcheck via Node — slim images ship no wget/curl.
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD node -e "require('http').get('http://localhost:8000/api/health',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "server/server.js"]
