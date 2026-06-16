// VALIDATION FUNCTION 
export const validateEmail = (email) => {
    
    if (!email.trim()) {
      // console.log("email >>> ", !email.trim())
      return "Email is required";
    }
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return "Please enter a valid email address";
      return "";
}

export const validatePassword = (password) => {

  if (!password) return "Please enter your password";
    
  if (password.length < 6) return "The password must be 6 characters or more.";

  //TO CHECK LATER
  // if ((!/(?=.*[a-z])/.test())) return "Password must contains at least one lowercase letter"
  
  // if((!/(?=.*[A-Z])/.test())) return "Password must contains at least one uppercase letter"
  // if((!/(?=.*\d)/.test())) return "Password must contains at least one number"
 

  return "";
}

export const validateAvatar = (file) => {
  if (!file) return ""; //Avatar is optionnel

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) return "Avatar must be JPG or PNG file";
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) return "Avatar must be less than 5MB";

  return "";
}

export const extractText = (text) => {
  const wordsCount = countWords(text);
  if (wordsCount > 20) {
    const extracted = text.split(/\s+/).slice(0, 25).join(' ');

    return extracted;
  }

  return text;
  
}

export const countWords = (str) => {
  const trimmed = str.trim();
  // Return 0 if the string is empty to avoid counting an empty element
  if (trimmed === "") return 0; 
  
  // \s+ matches one or more spaces, tabs, or newlines
  return trimmed.split(/\s+/).length;
}