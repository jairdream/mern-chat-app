export const confirmErrorType = (error, credential) => {
  let typedError = {};
  const transformedError = error.toLowerCase();
  console.log(transformedError);
  if (transformedError.includes("all")) {
    typedError = {
      name: credential.name.length > 0 ? null : "Name Field Required",
      email: credential.email.length > 0 ? null : "Email Field Required",
      password:
        credential.password.length > 0 ? null : "Password Field Required",
      confirm:
        credential.confirm.length > 0
          ? null
          : "Password Confirm Field Required",
    };
  } else if (transformedError.includes("email")) {
    typedError = {
      email: "Invalid Email Type",
    };
  } else if (transformedError.includes("password")) {
    typedError = {
      confirm: "Password and Confirm Password must be matched",
    };
  }
  return typedError;
};
