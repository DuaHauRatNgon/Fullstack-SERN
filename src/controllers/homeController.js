import db from "../models/index";
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    // return res.render("homepage.ejs");
    try {
        let data = await db.User.findAll();
        console.log("-------------------------------------------------------");
        console.log(data);
        console.log("-------------------------------------------------------");

        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let createCRUD = async (req, res) => {
    return res.render("crudCreate.ejs");
}

let createCRUDHandle = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("Tao moi nguoi dung thanh cong !")
}

let showCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render("showCRUD.ejs", { dataTable: data })
}

let updateCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log(userData) ;
        return res.render("crudUpdate.ejs", {user: userData});
    }
    else {
        return res.send("Khong tim thay nguoi dung !");
    }
}

let updateCRUDHandle = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.send("Cap nhat thanh cong !")
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send("delete success");
    }
    else {
        return res.send("Not found user id")
    }

}

module.exports = {
    getHomePage: getHomePage,
    createCRUD: createCRUD,
    createCRUDHandle: createCRUDHandle,
    showCRUD: showCRUD,
    updateCRUD: updateCRUD,
    updateCRUDHandle: updateCRUDHandle,
    deleteCRUD: deleteCRUD
}