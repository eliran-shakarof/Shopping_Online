import express, {NextFunction, Request, Response} from 'express';
import Urls from '../Utils/urls';
import orderLogic from '../Logic/orderLogic';
import verifyToken from '../MiddleWare/verify-token';

const router = express.Router();

//Checking if controller are working
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

//Get All User Orders
router.get(Urls.getOrdersByUserIdURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cartId = request.params._id;
        response.status(200).json(await orderLogic.getOrdersByUserId(cartId));
    }catch(err){
        console.log(err);
    }
  })

//Get All Orders Date
router.get(Urls.getAllOrdersDateURL, async (request: Request, response: Response, next: NextFunction) => {
    try{
        response.status(200).json(await orderLogic.getAllOrderDates());
    }catch(err){
        console.log(err);
    }
  })



//Add New Order
router.post(Urls.makeOrderURL, verifyToken,async (request: Request, response: Response, next: NextFunction) => {
    try{
        const order = request.body;
        response.status(201).json(await orderLogic.makeOrder(order));
    }catch(err){
        console.log(err);
    }
  })


export default router;