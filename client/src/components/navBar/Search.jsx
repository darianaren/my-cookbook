import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateSearch } from "../../stateManagement/actions/urlActions";
import { currentPg } from "../../stateManagement/actions/recipeActions";

import style from "../../layout/navBar.module.css";

const Search = ({ searchIcon, clearIcon, theme }) => {
  const dispatch = useDispatch(),
    [mySearch, setMySearch] = useState(""),
    searchState = useSelector((state) => state.urls),
    { search } = searchState;

  const changeHandler = (event) => {
    const { value } = event.target;
    setMySearch(value);
  };

  const clearHandler = async (event) => {
    event.preventDefault();
    dispatch(updateSearch(""));
    setMySearch("");
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    if (mySearch.length > 0) {
      dispatch(currentPg(1));
      dispatch(updateSearch(`?title=${mySearch}`));
    }
  };
  return (
    <>
      <div className={`${style["search"]} ${style[theme]}`}>
        <input placeholder='Search' value={mySearch} onChange={changeHandler} />
        {search.length > 0 && (
          <img
            className='icon-blue'
            src={clearIcon}
            alt='Clear'
            onClick={clearHandler}
          />
        )}
      </div>
      <img
        className={`icon-blue ${style["loupe"]}`}
        onClick={searchHandler}
        src={searchIcon}
        alt='Search'
      />
    </>
  );
};

export default Search;
