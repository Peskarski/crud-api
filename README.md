# CRUD API

## Install the application

```bash
git clone https://github.com/Peskarski/crud-api.git
git checkout develop

# install dependencies
npm install
```

Copy `.env.example` to `.env` and update the port value if needed.

## Run the application

There 3 ways to run the application:

1. Run the application in development mode:

   ```bash
   npm run start:dev
   ```
2. Run the application in production mode:

   ```bash
   npm run start:prod
   ```

3. Run the application in a multi-node `Cluster` environment:

    ```bash
    npm run start:multi
    ```

## Test the application

```bash
npm run test
```

This command will run the application tests.
