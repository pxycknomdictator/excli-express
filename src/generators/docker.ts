import type { Database } from "@/types";

function dockerMongodb(): string {
    const dockerComposeConfig = `
services:
    mongodb_database:
        container_name: mongodb
        image: mongo:latest
        ports:
            - "27017:27017"
        environment:
            MONGO_INITDB_DATABASE: superhero
            MONGO_INITDB_ROOT_USERNAME: batman
            MONGO_INITDB_ROOT_PASSWORD: justiceForHumans
        networks:
            - mongo_network
        volumes:
            - mongodb_data:/data/db

    mongo_admin:
        container_name: mongoAdmin
        image: mongo-express:latest
        ports:
            - "6969:8081"
        environment:
            ME_CONFIG_MONGODB_ADMINUSERNAME: batman
            ME_CONFIG_MONGODB_ADMINPASSWORD: justiceForHumans
            ME_CONFIG_MONGODB_SERVER: mongodb_database

            # mongo-express ui credentials
            ME_CONFIG_BASICAUTH_USERNAME: batman
            ME_CONFIG_BASICAUTH_PASSWORD: justiceForGotham
        depends_on:
            - mongodb_database
        networks:
            - mongo_network

networks:
    mongo_network:

volumes:
    mongodb_data:
`;
    return dockerComposeConfig.trim();
}

function dockerPostgres(): string {
    const dockerComposeConfig = `
services:
    postgres_database:
        container_name: postgres
        image: postgres:latest
        ports:
            - "5432:5432"
        environment:
            POSTGRES_DB: superhero
            POSTGRES_USER: batman
            POSTGRES_PASSWORD: justiceForHumans
        networks:
            - pg_network
        volumes:
            - postgres_data:/var/lib/postgresql

    pg_admin:
        container_name: pgAdmin
        image: dpage/pgadmin4:latest
        ports:
            - "6969:80"
        environment:
            PGADMIN_DEFAULT_EMAIL: batman@justice.com
            PGADMIN_DEFAULT_PASSWORD: justiceForGotham
        networks:
            - pg_network
        depends_on:
            - postgres_database

networks:
    pg_network:

volumes:
    postgres_data:
`;
    return dockerComposeConfig.trim();
}

function dockerMysql(): string {
    const dockerComposeConfig = `
services:
    mysql_database:
        container_name: mysql
        image: mysql:latest
        ports:
            - "3306:3306"
        environment:
            MYSQL_DATABASE: superhero
            MYSQL_USER: batman
            MYSQL_PASSWORD: justiceForHumans
            MYSQL_ROOT_PASSWORD: justiceForGotham
        networks:
            - mysql_network
        volumes:
            - mysql_data:/var/lib/mysql

    phpmyadmin:
        container_name: phpmyadmin
        image: phpmyadmin:latest
        ports:
            - "6969:80"
        environment:
            PMA_HOST: mysql_database
        networks:
            - mysql_network
        depends_on:
            - mysql_database

networks:
    mysql_network:

volumes:
    mysql_data:
`;
    return dockerComposeConfig.trim();
}

function dockerMariadb(): string {
    const dockerComposeConfig = `
services:
    mariadb_database:
        container_name: mariadb
        image: mariadb:latest
        ports:
            - "3306:3306"
        environment:
            MARIADB_DATABASE: superhero
            MARIADB_USER: batman
            MARIADB_PASSWORD: justiceForHumans
            MARIADB_ROOT_PASSWORD: justiceForGotham
        networks:
            - mariadb_network
        volumes:
            - mariadb_data:/var/lib/mysql

    phpmyadmin:
        container_name: phpmyadmin
        image: phpmyadmin:latest
        ports:
            - "6969:80"
        environment:
            PMA_HOST: mariadb_database
        networks:
            - mariadb_network
        depends_on:
            - mariadb_database

networks:
    mariadb_network:

volumes:
    mariadb_data:
`;
    return dockerComposeConfig.trim();
}

export function generateDockerCompose(database: Database): string {
    switch (database) {
        case "mongodb":
            return dockerMongodb();
        case "postgres":
            return dockerPostgres();
        case "mysql":
            return dockerMysql();
        case "mariadb":
            return dockerMariadb();
        default:
            return "";
    }
}
