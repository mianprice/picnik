let INITIAL_STATE = {
    search_zip: "",
    link_complete: false,
    weather_data: {},
    weather_ready: false,
    parks_data: {},
    parks_ready: false,
    selected_park: false,
    selected_day: "",
    selected_hour: "",
    selected_minute: ""
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === "change-zip") {
        return Object.assign({}, state, {
            search_zip: action.value
        });
    } else if (action.type === "show-map") {
        return Object.assign({}, state, {
            link_complete: true
        });
    } else if (action.type === "show-weather") {
        return Object.assign({}, state, {
            weather_data: action.payload,
            weather_ready: true
        });
    } else if (action.type === "change-hour") {
        return Object.assign({}, state, {
            selected_day: action.val
        });
    } else if (action.type === "change-minute") {
        return Object.assign({}, state, {
            selected_day: action.val
        });
    } else if (action.type === "show-parks-and-weather") {
        return Object.assign({}, state, {
            weather_data: action.payload.weather,
            weather_ready: true,
            parks_ready: true,
            parks_data: action.payload.parks
        });
    } else if (action.type === "reset-zip") {
        return INITIAL_STATE;
    }
    return state;
};
