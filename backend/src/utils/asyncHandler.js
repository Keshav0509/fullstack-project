// when we talk to database we will use this function
// method 1>>>>>>>>>>

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

/*
  method 2>>>>>
  const asyncHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        message: error.message || "An unknown error occurred!",
        success: false,
      });
    }
  };
*/
export { asyncHandler };
