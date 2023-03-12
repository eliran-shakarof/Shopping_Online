// URL'S definitions.
class Urls {
    //Categories
        public static getAllCategoriesURL = "/all";
        public static addCategoryURL = "/add";
        public static updateCategoryURL = "/update";
        public static deleteCategoryURL = "/delete/:id";
    //Products
        public static getAllProductsURL = "/all";
        public static getProductByIdURL = "/:id";
        public static getProductsByCategoryURL = "/by_category/:categoryId";
        public static addProductURL = "/add";
        public static updateProductURL = "/update";
        public static deleteProductURL = "/delete/:id";
    //Users
        public static getUserURL = "/:id";
        public static addUserURL = "/add";
        public static updateUserURL = "/update";
        public static deleteUserURL = "/delete/:id";
    //Cart
        public static getAllCartsURL = "/all";
        public static getOpenCartForUserURL = "/:id";
        public static checkForCartURL = "/check/:userId";
        public static setCartOrderedURL = "/update/:id";
    //Cart Items
        public static getCartItemsURL = "/:id";
        public static addCartItemURL = "/add";
        public static deleteCartItemURL = "/delete/:_id";
        public static deleteAllCartItemsURL = "/delete_all/:cartId";
    //Order
        public static getOrdersByUserIdURL = "/:_id";
        public static getAllOrdersDateURL = "/dates/all";
        public static makeOrderURL = "/makeOrder";
    //Auth
        public static registerURL = "/register";
        public static loginURL = "/login";
        public static relogURL = "/relog";

}

export default Urls;