const getPackagesController = require('../controllers/getData');
const accessController = require('../controllers/userAuth');
const repoController = require('../controllers/createRepo');
const dbController = require('../controllers/dbcontroller');
const listController = require('../controllers/listcontroller');
const directoriesController = require('../controllers/directoriesController');
const getAll = require('../controllers/getAll');



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
    .route('/search-recs')
    .post(dbController.searchWithRecs);

    app 
    .route('/get-similar-projects')
    .post(dbController.requestSimilarProjects);

    
    app 
    .route('/key-recs')
    .post(dbController.requestKeyRecommendations);

    
    app 
    .route('/save-user')
    .post(dbController.postUser);

    app 
        .route('/search-package/:term/:term2')
        .get(dbController.searchPackage);


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


    
    // readme, recommendations
    app 
        .route('/get-readme')
        .post(listController.getReadme);

    app
        .route('/get-recommends')
        .post(listController.getRecommendations);




/*****************************************************
 *  CATALOG/DIRECTORIES
 ****************************************************/

    // Essentials
    app 
        .route('/get-app-frameworks')
        .get(directoriesController.getAppFrameWorks);

    app
        .route('/get-mobile-frameworks')
        .get(directoriesController.getMobileFrameWorks);

    app
        .route('/get-realtime-frameworks')
        .get(directoriesController.getRealTimeFrameWorks);

    app 
        .route('/get-testing-frameworks')
        .get(directoriesController.getTestingFrameWorks);

    
    //UI
    app
        .route('/get-ui-frameworks')
        .get(directoriesController.getUiFrameWorks);
    
    app
        .route('/get-win-modal-popups')
        .get(directoriesController.getWindowsModalsPopups);

    app
        .route('/get-keyboard-wrappers')
        .get(directoriesController.getKeyboardWrappers);

    app
        .route('/get-form-widgets')
        .get(directoriesController.getFormWidgets);


    //Multimedia
    app
        .route('/get-game-engines')
        .get(directoriesController.getGameEngines);

    app
        .route('/get-physics-libraries')
        .get(directoriesController.getPhysicsLibraries);

    app
        .route('/get-animation-libraries')
        .get(directoriesController.getAnimationLibraries);

    app
        .route('/get-presentation-libraries')
        .get(directoriesController.getPresentationLibraries);


    //Graphics
    app
        .route('/get-canvas-wrappers')
        .get(directoriesController.getCanvasWrappers);

    app
        .route('/get-webgl')
        .get(directoriesController.getWebGL);

    app
        .route('/get-image-manipulation')
        .get(directoriesController.getImageManipulation);
    
    app
        .route('/get-visualization-libraris')
        .get(directoriesController.getVisualizationLibraries);


    //Data
    app
        .route('/get-data-structures')
        .get(directoriesController.getDataStructures);

    app
        .route('/get-date-libraries')
        .get(directoriesController.getDateLibraries);

    app
        .route('/get-storage-libraries')
        .get(directoriesController.getStorageLibraries);

    app
        .route('/get-validation-libraries')
        .get(directoriesController.getValidationLibraries);


    //Development
    app
        .route('/get-package-managers')
        .get(directoriesController.getPackageManagers);

    app
        .route('/get-timing-libraries')
        .get(directoriesController.getTimingLibraries);

    app
        .route('/get-toolkits')
        .get(directoriesController.getToolkits);

    // app
    //     .route('/get-code-protection')
    //     .get(directoriesController.getCodeProtectionLibs);

    //Utilities
    app
        .route('/get-dom')
        .get(directoriesController.getDOM);

    app 
        .route('/get-acfe') // <-------- acync-control-flow-event
        .get(directoriesController.getACFL);

    app
        .route('/get-functional-programming')
        .get(directoriesController.getFunctionalProgramming);

    app
        .route('/get-math-libraries')
        .get(directoriesController.getMathLibs);


    //Applications
    app
        .route('/get-html5-apps')
        .get(directoriesController.getHtml5Apps);

    app
        .route('/get-site-generators')
        .get(directoriesController.getSiteGenerators);

    app
        .route('/get-code-editors')
        .get(directoriesController.getCodeEditors);

    app
        .route('/get-design-and-prototyping')
        .get(directoriesController.getDesignAndPrototyping);

    //Get all catalog    
    app 
        .route('/get-all-catalog')
        .get(getAll.getAll)
    
}
