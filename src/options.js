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

export function dockerMysql(name) {
  const dockerComposeConfig = `
services:
  mysql:
    image: mysql:latest
    container_name: ${name}
    ports:
      - "3306:3306"
    restart: always
    volumes:
      - mysql_data:/data/db
    environment:
      - MYSQL_ROOT_PASSWORD=root 
      - MYSQL_USER=noman          
      - MYSQL_DATABASE=${name}   
      - MYSQL_PASSWORD=root123       

networks:
  default:
    driver: bridge

volumes:
  mysql_data:
`;
  return dockerComposeConfig.trim();
}
