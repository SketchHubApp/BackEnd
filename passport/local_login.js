const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userRepository = require('../repository/user_repository');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({ // 전략을 등록
      usernameField: "id", //html 필드명 , req.body.id
      passwordField: 'pw' // req.body.password
    }, async (id, password, done) => {     
      try {
        const user = await userRepository.readUser(id);
        //console.log(user);
        if (user.dataValues) {
          if (await bcrypt.compare(password,user.dataValues.password)) {
            done(null, user); // 성공 시 user를 념겨 줌
          }
          else
            done(null, false,'비밀번호가 일치하지 않습니다.' );
        } else
          done(null, false, '가입되지 않은 회원입니다.');
      } catch (err) {
        console.log(err)
        done(null,false,'가입되지 않은 회원입니다.');
      }
    }));
  };
  