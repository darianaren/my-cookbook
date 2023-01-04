import { useDispatch, useSelector } from "react-redux";
import { newMessage } from "../../stateManagement/actions/messageActions";

import {
  currentPg,
  filteredRecipes,
  filters,
  getAllRecipes,
} from "../../stateManagement/actions/recipeActions";
import {
  cuisinesInfo,
  dietsInfo,
  orderInfo,
  typeInfo,
} from "../../utils/helpers/dataForm";
import useForm from "../../utils/hooks/useForm";
import { getApiCache } from "../../utils/api/cacheApi";
import { updateURL } from "../../stateManagement/actions/urlActions";
import validationsFilter from "../../utils/helpers/validationsFilter";

import style from "./filters.module.css";

const initialForm = {
  order: false,
  types: "all",
  time: 0,
  health: 0,
  cuisines: false,
  diets: {},
};

const Filters = ({ isOpen, close, clearIcon, theme }) => {
  const dispatch = useDispatch();
  const urlState = useSelector((state) => state.urls);
  const { url, search } = urlState;
  const {
    form,
    errors,
    checkMultipleHandler,
    changeHandler,
    blurHandler,
    resetHandlerFilter,
  } = useForm(initialForm, validationsFilter);

  const containerHandler = (event) => event.stopPropagation();

  const clearHandler = (event) => {
    event.preventDefault();
    resetHandlerFilter();
    dispatch(filters({}));
    if (url === "/recipes") {
      getApiCache(url + search).then((recipes) => {
        dispatch(getAllRecipes(recipes));
      });
    }
    dispatch(updateURL("/recipes"));
    dispatch(newMessage("Filters were successfully reestablished.", "success"));
  };

  const submitHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (form.time < 0 || form.health < 0 || form.health > 100) {
      blurHandler();
      return;
    }
    if (Object.keys(errors).length === 0) {
      dispatch(filters(form));
      if (form.types === "all" && url !== "/recipes") {
        dispatch(updateURL("/recipes"));
      } else if (form.types === "db") {
        dispatch(updateURL("/recipesDb"));
      } else if (form.types === "api") {
        dispatch(updateURL("/recipesApi"));
      }
      dispatch(filteredRecipes());
      dispatch(currentPg(1));
      close();
    }
  };

  return (
    <article
      className={`${style["modal"]} ${isOpen && style["is-open"]} ${
        style[theme]
      }`}
      onClick={close}
    >
      <div
        className={`${style["container"]} ${style[theme]}`}
        onClick={containerHandler}
      >
        <div className={style["header"]}>
          <h2 className={style["title"]}>Filter Recipes by:</h2>
          <img
            className={`icon-blue ${style["clear"]} ${style[theme]}`}
            src={clearIcon}
            alt='Clear'
            onClick={clearHandler}
          />
        </div>
        <form className={style["form"]}>
          {/* ORDER BY */}
          <details className={style["filter"]}>
            <summary className={style["border-bottom"]}>Order</summary>
            {orderInfo.map((order) => {
              let value = false;
              form.order === order.alias && (value = true);
              return (
                <div key={order.alias}>
                  <input
                    type='radio'
                    id={order.alias}
                    name='order'
                    value={order.alias}
                    checked={value}
                    onChange={changeHandler}
                  />
                  <label htmlFor={order.alias}>{order.name}</label>
                </div>
              );
            })}
          </details>
          {/* TYPE */}
          <details className={style["filter"]}>
            <summary className={style["border-bottom"]}>Type</summary>
            {typeInfo.map((type) => {
              let value = false;
              form.types === type.alias && (value = true);
              return (
                <div key={type.alias}>
                  <input
                    type='radio'
                    id={type.alias}
                    name='types'
                    value={type.alias}
                    checked={value}
                    onChange={changeHandler}
                  />
                  <label htmlFor={type.alias}>{type.name}</label>
                </div>
              );
            })}
          </details>
          {/* TIME */}
          <details className={`${style["filter"]} ${style[theme]}`}>
            <summary className={style["border-bottom"]}>Time</summary>
            <label htmlFor='time'>Maximum preparation time</label>
            <input
              id='time'
              type='number'
              name='time'
              value={form.time}
              min={0}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
            {errors.time && <p className='error'>{errors.time}</p>}
          </details>
          {/* HEALTH */}
          <details className={`${style["filter"]} ${style[theme]}`}>
            <summary className={style["border-bottom"]}>Health</summary>
            <label htmlFor='health'>Minimum health score</label>
            <input
              id='health'
              type='number'
              name='health'
              value={form.health}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
            {errors.health && <p className='error'>{errors.health}</p>}
          </details>
          {/* CUISINES */}
          <details className={style["filter"]}>
            <summary className={style["border-bottom"]}>Cuisines</summary>
            {cuisinesInfo.map((cuisine, index) => {
              let value = false;
              form.cuisines === cuisine && (value = true);
              return (
                <div key={`cuisine-filter-${index}`}>
                  <input
                    type='radio'
                    id={cuisine}
                    name='cuisines'
                    value={cuisine}
                    checked={value}
                    onChange={changeHandler}
                  />
                  <label htmlFor={cuisine}>{cuisine}</label>
                </div>
              );
            })}
          </details>
          {/* DIETS */}
          <details className={style["filter"]}>
            <summary>Diets</summary>
            {dietsInfo.map((diet, index) => {
              let value = false;
              form.diets[diet.alias] && (value = true);
              return (
                <div key={`diets-filter-${index}`}>
                  <input
                    type='checkbox'
                    id={diet.alias}
                    name='diets'
                    value={diet.alias}
                    checked={value}
                    onChange={checkMultipleHandler}
                  />
                  <label htmlFor={diet.alias}>
                    {diet.name} <abbr title={diet.summary}>?</abbr>
                  </label>
                </div>
              );
            })}
          </details>
          <button className='button button-red' onClick={submitHandler}>
            Filter
          </button>
        </form>
      </div>
    </article>
  );
};

export default Filters;
