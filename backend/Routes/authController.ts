
import express, {NextFunction, Request, Response} from 'express';
import Urls from '../Utils/urls';
import authLogic from '../Logic/authLogic';
import verifyToken from '../MiddleWare/verify-token';
import Role from '../Models/role';

const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})

router.post(Urls.registerURL, async (request: Request, response: Response, next: NextFunction) => {
    try{
    const newUser = request.body;
    newUser.role = Role.User;
    const token = await authLogic.register(newUser);
    response.set("authorization","Bearer " + token);
    response.status(201).json(newUser.user_name)
    }catch(err){
        next(err);
    }
})

router.post(Urls.loginURL, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const credUser = request.body;
        const token = await authLogic.login(credUser);
        response.set("authorization","Bearer " + token);
        response.status(200).json(credUser.email);
    }catch(err){
        next(err);
    }
  })
 

  router.get(Urls.relogURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const oldToken = request.header("authorization"); 
        const newToken = await authLogic.relogUser(oldToken);
        response.set("authorization","Bearer " + newToken);
        response.status(200).json("Welcome back");
    }catch(err){
        next(err);
    }
  })

export default router;