import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import {
  loginGuest,
  myFavorites,
  myRecipes,
  myUser,
} from "../stateManagement/actions/userActions";
import useForm from "../utils/hooks/useForm";
import validationsLogin from "../utils/helpers/validationsLogin";
import { updateSearch } from "../stateManagement/actions/urlActions";
import { newMessage } from "../stateManagement/actions/messageActions";
import { loadOff, loadOn } from "../stateManagement/actions/loadActions";
import { currentPg, filters } from "../stateManagement/actions/recipeActions";

import food1 from "../assets/food/1.png";
import food2 from "../assets/food/2.png";
import food3 from "../assets/food/3.png";
import food4 from "../assets/food/4.png";
import logo from "../assets/logo/650x700.png";

import style from "./login.module.css";

const initialForm = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    { form, errors, changeHandler, blurHandler } = useForm(
      initialForm,
      validationsLogin
    ),
    { username, password } = form;

  useEffect(() => {
    dispatch(currentPg(1));
    dispatch(updateSearch(""));
    dispatch(filters({}));
  }, []);

  const guestHandler = () => {
    dispatch(loginGuest());
    navigate("/home");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    changeHandler(event);

    if (Object.keys(errors).length === 0) {
      try {
        dispatch(loadOn());
        const login = await axios.put(`http://localhost:5000/users/login`, {
          username,
          password,
        });
        const userId = login.data.id;
        const userLogin = axios.get(`http://localhost:5000/users/${userId}`);
        const recipesUser = axios.get(
          `http://localhost:5000/users/${userId}/recipes`
        );
        const favoritesUser = axios.get(
          `http://localhost:5000/users/${userId}/favorites`
        );
        const [user, recipes, favorites] = await axios.all([
          userLogin,
          recipesUser,
          favoritesUser,
        ]);
        dispatch(myUser(user.data));
        dispatch(myRecipes(recipes.data));
        dispatch(myFavorites(favorites.data));
        dispatch(loadOff());
        navigate("/home");
      } catch (error) {
        dispatch(loadOff());
        dispatch(newMessage(error.response.data.error, "error"));
      }
    }
  };

  return (
    <div className={style["bg-login"]}>
      <article className={style["grid"]}>
        <form
          className={`${style["grid-cell"]} ${style["form"]} ${style["blurred-style"]}`}
        >
          <img className={style["logo"]} src={logo} alt='logo' />
          <input
            className={style["input"]}
            id='username'
            type='text'
            name='username'
            placeholder='username'
            onBlur={blurHandler}
            onChange={changeHandler}
            value={username}
            autoComplete='off'
            required
          />
          {errors.username && <p className='error'>{errors.username}</p>}

          <input
            className={style["input"]}
            id='password'
            type='password'
            name='password'
            placeholder='password'
            onBlur={blurHandler}
            onChange={changeHandler}
            value={password}
            autoComplete='off'
            required
          />
          {errors.password && <p className='error'>{errors.password}</p>}

          <button
            className='button button-block button-red'
            onClick={submitHandler}
          >
            Login
          </button>
          <p className={style["small-letter"]}>
            Don't have an account?{" "}
            <NavLink className={style["link"]} to='/register'>
              Sign up
            </NavLink>
            <br />
            or{" "}
            <span className={style["link"]} onClick={guestHandler}>
              login as a Guest.
            </span>
          </p>
        </form>

        <section className={style["grid-cell"]}>
          <div className={style["carousel"]}>
            <article
              className={`${style["blurred-style"]} ${style["item-carousel"]}`}
            >
              <img className={style["image-carousel"]} src={food1} alt='food' />
              <p className={style["text-carousel"]}>
                <b>More than a hundred</b> recipes to prepare.
              </p>
            </article>
            <article
              className={`${style["blurred-style"]} ${style["item-carousel"]}`}
            >
              <img className={style["image-carousel"]} src={food2} alt='food' />
              <p className={style["text-carousel"]}>
                <b>Filter the recipes</b> according to your tastes.
              </p>
            </article>
            <article
              className={`${style["blurred-style"]} ${style["item-carousel"]}`}
            >
              <img className={style["image-carousel"]} src={food3} alt='food' />
              <p className={style["text-carousel"]}>
                <b>Save your favorite recipes.</b>
              </p>
            </article>
            <article
              className={`${style["blurred-style"]} ${style["item-carousel"]}`}
            >
              <img className={style["image-carousel"]} src={food4} alt='food' />
              <p className={style["text-carousel"]}>
                <b>Share your best recipes</b> with the world.
              </p>
            </article>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Login;
