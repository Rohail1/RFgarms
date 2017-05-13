/**
 * Created by Rohail on 5/13/2017.
 */

module.exports.setupFunction = function ({config,messages,models,enums},helper,middlewares,validator) {

  const getrooms = async (req,res) => {
    try {
      let rooms = await models.Room.find({});
      if(!rooms)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      return helper.sendResponse(res,messages.SUCCESSFUL,rooms);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const getroomDetail = async (req,res) => {

    try {
      let room = await models.Room.findOne({_id : req.inputs.roomId});
      if(!room)
        return helper.sendResponse(res,messages.DATA_NOT_FOUND);
      return helper.sendResponse(res,messages.SUCCESSFUL,room);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const createAroom = async (req,res) => {
    try {
      let validated = await validator.createRoom(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let room = new models.Room();
      room._id = helper.generateObjectId();
      room.name = req.inputs.name;
      room.roomType = req.inputs.roomType;
      room.floor = req.inputs.floor;
      await room.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,room);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const getRoomData = async (req,res) => {
    return helper.sendResponse(res,messages.SUCCESSFUL,enums.roomData);
  };

/*  const updateRoom = async (req,res) => {

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

  const deleteRoom = async (req,res) => {

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
  };*/

  module.exports.APIs = {

    getRoomData : {
      route : '/rooms/meta',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [],
      handler : getRoomData
    },
    getrooms : {
      route : '/rooms',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [],
      handler : getrooms
    },
    getroomDetail : {
      route : '/rooms/:roomId',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : getroomDetail
    },
    createAroom : {
      route : '/rooms',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [],
      handler : createAroom
    },

  };

};