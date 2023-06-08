const userService = require('../service/user_service');
const jsonUtile = require('../utile/jsonUtilty');
// 회원가입
exports.signUp = async(req, res, next) => {
    try{
        const { id, pw, name, email, birthday, sex, nation } = req.body;
        let confirmId = await userService.readUserId(id, next);
        if(!confirmId){
            await userService.createUser(id, pw, next)
            //  name, email, bitrh, sex, nation
                .then(async () => await userService.createAuthentication(name, email, birthday, sex, nation,next))
                .then(()=> {
                    jsonUtile.setHeader(200);
                    jsonUtile.setResult({
                        message:"Create User",
                    });
                    res.json(jsonUtile.getJosn());
                });
        }
        else{
            jsonUtile.setHeader(400);
            jsonUtile.setResult({
                message:"중복된 ID가 존재",
            });
            res.json(jsonUtile.getJosn());
        }
    } catch(err){
        console.error(err);
        next(err);
    }
}

exports.findId = async (req,res,next) =>{
    try{
        let userID = await userService.findUserIDByEmail(req.params.email,next) 
        //console.log(userID);
        if(!userID){
            res.json({"err":"Error"});
        }else{
            res.json({"id":userID.name});
        }
    }catch{
        res.json("ERRor");
        console.log("ERROR");
    }
}

exports.findPw = async (req,res,next) =>{
    try{
        let info = await userService.findUserPWUsingID(req.params.email,req.params.id,next)
        jsonUtile.setHeader(info.status);
        jsonUtile.setResult({
            message:info.message,
            url:info.url==null? "Empty":info.url
        });
        res.json(jsonUtile.getJosn());
    }catch{
        res.json("ERRor");
        console.log("ERROR");
    }
}


// 일단, id 중복 controller 로 뺌 <- Ajax 로 처리할 건지, 알림으로 처리할 건지 결정해야 함.
exports.confirmId = async(req, res, next) => {
    const id = req.params.userId; // 이 부분 프론트 확인해줘
    try{
        let result = await userService.readUserId(id);
        if (result) {
            console.log("승인."); // 이거 바꿔야함
        } else {
            console.log("중복된 ID 입니다.");
        }
    }catch (err) {
        console.error(err);
        next(err);
    }
}