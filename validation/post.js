const Validator = require("validator");
const is_empty = require("./is_empty");

/**
 * checks validation of input fields in login form
 * @arg - req.body
 * @returns error object
 */
module.exports = function validatePostInput(data) {
  let errors = {};
  //check if values in input field are not empty, 
  data.text = !is_empty(data.text) ? data.text : '';

  //check if text field is between 4 and 300 chars
  if (!Validator.isLength(data.text, {min:4, max:300})) {
    errors.text = "Text must be between 4 and 300 chars";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }
  
  return {
    errors,
    isValid: is_empty(errors)
  };
};
