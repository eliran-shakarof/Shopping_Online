import express, {NextFunction, Request, Response} from 'express';
import Urls from '../Utils/urls';
import cartItemLogic from '../Logic/cartItemLogic';
import verifyToken from '../MiddleWare/verify-token';
import verifyAdmin from '../MiddleWare/verify-admin';

const router = express.Router();

//Checking if controller are working
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

//Get All Cart Items
router.get(Urls.getCartItemsURL, verifyToken,async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cartId = request.params.id;
        response.status(200).json(await cartItemLogic.getCartItems(cartId));
    }catch(err){
        console.log(err);
    }
  })
  
//Add New Cart Item
router.post(Urls.addCartItemURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cartItem = request.body;
        response.status(201).json(await cartItemLogic.addNewCartItem(cartItem))
    }catch(err){
        console.log(err);
    }
  })

//Delete Cart Item
router.delete(Urls.deleteCartItemURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        response.status(204).json(await cartItemLogic.deleteCartItem(_id))
    }catch(err){
        console.log(err);
    }
})

//Delete All Cart Items
router.delete(Urls.deleteAllCartItemsURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cartId = request.params.cartId;
        response.status(204).json(await cartItemLogic.deleteAllCartItems(cartId))
    }catch(err){
        console.log(err);
    }
})



export default router;