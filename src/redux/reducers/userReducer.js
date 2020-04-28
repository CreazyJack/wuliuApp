const initState = {
  isLogin: false,
  isFirstScreen: true,
  data: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLogin: true,
      };
    case 'logout':
      return {
        ...state,
        isLogin: false,
      };
    case 'goLoginScreen':
      return {
        ...state,
        isFirstScreen: false,
      };
    case 'goMainScreen':
      return {
        ...state,
        isFirstScreen: false,
        isLogin: true,
      };
    default:
      return state;
  }
};
