import db from "../models/index";
import bcrypt from "bcryptjs";
// import { Promise } from "sequelize";

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

// let hashUserPassword = async (password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const salt = await bcrypt.genSaltSync(10);

//             let hasshPassword = await bcrypt.hashSync(password, salt);
//             resolve(hasshPassword);
//         }
//         catch (e) {
//             reject(e);
//         }
//     })
// }

let hashUserPassword = async (password) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        let hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    }
    catch (e) {
        console.log(e);
    }
}

let getAllUser = async () => {
    let users = await db.User.findAll();
    return users;
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            resolve(user);
        }
        catch(e){
            reject(e);
        }
    })
}

// let getUserInfoById = async (userId) => {
//         try{
//             let user = await db.User.findOne({
//                 where: {id: userId},
//                 raw: true
//             })
//             return user
//         }
//         catch(e){
//         }
// }

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve();
            }
            else {
                resolve();
            }
        } 
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}