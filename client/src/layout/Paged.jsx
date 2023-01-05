import { useDispatch } from "react-redux";

import { currentPg } from "../stateManagement/actions/recipeActions";

import style from "./paged.module.css";

const Paged = ({ numberOfItems, numberPerPage, theme, currentPage }) => {
  const dispatch = useDispatch(),
    prevPage = currentPage - 1,
    nextPage = currentPage + 1,
    firstPage = 1,
    lastPage = Math.ceil(numberOfItems / numberPerPage);

  const clickHandler = (event) => {
    dispatch(currentPg(parseInt(event.target.value)));
  };

  return (
    <div className={`${style["paged"]} ${style[theme]}`}>
      {currentPage !== firstPage && (
        <button
          className={style["button"]}
          onClick={clickHandler}
          value={prevPage}
        >
          {"<"}
        </button>
      )}
      {currentPage !== firstPage && (
        <button
          className={style["button"]}
          onClick={clickHandler}
          value={firstPage}
        >
          {firstPage}
        </button>
      )}

      {currentPage !== firstPage &&
        prevPage !== firstPage &&
        prevPage !== firstPage + 1 && <button>...</button>}

      {currentPage !== firstPage && prevPage !== firstPage && (
        <button
          className={style["button"]}
          onClick={clickHandler}
          value={prevPage}
        >
          {prevPage}
        </button>
      )}

      <button>
        <u>{currentPage}</u>
      </button>

      {!(nextPage >= lastPage) && (
        <button
          className={style["button"]}
          onClick={clickHandler}
          value={nextPage}
        >
          {nextPage}
        </button>
      )}

      {currentPage !== lastPage &&
        nextPage !== lastPage &&
        nextPage + 1 !== lastPage && <button>...</button>}

      {currentPage !== lastPage && (
        <button
          className={style["button"]}
          onClick={clickHandler}
          value={lastPage}
        >
          {lastPage}
        </button>
      )}
      {currentPage !== lastPage && (
        <button
          className={style["button"]}
          onClick={clickHandler}
          value={nextPage}
        >
          {">"}
        </button>
      )}
    </div>
  );
};
export default Paged;
