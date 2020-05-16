import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SellerForm from './SellerForm';
import {  addSeller } from 'actions/sellerActions';

const AddSeller = () => {
  const isLoading = useSelector(state => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (seller) => {
    dispatch(addSeller(seller));
  };

  return (
    <div>
      <h2>Nouveau Marchand</h2>
      <SellerForm 
          isLoading={isLoading}
          onSubmit={onSubmit}
      />
    </div>
  );
};

export default withRouter(AddSeller);
