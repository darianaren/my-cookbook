import { useState } from "react";

const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors(validateForm(form));
  };

  const checkedHandler = (event) => {
    const { name, checked } = event.target;
    setForm({
      ...form,
      [name]: checked,
    });
    setErrors(validateForm(form));
  };

  const checkMultipleHandler = (event) => {
    const { name, checked, value } = event.target;
    setForm({ ...form, [name]: { ...form[name], [value]: checked } });
  };

  const blurHandler = (event) => {
    changeHandler(event);
  };

  const resetHandler = (event) => {
    event.preventDefault();
    setForm(initialForm);
  };
  const resetHandlerFilter = (event) => {
    setForm(initialForm);
  };

  return {
    form,
    errors,
    setErrors,
    setForm,
    resetHandler,
    resetHandlerFilter,
    changeHandler,
    checkedHandler,
    checkMultipleHandler,
    blurHandler,
  };
};

export default useForm;
