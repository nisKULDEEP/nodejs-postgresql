// // import { createConnection } from "typeorm";
// // import { Person } from "./entity/Person";
// // import { PersonRepository } from "./repositories/PersonRepository";

// import { AppDataSource } from "./data-source";
// import { Request, Response } from "express";
// import express from "express";
// import bodyParser from "body-parser";
// import { AppRoutes } from "./routes";
// const app = express();

// AppDataSource.initialize()
//   .then(() => {
//     // here you can start to work with your database

//     app.use(bodyParser.json());

//     // register all application routes
//     AppRoutes.forEach((route) => {
//       app[route.method](
//         route.path,
//         (request: Request, response: Response, next: Function) => {
//           route
//             .action(request, response)
//             .then(() => next)
//             .catch((err) => next(err));
//         },
//       );
//     });

//     // run app
//     app.listen(3000);

//     console.log("Express application is up and running on port 3000");
//   })
//   .catch((error) => console.log("TypeORM connection error: ", error));

import { AppDataSource } from './data-source';
import { Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import { AppRoutes } from './routes';

const app = express();

// Define an array of allowed HTTP methods
const allowedMethods = ['get', 'post', 'put', 'delete', 'patch', 'all'];

AppDataSource.initialize()
  .then(() => {
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach((route) => {
      if (allowedMethods.includes(route.method)) {
        // Use a type assertion to ensure route.method is a valid HTTP method
        (app as any)[route.method](route.path, (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        });
      } else {
        console.error(`Invalid HTTP method: ${route.method}`);
      }
    });

    // run app
    app.listen(3000);

    console.log('Express application is up and running on port 3000');
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
