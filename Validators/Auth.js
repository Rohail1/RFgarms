/**
 * Created by Rohail on 5/13/2017.
 */


module.exports = function ({joi}) {

  validatePostUsers = function (input) {
    let schema = joi.object().keys({
      firstName:joi.string().token().required().error(new Error('Please enter firstName')),
      lastName: joi.string().token().required().error(new Error('Please enter lastName'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };
  validateUpdateUsers = function (input) {
    let schema = joi.object().keys({
      firstName:joi.string().token().required().error(new Error('Please enter firstName')),
      userId:joi.string().token().required().error(new Error('invalid UserId'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  return  {
    validatePostUsers : validatePostUsers,
    validateUpdateUsers : validateUpdateUsers
  }

};