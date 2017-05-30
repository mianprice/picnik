let INITIAL_STATE = {
    current_section: 0,
    email: "",
    user_name: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    of_age: false,
    taste_profile: {
        piquant: 3,
        meaty: 3,
        sweet: 3,
        salty: 3,
        bitter: 3,
        sour_taste: 3
    },
    cuisine_profile: {
        mexican: true,
        italian: true,
        mediterranean: true,
        thai: true,
        barbecue: true,
        american: true,
        japanese: true,
        chinese: true
    },
    wine_profile: {
        dry_whites: true,
        sweet_whites: true,
        rich_whites: true,
        light_reds: true,
        medium_reds: true,
        bold_reds: true,
        sparkling: true,
    },
    beer_profile: {
        ipa: true,
        pale_ale: true,
        lager: true,
        belgian: true,
        wheat: true,
        stout: true,
        porter: true,
        pilsner: true,
        saison: true,
        sours: true
    },
    editing: false
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'set-taste') {
        let taste_profile = Object.assign({}, state.taste_profile, {
            [action.flavor]: action.level
        });
        return Object.assign({}, state, {
            taste_profile
        });
    } else if (action.type === 'set-cuisine') {
        let cuisine_profile = Object.assign({}, state.cuisine_profile, {
            [action.cuisine]: !state.cuisine_profile[action.cuisine]
        });
        return Object.assign({}, state, {
            cuisine_profile
        });
    } else if (action.type === 'set-wine') {
        let wine_profile = Object.assign({}, state.wine_profile, {
            [action.wine]: !state.wine_profile[action.wine]
        });
        return Object.assign({}, state, {
            wine_profile
        });
    } else if (action.type === 'set-beer') {
        let beer_profile = Object.assign({}, state.beer_profile, {
            [action.beer]: !state.beer_profile[action.beer]
        });
        return Object.assign({}, state, {
            beer_profile
        });
    } else if (action.type === 'next-signup') {
        return Object.assign({}, state, {
            current_section: state.current_section + 1
        });
    } else if (action.type === 'last-signup') {
        return Object.assign({}, state, {
            current_section: state.current_section - 1
        });
    } else if (action.type === 'set-basic-signup') {
        return Object.assign({}, state, {
            [action.id]: action.value
        });
    } else if (action.type === "logout") {
        return INITIAL_STATE;
    } else if (action.type === "edit-profile") {
        return Object.assign({}, state, {
            editing: true
        });
    }
    return state;
};
