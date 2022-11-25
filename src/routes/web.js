import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud-create", homeController.createCRUD);
    router.post("/crud-create-handle", homeController.createCRUDHandle);
    router.get("/crud-show", homeController.showCRUD);
    router.get("/crud-update", homeController.updateCRUD);
    router.post("/crud-update-handle", homeController.updateCRUDHandle);
    router.get("/delete-crud", homeController.deleteCRUD);
    
    return app.use("/", router);
}

module.exports = initWebRoutes;