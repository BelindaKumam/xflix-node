const mongoose = require("mongoose");

const config = require("./config/config");
// const logger = require("./utils/logger");
const app = require("./app");

let server;

mongoose
 .connect(config.mongoose.url, config.mongoose.options)
 .then(()=>{
    console.log("Connected to MongoDB");
    server=app.listen(config.port, ()=>{
        console.log(`Listening to port ${config.port}`);
    })
}).catch((err)=>console.log(err));

//connects to mongoose
// mongoose
//  .connect(config.mongoose.url, congif.mongoose.options)
//  .then(() => {
//     logger.info(`Connecting to ${config.mongoose.url}`);
//     server = app.listen(config.port, () => {
//         logger.info(`Server running on port ${config.port}`);
//     });
//     return;
//  })
//  .catch((error) => {
//     logger.error("error connecting to MongoDB: ", error.message);
//  });

//  const exitHandler = () => {
//     if (server) {
//         server.close(() => {
//             logger.info("Server closed");
//             process.exit(1);
//         });
//     } else {
//         process.exit(1);
//     }
//  };

//  const unexpectedErrorHandler = (error) => {
//     logger.error(error);
//     exitHandler();
//  };

//  process.on("uncaughtException", unexpectedErrorHandler);
//  process.on("unhandledRejection", unexpectedErrorHandler);

//  process.on("SIGTERM", () => {
//     logger.info("SIGTERM received");
//     if (server) {
//         server.close();
//     }
//  });