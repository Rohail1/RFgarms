/**
 * Created by Rohail on 5/13/2017.
 */

module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    childId : {
      type : Schema.Types.ObjectId,
      ref : "Child"
    },
    roomId : {
      type : Schema.Types.ObjectId,
      ref : "Room"
    },
    timeStamp : {
      type : String
    },
    logType : {
      type : String
    },
    period : {
      type : Schema.Types.ObjectId,
      ref : "TimeTable"
    }
  },{
    timeStamp : true
  });

};