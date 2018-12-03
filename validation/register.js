const Validator = require("validator");
const is_empty = require("./is_empty");

/**
 * checks validation of input fields
 * @arg - req.body
 * @returns error object
 */
module.exports = function validateRegisterInput(data) {
  let errors = {};
  //check if values in input field are not empty, 
  data.name = !is_empty(data.name) ? data.name : '';
  data.email = !is_empty(data.email) ? data.email : '';
  data.password = !is_empty(data.password) ? data.password : '';
  data.password2 = !is_empty(data.password2) ? data.password2 : '';
  //check the lenght of name field( be between 2 and 30)
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  //check if name field is filled
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  //check if email field is filled
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //check if email is email ))
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  //check the lenght of password field( be between 6 and 30)
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  //check if password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = " Password field is required";
  }
  //check if password2 field is empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  //check if password mactehs with confirm password
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: is_empty(errors)
  };
};
