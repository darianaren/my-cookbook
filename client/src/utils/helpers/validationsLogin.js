const validationsLogin = (form) => {
  const errors = {};
  const regexUsername = /^[a-z\d]+$/;

  if (!form.username) {
    errors.username = "Please enter your username.";
  } else if (!regexUsername.test(form.username)) {
    errors.username =
      "The username cann only contain lowercase letters and numbers.";
  } else if (!form.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
};
export default validationsLogin;
