import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Sound from "../components/navBar/Sound";
import useModal from "../utils/hooks/useModal";
import Search from "../components/navBar/Search";
import Filters from "../components/navBar/Filters";
import UserMenu from "../components/navBar/UserMenu";
import LoginButton from "../components/navBar/LoginButton";
import { currentPg, filters } from "../stateManagement/actions/recipeActions";
import { logo, profilePhoto, icons } from "../utils/helpers/assets";
import { clearURL } from "../stateManagement/actions/urlActions";
import { darkTheme, lightTheme } from "../stateManagement/actions/themeActions";

import style from "./navBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch(),
    { pathname } = useLocation(),
    navigate = useNavigate(),
    [isOpen, openFilters, closeFilters] = useModal(),
    [isOpenUser, openUser, closeUser] = useModal(),
    [active, setActive] = useState({ diet: "inactive", recipe: "active" }),
    userState = useSelector((state) => state.users),
    themeState = useSelector((state) => state.theme);

  const { user } = userState,
    { theme } = themeState;
  useEffect(() => {
    if (pathname === "/diets") {
      setActive({ diet: "active", recipe: "inactive" });
    } else {
      setActive({ diet: "inactive", recipe: "active" });
    }
  }, [pathname]);

  const themeHandler = () => {
    if (theme === "dark") {
      dispatch(lightTheme());
    } else {
      dispatch(darkTheme());
    }
  };

  const logoHandler = () => {
    dispatch(filters({}));
    dispatch(clearURL());
    dispatch(currentPg(1));
    navigate("/home");
  };

  return (
    <header className={`${style["header"]} ${style[theme]}`}>
      <nav className={style["nav"]}>
        <h1 className={style["title"]}>What are we cooking today?</h1>

        {user ? (
          <img
            className={style["user"]}
            onClick={openUser}
            src={profilePhoto[parseInt(user.image)]}
            alt='My profile photo'
          />
        ) : (
          <LoginButton theme={theme} />
        )}
        <UserMenu isOpen={isOpenUser} close={closeUser} theme={theme} />

        <NavLink
          className={`${style["create-recipe"]} ${style[theme]}`}
          to='/create-recipe'
        >
          Create Recipe
        </NavLink>

        <NavLink
          className={`${style["diets"]} ${style[active.diet]} ${style[theme]}`}
          to='/diets'
        >
          Diets
        </NavLink>

        <img className={style["logo-small"]} src={logo.small} alt='Logo' />
        <img
          className={style["logo-large"]}
          onClick={logoHandler}
          src={logo.large}
          alt='Logo'
        />
        <NavLink
          className={`${style["recipes"]} ${style[active.recipe]} ${
            style[theme]
          }`}
          to='/home'
        >
          Recipes
        </NavLink>

        <Search
          searchIcon={icons.search}
          clearIcon={icons.reload}
          theme={theme}
        />

        <img
          className={`icon-blue ${style["filter"]}`}
          src={icons.filter}
          alt='Filters'
          onClick={openFilters}
        />

        <Filters
          isOpen={isOpen}
          close={closeFilters}
          clearIcon={icons.reload}
          theme={theme}
        />
        <img
          className={`${style["theme"]}`}
          onClick={themeHandler}
          src={icons[theme]}
          alt='Change theme'
        />
        <Sound pause={icons.soundOn} play={icons.soundOff} />
      </nav>
    </header>
  );
};

export default NavBar;
