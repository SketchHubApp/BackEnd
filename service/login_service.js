const userRepository = require('../repository/user_repository');
const bcrypt = require('bcrypt');

// 로그인 인증
exports.userAuth = async(id, pw, next) => {
    try {
        const user = await userRepository.readUser(id);
        console.log(user.password);
        const auth = await bcrypt.compare(``+pw, user.password);
        if(user && auth) return user.userNo;
        else console.log('잘못된 ID, PW');
    } catch(err){
        console.error(err);
        next(err);
    }
}