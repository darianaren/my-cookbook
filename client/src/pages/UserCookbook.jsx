import { useState } from "react";
import { useSelector } from "react-redux";

import AnyRecipe from "../components/recipes/AnyRecipe";
import MyRecipes from "../components/cookbook/MyRecipes";
import Favorites from "../components/cookbook/Favorites";
import BackHomeButton from "../components/others/BackHomeButton";
import AllRecipes from "../components/cookbook/AllRecipes";
import { icons, profilePhoto } from "../utils/helpers/assets";

import style from "./userCookbook.module.css";

const CookBook = () => {
  const [buttonValue, setButtonValue] = useState("all recipes"),
    [recipes, setRecipes] = useState("active"),
    [myFavs, setMyFavs] = useState("inactive"),
    [myRecipes, setMyRecipes] = useState("inactive"),
    themeState = useSelector((state) => state.theme),
    userState = useSelector((state) => state.users),
    { user, recipesUser, recipesFavorites } = userState,
    { theme } = themeState;

  const allRecipes = [...recipesUser, ...recipesFavorites];

  const allHandler = () => {
    setButtonValue("all recipes");
    setRecipes("active");
    setMyFavs("inactive");
    setMyRecipes("inactive");
  };
  const favsHandler = () => {
    setButtonValue("favorites");
    setMyFavs("active");
    setMyRecipes("inactive");
    setRecipes("inactive");
  };
  const myHandler = () => {
    setButtonValue("my recipes");
    setMyRecipes("active");
    setMyFavs("inactive");
    setRecipes("inactive");
  };

  return (
    <div className={`${style["container"]} ${style[theme]}`}>
      <header className={`${style["header"]} ${style[theme]}`}>
        <BackHomeButton className={`icon-red ${style["back-button"]}`} />
        {user && (
          <img
            className={`${style["profile-photo"]}`}
            src={profilePhoto[parseInt(user.image)]}
          />
        )}
        <h1 className={`${style["title"]}`}>{user.cookbook}</h1>
      </header>
      <nav className={`${style["nav-icon"]} ${style[theme]}`}>
        <img
          className={`icon-red ${style["icon-nav"]} ${style[theme]} ${style[recipes]}`}
          src={icons.book}
          alt='All recipes'
          onClick={allHandler}
        />
        <img
          className={`icon-red ${style["icon-nav"]} ${style[theme]} ${style[myFavs]}`}
          src={icons.myFavs}
          alt='My favorites'
          onClick={favsHandler}
        />
        <img
          className={`icon-red ${style["icon-nav"]} ${style[theme]} ${style[myRecipes]}`}
          src={icons.user}
          alt='My recipes'
          onClick={myHandler}
        />
      </nav>
      <div className={`${style["data-container"]}`}>
        {buttonValue === "all recipes" &&
          (allRecipes.length > 0 ? (
            <AllRecipes theme={theme} />
          ) : (
            <AnyRecipe
              title='All my recipes'
              msg='Start creating recipes and save your favorites to find them here.'
            />
          ))}
        {buttonValue === "favorites" &&
          (recipesFavorites.length > 0 ? (
            <Favorites theme={theme} />
          ) : (
            <AnyRecipe
              title='My favorite recipes'
              msg='You have not added any recipe to your favorites list.'
            />
          ))}
        {buttonValue === "my recipes" &&
          (recipesUser.length > 0 ? (
            <MyRecipes theme={theme} />
          ) : (
            <AnyRecipe
              title='My Recipes'
              msg='You have not created a recipe.'
            />
          ))}
      </div>
    </div>
  );
};

export default CookBook;
