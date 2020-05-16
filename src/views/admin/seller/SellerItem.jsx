import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { removeSeller } from 'actions/sellerActions';
import ImageLoader from 'components/ui/ImageLoader';
import {  displayActionMessage } from 'helpers/utils';

const SellerItem = ({ seller, dispatch, history }) => {
  const productRef = useRef(null);

  const onClickEdit = () => {
    history.push(`/dashboard/editSeller/${seller.id}`);
  //  console.log(market.id)
  };

  const onDeleteSeller = () => {
    productRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(removeSeller(seller.id));
    displayActionMessage('Item successfully deleted');
    productRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    productRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">

      <div
          className={`item item-products ${!seller.id && 'item-loading'}`}
          ref={productRef}
      >
        <div className="grid grid-count-6">
          <div className="grid-col">
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{seller.seller_name || <Skeleton width={50}/>}</span>
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{seller.seller_type || <Skeleton width={50}/>}</span>
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{seller.seller_phone || <Skeleton width={50}/>}</span>
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{seller.cut_off_time || <Skeleton width={50}/>}</span>
          </div>
        </div>
        {seller.id && (
          <div className="item-action">
            <button
                className="button button-border button-small"
                onClick={onClickEdit}
            >
              Edit
            </button>
            &nbsp;
            <button
                className="button button-border button-small"
                onClick={onDeleteSeller}
            >
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button
                  className="button button-small button-border"
                  onClick={onCancelDelete}
              >
                No
              </button>
              &nbsp;
              <button
                  className="button button-small"
                  onClick={onConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default withRouter(SellerItem);
