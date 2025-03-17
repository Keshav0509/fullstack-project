class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.statck = statck;

    if (statck) {
      this.stack = statck;
    } else {
      Error.stackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
