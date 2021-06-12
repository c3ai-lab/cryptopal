// ================================================================================================
// 	File Name: customizer.js
// 	Description:
//  This class handles holds and sets all variables related to the site apperence globally in
//  redux state. The variables are the color mode, navbar style and status and footer style.
// ================================================================================================
import themeConfig from '../../../configs/themeConfig';

const customizerReducer = (state = themeConfig, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, theme: action.mode };
    case 'COLLAPSE_SIDEBAR':
      return { ...state, sidebarCollapsed: action.value };
    case 'CHANGE_NAVBAR_COLOR':
      return { ...state, navbarColor: action.color };
    case 'CHANGE_NAVBAR_TYPE':
      return { ...state, navbarType: action.style };
    case 'CHANGE_FOOTER_TYPE':
      return { ...state, footerType: action.style };
    case 'CHANGE_MENU_COLOR':
      return { ...state, menuTheme: action.style };
    case 'HIDE_SCROLL_TO_TOP':
      return { ...state, hideScrollToTop: action.value };
    default:
      return state;
  }
};

export default customizerReducer;
