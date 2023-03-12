import express, {NextFunction, Request, Response} from 'express';
import Urls from '../Utils/urls';
import userLogic from '../Logic/userLogic';
import verifyAdmin from '../MiddleWare/verify-admin';
import verifyToken from '../MiddleWare/verify-token';

// generic router 
const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

//Get all users
router.get("/all", verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
    try{
        response.status(200).json(await userLogic.getAll());
    }catch(err){
        console.log(err);
    }
})

//Get user by _id
router.get(Urls.getUserURL, verifyToken,async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = request.params.id;
        response.status(200).json(await userLogic.getUserById(id));
    }catch(err){
        console.log(err);
    }
})

//Add new user
router.post(Urls.addUserURL, verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
    try{
        const user = request.body;
        console.log(request.body);
        response.status(201).json(await userLogic.addUser(user))
    }catch(err){
        console.log(err);
    }
})

//Update user
router.put(Urls.updateUserURL, verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
    try{
        const user = request.body;
        response.status(201).json(await userLogic.updateUser(user));
    }catch(err){
        console.log(err);
    }
})

//Delete User
router.delete(Urls.deleteUserURL, verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = request.params.id;
        response.status(204).json(await userLogic.deleteUser(id))
    }catch(err){
        console.log(err);
    }
})


export default router;