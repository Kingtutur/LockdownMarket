import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { applyFilter } from 'actions/filterActions';

const SellerAppliedFilters = ({ filter }) => {
  const dispatch = useDispatch();
  const fields = ['seller_name', 'seller_type'];

  const onRemoveNameFilter = () => {
    dispatch(applyFilter({ seller_name: '' }));
  };


  const onRemoveTypeFilter = () => {
    dispatch(applyFilter({ seller_type: '' }));
  };


  return !fields.some(key => !!filter[key]) ? null : (
    <div className="product-applied-filters">
      {filter.seller_name && (
        <div className="pill-wrapper">
          <span className="d-block">Nom</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">{filter.seller_name}</h5>
            <div className="pill-remove" onClick={onRemoveNameFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}
      {filter.seller_type && (
        <div className="pill-wrapper">
          <span className="d-block">Type</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">{filter.seller_type}</h5>
            <div className="pill-remove"onClick={onRemoveTypeFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

SellerAppliedFilters.propType = {
  filter: PropTypes.shape({
    seller_name: PropTypes.string,
    seller_type: PropTypes.string,

  })
};

export default SellerAppliedFilters;
