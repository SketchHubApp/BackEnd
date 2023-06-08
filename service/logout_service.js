const jsonUtile = require("../utile/jsonUtilty")

exports.logout = (req,res,next) =>{
    //console.log(req);
    req.logout((err)=>{
        if(err) {
            jsonUtile.setHeader(500)
            jsonUtile.setResult({
                err:{
                    message:"세션 삭제 에러"
                }
            })
           res.json(jsonUtile.getJosn()) 
        }
        req.session.destroy(
            function (err) {
                if (err) {
                    jsonUtile.setHeader(500)
                    jsonUtile.setResult({
                        err:{
                            message:"세션 삭제 에러"
                    }
                    })
                    res.json(jsonUtile.getJosn()) 
                }else{
                    jsonUtile.setHeader(200)
                    jsonUtile.setResult({
                        body:{
                            message:'세션 삭제 성공'
                    }})
                    res.json(jsonUtile.getJosn()) 
                }

            }
        );
    })
}