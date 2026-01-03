import type { Database } from "@/types";

function dockerMongodb(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: mongo:8.0.17
        ports:
            - "27017:27017"
        environment:
            MONGO_INITDB_DATABASE: app_db
            MONGO_INITDB_ROOT_USERNAME: admin
            MONGO_INITDB_ROOT_PASSWORD: password123
        networks:
            - db_network
        volumes:
            - db_volume:/data/db

    admin:
        container_name: admin
        image: mongo-express:1.0.2
        ports:
            - "6969:8081"
        environment:
            ME_CONFIG_MONGODB_ADMINUSERNAME: admin
            ME_CONFIG_MONGODB_ADMINPASSWORD: password123
            ME_CONFIG_MONGODB_SERVER: db
            ME_CONFIG_BASICAUTH_USERNAME: admin
            ME_CONFIG_BASICAUTH_PASSWORD: adminpassword
        depends_on:
            - database
        networks:
            - db_network

networks:
    db_network:

volumes:
    db_volume:
`;
    return dockerComposeConfig.trim();
}

function dockerPostgres(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: postgres:18
        ports:
            - "5432:5432"
        environment:
            POSTGRES_DB: app_db
            POSTGRES_USER: admin
            POSTGRES_PASSWORD: password123
        networks:
            - db_network
        volumes:
            - db_volume:/var/lib/postgresql

    admin:
        container_name: admin
        image: dpage/pgadmin4:9.11
        ports:
            - "6969:80"
        environment:
            PGADMIN_DEFAULT_EMAIL: admin@example.com
            PGADMIN_DEFAULT_PASSWORD: adminpassword
        networks:
            - db_network
        depends_on:
            - database

networks:
    db_network:

volumes:
    db_volume:
`;
    return dockerComposeConfig.trim();
}

function dockerMysql(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: mysql:8.4.6
        ports:
            - "3306:3306"
        environment:
            MYSQL_DATABASE: app_db
            MYSQL_USER: user
            MYSQL_PASSWORD: password123
            MYSQL_ROOT_PASSWORD: rootpassword
        networks:
            - db_network
        volumes:
            - db_volume:/var/lib/mysql

    admin:
        container_name: admin
        image: phpmyadmin:5.2.3
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
    db_volume:
`;
    return dockerComposeConfig.trim();
}

function dockerMariadb(): string {
    const dockerComposeConfig = `
services:
    database:
        container_name: db
        image: mariadb:11.4.5
        ports:
            - "3306:3306"
        environment:
            MARIADB_DATABASE: app_db
            MARIADB_USER: user
            MARIADB_PASSWORD: password123
            MARIADB_ROOT_PASSWORD: rootpassword
        networks:
            - db_network
        volumes:
            - db_volume:/var/lib/mysql

    admin:
        container_name: admin
        image: phpmyadmin:5.2.3
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
    db_volume:
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
