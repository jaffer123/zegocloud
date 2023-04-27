var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/token', function(req, res) {
  try {
    const { generateToken } = require('../server/zegoServerAssistant');
// Rtc Examples
    const appID = 1719115078;
    const secret = '9c0948620f458fe8c5f3c29c33c5d798';
    const roomId = req.body.roomId?req.body.roomId:"room123" 
    const userId = req.body.userName?req.body.userName:'demo'; 
    const effectiveTimeInSeconds = 3600; 
    const privilege = {
            canLoginRoom:true,
            canPublishStream:true
    }
    const token =  generateToken(appID, roomId, userId, privilege, secret, effectiveTimeInSeconds);
    res.status(200).send({status: 200, flag: true,data: {userId,roomId,token},message: "send Email OTP is successfully"});
} catch (e) {
    return res.status(400).json({status: 400, flag: false, message: e.message})
}
});

module.exports = router;
