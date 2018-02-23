const mongoose = require("mongoose");

const Package = require('../DB_Code/Package');
mongoose.connect(`${process.env.MONGO_URI}`, null);


const getAll = (req, res) => {

    let obj = {};

    const getAppFrameWorks = () => {

        Package.find({ keywords: { $all: [ "application", "framework" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.appFrameWorks = result;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    
    const getMobileFrameWorks = () => {
    
        Package.find({ keywords: { $all: [ "mobile" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.mobileFrameWorks = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getRealTimeFrameWorks = () => {
    
        Package.find({ keywords: { $all: [ "realtime", "framework" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.realTimeFrameWorks = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getTestingFrameWorks = () => {
    
        Package.find({ keywords: { $all: [ "test", "framework" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.testingFrameWorks = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    //UI
    const getUiFrameWorks = () => {
    
        Package.find({ keywords: { $all: [ "ui", "framework" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.uiFrameWorks = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getWindowsModalsPopups = () => {
    
        Package.find({ keywords: { $in: [ "modal", "popup" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.windowsModalsPopups = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getKeyboardWrappers = () => {
    
        Package.find({ keywords: { $all: [ "keyboard" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.keyboardWrappers = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getFormWidgets = () => {
    
        Package.find({ keywords: { $all: [ "widget" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.formWidgets = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    //Multimedia
    const getGameEngines = () => {
    
        Package.find({ keywords: { $all: [ "game", "engine" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.gameEngines = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getPhysicsLib = () => {
    
        Package.find({ keywords: { $all: [ "physics" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.physicsLib = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getAnimationLib = () => {
    
        Package.find({ keywords: { $all: [ "animation" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
            obj.animationLib = result;
        })
        .catch((err) => {
            console.log(err);
        });
    
    }
    
    
    const getPresentationLib = () => {
    
        Package.find({ keywords: { $all: [ "presentation" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
            obj.presentationLib = result;
        })
        .catch((err) => {
            console.log(err);
        });
    
    }
    
    
    //Graphics
    const getCanvasWrappers = () => {
    
        Package.find({ keywords: { $all: [ "canvas" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.canvasWrappers = result;
            })
            .catch((err) => {
                console.log(err);
            });
        
    }
    
    
    const getWebGL = () => {
    
        Package.find({ keywords: { $in: [ "webgl", "webGL", "WebGL" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.WebGL = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getImageManipulation = (req, res) => {
    
        Package.find({ keywords: { $all: [ "image", "manipulation" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.ImageManipulation = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getVisualizationLib = () => {
    
        Package.find({ keywords: { $all: [ "visualization" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.visualizationLib = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    //Data
    const getDataStructures = () => {
    
        Package.find({ keywords: { $all: [ "data", "structures" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.dataStructures = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getDateLib = () => {
    
        Package.find({ keywords: { $all: [ "date" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
            .then((result) => {
                obj.dateLib = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getStorageLib = () => {
    
        Package.find({ keywords: { $all: [ "storage" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.storageLib = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getValidationLib = () => {
    
        Package.find({ keywords: { $all: [ "validation" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.validationLib = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    //Development
    const getPackageManagers = () => {
    
        Package.find({ keywords: { $all: [ "package", "manager" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.packageManagers = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    const getTimingLib = () => {
    
        Package.find({ keywords: { $all: [ "timing" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.timingLib = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getToolkits = () => {
    
        Package.find({ keywords: { $all: [ "toolkit" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec()
        .then((result) => {
                obj.toolkits = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getCodeProtectionLibs = () => { 
    
        Package.find({ keywords: { $all: [ "protection" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() // <--------- doesnt have any libs
        .then((result) => {
                obj.codeProtectionLibs = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    //Utilities
    const getDOM = () => {
    
        Package.find({ keywords: { $in: [ "DOM", "dom", "Dom" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
        .then((result) => {
                obj.DOM = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getACFL = () => {
    
        Package.find({ keywords: { $in: [ "acync", "control", "flow", "event" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
        .then((result) => {
                obj.ACFL = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getFunctionalProgramming = () => {
    
        Package.find({ keywords: { $all: [ "functional", "programming" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
        .then((result) => {
                obj.functionalProgramming = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getMathLibs = () => {
    
        Package.find({ keywords: { $all: [ "math" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
        .then((result) => {
                obj.mathLibs = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    //Applications
    const getHtml5Apps = () => {
    
        Package.find({ keywords: { $in: [ "html5", "HTML5", "Html5" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
            .then((result) => {
                obj.html5Apps = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getSiteGenerators = () => {
    
        Package.find({ keywords: { $all: [ "site", "generator" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
            .then((result) => {
                obj.siteGenerators = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getCodeEditors = () => {

        Package.find({ keywords: { $all: [ "code", "editor" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
            .then((result) => {
                obj.codeEditors = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }
    
    
    const getDesignAndPrototyping = () => {

        Package.find({ keywords: { $in: [ "design", "prototyping" ] } }).select({ name: 1, keywords: 1, freq: 1, homepage: 1, description: 1 }).exec() 
        .then((result) => {
                obj.designAndPrototyping = result;
            })
            .catch((err) => {
                console.log(err);
            });
    
    }

    getAppFrameWorks();
    getMobileFrameWorks(); 
    getRealTimeFrameWorks();
    getTestingFrameWorks();
    getUiFrameWorks();
    getWindowsModalsPopups();
    getKeyboardWrappers();
    getFormWidgets();
    getGameEngines();
    getPhysicsLib();
    getAnimationLib();
    getPresentationLib();
    getCanvasWrappers();
    getWebGL();
    getImageManipulation();
    getVisualizationLib();
    getDataStructures();
    getDateLib();
    getStorageLib();
    getValidationLib();
    getPackageManagers();
    getTimingLib();
    getToolkits();
    getCodeProtectionLibs();
    getDOM();
    getACFL();
    getFunctionalProgramming();
    getMathLibs();
    getHtml5Apps();
    getSiteGenerators();
    getCodeEditors();
    getDesignAndPrototyping();

    const refreshIntervalId = setInterval(() => {
        if (Object.keys(obj).length > 31) { 
            res.json(obj);
            clearInterval(refreshIntervalId);
        } 
    }, 200);

}


module.exports = {
    getAll,
}