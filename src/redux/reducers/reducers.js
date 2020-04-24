import {combineReducers} from 'redux';
import mainReducer from './mainReducer';

// 导出合并后的 reducer
export default combineReducers(
  // 把多个 reducer 作为 combineReducers 的对象参数传入，在外部就可以通过 store.getState().cart 来获取到 cartReducer 里面的 state
  {mainReducer},
);
