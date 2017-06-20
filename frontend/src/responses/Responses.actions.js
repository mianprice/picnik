import $ from 'jquery';

export const loadPicnikToPlanning = (picnik) => {
    return {type: 'load-picnik-to-planning', picnik };
};
