import $ from 'jquery';

export const changeZip = (value) => {
    return {
        type: "change-zip",
        value
    };
};

export const showMap = () => {
    return {
        type: "show-map"
    };
};

export const resetZip = () => {
    return {
        type: 'reset-zip'
    };
}

export const getWeather = (zip) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            method: 'GET',
            url: `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip},us&APPID=3569484daaaf0e9db08bd8a0189f6692`,
            dataType: 'JSON'
        })
        .then((data) => dispatch(showWeather(data)))
        .catch((error) =>  {throw error});
    };
    return asyncAction;
};

const showWeather = (data) => {
    return {
        type: 'show-weather',
        payload: data
    };
};
