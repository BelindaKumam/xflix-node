const express = require("express");
const cors = require("cors");

const httpStatus = require("http-status");

const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const routers = require("./routers");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

//Swagger Documentation Setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "XFLIX",
            description: "Videos streaming application",
            contact: {
                name: "Crio.do",
                url: "https://www.crio.do/",
                email: "ping@crio.com",
            },
            servers: [{
                url: "http://localhost:8082",
                description: "Develpoment server"
            }]
        }
    },
    apis: ['./src/routers/*.js']
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
const options = { explorer: true };
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec, options));


//Parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options("*", cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//API router
app.use("/v1", routers);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

//convert error to apierror, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
