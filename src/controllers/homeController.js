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

let getCRUD = async (req, res) => {
    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("post crud")
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}