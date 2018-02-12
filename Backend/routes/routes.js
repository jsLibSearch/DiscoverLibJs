const getPackagesController = require('../controllers/getData');
const accessController = require('../controllers/userAuth');
const repoController = require('../controllers/createRepo');
const dbController = require('../controllers/dbcontroller');

module.exports = (app) => {
    
    // GitHub packages routes
    app
        .route('/github-packages/:page/:month')
        .get(getPackagesController.getPackages);
    
    app
        .route('/limit')
        .get(getPackagesController.checkLimitRate);

    
    // User auth routes   
    app
        .route('/login')
        .get(accessController.sendAuthURL);

    app
        .route('/code')
        .post(accessController.getAccessToken);
    
    app
        .route('/check-auth')
        .post(accessController.checkUserAuth);


    // Creates Repo
    app
        .route('/create-repo')
        .post(repoController.createRepo);


    // DB controllers/routes

    
    app 
    .route('/save-user')
    .post(dbController.postUser);

    app 
        .route('/search-package/:term')
        .get(dbController.searchPackage);

    app 
        .route('/all-packages')
        .get(dbController.getAllPackages);

    app 
        .route('/all-projects')
        .get(dbController.getAllPackages);

    app 
        .route('/rec')
        .post(dbController.requestRecommendations);

    app 
        .route('/user-carts/:github_id')
        .get(dbController.getUserCarts);

    app
        .route('/cart/:cartid')
        .get(dbController.getCartByID);


    app 
        .route('/edit-cart')
        .put(dbController.editCart);

    
    app 
        .route('/delete-cart')
        .delete(dbController.deleteCart);


    app 
        .route('/save-cart')
        .post(dbController.saveCart);
    
}
