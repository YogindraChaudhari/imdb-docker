# Step 1: Build the React app
FROM node:20-alpine AS build

# Accept API key as a build argument
ARG VITE_REACT_APP_TMDB_API_KEY
# Make it available to Vite during build
ENV VITE_REACT_APP_TMDB_API_KEY=$VITE_REACT_APP_TMDB_API_KEY

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./

RUN npm install

COPY . .

# Build with the env var injected
RUN npm run build


# Step 2: Serve with Nginx
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
