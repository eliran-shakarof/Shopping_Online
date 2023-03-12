import { Request, Response, NextFunction } from "express";
import jwtHelper from "../Utils/jwt-helper";
import { ClientError } from "../Models/client-errors";


const verifyToken = async (request:Request, response:Response, next: NextFunction) => {
    console.log(request.body, request.headers)

    const authorizationHeader = request.header("authorization")
    const isValidToken = await jwtHelper.verifyTokenAsync(authorizationHeader);

    if(!isValidToken){
        next(new ClientError(401, "Invalid or expired token"));
        return;
    }
    next();
}

export default verifyToken;