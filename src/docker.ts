export function dockerMongodb(name: string) {
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
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: admin123

networks:
  default:
    driver: bridge

volumes:
  mongo:
`;
    return dockerComposeConfig.trim();
}

export function dockerPostgres(name: string) {
    const dockerComposeConfig = `
services:
  postgres_db:
    image: postgres:latest
    container_name: ${name}
    ports:
      - "5432:5432"
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${name}      
      POSTGRES_USER: root
      POSTGRES_PASSWORD: admin123      

networks:
  default:
    driver: bridge 

volumes:
  postgres_data: 
`;
    return dockerComposeConfig.trim();
}

export function dockerMysql(name: string) {
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
      MYSQL_ROOT_PASSWORD: root123 
      MYSQL_USER: root
      MYSQL_DATABASE: ${name}   
      MYSQL_PASSWORD: admin123       

networks:
  default:
    driver: bridge

volumes:
  mysql_data:
`;
    return dockerComposeConfig.trim();
}
