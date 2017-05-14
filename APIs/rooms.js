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