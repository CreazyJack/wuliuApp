const initState = {
  isLogin: false,
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
    default:
      return state;
  }
};
