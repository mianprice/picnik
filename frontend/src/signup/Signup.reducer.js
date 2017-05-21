let INITIAL_STATE = {
    current_section: 0,
    email: "",
    user_name: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    of_age: false,
    piquant: 3,
    meaty: 3,
    sweet: 3,
    salty: 3,
    bitter: 3,
    sour_taste: 3,
    mexican: true,
    italian: true,
    greek: true,
    hungarian: true,
    swedish: true,
    american: true,
    japanese: true,
    chinese: true,
    chardonnay: true,
    cabernet: true,
    malbec: true,
    pinot_noir: true,
    champagne: true,
    riesling: true,
    rose: true,
    barbera: true,
    ipa: true,
    pale_ale: true,
    lager: true,
    tripel: true,
    lambic: true,
    stout: true,
    porter: true,
    doppelbock: true,
    gose: true,
    sour: true,
    editing: false
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'set-taste') {
        return Object.assign({}, state, {
            [action.flavor]: action.level
        });
    } else if (action.type === 'set-cuisine-and-drinks') {
        return Object.assign({}, state, {
            [action.cuisine]: !state[action.cuisine]
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
        });;
    }
    return state;
};
