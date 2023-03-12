import { ClientError } from './../Models/client-errors';
import {NextFunction, Request, Response} from "express";

const catchAll = (err:any, request:Request, response:Response, next:NextFunction)=>{
    if(err instanceof Error){
        console.log(err);
        const statusCode = (err as any).status? (err as any).status:500;
        response.status(statusCode).send(err.message);
        return;
    }

    if(err instanceof ClientError){
        response.status(err.status).send(err.message);
        return;
    }

    next();
};

export default catchAll;