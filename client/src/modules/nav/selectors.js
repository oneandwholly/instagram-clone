//import { createSelector } from 'reselect';
import _ from 'lodash';
import { NAME } from './constants';
import { getVisibilityProp, getTopNavProp, getBottomNavProp, getActiveProp, getMainProp, getOptionsProp, getMoreProp, getMorePhotoIdProp, getMoreUsernameProp} from './model';

export const selectAll = state => state[NAME];

export const selectVisibility = _.flow(selectAll, getVisibilityProp);

export const selectTopNav = _.flow(selectAll, getVisibilityProp, getTopNavProp);

export const selectBottomNav = _.flow(selectAll, getVisibilityProp, getBottomNavProp);

export const selectMain = _.flow(selectAll, getVisibilityProp, getMainProp);

export const selectOptions = _.flow(selectAll, getVisibilityProp, getOptionsProp);

export const selectMore = _.flow(selectAll, getVisibilityProp, getMoreProp);

export const selectActive = _.flow(selectAll, getActiveProp);

export const selectMorePhotoId = _.flow(selectAll, getMorePhotoIdProp);

export const selectMoreUsername = _.flow(selectAll, getMoreUsernameProp);

// export const getCompleted = _.compose(filterCompleted, getAll);
//
// export const getActive = _.compose(filterActive, getAll);
//
// export const getCounts = createSelector(
//   getAll,
//   getCompleted,
//   getActive,
//   (allTodos, completedTodos, activeTodos) => ({
//     all: allTodos.length,
//     completed: completedTodos.length,
//     active: activeTodos.length
//   })
// );
