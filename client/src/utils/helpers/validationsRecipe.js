const validationsRecipe = (form) => {
  const errors = {};
  const regexNumber = /^[0-9]+$/;
  const regexImage = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;

  if (form.image.length > 0 && !regexImage.test(form.image)) {
    errors.image = "Please enter the url of the image";
  } else if (!form.title.trim()) {
    errors.title = "Please enter a title.";
  } else if (!form.summary.trim()) {
    errors.summary = "Please enter a summary.";
  } else if (form.summary.length < 30) {
    errors.summary = "The summary must be at least 30 characters long";
  } else if (!form.servings) {
    errors.servings = "Please enter the servings according to ingredients.";
  } else if (!regexNumber.test(form.servings) || parseInt(form.servings) < 1) {
    errors.servings = "Servings must be a integer greater than zero.";
  } else if (!form.healthScore) {
    errors.healthScore = "Please enter a health score.";
  } else if (
    !regexNumber.test(form.healthScore) ||
    parseInt(form.healthScore) < 0 ||
    parseInt(form.healthScore) > 100
  ) {
    errors.healthScore =
      "Health score must be an integer between zero and a hundred.";
  } else if (!form.time) {
    errors.time = "Please enter the preparation time.";
  } else if (!regexNumber.test(form.time) || parseInt(form.time) < 1) {
    errors.time = "Preparation time must be a integer greater than zero.";
  }
  return errors;
};
export default validationsRecipe;
