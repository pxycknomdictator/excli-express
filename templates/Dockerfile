FROM node:24 AS builder

WORKDIR /build

COPY package*.json yarn.lock* pnpm-lock.yaml* bun.lockb* tsconfig.json* ./

RUN if [ -f "bun.lockb" ]; then \
        npm install -g bun && bun install; \
    elif [ -f "pnpm-lock.yaml" ]; then \
        npm install -g pnpm && pnpm install; \
    elif [ -f "yarn.lock" ]; then \
        npm install -g yarn && yarn install; \
    else \
        npm install; \
    fi

COPY . /build

RUN if [ -f "tsconfig.json" ]; then \
        echo "TypeScript project detected, building..." && \
        if [ -f "bun.lockb" ]; then bun run build; \
        elif [ -f "pnpm-lock.yaml" ]; then pnpm run build; \
        elif [ -f "yarn.lock" ]; then yarn run build; \
        else npm run build; fi; \
    else \
        echo "JavaScript project detected, skipping build step" && \
        mkdir -p dist && cp -r src/* dist/ 2>/dev/null || true; \
    fi

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /build/package.json /app/package.json
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/dist /app/dist

EXPOSE 3000

CMD [ "npm", "run", "docker:run" ]
