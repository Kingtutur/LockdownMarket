import { 
    ADD_SELLER,
    ADD_SELLER_SUCCESS, 
    REMOVE_SELLER, 
    REMOVE_SELLER_SUCCESS,
    EDIT_SELLER, 
    EDIT_SELLER_SUCCESS,
    GET_SELLER,
    GET_SELLER_SUCCESS,
     
  } from 'constants/constants';
  
  export const getSeller = lastRef => ({
    type: GET_SELLER,
    payload: lastRef
  });
  
  export const getSellerSuccess = seller => ({
    type: GET_SELLER_SUCCESS,
    payload: seller
  });
  

  
  export const addSeller = seller => ({
    type: ADD_SELLER,
    payload: seller
  });
  
  export const addSellerSuccess = seller => ({
    type: ADD_SELLER_SUCCESS,
    payload: seller
  });
  
  export const removeSeller = id => ({
    type: REMOVE_SELLER,
    payload: id
  });
  
  export const removeSellerSuccess = id => ({
    type: REMOVE_SELLER_SUCCESS,
    payload: id
  });
  
  export const editSeller = (id, updates) => ({
    type: EDIT_SELLER,
    payload: {
      id,
      updates
    }
  });
  
  export const editSellerSuccess = updates => ({
    type: EDIT_SELLER_SUCCESS,
    payload: updates
  });
  