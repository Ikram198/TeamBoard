class ApiError extends Error {
  constructor(statuscode, message){
    // Call the parent class constructor with the message (this will set the message property of the error)
    super(message);
    this.statuscode = statuscode;
    this.success = false;
  }
  // Set the name of the error to the name of the class (this will help identify the type of error when it is thrown)
  // this.name = this.constructor.name;
  // Error.captureStackTrace(this, this.constructor);

}
export {ApiError};

  
