import express, {NextFunction, Request, Response} from 'express';
import Urls from '../Utils/urls';
import cartLogic from '../Logic/cartLogic';
import verifyAdmin from '../MiddleWare/verify-admin';
import verifyToken from '../MiddleWare/verify-token';

const router = express.Router();

//Checking if controller are working
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

//Get All Carts
router.get(Urls.getAllCartsURL, verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
  try{
      response.status(200).json(await cartLogic.getAllCarts());
  }catch(err){
      console.log(err);
  }
})

//Checking for user cart -> if haven't make a new one
router.get(Urls.checkForCartURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try{
      const userId = request.params.userId;
      response.status(201).json(await cartLogic.checkForCart(userId))
  }catch(err){
      console.log(err);
  }
})

//Set the cart to ordered
router.post(Urls.setCartOrderedURL, verifyToken,async (request: Request, response: Response, next: NextFunction) => {
  try{
      const cartId = request.params.id;
      response.status(201).json(await cartLogic.setCartOrdered(cartId))
  }catch(err){
      console.log(err);
  }
})



export default router;