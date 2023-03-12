import express, {NextFunction, Request, Response} from 'express';
import Urls from '../Utils/urls';
import productLogic from "../Logic/productLogic";
import verifyToken from '../MiddleWare/verify-token';
import verifyAdmin from '../MiddleWare/verify-admin';


const router = express.Router();

//Checking if controller are working
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

//Get All Products
router.get(Urls.getAllProductsURL, async (request: Request, response: Response, next: NextFunction) => {
    try{
        
        response.status(200).json(await productLogic.getAllProducts());
    }catch(err){
        console.log(err);
    }
})

//Get Product By Id
router.get(Urls.getProductByIdURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = request.params.id;
        response.status(200).json(await productLogic.getOneProduct(id));
    }catch(err){
        console.log(err);
    }
})

//Get Product By Category
router.get(Urls.getProductsByCategoryURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const categoryId = request.params.categoryId;
        response.status(200).json(await productLogic.getProductsByCategory(categoryId));
    }catch(err){
        console.log(err);
    }
})


//Add New Product
router.post(Urls.addProductURL, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const product = request.body;
        response.status(201).json(await productLogic.addProduct(product))
    }catch(err){
        console.log(err);
    }
})

  
//Update Information In Product
router.put(Urls.updateProductURL, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const product = request.body;
        response.status(201).json(await productLogic.updateProduct(product));
    }catch(err){
        console.log(err);
    }
})

//Delete Product
router.delete(Urls.deleteProductURL, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = request.params.id;
        response.status(204).json(await productLogic.deleteProduct(id))
    }catch(err){
        console.log(err);
    }
})

export default router;