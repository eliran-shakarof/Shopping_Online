import express, {NextFunction, Request, Response} from 'express';
import Urls from '../Utils/urls';
import categoriesLogic from '../Logic/categoriesLogic';
import verifyToken from '../MiddleWare/verify-token';
import verifyAdmin from '../MiddleWare/verify-admin';

const router = express.Router();

//Checking if controller are working
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
  })

//Get All Categories
router.get(Urls.getAllCategoriesURL, [verifyAdmin,verifyToken], async (request: Request, response: Response, next: NextFunction) => {
    try{
        response.status(200).json(await categoriesLogic.getAllCategories());
    }catch(err){
        console.log(err);
    }
})

//Add New Category
router.post(Urls.addCategoryURL, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const category = request.body;
        response.status(201).json(await categoriesLogic.addCategory(category))
    }catch(err){
        console.log(err);
    }
})

//Update Information In Category
router.put(Urls.updateCategoryURL, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const category = request.body;
        response.status(201).json(await categoriesLogic.updateCategory(category));
    }catch(err){
        console.log(err);
    }
})

//Delete Category
router.delete(Urls.deleteCategoryURL, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = request.params.id;
        response.status(204).json(await categoriesLogic.deleteCategory(id))
    }catch(err){
        console.log(err);
    }
})

export default router;