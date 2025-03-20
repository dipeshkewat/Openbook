class ApiError extends Error{
    constructor(
        starusCode,
        message = "Something went Wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.starusCode = starusCode
        this.date =null
        this.message =message
        this.success = false;
        this.errors = errors
        
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }