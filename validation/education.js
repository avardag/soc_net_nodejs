const Validator = require("validator");
const is_empty = require("./is_empty");

/**
 * checks validation of input fields in experience form
 * @arg - req.body
 * @returns error object
 */
module.exports = function validateEducationInput(data) {
  let errors = {};
  //check if values in input field are not empty, 
  data.school = !is_empty(data.school) ? data.school : '';
  data.degree = !is_empty(data.degree) ? data.degree : '';
  data.from = !is_empty(data.from) ? data.from : '';
  data.fieldOfStudy = !is_empty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  
  if(Validator.isEmpty(data.school)){
    errors.school = "school field is required"
  }
  if(Validator.isEmpty(data.degree)){
    errors.degree = "degree field is required"
  }
  if(Validator.isEmpty(data.from)){
    errors.from = "from field is required"
  }
  if(Validator.isEmpty(data.fieldOfStudy)){
    errors.fieldOfStudy = "fieldOfStudy field is required"
  }
    

  return {
    errors,
    isValid: is_empty(errors)
  };
};
