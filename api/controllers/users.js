const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        
        if(err.code === 11000){
          if(err.keyPattern.email){
            return res.status(400).json({message: 'email is already in use'})

          }
          else if(err.keyPattern.username)
          return res.status(400).json({ message: 'username is already in use' });

        }
        else{
          res.status(400).json({message: 'Bad request'})

        }
      
      
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  }
};

module.exports = UsersController;
