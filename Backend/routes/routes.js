const getPackagesController = require('../controllers/getData');
const accessController = require('../controllers/userAuth');

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
    
}
