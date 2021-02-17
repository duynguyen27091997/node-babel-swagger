import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import notificationRouter from "./routes/notifications";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 4001;

dotenv.config();

const app = express();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library Notification API",
            version: "1.0.0",
            description: "Notification services API",
            contact: {
                name: "API Support ( Duy Nguyen)",
                url: "https://github.com/duynguyen27091997",
                email: "wasahara11111@gmail.com",
            },
        },

        servers: [
            {
                url: "http://localhost:4001",
                description: "Notification services API",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//config app
// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(process.cwd(),'logs', 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms',{ stream: accessLogStream }));
app.use(cors());

app.use("/notifications", notificationRouter);


app.listen(PORT, ()=>{
    console.log("Server runs on port "+ PORT);
})
