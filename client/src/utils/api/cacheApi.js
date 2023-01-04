import axios from "axios";

function cacheFunction(callback) {
  const cache = {};
  return async function (arg, reset, resetAll) {
    if (resetAll) {
      for (let argument in cache) {
        delete cache[argument];
      }
      return;
    }
    if (reset) {
      delete cache[arg];
    }
    if (cache.hasOwnProperty(arg)) {
      return cache[arg];
    }
    cache[arg] = await callback(arg);
    return cache[arg];
  };
}

async function dataApi(url) {
  try {
    const recipes = await axios.get(url);
    return recipes.data;
  } catch (error) {
    throw error;
  }
}

export const getApiCache = cacheFunction(dataApi);
