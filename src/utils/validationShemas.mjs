export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "username must be between 5 and 32 characters long",
    },
    isString: {
      errorMessage: "username must be a string",
    },
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "displayName cannot be empty!",
    },
  },
};

export const queryValidationSchema = {
  filter: {
    isString: true,
    notEmpty: {
      errorMessage: "querystring must not be empty",
    },
    isLength: {
      options: {
        min: 3,
        max: 12,
      },
      errorMessage: "the querystring must be between 3 and 12 characters long",
    },
  },
};
