import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  getAllRecipes,
  getOneRecipe,
  originalRecipes,
} from "../stateManagement/actions/recipeActions";
import { getApiCache } from "../utils/api/cacheApi";
import { icons, logo } from "../utils/helpers/assets";
import { dietsName } from "../utils/helpers/dataForm";
import BackHomeButton from "../components/BackHomeButton";
import ConfirmationWindow from "../layout/ConfirmationWindow";
import { newMessage } from "../stateManagement/actions/messageActions";
import { loadOff, loadOn } from "../stateManagement/actions/loadActions";
import { myFavorites, myRecipes } from "../stateManagement/actions/userActions";
import { confirmationOpen } from "../stateManagement/actions/confirmationActions";

import style from "./recipe.module.css";
import Error404 from "./Error404";

const Recipe = () => {
  const { id } = useParams(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    [check, setCheck] = useState({}),
    [data, setData] = useState("data-recipe"),
    recipesState = useSelector((state) => state.recipes),
    userState = useSelector((state) => state.users),
    themeState = useSelector((state) => state.theme);

  const { oneRecipe } = recipesState,
    { user, recipesFavorites } = userState,
    { theme } = themeState;

  const {
    title,
    createdInDb,
    createdBy,
    createdAt,
    summary,
    ingredients,
    instructions,
    image,
    servings,
    healthScore,
    time,
    cuisines,
    Diets,
    dishTypes,
    occasions,
  } = oneRecipe;

  let myRecipe = false,
    isMyFavorite = false;

  useEffect(() => {
    dispatch(loadOn());
    axios
      .get(`http://localhost:5000/recipes/${id}`)
      .then((recipe) => dispatch(getOneRecipe(recipe.data)))
      .then(() => dispatch(loadOff()))
      .catch((error) => {
        dispatch(loadOff());
        dispatch(getOneRecipe({}));
        dispatch(newMessage("Recipe not found", "error"));
      });
  }, [id]);

  if (user && createdInDb && user.id === createdBy.id) {
    myRecipe = true;
  }

  if (user && !myRecipe) {
    isMyFavorite = recipesFavorites.find((recipe) => recipe.id == id);
  }

  const dataHandler = () => {
    if (data === "data-recipe") {
      setData("data-info");
    } else {
      setData("data-recipe");
    }
  };

  const checkHandler = (index) => {
    if (check[index]) {
      setCheck({ ...check, [index]: false });
    } else {
      setCheck({ ...check, [index]: true });
    }
  };

  const favoriteHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/favorites/${user.id}/${id}`);
      const favorites = await axios.get(
        `http://localhost:5000/users/${user.id}/favorites`
      );
      dispatch(myFavorites(favorites.data));
    } catch (error) {
      dispatch(newMessage(error.response.data.error, "error"));
    }
  };

  const editHandler = (event) => {
    event.preventDefault();
    navigate(`/update-recipes`);
  };

  const confirmationHandler = async () => {
    try {
      dispatch(loadOn());
      await axios.delete(`http://localhost:5000/recipesDb/${id}`);
      const updatedRecipes = await getApiCache(
        "http://localhost:5000/recipes",
        true
      );
      const recipesUser = await axios.get(
        `http://localhost:5000/users/${user.id}/recipes`
      );

      dispatch(myRecipes(recipesUser.data));
      dispatch(getAllRecipes(updatedRecipes));
      dispatch(originalRecipes(updatedRecipes));
      dispatch(loadOff());
      dispatch(newMessage("The recipe was successfully deleted", "success"));
      navigate("/home");
    } catch (error) {
      dispatch(newMessage(error.response.data.error, "error"));
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    dispatch(confirmationOpen());
  };

  return (
    <>
      {Object.keys(oneRecipe).length === 0 ? (
        <Error404 />
      ) : (
        <article className={`${style["container"]} ${style[theme]}`}>
          {myRecipe && (
            <ConfirmationWindow
              message={"Are you sure you want to delete this recipe?"}
              handler={confirmationHandler}
            />
          )}
          <div className={`${style["main-image-container"]}`}>
            {image && (
              <img
                className={`${style["main-image"]}`}
                src={image}
                alt={title}
              />
            )}
          </div>

          <header className={`${style["header"]} ${style[theme]}`}>
            <div className={`${style["line-one-header"]}`}>
              <BackHomeButton
                className={`icon-white ${style["back-button"]}`}
              />
              <h1 className={`${style["title"]}`}>{title}</h1>

              {user && !myRecipe && !isMyFavorite && (
                <img
                  className={`${style["fav-icon"]} ${style["button"]}`}
                  src={icons.fav}
                  alt='Add to my cookbook'
                  onClick={favoriteHandler}
                />
              )}
              {user && !myRecipe && isMyFavorite && (
                <img
                  className={`${style["fav-icon"]} ${style["button"]}`}
                  src={icons.favFill}
                  alt='Remove to my cookbook'
                  onClick={favoriteHandler}
                />
              )}

              {myRecipe && (
                <>
                  <img
                    className={`icon-white ${style["edit-button"]} ${style["button"]}`}
                    src={icons.edit}
                    alt='Editar'
                    onClick={editHandler}
                  />
                  <img
                    className={`icon-white ${style["delete-button"]} ${style["button"]}`}
                    src={icons.deleteIcon}
                    alt='Eliminar'
                    onClick={deleteHandler}
                  />
                </>
              )}
              {!user && (
                <img
                  className={`${style["logo-small"]}`}
                  src={logo.white}
                  alt='Logo'
                />
              )}
              <img className={`${style["logo"]}`} src={logo.large} alt='Logo' />
            </div>

            {createdInDb && (
              <p className={`${style["created-by"]}`}>
                By <b>{`${createdBy.firstName} ${createdBy.lastName}.`}</b>{" "}
                {`${new Date(createdAt).toUTCString()}`}
              </p>
            )}
          </header>
          <section
            className={`${style["recipe"]} ${style[data]} ${style[theme]}`}
          >
            <div className={`${style["data-buttons"]}`}>
              <p
                className={`${style["main-button"]} ${style["normal-pointer"]}`}
              >
                Recipe
              </p>
              <p className={`${style["button"]}`} onClick={dataHandler}>
                Info
              </p>
            </div>

            <h2 className={`${style["summary-title"]}`}>
              Did you know that...
            </h2>
            {summary && (
              <main
                className={`${style["summary"]}`}
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            )}

            {ingredients && ingredients.length > 0 && (
              <>
                <h2 className={`${style["ingredients-title"]}`}>Ingredients</h2>
                {ingredients.map((ing, index) => (
                  <div
                    key={`ingredient-${index}`}
                    className={`${style["ingredients"]}`}
                    onClick={() => checkHandler(index)}
                  >
                    {!check[index] && (
                      <>
                        <img
                          className={`${style["button"]}`}
                          src={icons.checkboxNo}
                          alt='checkbox no'
                        />
                        <p className={`${style["button"]}`}>{ing}</p>
                      </>
                    )}
                    {check[index] && (
                      <>
                        <img
                          className={`${style["button"]}`}
                          src={icons.checkboxYes}
                          alt='checkbox yes'
                        />
                        <p className={`${style["button"]}`}>
                          <s>{ing}</s>
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}

            {instructions && instructions.length > 0 && (
              <>
                <h2 className={`${style["instructions-title"]}`}>
                  Instructions
                </h2>
                {instructions.map((ins, index) => (
                  <div
                    key={`instruction-${index}`}
                    className={`${style["instructions"]}`}
                  >
                    <p className={`${style["ins-number"]}`}>{index + 1}</p>
                    <p className={`${style["instruction"]}`}>{ins}</p>
                  </div>
                ))}
              </>
            )}
          </section>

          <section
            className={`${style["info"]} ${style[data]} ${style[theme]}`}
          >
            <div className={`${style["data-buttons"]}`}>
              <p className={`${style["button"]}`} onClick={dataHandler}>
                Recipe
              </p>
              <p
                className={`${style["main-button"]} ${style["normal-pointer"]}`}
              >
                Info
              </p>
            </div>
            <div className={`${style["image-info-container"]}`}>
              {image && (
                <img
                  className={`${style["image-info"]}`}
                  src={image}
                  alt={title}
                />
              )}
            </div>

            <div className={`${style["serving-health-time"]}`}>
              {servings && servings > 0 && (
                <>
                  <img
                    className={`icon-blue ${style["serving-icon"]}`}
                    src={icons.servings}
                    alt='servings'
                  />
                  <p className={`${style["serving"]}`}>{servings}</p>
                </>
              )}

              {healthScore && healthScore >= 0 && (
                <>
                  <img
                    className={`icon-blue ${style["health-icon"]}`}
                    src={icons.heart}
                    alt='health'
                  />
                  <p className={`${style["health"]}`}>{healthScore}</p>
                </>
              )}

              {time && time > 0 && (
                <>
                  <img
                    className={`icon-blue ${style["time-icon"]}`}
                    src={icons.clock}
                    alt='time'
                  />
                  <p className={`${style["time"]}`}>{time} min</p>
                </>
              )}
            </div>

            {cuisines && cuisines.length > 0 && (
              <p className={`${style["cuisines"]}`}>
                <b>{"Cuisine(s):"}</b> {cuisines.join(", ")}
              </p>
            )}
            {Diets && Diets.length > 0 && (
              <>
                <h2 className={`${style["diets-title"]}`}>Diets</h2>
                <div className={`${style["diets"]}`}>
                  {Diets.map((diet, index) => (
                    <div
                      key={`diets-recipe-detail-${index}`}
                      className={`${style["diet"]}`}
                    >
                      <img
                        className={`icon-blue ${style["icon-white"]}`}
                        src={icons.check}
                        alt='Check'
                      />
                      <p>{dietsName[diet.name]}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {dishTypes && dishTypes.length > 0 && (
              <>
                <h2 className={`${style["dish-title"]}`}>Dish types</h2>
                <div className={`${style["dishes"]}`}>
                  {dishTypes.map((dish, index) => (
                    <div
                      key={`dish-recipe-detail-${index}`}
                      className={`${style["dish"]}`}
                    >
                      <img
                        className={`icon-blue ${style["icon-white"]}`}
                        src={icons.checkDot}
                        alt='check'
                      />
                      <p>{dish[0].toUpperCase() + dish.substring(1)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {occasions && occasions.length > 0 && (
              <>
                <h2 className={`${style["occasions-title"]}`}>
                  Best occasions to prepare it:
                </h2>
                <div className={`${style["occasions"]}`}>
                  {occasions.map((occ, index) => (
                    <div
                      key={`occasions-recipe-detail-${index}`}
                      className={`${style["occasion"]}`}
                    >
                      <img
                        className={`icon-blue ${style["icon-white"]}`}
                        src={icons.checkDot}
                        alt='check'
                      />
                      <p>{occ[0].toUpperCase() + occ.substring(1)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {Diets &&
              Diets.length === 0 &&
              dishTypes &&
              dishTypes.length === 0 &&
              occasions &&
              occasions.length === 0 && (
                <h2 className={`${style["diets-title"]} ${style["no-data"]}`}>
                  Oops... There is no more information about this recipe.
                </h2>
              )}
          </section>

          {user && !myRecipe && !isMyFavorite && (
            <button
              className={`button button-box button-yellow ${style["fav-button"]}`}
              onClick={favoriteHandler}
            >
              Add to my cookbook
            </button>
          )}
          {user && !myRecipe && isMyFavorite && (
            <button
              className={`button button-box button-yellow ${style["fav-button"]}`}
              onClick={favoriteHandler}
            >
              Remove to my cookbook
            </button>
          )}
        </article>
      )}
    </>
  );
};

export default Recipe;
