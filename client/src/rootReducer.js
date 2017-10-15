import { combineReducers } from 'redux';

import auth from './modules/auth';
import users from './modules/users';
import form from './modules/form';
import nav from './modules/nav';
import photos from './modules/photos';
import profiles from './modules/profiles';
import cards from './modules/cards';

const rootReducer = combineReducers({
    [auth.constants.NAME]: auth.reducer,
    [users.constants.NAME]: users.reducer,
    [nav.constants.NAME]: nav.reducer,
    [photos.constants.NAME]: photos.reducer,
    [profiles.constants.NAME]: profiles.reducer,
    [cards.constants.NAME]: cards.reducer,
    [form.constants.NAME]: form.reducer
});

export default rootReducer;