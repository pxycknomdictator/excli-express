import type { Database } from "@/types";

function dockerMongodb(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: mongo:latest
        ports:
            - "27017:27017"
        environment:
            MONGO_INITDB_DATABASE: superhero
            MONGO_INITDB_ROOT_USERNAME: batman
            MONGO_INITDB_ROOT_PASSWORD: justiceForHumans
        networks:
            - db_network
        volumes:
            - db_volumes:/data/db

    admin:
        container_name: admin
        image: mongo-express:latest
        ports:
            - "6969:8081"
        environment:
            ME_CONFIG_MONGODB_ADMINUSERNAME: batman
            ME_CONFIG_MONGODB_ADMINPASSWORD: justiceForHumans
            ME_CONFIG_MONGODB_SERVER: db

            # mongo-express ui credentials
            ME_CONFIG_BASICAUTH_USERNAME: batman
            ME_CONFIG_BASICAUTH_PASSWORD: justiceForGotham
        depends_on:
            - database
        networks:
            - db_network

networks:
    db_network:

volumes:
    db_volumes:
`;
    return dockerComposeConfig.trim();
}

function dockerPostgres(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: postgres:latest
        ports:
            - "5432:5432"
        environment:
            POSTGRES_DB: superhero
            POSTGRES_USER: batman
            POSTGRES_PASSWORD: justiceForHumans
        networks:
            - db_network
        volumes:
            - db_volumes:/var/lib/postgresql

    admin:
        container_name: admin
        image: dpage/pgadmin4:latest
        ports:
            - "6969:80"
        environment:
            PGADMIN_DEFAULT_EMAIL: batman@justice.com
            PGADMIN_DEFAULT_PASSWORD: justiceForGotham
        networks:
            - db_network
        depends_on:
            - database

networks:
    db_network:

volumes:
    db_volumes:
`;
    return dockerComposeConfig.trim();
}

function dockerMysql(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: mysql:latest
        ports:
            - "3306:3306"
        environment:
            MYSQL_DATABASE: superhero
            MYSQL_USER: batman
            MYSQL_PASSWORD: justiceForHumans
            MYSQL_ROOT_PASSWORD: justiceForGotham
        networks:
            - db_network
        volumes:
            - db_volumes:/var/lib/mysql

    admin:
        container_name: admin
        image: phpmyadmin:latest
        ports:
            - "6969:80"
        environment:
            PMA_HOST: database
        networks:
            - db_network
        depends_on:
            - database

networks:
    db_network:

volumes:
    db_volumes:
`;
    return dockerComposeConfig.trim();
}

function dockerMariadb(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: mariadb:latest
        ports:
            - "3306:3306"
        environment:
            MARIADB_DATABASE: superhero
            MARIADB_USER: batman
            MARIADB_PASSWORD: justiceForHumans
            MARIADB_ROOT_PASSWORD: justiceForGotham
        networks:
            - db_network
        volumes:
            - db_volumes:/var/lib/mysql

    admin:
        container_name: admin
        image: phpmyadmin:latest
        ports:
            - "6969:80"
        environment:
            PMA_HOST: database
        networks:
            - db_network
        depends_on:
            - database

networks:
    db_network:

volumes:
    db_volumes:
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
