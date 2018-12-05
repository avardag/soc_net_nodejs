const Validator = require("validator");
const is_empty = require("./is_empty");

/**
 * checks validation of input fields in profile form
 * @arg - req.body
 * @returns error object
 */
module.exports = function validateProfileInput(data) {
  let errors = {};
  //check if values in input field are not empty, 
  data.handle = !is_empty(data.handle) ? data.handle : '';
  data.status = !is_empty(data.status) ? data.status : '';
  data.skills = !is_empty(data.skills) ? data.skills : '';
  
  //check if length of hanle is between 2-40
  if(!Validator.isLength(data.handle, {min:2, max:40})){
    errors.handle = "Handle needs to be between 2 and 40 chars"
  }
  if(Validator.isEmpty(data.handle)){
    errors.handle = "Profile handle is required"
  }
  if(Validator.isEmpty(data.status)){
    errors.status = "Status field is required"
  }
  if(Validator.isEmpty(data.skills)){
    errors.skills = "skills field is required"
  }
  
  if(!is_empty(data.website)){
    if(!Validator.isURL(data.website)){
      errors.website = "Not a valid URL"
    }
  }
  if(!is_empty(data.youtube)){
    if(!Validator.isURL(data.youtube)){
      errors.youtube = "Not a valid URL"
    }
  }
  if(!is_empty(data.twitter)){
    if(!Validator.isURL(data.twitter)){
      errors.twitter = "Not a valid URL"
    }
  }
  if(!is_empty(data.facebook)){
    if(!Validator.isURL(data.facebook)){
      errors.facebook = "Not a valid URL"
    }
  }
  if(!is_empty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)){
      errors.linkedin = "Not a valid URL"
    }
  }
  if(!is_empty(data.instagram)){
    if(!Validator.isURL(data.instagram)){
      errors.instagram = "Not a valid URL"
    }
  }
  

  return {
    errors,
    isValid: is_empty(errors)
  };
};
