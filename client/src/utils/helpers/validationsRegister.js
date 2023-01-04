const validationsRegister = (form) => {
  const errors = {};
  const regexUsername = /^[a-z\d]+$/;
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/i;

  if (parseInt(form.image) < 0 || parseInt(form.image) > 5) {
    errors.image = "Please enter a valid image.";
  } else if (!form.firstName) {
    errors.firstName = "Please enter your first name.";
  } else if (!regexName.test(form.firstName)) {
    errors.firstName = "The first name can only contain letters.";
  } else if (!form.lastName) {
    errors.lastName = "Please enter your last name.";
  } else if (!regexName.test(form.lastName)) {
    errors.lastName = "The last name can only contain letters.";
  } else if (!form.username) {
    errors.username = "Please enter your username.";
  } else if (
    !regexUsername.test(form.username) ||
    form.username !== form.username.toLowerCase()
  ) {
    errors.username =
      "The username can only contain lowercase letters and numbers.";
  } else if (!form.password) {
    errors.password = "Please enter your password.";
  } else if (!form.repeatPassword) {
    errors.repeatPassword = "Please repeat password.";
  } else if (form.repeatPassword !== form.password) {
    errors.repeatPassword = "Passwords must be the same.";
  } else if (form.checkbox) {
    errors.checkbox = "You must read and accept the terms and conditions.";
  }

  return errors;
};
export default validationsRegister;
