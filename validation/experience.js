const Validator = require("validator");
const is_empty = require("./is_empty");

/**
 * checks validation of input fields in experience form
 * @arg - req.body
 * @returns error object
 */
module.exports = function validateExperienceInput(data) {
  let errors = {};
  //check if values in input field are not empty, 
  data.title = !is_empty(data.title) ? data.title : '';
  data.company = !is_empty(data.company) ? data.company : '';
  data.from = !is_empty(data.from) ? data.from : '';
  
  if(Validator.isEmpty(data.title)){
    errors.title = "Job title field is required"
  }
  if(Validator.isEmpty(data.company)){
    errors.company = "Company field is required"
  }
  if(Validator.isEmpty(data.from)){
    errors.from = "from field is required"
  }
    

  return {
    errors,
    isValid: is_empty(errors)
  };
};
