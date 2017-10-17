/*
state.nav = {
  visibility: {
      topNav: Boolean,
      bottomNav: Boolean
  },
  active: String
}
*/

export const getVisibilityProp = nav => nav.visibility;

export const getTopNavProp = visibility => visibility.topNav;

export const getBottomNavProp = visibility => visibility.bottomNav;

export const getMainProp = visibility => visibility.mainContent;

export const getOptionsProp = visibility => visibility.options;

export const getMoreProp = visibility => visibility.more;

export const getMorePhotoIdProp = nav => nav.morePhotoId;

export const getMoreUsernameProp = nav => nav.moreUsername;

export const getActiveProp = nav => nav.active;
