import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { removeMarket } from 'actions/marketActions';
import ImageLoader from 'components/ui/ImageLoader';
import {  displayActionMessage } from 'helpers/utils';

const MarketItem = ({ market, dispatch, history }) => {
  const productRef = useRef(null);

  const onClickEdit = () => {
    history.push(`/dashboard/editMarket/${market.id}`);
  //  console.log(market.id)
  };

  const onDeleteProduct = () => {
    productRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(removeMarket(market.id));
    displayActionMessage('Item successfully deleted');
    productRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    productRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">

      <div
          className={`item item-products ${!market.id && 'item-loading'}`}
          ref={productRef}
      >
        <div className="grid grid-count-6">
          <div className="grid-col">
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{market.name || <Skeleton width={50}/>}</span>
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{market.market_address || <Skeleton width={50}/>}</span>
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{market.market_date || <Skeleton width={50}/>}</span>
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{market.cut_off_time || <Skeleton width={50}/>}</span>
          </div>
        </div>
        {market.id && (
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
                onClick={onDeleteProduct}
            >
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Etes vous sure?</h5>
              <button
                  className="button button-small button-border"
                  onClick={onCancelDelete}
              >
                Non
              </button>
              &nbsp;
              <button
                  className="button button-small"
                  onClick={onConfirmDelete}
              >
                Oui
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default withRouter(MarketItem);
