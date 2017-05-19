let INITIAL_STATE = {
    piquant: 1, meaty: 1, sweet: 1, salty: 1, bitter: 1, sour: 1,

    mexican: true, italian: true, greek: true, hungarian: true, swedish: true, american: true, japanese: true, chinese: true,

    chardonnay: true, cabernet: true, malbec: true, pinot_noir: true, champagne: true, riesling: true, rose: true, barbera: true,

    ipa: true, pale_ale: true, lager: true, tripel: true, lambic: true, stout: true, porter: true, doppelbock: true, gose: true, sour: true
};

export default function reducer(state = INITIAL_STATE, action) {
  if(action.type === 'set-taste') {
    return Object.assign({}, state, {
      [action.flavor]: action.level
    })
  } else if (action.type === 'set-cuisine-and-drinks') {
    if (state[action.cuisine] === false) {
      return Object.assign({}, state, {
        [action.cuisine]: true
      });
    } else {
      return Object.assign({}, state, {
        [action.cuisine]: false
      });
    }
  }
  return state;
};
