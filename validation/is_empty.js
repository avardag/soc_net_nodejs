/**
 * checks if the value is empty. 
 * value is type of string, object
 * @arg can be obj
 * @return boolean
 */
function is_empty(value){
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length ===0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

module.exports = is_empty;