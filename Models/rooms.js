/**
 * Created by Rohail on 5/13/2017.
 */


module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    name : {
      type : String
    },
    roomType : {
      type : String
    },
    floor : {
      type : String
    }
  },{
    timeStamp : true
  });

};