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

export const configurationFiles = [
  ".prettierrc",
  ".prettierignore",
  ".gitignore",
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

export function dockerPostgres(name) {
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
      - POSTGRES_DB=${name}      
      - POSTGRES_USER=noman         
      - POSTGRES_PASSWORD=root      

networks:
  default:
    driver: bridge 

volumes:
  postgres_data: 
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

export function prettierConfigs() {
  const prettierrcContent = `
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
`;

  const prettierignoreContent = `
build/
dist/
out/
output/

node_modules/

.env
.env.*.local
.env.development
.env.test
.env.production
.env.local
.env.example

.vscode/
.idea/

*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;

  return [
    {
      filename: ".prettierrc",
      content: prettierrcContent.trim(),
    },
    {
      filename: ".prettierignore",
      content: prettierignoreContent.trim(),
    },
  ];
}

export function git_configs() {
  const gitignoreContent = `node_modules
.vscode
dist
output
.env
.DS_Store
Thumbs.db
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;
  return {
    gitignoreContent,
  };
}
