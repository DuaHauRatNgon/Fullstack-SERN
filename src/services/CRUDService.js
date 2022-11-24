import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

//Hien tai chua ro su khac biet giua 2 cach tren
//c1 rut gon
// let createNewUser = async (data) => {
//     await db.User.create({
//         email: data.email,
//         password: data.password,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         address: data.address,
//         phonenumber: data.phonenumber,
//         gender: data.gender === '1' ? true : false,
//         roleId: data.roleId,
//     })
// }

//c2 chi tiet
let createNewUser = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hasshPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hasshPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve("tao moi nguoi dung thanh cong")
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = async (password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hasshPassword = await bcrypt.hashSync(password, salt);
            resolve(hasshPassword);
        }
        catch(e){
            reject(e);
        }
    })
}

let getAllUser = async () => {
    let users = await db.User.findAll();
    return users;
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser
}