/**
 * Created by Rohail on 5/13/2017.
 */

module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    rfid : {
      type : Schema.Types.ObjectId,
    },
    firstname : {
      type : String
    },
    lastname : {
      type : String
    },
    age : {
      type : Number
    },
    class : {
      type : String
    },
    parentId : {
      type : Schema.Types.ObjectId
    }
  },{
    timeStamp : true
  });

};