import $ from 'jquery';

export const setTaste = (flavor, level) => {
  return {
    type: 'set-taste',
    flavor,
    level
  };
};

export const setCuisineAndDrinks = (cuisine) => {
  return {
    type: 'set-cuisine-and-drinks',
    cuisine
  };
};
