const mongoose = require("mongoose");

const Package = require('../DB_Code/Package');
mongoose.connect(`${process.env.MONGO_URI}`, null);

// Essentials
const getAppFrameWorks = (req, res) => {

    Package.find({ keywords: { $all: [ "application", "framework" ] } }).select({ name: true }).exec()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}


const getMobileFrameWorks = (req, res) => {

    Package.find({ keywords: { $all: [ "mobile" ] } }).select({ name: true }).exec()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });

}


const getRealTimeFrameWorks = (req, res) => {

    Package.find({ keywords: { $all: [ "realtime", "framework" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getTestingFrameWorks = (req, res) => {

    Package.find({ keywords: { $all: [ "test", "framework" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


//UI
const getUiFrameWorks = (req, res) => {

    Package.find({ keywords: { $all: [ "ui", "framework" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getWindowsModalsPopups = (req, res) => {

    Package.find({ keywords: { $in: [ "modal", "popup" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getKeyboardWrappers = (req, res) => {

    Package.find({ keywords: { $all: [ "keyboard" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getFormWidgets = (req, res) => {

    Package.find({ keywords: { $all: [ "widget" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


//Multimedia
const getGameEngines = (req, res) => {

    Package.find({ keywords: { $all: [ "game", "engine" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getPhysicsLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "physics" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getAnimationLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "animation" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getPresentationLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "presentation" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


//Graphics
const getCanvasWrappers = (req, res) => {

    Package.find({ keywords: { $all: [ "canvas" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getWebGL = (req, res) => {

    Package.find({ keywords: { $in: [ "webgl", "webGL", "WebGL" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getImageManipulation = (req, res) => {

    Package.find({ keywords: { $all: [ "image", "manipulation" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getVisualizationLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "visualization" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


//Data
const getDataStructures = (req, res) => {

    Package.find({ keywords: { $all: [ "data", "structures" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getDateLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "date" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getStorageLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "storage" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getValidationLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "validation" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


//Development
const getPackageManagers = (req, res) => {

    Package.find({ keywords: { $all: [ "package", "manager" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}

const getTimingLibraries = (req, res) => {

    Package.find({ keywords: { $all: [ "timing" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getToolkits = (req, res) => {

    Package.find({ keywords: { $all: [ "toolkit" ] } }).select({ name: true }).exec()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getCodeProtectionLibs = (req, res) => { 

    Package.find({ keywords: { $all: [ "protection" ] } }).select({ name: true }).exec() // <--------- doesnt have any libs
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


//Utilities
const getDOM = (req, res) => {

    Package.find({ keywords: { $in: [ "DOM", "dom", "Dom" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getACFL = (req, res) => {

    Package.find({ keywords: { $in: [ "acync", "control", "flow", "event" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getFunctionalProgramming = (req, res) => {

    Package.find({ keywords: { $all: [ "functional", "programming" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getMathLibs = (req, res) => {

    Package.find({ keywords: { $all: [ "math" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


//Applications
const getHtml5Apps = (req, res) => {

    Package.find({ keywords: { $in: [ "html5", "HTML5", "Html5" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getSiteGenerators = (req, res) => {

    Package.find({ keywords: { $all: [ "site", "generator" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getCodeEditors = (req, res) => {

    Package.find({ keywords: { $all: [ "code", "editor" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


const getDesignAndPrototyping = (req, res) => {

    Package.find({ keywords: { $in: [ "design", "prototyping" ] } }).select({ name: true }).exec() 
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });

}


module.exports = {

    getAppFrameWorks,
    getMobileFrameWorks,
    getRealTimeFrameWorks,
    getTestingFrameWorks,
    getUiFrameWorks,
    getWindowsModalsPopups,
    getKeyboardWrappers,
    getFormWidgets,
    getGameEngines,
    getPhysicsLibraries,
    getAnimationLibraries,
    getPresentationLibraries,
    getCanvasWrappers,
    getWebGL,
    getImageManipulation,
    getVisualizationLibraries,
    getDataStructures,
    getDateLibraries,
    getStorageLibraries,
    getValidationLibraries,
    getPackageManagers,
    getTimingLibraries,
    getToolkits,
    getCodeProtectionLibs,
    getDOM,
    getACFL,
    getFunctionalProgramming,
    getMathLibs,
    getHtml5Apps,
    getSiteGenerators,
    getCodeEditors,
    getDesignAndPrototyping,

}