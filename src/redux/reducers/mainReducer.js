const initState = {
  isLogin: false,
  data: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'addMessage':
      // console.log('addMsg');
      // console.log(action);
      // console.log('state', state);
      // state.arr.unshift(action.data);
      return {
        ...state,
        data: [action.data, ...state.data],
      };
    case 'login':
      // console.log('login');
      // console.log(action);
      // console.log('state', state);
      // state.arr.unshift(action.data);
      return {
        ...state,
        isLogin: true,
      };
    case 'logout':
      // console.log('logout');
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};
