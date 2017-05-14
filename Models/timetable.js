/**
 * Created by Rohail on 5/13/2017.
 */

module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    day : {
      type : String
    },
    class : {
      type : String
    },
    startTime : {
      type : String
    },
    endTime : {
      type : String
    },
    roomId : {
      type : Schema.Types.ObjectId,
      ref : "Room"
    },
    subject : {
      type : String
    }
  },{
    timeStamp : true
  });

};