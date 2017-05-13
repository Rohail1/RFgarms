/**
 * Created by Rohail on 5/13/2017.
 */

module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    firstname : {
      type : String
    },
    lastname : {
      type : String
    },
    email : {
      type : String
    },
    password : {
      type : String
    },
    salt : {
      type : String
    },
    jwt : {
      type : String
    },
    children : [
      {
        type: Schema.Types.ObjectId
      }
    ]
  },{
    timeStamp : true
  });

};