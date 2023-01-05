import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getOneRecipe } from "../../stateManagement/actions/recipeActions";
import { icons } from "../../utils/helpers/assets";

const BackHomeButton = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(getOneRecipe({}));
    navigate("/home");
  };

  return (
    <img
      className={className}
      src={icons.back}
      alt='Back to Home'
      onClick={backHandler}
    />
  );
};

export default BackHomeButton;
