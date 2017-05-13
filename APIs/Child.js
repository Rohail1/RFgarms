/**
 * Created by Rohail on 5/14/2017.
 */

module.exports.setupFunction = function ({config,messages,models,enums},helper,middlewares,validator) {

  const getChildDetail = async (req,res) => {

    try {
      let child = await models.Child.findOne({_id : req.inputs.childId});
      if(!child)
        return helper.sendResponse(res,messages.DATA_NOT_FOUND);
      return helper.sendResponse(res,messages.SUCCESSFUL,child);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const getChildrens = async (req,res) => {
    try {
      let children = await models.Child.find({});
      if(!children)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      return helper.sendResponse(res,messages.SUCCESSFUL,children);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const getChildByParents  = async (req,res) => {
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

  module.exports.APIs = {

    getRoomData : {
      route : '/children/:childId',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : getChildDetail
    },
    getrooms : {
      route : '/children',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [],
      handler : getChildrens
    }
  };

};