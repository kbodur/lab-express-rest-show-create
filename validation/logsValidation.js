const checkForCaptainNameKey = (req, res, next) => {
    if (req.body.hasOwnProperty("captainName")) {
     return next();
    } else {
      res.json({error:"Log must have a captain name"});
    }
  };

  
  module.exports = { checkForCaptainNameKey }