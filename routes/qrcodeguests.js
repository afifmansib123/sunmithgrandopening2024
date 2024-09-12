const express = require("express");
const router = express.Router();
const myQrcode = require("qrcode")

router.post("/", async(req,res)=>{
    try{
        const qr = await myQrcode.toDataURL(JSON.stringify(req.body));
        res.json({qr})
    } catch(e){
        res.status(500).json({error: e.message})
    }
})

module.exports = router;