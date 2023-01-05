import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { icons } from "../../utils/helpers/assets";
import { dietsName } from "../../utils/helpers/dataForm";
import { loadOn } from "../../stateManagement/actions/loadActions";
import { myFavorites } from "../../stateManagement/actions/userActions";
import { newMessage } from "../../stateManagement/actions/messageActions";

import style from "./favoriteCard.module.css";

const FavoriteCard = ({
  id,
  image,
  title,
  diets,
  healthScore,
  time,
  theme,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  const { user, recipesFavorites } = userState;

  const isMyFavorite = recipesFavorites.find((recipe) => recipe.id == id);

  const cardHandler = () => {
    navigate(`/recipe/${id}`);
  };

  const addFavoriteHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      dispatch(loadOn());
      await axios.put(`/users/favorites/add/${user.id}/${id}`);
      const favorites = await axios.get(`/users/favorites/${user.id}`);
      dispatch(myFavorites(favorites.data));
      dispatch(loadOff());
    } catch (error) {
      dispatch(loadOff());
      dispatch(newMessage(error.response.data.error, "error"));
    }
  };

  const removeFavoriteHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      dispatch(loadOn());
      await axios.put(`/users/favorites/remove/${user.id}/${id}`);
      const favorites = await axios.get(`/users/favorites/${user.id}`);
      dispatch(myFavorites(favorites.data));
      dispatch(loadOff());
    } catch (error) {
      dispatch(loadOff());
      dispatch(newMessage(error.response.data.error, "error"));
    }
  };

  return (
    <article
      className={`${style["grid"]} ${style[theme]}`}
      onClick={cardHandler}
    >
      <div className={style["image-container"]}>
        <img className={style["image"]} src={image} alt={title} />
      </div>

      <div className={`${style["title-container"]} ${style[theme]}`}>
        <h2 className={`${style["title"]} ${style[theme]}`}>{title}</h2>
        {!isMyFavorite && (
          <img
            className={`${style["fav-icon"]}`}
            src={icons.fav}
            alt='Add to my cookbook'
            onClick={addFavoriteHandler}
          />
        )}
        {isMyFavorite && (
          <img
            className={`${style["fav-icon"]}`}
            src={icons.favFill}
            alt='Remove to my cookbook'
            onClick={removeFavoriteHandler}
          />
        )}
      </div>

      {diets && diets.length > 0 ? (
        <div className={style["diets"]}>
          {diets.map((diet, index) => (
            <div key={`diet-card-${index}`}>
              <img className='icon-green' src={icons.check} alt='check' />
              <p>{dietsName[diet.name]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={style["no-diets"]}>
          This recipe does not meet the requirements to belong to any diet.
        </p>
      )}

      <div className={style["health"]}>
        <img
          className={`icon-red ${style["icon"]}`}
          src={icons.heart}
          alt='Health score.'
        />
        <p>{healthScore}</p>
      </div>

      <div className={style["time"]}>
        <img
          className={`icon-blue ${style["icon"]}`}
          src={icons.clock}
          alt='Time of preparation.'
        />
        <p>{time} min</p>
      </div>
    </article>
  );
};

export default FavoriteCard;
