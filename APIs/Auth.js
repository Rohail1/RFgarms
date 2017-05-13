/**
 * Created by Rohail on 5/13/2017.
 */


module.exports.setupFunction = function ({config,messages,models,jwt},helper,middlewares,validator) {

  const adminSignUp = async (req,res) => {

    try {
      let validated = await validator.adminSignupValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let userCount = await models.Admins.count({email: req.inputs.email.toLowerCase()});
      if(userCount > 0)
        return helper.sendResponse(res,messages.EMAIL_ALREADY_EXISIT);
      let salt = await helper.generateSalt(10);
      let password = await helper.generateHash(req.inputs.password,salt);
      let user = new models.Admins();
      user._id = helper.generateObjectId();
      user.firstname = req.inputs.firstname;
      user.lastname = req.inputs.lastname;
      user.email = req.inputs.email.toLowerCase();
      user.designation = req.inputs.designation;
      user.role = req.inputs.role;
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
      let user = await models.Admins.findOne({email: req.inputs.email.toLowerCase()});
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
      let validated = await validator.parentSignupValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let userCount = await models.Parent.count({email: req.inputs.email.toLowerCase()});
      if(userCount > 0)
        return helper.sendResponse(res,messages.EMAIL_ALREADY_EXISIT);
      let salt = await helper.generateSalt(10);
      let password = await helper.generateHash(req.inputs.password,salt);
      let parent = new models.Parent();
      parent._id = helper.generateObjectId();
      parent.firstname = req.inputs.firstname;
      parent.lastname = req.inputs.lastname;
      parent.email = req.inputs.email.toLowerCase();
      parent.password = password;
      parent.salt = salt;
      parent.children = req.inputs.children;
      let payload = {
        _id : parent._id,
        email : parent.email
      };
      parent.jwt = jwt.sign(payload,config.jwtSecret);
      let childQuery = {
        _id : {
          $in :req.inputs.children
        }
      };
      let updateQuery = {
        $set  : {
          parentId : parent._id
        }
      };
      await Promise.all([
        parent.save(),
        models.Child.update(childQuery,updateQuery)
      ]);
      return helper.sendResponse(res,messages.SUCCESSFUL,parent);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const parentsFormMetaData = async (req,res) => {

    try {
      let query = {
        parentId: { $exists: false}
      };
      let projection = {
        firstname : 1,
        lastname : 1
      };
      let children = await models.Child.find(query,projection);
      if(!children)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      return helper.sendResponse(res,messages.SUCCESSFUL,children);
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
      handler : adminSignUp
    },
    login : {
      route : '/login',
      method : 'POST',
      prefix : config.API_PREFIX.AUTH,
      middlewares : [],
      handler : login
    },
    childRegistration : {
      route : '/child',
      method : 'POST',
      prefix : config.API_PREFIX.ADMIN,
      middlewares : [],
      handler : childRegistration
    },
    parentsSignUp : {
      route : '/parents',
      method : 'POST',
      prefix : config.API_PREFIX.ADMIN,
      middlewares : [],
      handler : parentsSignUp
    },
    parentsFormMetaData : {
      route : '/parents/meta',
      method : 'GET',
      prefix : config.API_PREFIX.ADMIN,
      middlewares : [],
      handler : parentsFormMetaData
    }

  };

};