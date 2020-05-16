import productReducer from './productReducer';
import marketReducer from './marketReducer';
import sellerReducer from './sellerReducer';

import basketReducer from './basketReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import filterReducer from './filterReducer';
import checkoutReducer from './checkoutReducer';
import userReducer from './userReducer';
import appReducer from './appReducer';

const rootReducer = {
  products: productReducer,
  market: marketReducer,
  seller: sellerReducer,
  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  users: userReducer,
  checkout: checkoutReducer,
  app: appReducer,
};

export default rootReducer;
