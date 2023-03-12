class AppConfig{
    public serverUrl = "http://localhost:3001"

    //Auth
    public registerUrl = `${this.serverUrl}/auth/register`;
    public loginUrl = `${this.serverUrl}/auth/login`;
    public relogUrl = `${this.serverUrl}/auth/relog`;
    //Users
    public getUserUrl = `${this.serverUrl}/users/`;

    //Categories
    public getAllCategoriesUrl = `${this.serverUrl}/categories/all`;
    public addCategoryUrl = `${this.serverUrl}/categories/add`;
    public updateCategoryUrl = `${this.serverUrl}/categories/update`;
    public deleteCategoryUrl = `${this.serverUrl}/categories/delete/:_id`;

    //Products
    public getAllProductsUrl = `${this.serverUrl}/products/all`;
    public getProductByIdUrl = `${this.serverUrl}/products`;
    public getProductByCategoryIdUrl = `${this.serverUrl}/products/by_category`
    public addProductUrl = `${this.serverUrl}/products/add`;
    public deleteProductUrl = `${this.serverUrl}/products/delete`;
    public updateProductUrl = `${this.serverUrl}/products/update`;

    //Carts
    public checkForCartUrl = `${this.serverUrl}/carts/check`;
    public setCartToOrderedUrl = `${this.serverUrl}/carts/update`;

    //Cart-Items
    public getAllCartItemsUrl = `${this.serverUrl}/cartItems`;
    public addItemToCartUrl = `${this.serverUrl}/cartItems/add`;
    public deleteItemFromCartUrl = `${this.serverUrl}/cartItems/delete`;
    public deleteAllCartItemsUrl = `${this.serverUrl}/cartItems/delete_all`;
    //Orders
    public makeOrderUrl = `${this.serverUrl}/orders/makeOrder`;
    public getAllDatesUrl = `${this.serverUrl}/orders/dates/all`;

}

export const appConfig = new AppConfig();
