
import {hashHistory} from 'react-router';

export const goToSignup = () => {
    hashHistory.push('/signup');
    return {
        type: 'edit-profile'
    };
};
