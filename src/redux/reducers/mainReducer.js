const initState = {
  isLogin: false,
  hasRegister: false,
  data: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'addMessage':
      return {
        ...state,
        data: [...action.data],
      };
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
    case 'registerJob':
      return {
        ...state,
        hasRegister: true,
      };
    case 'cancelJob':
      return {
        ...state,
        hasRegister: false,
      };
    default:
      return state;
  }
};
