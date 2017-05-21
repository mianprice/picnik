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

export const updateBasicSignup = (id, value) => {
    return {
        type: 'set-basic-signup',
        id,
        value
    };
};

export const nextSignupSection = () => {
    return {
        type: 'next-signup'
    };
};

export const lastSignupSection = () => {
    return {
        type: 'last-signup'
    };
};

export const completeSignup = (signup) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:4000/api/user/signup',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                signup
            })
        })
        .then((data) => dispatch(loginComplete(data)))
        .catch((err) => dispatch(pageError(err)));
    };
    return asyncAction;
};

const loginComplete = (data) => {
    return {
        type: 'login-complete',
        payload: data
    };
};

const pageError = (err) => {
    return {
        type: 'page-error',
        payload: err
    };
};
