// Main file in the SERVER 
import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import ErrorHandler from "./MiddleWare/route-not-found";
import categoryController from "./Routes/categoriesController"
import productController from "./Routes/productController";
import userController from "./Routes/usersController"
import authController from "./Routes/authController";
import cartController from "./Routes/cartController";
import cartItemController from "./Routes/cartItemController";
import orderController from "./Routes/orderController";
import config from "./Utils/config";
import connectDB from "./Utils/dal"
import catchAll from "./MiddleWare/catch-all";
import sanitize from "./MiddleWare/sanitize";

const server = express();
connectDB();
const currentPort = config.port;

server.use(expressRateLimit({ windowMs: 1000, max: 50, message:"What are you try to do?!"}));

var corsOptions = {
    "origin": "*", //expose to all server around the world
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //expose which methods are allowed
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "exposedHeaders" : "Authorization" //expose the Authorization header
  }

server.use(cors(corsOptions));
server.use(express.json());
server.use(sanitize);
server.use("/categories", categoryController);
server.use("/products", productController);
server.use("/users", userController);
server.use("/auth", authController);
server.use("/carts", cartController);
server.use("/cartItems", cartItemController);
server.use("/orders", orderController);
server.use("*", ErrorHandler);
server.use(catchAll);
server.listen(currentPort, () => {console.log(`listening on port ${currentPort}`)} )