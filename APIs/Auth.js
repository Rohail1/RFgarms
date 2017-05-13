/**
 * Created by Rohail on 5/13/2017.
 */


module.exports.setupFunction = function ({config,messages,models,jwt},helper,middlewares,validator) {

  const adminSignUp = async (req,res) => {

    try {
      let validated = await validator.adminSignupValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let userCount = await models.Admins.count({email: req.inputs.email});
      if(userCount > 0)
        return helper.sendResponse(res,messages.EMAIL_ALREADY_EXISIT);
      let salt = await helper.generateSalt(10);
      let password = await helper.generateHash(req.inputs.password,salt);
      let user = new models.Admins();
      user._id = helper.generateObjectId();
      user.firstname = req.inputs.firstname;
      user.lastname = req.inputs.lastname;
      user.email = req.inputs.email;
      user.password = password;
      user.salt = salt;
      let payload = {
        _id : user._id,
        email : user.email
      };
      user.jwt = jwt.sign(payload,config.jwtSecret);
      await user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const login = async (req,res) => {
    try {
      let validated = await validator.loginValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let user = await models.Admin.findOne({email: req.inputs.email});
      if(!user)
        return helper.sendResponse(res,messages.AUTHENTICATION_FAILED);
      let isAuthenticated = await helper.authenticatePassword(req.inputs.password,user.password);
      if(!isAuthenticated)
        return helper.sendResponse(res,messages.AUTHENTICATION_FAILED);
      let payload = {
        _id : user._id,
        email : user.email
      };
      user.jwt = jwt.sign(payload,config.jwtSecret);
      await user.save();
      let dataToSend = helper.copyObjects(user,['password','salt']);
      return helper.sendResponse(res,messages.SUCCESSFUL,dataToSend);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const childRegistration = async (req,res) => {

    try {
      let validated = await validator.childRegistrationValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);

      let child = new models.Child();
      child._id = helper.generateObjectId();
      child.rfid = helper.generateObjectId();
      child.firstname = req.inputs.firstname;
      child.lastname = req.inputs.lastname;
      child.class = req.inputs.class;
      child.age = req.inputs.age;
      await child.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,child);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const parentsSignUp = async (req,res) => {

    try {
      let validated = await validator.adminSignupValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let userCount = await models.Admins.count({email: req.inputs.email});
      if(userCount > 0)
        return helper.sendResponse(res,messages.EMAIL_ALREADY_EXISIT);
      let salt = await helper.generateSalt(10);
      let password = await helper.generateHash(req.inputs.password,salt);
      let user = new models.Admins();
      user._id = helper.generateObjectId();
      user.firstname = req.inputs.firstname;
      user.lastname = req.inputs.lastname;
      user.email = req.inputs.email;
      user.password = password;
      user.salt = salt;
      let payload = {
        _id : user._id,
        email : user.email
      };
      user.jwt = jwt.sign(payload,config.jwtSecret);
      await user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  module.exports.APIs = {

    signup : {
      route : '/signup',
      method : 'POST',
      prefix : config.API_PREFIX.AUTH,
      middlewares : [],
      handler : AdminSignUp
    },
    login : {
      route : '/login',
      method : 'POST',
      prefix : config.API_PREFIX.AUTH,
      middlewares : [],
      handler : adminSignUp
    },
    childRegistration : {
      route : '/child',
      method : 'POST',
      prefix : config.API_PREFIX.ADMIN,
      middlewares : [],
      handler : childRegistration
    }

  };

};