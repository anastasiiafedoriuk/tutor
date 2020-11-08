# TUTOR API

### Installation
1. Create directory `data` with `local.sq3` file inside root
2. Create `ormconfig.json`
    ```
   {
     "type": "sqlite",
     "database": "data/local.sq3",
     "autoSchemaSync": true,
     "synchronize": true,
     "logging": true,
     "entities": [
       "build/entity/*.js"
     ]
   }
   ```
3. run `npm install` or `yarn`
4. run `npm run build-and-run`
