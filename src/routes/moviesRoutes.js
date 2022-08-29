const express = require('express');
const router = express.Router();

router.get('/movies',function(req,res){
    res.send("Test");
});
module.exports = router;