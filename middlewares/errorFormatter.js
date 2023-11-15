module.exports = function (err,req,res,next){
    res.format({

        json:() => {
            res.status(500).json({
            message:"Ops",
            error: err.message,
        })
    },
        default:()=>{
            res.status(500).send("Ops")
        },
    })
}