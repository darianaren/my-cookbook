import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useForm from "../utils/hooks/useForm";
import BackHomeButton from "../components/BackHomeButton";
import ConfirmationWindow from "../layout/ConfirmationWindow";
import { icons, logo, profilePhoto } from "../utils/helpers/assets";
import validationsUpdate from "../utils/helpers/validationsUpdate";
import { newMessage } from "../stateManagement/actions/messageActions";
import { loadOff, loadOn } from "../stateManagement/actions/loadActions";
import { closeUser, myUser } from "../stateManagement/actions/userActions";
import { confirmationOpen } from "../stateManagement/actions/confirmationActions";

import style from "./myProfile.module.css";
import { getApiCache } from "../utils/api/cacheApi";

const MyProfile = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    userState = useSelector((state) => state.users),
    themeState = useSelector((state) => state.theme),
    { id, image, username, firstName, lastName, cookbook } = userState.user,
    { theme } = themeState;

  const initialState = {
    image: parseInt(image),
    username,
    firstName,
    lastName,
    cookbook,
    newPassword: "",
  };

  const { form, errors, setForm, resetHandler, changeHandler, blurHandler } =
    useForm(initialState, validationsUpdate);

  const body = {
    image: parseInt(form.image),
    username: form.username,
    firstName: form.firstName,
    lastName: form.lastName,
    cookbook: form.cookbook,
  };

  form.newPassword.length > 0 && (body.newPassword = form.newPassword);

  const imageNextHandler = () => {
    if (form.image === 5) {
      setForm({ ...form, image: 0 });
    } else {
      setForm({ ...form, image: parseInt(form.image) + 1 });
    }
  };
  const imagePrevHandler = () => {
    if (form.image === 0) {
      setForm({ ...form, image: 5 });
    } else {
      setForm({ ...form, image: parseInt(form.image) - 1 });
    }
  };

  const confirmationHandler = async () => {
    try {
      dispatch(loadOn());
      navigate("/login");
      await axios.delete(`/users/${id}`);
      await getApiCache(false, false, true);
      dispatch(closeUser());
      dispatch(loadOff());
      dispatch(
        newMessage("Your account has been successfully deleted.", "success")
      );
    } catch (error) {
      dispatch(loadOff());
      dispatch(newMessage(error.response.data.error, "error"));
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
    dispatch(confirmationOpen());
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        dispatch(loadOn());
        const update = await axios.put(`/users/${id}`, body);
        const userId = update.data.id;
        const userUpdate = await axios.get(`/users/${userId}`);
        dispatch(myUser(userUpdate.data));
        dispatch(loadOff());
        dispatch(
          newMessage("Your data has been successfully updated.", "success")
        );
        if (form.newPassword.length > 0) {
          navigate("/login");
        }
      } catch (error) {
        dispatch(loadOff());
        dispatch(newMessage(error.response.data.error, "error"));
      }
    }
  };
  return (
    <form className={`${style["form"]} ${style[theme]}`}>
      <ConfirmationWindow
        message={
          "Are you sure you want to delete your account? You will not be able to recover your data and the recipes you created will be deleted."
        }
        handler={confirmationHandler}
      />

      <header className={`${style["header"]} ${style[theme]}`}>
        <BackHomeButton className={`icon-red ${style["back-button"]}`} />
        <h1 className={`${style["title"]}`}> My Profile</h1>
        <img className={`${style["logo"]}`} src={logo.large} alt='Logo' />
      </header>

      <div className={`${style["section-container"]} ${style[theme]}`}>
        <section className={`${style["section-one"]}`}>
          <div className={style["image-container"]}>
            <img
              className={`icon-blue ${style["image-button"]} ${style[theme]}`}
              src={icons.prev}
              alt='Prev Button'
              onClick={imagePrevHandler}
            />
            <img
              className={`${style["profile-photo"]}`}
              src={profilePhoto[parseInt(form.image)]}
              alt='Profile photo'
            />
            <img
              className={`icon-blue ${style["image-button"]} ${style[theme]}`}
              src={icons.next}
              alt='Next Button'
              onClick={imageNextHandler}
            />
          </div>
          {errors.image && <p className='error'>{errors.image}</p>}

          <div className={`${style["username-container"]}`}>
            <label
              className={`${style["label"]} ${style[theme]}`}
              htmlFor='username'
            >
              Username
            </label>
            <input
              className={`${style["input"]} ${style[theme]}`}
              id='username'
              type='text'
              name='username'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={form.username}
              placeholder='e.g. user123'
              required
              autoComplete='off'
            />
            {errors.username && <p className='error'>{errors.username}</p>}
          </div>
        </section>

        <section className={`${style["section-two"]} ${style[theme]}`}>
          <label
            className={`${style["label"]} ${style[theme]}`}
            htmlFor='firstName'
          >
            First name
          </label>
          <input
            className={`${style["input"]} ${style[theme]}`}
            id='firstName'
            type='text'
            name='firstName'
            onBlur={blurHandler}
            onChange={changeHandler}
            value={form.firstName}
            placeholder='e.g. Dariana'
            required
            autoComplete='off'
          />
          {errors.firstName && <p className='error'>{errors.firstName}</p>}

          <label
            className={`${style["label"]} ${style[theme]}`}
            htmlFor='lastName'
          >
            Last name
          </label>
          <input
            className={`${style["input"]} ${style[theme]}`}
            id='lastName'
            type='text'
            name='lastName'
            onBlur={blurHandler}
            onChange={changeHandler}
            value={form.lastName}
            placeholder='e.g. Rengifo'
            required
            autoComplete='off'
          />
          {errors.lastName && <p className='error'>{errors.lastName}</p>}

          <label
            className={`${style["label"]} ${style[theme]}`}
            htmlFor='cookbook'
          >
            Title of my cookbook
          </label>
          <input
            className={`${style["input"]} ${style[theme]}`}
            id='cookbook'
            type='text'
            name='cookbook'
            onBlur={blurHandler}
            onChange={changeHandler}
            value={form.cookbook}
            placeholder='e.g. My Amazing Cookbook'
            required
            autoComplete='off'
          />
          {errors.cookbook && <p className='error'>{errors.cookbook}</p>}

          <label
            className={`${style["label"]} ${style[theme]}`}
            htmlFor='newPassword'
          >
            New password
          </label>
          <input
            className={`${style["input"]} ${style["last-input"]} ${style[theme]}`}
            id='newPassword'
            type='password'
            name='newPassword'
            placeholder='e.g. my-password'
            onBlur={blurHandler}
            onChange={changeHandler}
            value={form.newPassword}
            autoComplete='off'
          />
          {errors.newPassword && <p className='error'>{errors.password}</p>}
        </section>

        <section className={`${style["section-buttons"]}`}>
          <button className='button button-red' onClick={deleteHandler}>
            Delete account
          </button>
          <button className='button button-yellow' onClick={resetHandler}>
            Reset
          </button>
          <button className='button button-green' onClick={saveHandler}>
            Save changes
          </button>
        </section>
      </div>
    </form>
  );
};

export default MyProfile;
