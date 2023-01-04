import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllRecipes,
  getOneRecipe,
  originalRecipes,
} from "../../stateManagement/actions/recipeActions";
import { icons } from "../../utils/helpers/assets";
import { getApiCache } from "../../utils/api/cacheApi";
import ConfirmationWindow from "../../layout/ConfirmationWindow";
import { myRecipes } from "../../stateManagement/actions/userActions";
import { newMessage } from "../../stateManagement/actions/messageActions";
import { loadOff, loadOn } from "../../stateManagement/actions/loadActions";
import { confirmationOpen } from "../../stateManagement/actions/confirmationActions";

import style from "./myRecipeCard.module.css";

const MyRecipeCard = ({ id, image, title, theme }) => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    recipesState = useSelector((state) => state.recipes),
    userState = useSelector((state) => state.users);

  const { oneRecipe } = recipesState,
    { user } = userState;

  const cardHandler = (event) => {
    event.preventDefault();
    navigate(`/recipe/${id}`);
  };

  const editHandler = (event) => {
    dispatch(loadOn());
    axios
      .get(`/recipes/${id}`)
      .then((recipe) => dispatch(getOneRecipe(recipe.data)))
      .then(() => {
        dispatch(loadOff());
        navigate(`/update-recipes`);
      })
      .catch((error) => {
        dispatch(loadOff());
        dispatch(newMessage(error.response.data.error, "error"));
      });

    event.stopPropagation();
    event.preventDefault();
  };

  const confirmationHandler = async () => {
    try {
      dispatch(loadOn());
      await axios.delete(`/recipesDb/${oneRecipe.id}`);
      const updatedRecipes = await getApiCache("/recipes", true);
      const recipesUser = await axios.get(`/users/${user.id}/recipes`);

      dispatch(myRecipes(recipesUser.data));
      dispatch(getAllRecipes(updatedRecipes));
      dispatch(originalRecipes(updatedRecipes));
      dispatch(loadOff());
      dispatch(newMessage("The recipe was successfully deleted", "success"));
      dispatch(getOneRecipe({}));
    } catch (error) {
      dispatch(newMessage(error.response.data.error, "error"));
      dispatch(getOneRecipe({}));
    }
  };

  const deleteHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const recipeDelete = await axios.get(`/recipes/${id}`);
    dispatch(getOneRecipe(recipeDelete.data));
    dispatch(confirmationOpen());
  };

  return (
    <article>
      <ConfirmationWindow
        message={`Are you sure you want to delete the ${oneRecipe.title} recipe?`}
        handler={confirmationHandler}
      />
      <div className={`${style["grid"]} ${style[theme]}`} onClick={cardHandler}>
        <div className={style["image-container"]}>
          <img className={style["image"]} src={image} alt={title} />
        </div>

        <div className={`${style["title-container"]} ${style[theme]}`}>
          <div className={`${style["buttons-container"]}`}>
            <img
              className={`icon-red ${style["edit-button"]} ${style["button"]}`}
              src={icons.edit}
              alt='Editar'
              onClick={editHandler}
            />
            <img
              className={`icon-red ${style["delete-button"]} ${style["button"]}`}
              src={icons.deleteIcon}
              alt='Eliminar'
              onClick={deleteHandler}
            />
          </div>
          <h2 className={`${style["title"]} ${style[theme]}`}>{title}</h2>
        </div>
      </div>
    </article>
  );
};

export default MyRecipeCard;
