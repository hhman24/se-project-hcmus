const db = require('../connect_DB');


exports.isExistedEmail = async (email) => {
    console.log("check email");
    try {
        const poolPromise = db.promise();

        const [user, fields] = await poolPromise.query("SELECT USERS.USER_EMAIL from USERS WHERE USERS.USER_EMAIL = ? LIMIT 1", [email]);
        console.log("User check by email: " + user);
        return user.length > 0;

    } catch (error) {
        console.log(error);
    }

}


exports.getUserAccountByEmail = async (userEmail) => {
    const poolPromise = db.promise();
    const [user, fields] = await poolPromise.query(
        "SELECT * FROM USERS WHERE USERS.USER_EMAIL = ? LIMIT 1", [userEmail]);

    return user;
}

// exports.getUserAccountByPhone = async (userPhone) => {
//     const poolPromise = db.promise();
//     const [user, fields] = await poolPromise.query(
//         "SELECT * from useraccount WHERE useraccount.userPhone = ? LIMIT 1", [userPhone]);

//     return user;
// }

exports.updatePassword = async (email, password) => {
    console.log("check regis: " + email);
    const poolPromise = db.promise();
    try {
        await poolPromise.query(
            "UPDATE useraccount SET useraccount.userPassword = ? WHERE USERS.USER_EMAIL like ?", [password, email]
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


exports.addNewUser = async (newUser) => {
    console.log("check regis: " + newUser.userEmail)
    const poolPromise = db.promise();
    try {
        await poolPromise.query(
            "INSERT INTO users (USER_EMAIL, USER_NAME, USER_PASSWORD) \
                VALUES (?,?,?)", [newUser.userEmail, newUser.userName, newUser.userPassword]
        );
        await poolPromise.query(
            "INSERT INTO CART (USER_EMAIL) \
                VALUES (?)", [newUser.userEmail]
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

exports.updatePassword = async (email, password) => {
    console.log("check regis: " + email);
    const poolPromise = db.promise();
    try {
        await poolPromise.query(
            "UPDATE USERS SET USERS.USER_PASSWORD = ? WHERE USERS.USER_EMAIL like ?", [password, email]
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}