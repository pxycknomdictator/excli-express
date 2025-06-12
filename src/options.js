export const directories = [
  "db",
  "controllers",
  "routes",
  "middlewares",
  "services",
  "types",
  "utils",
  "models",
];

export function dockerMongodb(name) {
  const dockerComposeConfig = `
services:
  mongodb:
    image: mongo:latest
    container_name: ${name}
    ports:
      - "27017:27017"
    restart: always
    volumes:
      - mongo:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root

networks:
  default:
    driver: bridge

volumes:
  mongo:
`;
  return dockerComposeConfig.trim();
}
