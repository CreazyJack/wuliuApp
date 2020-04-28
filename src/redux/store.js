import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/reducers';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'data', // 对于数据 key 的定义
  storage: AsyncStorage, // 选择的存储引擎
  blacklist: ['mainReducer', 'userReducer'],
};

// 对 reducers 的封装处理
const persistedReducer = persistReducer(persistConfig, reducers);
// 处理后的 reducers 需要作为参数传递在 createStore 中
const store = createStore(persistedReducer, applyMiddleware());
// 持久化 store
let persistor = persistStore(store);
export {store, persistor};
