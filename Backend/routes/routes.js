const getPackagesController = require('../controllers/getData');
const getAccessController = require('../controllers/userAuth');

module.exports = (app) => {
    // GitHub packages routes
    app
        .route('/github-packages/:page')
        .get(getPackagesController.getPackages);
    
    app
        .route('/limit')
        .get(getPackagesController.checkLimitRate);

    
    // User auth routes   
    app
        .route('/login')
        .get(getAccessController.sendAuthURL);

    app
        .route('/code')
        .post(getAccessController.getAccessToken);
    
}
