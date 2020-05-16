import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { applyFilter } from 'actions/filterActions';

const MarketAppliedFilters = ({ filter }) => {
  const dispatch = useDispatch();
  const fields = ['market_address', 'cut_off_time'];

  const onRemoveAddressFilter = () => {
    dispatch(applyFilter({ market_address: '' }));
  };


  const onRemoveCutOffTimeFilter = () => {
    dispatch(applyFilter({ cut_off_time: '' }));
  };


  return !fields.some(key => !!filter[key]) ? null : (
    <div className="product-applied-filters">
      {filter.market_address && (
        <div className="pill-wrapper">
          <span className="d-block">Adresse</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">{filter.market_address}</h5>
            <div className="pill-remove" onClick={onRemoveAddressFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}
      {filter.cut_off_time && (
        <div className="pill-wrapper">
          <span className="d-block">Cut of time</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">{filter.cut_off_time}</h5>
            <div className="pill-remove"onClick={onRemoveCutOffTimeFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

MarketAppliedFilters.propType = {
  filter: PropTypes.shape({
    market_address: PropTypes.string,
    cut_off_time: PropTypes.string,

  })
};

export default MarketAppliedFilters;
