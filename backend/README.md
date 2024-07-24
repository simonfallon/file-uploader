# Backend

## Project setup
```
npm install
```

## DB Setup

Install [PosgreSQL](https://www.postgresql.org/download/). Only required components are:

- PostgreSQL Server
- Command Line Tools


Set up PostgreSQL database excecuting:

```
psql -U your_db_user -d your_db_name -f schema.sql
```

### Create a .env file in the root

Add your environment variables:

```
PORT=3000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASS=your_db_password
DB_PORT=5432
ENVIROMENT=local
```

## Development shortcuts 

### Compiles and hot-reloads for development
```
npm run dev
```