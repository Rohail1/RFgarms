/**
 * Created by Rohail on 5/13/2017.
 */

module.exports.setupFunction = function ({config,messages,models,enums},helper,middlewares,validator) {

  const getActivityLog = async (req,res) => {
    try {
      let query = {};
      for (let props in req.inputs){
        if(req.inputs.hasOwnProperty(props))
          if(props === "childId" || props === "roomId")
            query[props] =  helper.generateObjectId(req.inputs[props]);
      }
      let aggregation = [
        {$match : query},
        {
          $project: {
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" } },
            time: { $dateToString: { format: "%H:%M:%S:%L", date: "$timeStamp" } },
            childId: 1,
            roomId : 1,
            period : 1,
          },
        },
        {
          $group:{
            _id : "$yearMonthDay",
            logs : {
              $addToSet : {
                time : "$time",
                childId : "$childId",
                roomId : "$roomId",
                period : "$period"
              }
            }
          }
        }
      ];
      let activityLog = await models.ActivityLog.aggregate(aggregation);
      if(!activityLog)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      await models.Room.populate(activityLog,[
        {
          path : "logs.roomId",
        },
        {
          path : "logs.period",
          model : "TimeTable"
        }
      ]);
      return helper.sendResponse(res,messages.SUCCESSFUL,activityLog);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const activityLogCreated = async (req,res) => {

    let activityLog = new models.ActivityLog();
    activityLog._id = helper.generateObjectId();
    activityLog.childId = req.inputs.childId;
    activityLog.roomId = req.inputs.roomId;
    activityLog.timeStamp = Date.now();
    let query = {
      roomId : activityLog.roomId,
      startTime : {
        $lte : new Date(activityLog.timeStamp).getHours()
      },
      endTime : {
        $gte : new Date(activityLog.timeStamp).getHours()
      }
    };
    let timetable = await models.TimeTable.findOne(query);
    activityLog.period = timetable ? timetable._id : null;
    activityLog.logType = req.inputs.checkin ? enums.logType.checkIN : enums.logType.checkOut ;
    await activityLog.save();
    return helper.sendResponse(res,messages.SUCCESSFUL,activityLog);

  };

  const activityLogByCourse = async (req,res) => {
    try {
      let timeTableQuery = {
        subject : req.inputs.subject
      };
      let timetable = await models.TimeTable.findOne(timeTableQuery);
      if(!timetable)
        return helper.sendResponse(res,messages.DATA_NOT_FOUND);
      let query = {
        roomId : helper.generateObjectId(timetable.roomId),
        period : timetable._id
      };
      for (let props in req.inputs){
        if(req.inputs.hasOwnProperty(props))
          if(props === "childId")
            query[props] =  helper.generateObjectId(req.inputs[props]);
      }
      let aggregation = [
        {$match : query},
        {
          $project: {
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" } },
            time: { $dateToString: { format: "%H:%M:%S:%L", date: "$timeStamp" } },
            childId: 1,
            roomId : 1,
            period : 1,
          },
        },
        {
          $group:{
            _id : "$yearMonthDay",
            logs : {
              $addToSet : {
                time : "$time",
                childId : "$childId",
                roomId : "$roomId",
                period : "$period"
              }
            }
          }
        }
      ];
      let activityLog = await models.ActivityLog.aggregate(aggregation);
      if(!activityLog)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      await models.Room.populate(activityLog,[
        {
          path : "logs.roomId",
        },
        {
          path : "logs.period",
          model : "TimeTable"
        }
      ]);
      return helper.sendResponse(res,messages.SUCCESSFUL,activityLog);
    }
    catch (ex){
      console.log('ex',ex);
      return helper.sendError(res,ex)
    }
  };

  const timetableCreate = async (req,res) => {
    let timetable = new models.TimeTable();
    timetable._id = helper.generateObjectId();
    timetable.roomId = req.inputs.roomId;
    timetable.day = req.inputs.day;
    timetable.startTime = req.inputs.startTime;
    timetable.endTime = req.inputs.endTime;
    timetable.class = req.inputs.class;
    timetable.subject = req.inputs.subject;
    await timetable.save();
    return helper.sendResponse(res,messages.SUCCESSFUL,timetable);
  };

  module.exports.APIs = {

    getActivityLogByChildId : {
      route : '/activitylog',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : getActivityLog
    },
    activityLogByCourse  : {
      route : '/activitylog/subject',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : activityLogByCourse
    },
    activityLogCreated : {
      route : '/activitylog',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : activityLogCreated
    },
    timetableCreate : {
      route : '/timetable',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : timetableCreate
    }

  };

};