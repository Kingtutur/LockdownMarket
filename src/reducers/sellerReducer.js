import { 
    ADD_SELLER_SUCCESS, 
    REMOVE_SELLER_SUCCESS, 
    EDIT_SELLER_SUCCESS,
    GET_SELLER_SUCCESS 
  } from 'constants/constants';
  
  export default (state = {
    lastRefKey: null,
    total: 0,
    items: []
  }, action) => {
    switch (action.type) {
      case   GET_SELLER_SUCCESS :
        return {
          ...state,
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [ ...state.items, ...action.payload.market ]
        };
      case ADD_SELLER_SUCCESS:
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      case REMOVE_SELLER_SUCCESS:
        return {
          ...state,
          items: state.items.filter(seller => seller.id !== action.payload)
        }
      case EDIT_SELLER_SUCCESS:
        return {
          ...state,
          items: state.items.map((seller) => {
            if (seller.id === action.payload.id) {
              return {
                ...seller,
                ...action.payload.updates
              };
            }
            return seller;
          }) 
        };
      default:
        return state;
    }
  };
  