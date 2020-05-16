import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { editSeller } from 'actions/sellerActions';

import SellerForm from './SellerForm';

const EditSeller = (props) => {
  const { seller, isLoading } = useSelector(state => ({
    seller: state.market.items.find(seller => seller.id === props.match.params.id),
    isLoading: state.app.loading
  }));
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    dispatch(editSeller(seller.id, updates));
  };

  return (
    <>
      {!seller && <Redirect to="/dashboard/market" />}
      <h2>Edition marchand</h2>
      <SellerForm 
          isLoading={isLoading}
          onSubmit={onSubmitForm}
          seller={seller} 
      />
    </>
  );
};

export default withRouter(EditSeller);
