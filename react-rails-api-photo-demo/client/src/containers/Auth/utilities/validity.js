export const checkValidityOfInput = (value, requirements) => {
  let isValid = true;

  if(requirements.required) 
    isValid = value.trim() !== '' && isValid;

  if(requirements.minLength)
    isValid = value.length >= requirements.minLength && isValid;

  if(requirements.maxLength)
    isValid = value.length <= requirements.maxLength && isValid;

  if(requirements.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test( value ) && isValid
  }  

  return isValid;
};