/**
 * Created by Rohail on 5/13/2017.
 */


module.exports = function ({joi}) {

  const adminSignupValidator = (input) => {
    let schema = joi.object().keys({
      email:joi.string().email().required().error(new Error('Please enter valid email')),
      password: joi.string().required().error(new Error('Please enter a password')),
      firstname: joi.string().token().required().error(new Error('Please enter your firstname')),
      lastname: joi.string().token().required().error(new Error('Please enter your lastname')),
      role: joi.string().token().required().error(new Error('Please enter your role')),
      designation: joi.string().token().required().error(new Error('Please enter your designation'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  const loginValidator = (input) => {
    let schema = joi.object().keys({
      email:joi.string().email().required().error(new Error('Please enter valid email')),
      password: joi.string().required().error(new Error('Please enter a password')),
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  const childRegistrationValidator = (input) => {
    let schema = joi.object().keys({
      firstname: joi.string().required().error(new Error('Please enter your firstname')),
      lastname: joi.string().required().error(new Error('Please enter your lastname')),
      class: joi.string().required().error(new Error('Please enter class of the child')),
      age: joi.number().required().error(new Error('Please enter age of the child'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  const parentSignupValidator = (input) => {
    let schema = joi.object().keys({
      email:joi.string().email().required().error(new Error('Please enter valid email')),
      password: joi.string().required().error(new Error('Please enter a password')),
      firstname: joi.string().required().error(new Error('Please enter your firstname')),
      lastname: joi.string().required().error(new Error('Please enter your lastname')),
      children: joi.array().items(joi.string().required()).min(1).unique().required().error(new Error('Please enter a child'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  return  {
    adminSignupValidator,
    loginValidator,
    childRegistrationValidator,
    parentSignupValidator
  }

};