import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import useForm from "../utils/hooks/useForm";
import useModal from "../utils/hooks/useModal";
import { icons, profilePhoto } from "../utils/helpers/assets";
import validationsRegister from "../utils/helpers/validationsRegister";
import { newMessage } from "../stateManagement/actions/messageActions";
import TermsAndConditions from "../components/register/TermsConditions";
import { loadOff, loadOn } from "../stateManagement/actions/loadActions";

import style from "./register.module.css";

const initialForm = {
  image: 0,
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  repeatPassword: "",
  checkbox: false,
};

const Register = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    [flexbox, setFlexbox] = useState("prev"),
    [isOpen, openTerms, closeTerms] = useModal();

  const {
    form,
    errors,
    setErrors,
    setForm,
    changeHandler,
    checkedHandler,
    blurHandler,
  } = useForm(initialForm, validationsRegister);

  const {
    image,
    firstName,
    lastName,
    username,
    password,
    repeatPassword,
    checkbox,
  } = form;

  const imageNextHandler = (event) => {
    event.preventDefault();
    if (image === 5) {
      setForm({ ...form, image: 0 });
    } else {
      setForm({ ...form, image: image + 1 });
    }
  };
  const imagePrevHandler = (event) => {
    event.preventDefault();
    if (image === 0) {
      setForm({ ...form, image: 5 });
    } else {
      setForm({ ...form, image: image - 1 });
    }
  };

  const nextHandler = (event) => {
    event.preventDefault();
    blurHandler(event);
    if (
      !errors.image &&
      !errors.firstName &&
      !errors.lastName &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      setFlexbox("next");
    }
  };
  const prevHandler = (event) => {
    event.preventDefault();
    setFlexbox("prev");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    blurHandler(event);
    if (!checkbox) {
      setErrors({
        ...errors,
        checkbox: "You must read and accept the terms and conditions.",
      });
      return;
    }
    if (
      Object.keys(errors).length === 0 &&
      username.length > 0 &&
      password.length > 0 &&
      repeatPassword === password
    ) {
      dispatch(loadOn());
      try {
        await axios.post(`http://localhost:5000/users`, {
          image,
          firstName,
          lastName,
          username,
          password,
        });
        dispatch(loadOff());
        dispatch(
          newMessage(
            "Your account was successfully created! Please log in.",
            "success"
          )
        );
        navigate("/login");
      } catch (error) {
        dispatch(loadOff());
        dispatch(newMessage(error.response.data.error, "error"));
      }
    }
  };

  return (
    <div className={style["bg-register"]}>
      <section className={style["grid"]}>
        {/* 1 - benefits */}
        <article className={`${style["benefits"]} ${style["blurred-style"]}`}>
          <h1>Sign up now!</h1>
          <p>You can enjoy all our benefits:</p>

          <div>
            <img className='icon-green' src={icons.check} alt='Green check.' />
            <p>Create and share your own recipes.</p>

            <img className='icon-green' src={icons.check} alt='Green check.' />
            <p>Edit or delete your recipes at any time.</p>

            <img className='icon-green' src={icons.check} alt='Green check.' />
            <p>Save your favorite recipes.</p>
          </div>
        </article>

        {/* 2 - Form */}
        <form className={`${style["form"]}`}>
          <div className={`${style[flexbox]}`}>
            {/* part 1 */}
            <section className={`${style["blurred-style"]}`}>
              <div className={style["image"]}>
                <img
                  className={`icon-green ${style["image-button"]}`}
                  src={icons.prev}
                  alt='Prev Button'
                  onClick={imagePrevHandler}
                />
                <img
                  className={`${style["profile-photo"]}`}
                  src={profilePhoto[image]}
                  alt='Profile photo'
                />
                <img
                  className={`icon-green ${style["image-button"]}`}
                  src={icons.next}
                  alt='Next Button'
                  onClick={imageNextHandler}
                />
              </div>
              {errors.image && <p className='error'>{errors.image}</p>}

              <label className={`${style["label"]}`} htmlFor='firstName'>
                First name
              </label>
              <input
                className={`${style["input"]}`}
                id='firstName'
                type='text'
                name='firstName'
                placeholder='e.g. Dariana'
                onBlur={blurHandler}
                onChange={changeHandler}
                value={firstName}
                autoComplete='off'
                required
              />
              {errors.firstName && <p className='error'>{errors.firstName}</p>}

              <label className={`${style["label"]}`} htmlFor='lastName'>
                Last name
              </label>
              <input
                className={`${style["input"]}`}
                id='lastName'
                type='text'
                name='lastName'
                placeholder='e.g. Rengifo'
                onBlur={blurHandler}
                onChange={changeHandler}
                value={lastName}
                autoComplete='off'
                required
              />
              {errors.lastName && <p className='error'>{errors.lastName}</p>}

              <button
                className='button button-block button-green'
                onClick={nextHandler}
              >
                Next {">"}
              </button>
              <p className={style["small-letter"]}>
                Already registered?{" "}
                <NavLink className={style["link"]} to='/login'>
                  Login
                </NavLink>
              </p>
            </section>

            {/* part 2 */}
            <section className={`${style["blurred-style"]}`}>
              <label className={`${style["label"]}`} htmlFor='username'>
                Username
              </label>
              <input
                className={`${style["input"]}`}
                id='username'
                type='text'
                name='username'
                placeholder='e.g. user123'
                onBlur={blurHandler}
                onChange={changeHandler}
                value={username}
                autoComplete='off'
              />
              {errors.username && <p className='error'>{errors.username}</p>}

              <label className={`${style["label"]}`} htmlFor='password'>
                Password
              </label>
              <input
                className={`${style["input"]}`}
                id='password'
                type='password'
                name='password'
                placeholder='e.g. my-password'
                onBlur={blurHandler}
                onChange={changeHandler}
                value={password}
                autoComplete='off'
              />
              {errors.password && <p className='error'>{errors.password}</p>}
              <label className={`${style["label"]}`} htmlFor='repeatPassword'>
                Repeat password
              </label>
              <input
                className={`${style["input"]}`}
                id='repeatPassword'
                type='password'
                name='repeatPassword'
                placeholder='e.g. my-password'
                onBlur={blurHandler}
                onChange={changeHandler}
                value={repeatPassword}
                autoComplete='off'
              />
              {errors.repeatPassword && (
                <p className='error'>{errors.repeatPassword}</p>
              )}
              <label className={style["terms-conditions"]} htmlFor='checkbox'>
                <input
                  className={style["checkbox"]}
                  id='checkbox'
                  type='checkbox'
                  name='checkbox'
                  onChange={checkedHandler}
                  value={checkbox}
                />
                <p>
                  I accept the{" "}
                  <span className={style["link"]} onClick={openTerms}>
                    terms and conditions.
                  </span>
                </p>
              </label>

              {errors.checkbox && (
                <>
                  <p className='error'>{errors.checkbox}</p>
                </>
              )}
              <button
                className='button button-left button-yellow'
                onClick={prevHandler}
              >
                {"<"} Prev
              </button>
              <button
                className='button button-right button-green'
                onClick={submitHandler}
              >
                Register
              </button>
            </section>
          </div>
        </form>
      </section>
      <TermsAndConditions isOpen={isOpen} close={closeTerms} />
    </div>
  );
};

export default Register;
