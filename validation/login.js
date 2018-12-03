const Validator = require("validator");
const is_empty = require("./is_empty");

/**
 * checks validation of input fields in login form
 * @arg - req.body
 * @returns error object
 */
module.exports = function validateLoginInput(data) {
  let errors = {};
  //check if values in input field are not empty, 
  data.email = !is_empty(data.email) ? data.email : '';
  data.password = !is_empty(data.password) ? data.password : '';
  
  //check if email is email ))
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  //ORDER between isEmail & isEmpty is !important
  //check if email field is filled
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //check if password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = " Password field is required";
  }

  return {
    errors,
    isValid: is_empty(errors)
  };
};
