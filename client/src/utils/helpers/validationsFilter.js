const validationsFilter = (form) => {
  const errors = {};

  if (parseInt(form.time) < 0) {
    errors.time = "Please enter a integer greater than zero.";
  } else if (parseInt(form.health) < 0 || parseInt(form.health) > 100) {
    errors.health = "Please enter a whole number between zero and one hundred.";
  }

  return errors;
};
export default validationsFilter;
