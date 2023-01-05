import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  cuisinesInfo,
  dietsInfo,
  dishTypesInfo,
  occasionsInfo,
} from "../../utils/helpers/dataForm";
import BackHomeButton from "../others/BackHomeButton";
import useForm from "../../utils/hooks/useForm";
import { icons, logo } from "../../utils/helpers/assets";
import validationsRecipe from "../../utils/helpers/validationsRecipe";
import { newMessage } from "../../stateManagement/actions/messageActions";
import { loadOff, loadOn } from "../../stateManagement/actions/loadActions";

import imageNotFound from "../../assets/notFound/image-not-found.jpg";

import style from "./recipeForm.module.css";

const RecipeForm = ({
  initialForm,
  axiosHandler,
  ingredientsState,
  stepsState,
  titlePage,
  messageConfirm,
}) => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    [steps, setSteps] = useState(stepsState),
    [flexblox, setFlexblox] = useState(1),
    [ingredientsList, setIngredientsList] = useState(ingredientsState),
    userState = useSelector((state) => state.users),
    themeState = useSelector((state) => state.theme);

  const { user } = userState,
    { theme } = themeState;

  const {
    form,
    errors,
    setErrors,
    setForm,
    checkMultipleHandler,
    changeHandler,
    blurHandler,
  } = useForm(initialForm, validationsRecipe);

  const {
    title,
    summary,
    ingredients,
    instructions,
    image,
    cuisines,
    country,
    servings,
    healthScore,
    time,
    diets,
    dishTypes,
    occasions,
  } = form;

  const body = {
    idUser: user.id,
    title,
    summary,
    ingredients,
    instructions,
    image,
    cuisines: [],
    servings: parseInt(servings),
    healthScore: parseInt(healthScore),
    time: parseInt(time),
    diets: [],
    dishTypes: [],
    occasions: [],
  };

  const prevHandler = (event) => {
    event.preventDefault();
    setFlexblox(flexblox - 1);
  };

  const nextHandler = (event) => {
    event.preventDefault();
    blurHandler(event);
    if (flexblox === 1) {
      if (
        !errors.image &&
        !errors.title &&
        !errors.summary &&
        title.length > 0 &&
        summary.length > 0
      ) {
        setFlexblox(flexblox + 1);
      }
    } else if (flexblox === 2) {
      if (ingredientsList.length === 0) {
        setErrors({
          ...errors,
          ingredients: "You must add at least one ingredient.",
        });
        return;
      }
      if (steps.length === 0) {
        setErrors({
          ...errors,
          instructions: "You must add at least one instruction.",
        });
        return;
      }
      setFlexblox(flexblox + 1);
    } else if (flexblox === 3) {
      if (
        !errors.servings &&
        servings > 0 &&
        !errors.healthScore &&
        servings > 0 &&
        !errors.time &&
        servings > 0 &&
        !errors.country
      ) {
        setFlexblox(flexblox + 1);
      }
    }
  };

  const backHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/home");
  };

  const addHandler = (event) => {
    event.preventDefault();
    const { name } = event.target;
    if (name === "step") {
      setSteps([...steps, { id: steps.length, name: instructions }]);
      setForm({ ...form, instructions: "" });
    } else {
      setIngredientsList([
        ...ingredientsList,
        { id: ingredientsList.length, name: ingredients },
      ]);
      setForm({ ...form, ingredients: "" });
    }
  };

  const removeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "step") {
      const stepRemove = steps.filter((step) => step.id !== parseInt(value));
      setSteps([...stepRemove]);
    } else {
      const ingRevome = ingredientsList.filter(
        (ing) => ing.id !== parseInt(value)
      );
      setIngredientsList([...ingRevome]);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(loadOn());
    if (body.image.length === 0) {
      body.image = imageNotFound;
    }
    if (ingredientsList.length === 0) {
      setErrors({
        ...errors,
        ingredients: "You must add at least one ingredient.",
      });
      return;
    }
    if (steps.length === 0) {
      setErrors({
        ...errors,
        instructions: "You must add at least one instruction.",
      });
      return;
    }
    if (Object.keys(errors).length === 0) {
      body.ingredients = ingredientsList.map((ing) => ing.name);
      body.instructions = steps.map((ins) => ins.name);
      cuisines && body.cuisines.push(cuisines);
      country.length > 0 && body.cuisines.push(country);
      for (let diet in diets) {
        if (diets[diet]) {
          body.diets.push(diet);
        }
      }
      for (let dish in dishTypes) {
        if (dishTypes[dish]) {
          body.dishTypes.push(dish);
        }
      }
      for (let occ in occasions) {
        if (occasions[occ]) {
          body.occasions.push(occ);
        }
      }
      try {
        const newRecipe = await axiosHandler(body);
        dispatch(loadOff());
        dispatch(newMessage(messageConfirm, "success"));
        navigate(`/recipe/${newRecipe.data.id}`);
      } catch (error) {
        dispatch(loadOff());
        dispatch(newMessage(error.response.data.error, "error"));
      }
    }
  };

  return (
    <div className={`${style["container"]} ${style[theme]}`}>
      <header className={`${style["header"]} ${style[theme]}`}>
        <BackHomeButton className={`icon-red ${style["back-button"]}`} />
        <h1>{titlePage}</h1>
        <img className={`${style["logo"]}`} src={logo.large} alt='Logo' />
      </header>

      <form className={`${style["form"]} ${style[theme]} `}>
        <div className={`${style[`flexbox-${flexblox}`]}`}>
          <section className={`${style["section-one"]} ${style[theme]}`}>
            <div className={`${style["image-container"]}`}>
              <img
                srcSet={image}
                src={imageNotFound}
                alt='Image of the recipe.'
              />
            </div>
            <label className={`${style["label-inline-block"]}`} htmlFor='image'>
              URL
            </label>
            <input
              className={`${style["inline-block"]}`}
              id='image'
              type='text'
              name='image'
              placeholder='e.g. http://www.example.com/'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={image}
              autoComplete='off'
            />
            {errors.image && <p className='error'>{errors.image}</p>}

            <label className={`${style["label"]}`} htmlFor='title'>
              Title *
            </label>
            <input
              className={`${style["input"]}`}
              id='title'
              type='text'
              name='title'
              placeholder='e.g. Chocolate Cake'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={title}
              required
              autoComplete='off'
            />
            {errors.title && <p className='error'>{errors.title}</p>}

            <label className={`${style["label"]}`} htmlFor='summary'>
              Summary *
            </label>
            <textarea
              className={`${style["input"]}`}
              id='summary'
              name='summary'
              placeholder='e.g. This is a recipe that has been in my family for many generations...'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={summary}
              minLength='30'
              required
              autoComplete='off'
            />
            {errors.summary && <p className='error'>{errors.summary}</p>}

            <button
              className={`button button-red button-left ${style["button-red"]} ${style[theme]}`}
              onClick={backHandler}
            >
              {"< Back"}
            </button>
            <button
              className={`button button-yellow button-right ${style["button-yellow"]}`}
              onClick={nextHandler}
            >
              {"Next >"}
            </button>
          </section>

          <section className={`${style["section-two"]} ${style[theme]}`}>
            <label className={`${style["label"]}`} htmlFor='ingredients'>
              Ingredients *
            </label>
            {ingredientsList.length > 0 && (
              <>
                {ingredientsList.map((ing, index) => {
                  return (
                    <div
                      key={`ing-form-${index}`}
                      className={`${style["ingredients"]}`}
                    >
                      <p className={`${style["number"]}`}>{index + 1}</p>
                      <p className={`${style["ingredient"]}`}>{ing.name}</p>
                      <button
                        className={`${style["x-button"]}`}
                        onClick={removeHandler}
                        value={ing.id}
                        name='ingredient'
                      ></button>
                      <img
                        src={icons.cancel}
                        alt='X'
                        className={`icon-blue ${style["x-icon"]} ${style[theme]}`}
                      />
                    </div>
                  );
                })}
              </>
            )}
            <input
              className={`${style["inline-block"]}`}
              id='ingredients'
              type='text'
              name='ingredients'
              placeholder='e.g. 1kg of flour'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={ingredients}
              autoComplete='off'
            />
            <button
              className={`button button-blue button-right ${style["button-blue"]}  ${style[theme]}`}
              onClick={addHandler}
              name='ingredient'
            >
              Add
            </button>
            <button
              className={`button button-white button-right ${style["button-white"]}  ${style[theme]}`}
              onClick={addHandler}
              name='ingredient'
            >
              Add
            </button>
            {errors.ingredients && (
              <p className='error'>{errors.ingredients}</p>
            )}

            <label className={`${style["label"]}`} htmlFor='instructions'>
              Instructions *
            </label>
            {steps.length > 0 && (
              <>
                {steps.map((step, index) => {
                  return (
                    <div
                      key={`ins-form-${index}`}
                      className={`${style["instructions"]}`}
                    >
                      <p className={`${style["number"]}`}>{index + 1}</p>
                      <p className={`${style["instruction"]}`}>{step.name}</p>
                      <button
                        className={`${style["x-button"]}`}
                        onClick={removeHandler}
                        value={step.id}
                        name='step'
                      ></button>
                      <img
                        className={`icon-blue ${style["x-icon"]} ${style[theme]}`}
                        src={icons.cancel}
                        alt='X'
                      />
                    </div>
                  );
                })}
              </>
            )}
            <div className={`${style["container-input"]}`}>
              <textarea
                className={`${style["inline-block"]}`}
                id='instructions'
                type='text'
                name='instructions'
                placeholder='e.g. Preheat oven to 180 °C.'
                onBlur={blurHandler}
                onChange={changeHandler}
                value={instructions}
                minLength='10'
                autoComplete='off'
              />
              <button
                className={`button button-blue button-right ${style["button-blue"]}  ${style[theme]}`}
                onClick={addHandler}
                name='step'
              >
                Add
              </button>
              <button
                className={`button button-white button-right ${style["button-white"]}  ${style[theme]}`}
                onClick={addHandler}
                name='step'
              >
                Add
              </button>
            </div>
            {errors.instructions && (
              <p className='error'>{errors.instructions}</p>
            )}
            <br />
            <button
              className={`button button-blue button-left ${style["button-blue"]}  ${style[theme]}`}
              onClick={prevHandler}
            >
              {"< Prev"}
            </button>
            <button
              className={`button button-white button-left ${style["button-white"]}  ${style[theme]}`}
              onClick={prevHandler}
            >
              {"< Prev"}
            </button>
            <button
              className={`button button-yellow button-right ${style["button-yellow"]}`}
              onClick={nextHandler}
            >
              {"Next >"}
            </button>
          </section>

          <section className={`${style["section-three"]} ${style[theme]}`}>
            <label className={`${style["label"]}`} htmlFor='servings'>
              Servings *
            </label>
            <input
              className={`${style["input"]}`}
              id='servings'
              type='number'
              name='servings'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={servings}
              required
              autoComplete='off'
            />
            {errors.servings && <p className='error'>{errors.servings}</p>}

            <label className={`${style["label"]}`} htmlFor='healthScore'>
              Health Score *
            </label>
            <input
              className={`${style["input"]}`}
              id='healthScore'
              type='number'
              name='healthScore'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={healthScore}
              required
              autoComplete='off'
            />
            {errors.healthScore && (
              <p className='error'>{errors.healthScore}</p>
            )}

            <label className={`${style["label"]}`} htmlFor='time'>
              Preparation time *
            </label>
            <input
              className={`${style["input"]}`}
              id='time'
              type='number'
              name='time'
              onBlur={blurHandler}
              onChange={changeHandler}
              value={time}
              required
              autoComplete='off'
            />
            {errors.time && <p className='error'>{errors.time}</p>}

            <label className={`${style["label"]}`}>Cuisines</label>
            {cuisinesInfo.map((cuisine, index) => {
              let value = false;
              cuisines === cuisine && (value = true);
              return (
                <div
                  key={`cuisine-form-${index}`}
                  className={`${style["cuisine"]}`}
                >
                  <input
                    className={`${style["inline-block"]}`}
                    type='radio'
                    id={cuisine}
                    name='cuisines'
                    value={cuisine}
                    checked={value}
                    onChange={changeHandler}
                  />
                  <label
                    className={`${style["label-inline-block"]}`}
                    htmlFor={cuisine}
                  >
                    {cuisine}
                  </label>
                </div>
              );
            })}
            {cuisines && (
              <>
                <label className={`${style["label"]}`} htmlFor='country'>
                  Country:
                </label>
                <input
                  className={`${style["input"]}`}
                  id='country'
                  type='text'
                  name='country'
                  placeholder='e.g. Mexico'
                  onBlur={blurHandler}
                  onChange={changeHandler}
                  value={country}
                  autoComplete='off'
                />
              </>
            )}
            {errors.country && <p className='error'>{errors.country}</p>}

            <button
              className={`button button-blue button-left ${style["button-blue"]} ${style[theme]}`}
              onClick={prevHandler}
            >
              {"< Prev"}
            </button>
            <button
              className={`button button-white button-left ${style["button-white"]} ${style[theme]}`}
              onClick={prevHandler}
            >
              {"< Prev"}
            </button>
            <button
              className={`button button-yellow button-right ${style["button-yellow"]}`}
              onClick={nextHandler}
            >
              {"Next >"}
            </button>
          </section>

          <section className={`${style["section-four"]} ${style[theme]}`}>
            <p className={`${style["label"]}`}>Diets</p>
            <div className={`${style["diets-container"]}`}>
              {dietsInfo.map((diet, index) => {
                let value = false;
                diets[diet.alias] && (value = true);
                return (
                  <div
                    key={`diets-form-${index}`}
                    className={`${style["diets"]}`}
                  >
                    <input
                      className={`${style["inline-block"]}`}
                      type='checkbox'
                      id={diet.alias}
                      name='diets'
                      value={diet.alias}
                      checked={value}
                      onChange={checkMultipleHandler}
                    />
                    <label
                      className={`${style["label-inline-block"]}`}
                      htmlFor={diet.alias}
                    >
                      {diet.name} <abbr title={diet.summary}>?</abbr>
                    </label>
                  </div>
                );
              })}
            </div>
            {errors.diets && <p className='error'>{errors.diets}</p>}

            <p className={`${style["label"]}`}>Dish types</p>
            <div className={`${style["dish-container"]}`}>
              {dishTypesInfo.map((dish, index) => {
                let value = false;
                dishTypes[dish.alias] && (value = true);
                return (
                  <div
                    key={`dish-form-${index}`}
                    className={`${style["dish"]}`}
                  >
                    <input
                      className={`${style["inline-block"]}`}
                      type='checkbox'
                      id={dish.alias}
                      name='dishTypes'
                      value={dish.alias}
                      checked={value}
                      onChange={checkMultipleHandler}
                    />
                    <label
                      className={`${style["label-inline-block"]}`}
                      htmlFor={dish.alias}
                    >
                      {dish.name}
                    </label>
                  </div>
                );
              })}
            </div>
            {errors.dishTypes && <p className='error'>{errors.dishTypes}</p>}

            <p className={`${style["label"]}`}>Occasions</p>
            <div className={`${style["occasions-container"]}`}>
              {occasionsInfo.map((occasion, index) => {
                let value = false;
                occasions[occasion.alias] && (value = true);
                return (
                  <div
                    key={`occs-form-${index}`}
                    className={`${style["occasions"]}`}
                  >
                    <input
                      className={`${style["inline-block"]}`}
                      type='checkbox'
                      id={occasion.alias}
                      name='occasions'
                      value={occasion.alias}
                      checked={value}
                      onChange={checkMultipleHandler}
                    />
                    <label
                      className={`${style["label-inline-block"]}`}
                      htmlFor={occasion.alias}
                    >
                      {occasion.name}
                    </label>
                  </div>
                );
              })}
            </div>
            {errors.occasions && <p className='error'>{errors.occasions}</p>}
            <br />
            <br />
            <button
              className={`button button-blue button-left ${style["button-blue"]}  ${style[theme]}`}
              onClick={prevHandler}
            >
              {"< Prev"}
            </button>
            <button
              className={`button button-white button-left ${style["button-white"]}  ${style[theme]}`}
              onClick={prevHandler}
            >
              {"< Prev"}
            </button>
            <button
              className={`button button-green button-right ${style["button-green"]}`}
              onClick={submitHandler}
            >
              Publish recipe
            </button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
