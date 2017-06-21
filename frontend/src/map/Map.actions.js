import $ from 'jquery';
let google;

export const changeZip = (value) => {
    return {
        type: "change-zip",
        value
    };
};

export const showMap = (zip) => {
    var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

    let map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });
    let service = new google.maps.places.PlacesService(map);
    let request = {
        query: `parks near ${zip}`
    };
    service.textSearch(request, (results, status) => {
        console.log(results);
        console.log(status);
    });
    return {
        type: "show-map"
    };
};

const showParksAndWeather = (data) => {
    return {
        type: 'show-parks-and-weather',
        payload: data
    };
};

export const getParksAndWeather = (zip) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:4000/api/parks_and_weather/' + zip.toString(),
            dataType: 'json'
        })
        .then(result => dispatch(showParksAndWeather(result)))
        .catch(err => console.log(err));
    };
    return asyncAction;
}

export const resetZip = () => {
    return {
        type: 'reset-zip'
    };
}

const showWeather = (data) => {
    return {
        type: 'show-weather',
        payload: data
    };
};

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

export const selectPark = (park, park_object_from_planning) => {
    return {
        type: 'select-park',
        park
    };
};

export const removePark = (park) => { //we pass the entire park object into the function so we can save it to the select_parks array in the state
    return {type: 'remove-park', park};
};

export const setDay = (str) => {
    return {
        type: 'select-day',
        day: str
    };
};

export const changeTime = (val, type) => {
    if (type === 'hour') {
        return {
            type: "change-hour",
            val
        };
    } else if (type === 'ampm') {
        return {
            type: "change-ampm",
            val
        };
    } else {
        return {
            type: "change-minute",
            val
        };
    }
};

export const enterTime = (hh,mm,ampm) => {
    let time_of = hh.toString() + ":" + mm.toString() + " " + ampm.toString();
    return {
        type: 'select-time',
        time: time_of
    };
};
