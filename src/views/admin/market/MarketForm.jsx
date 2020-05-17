import React, { Component } from 'react';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';
// import uuid from 'uuid';

class MarketForm extends Component {
  state = {
    name: this.props.market ? this.props.market.name : '',
    market_address: this.props.market ? this.props.market.market_address : '',
    market_date: this.props.market ? this.props.market.market_date : '',
    cut_off_time: this.props.market ? this.props.market.cut_off_time : '',

  };

  onMarketNameInput = (e) => {
    this.setState({ name: e.target.value });
  }

  onMarketAddressInput = (e) => {
    this.setState({ market_address: e.target.value });
  }

  onMarketCutOffTimeInput = (e) => {
    this.setState({ cut_off_time: e.target.value });
  }
  onMarketDateInput = (e) => {
    this.setState({ market_date: e.target.value });
  }


  onSubmit = (e) => {
    e.preventDefault();
    const { name, cut_off_time, market_address,market_date } = this.state;
    // Object.keys(this.state).every(key => this.state[key] === !!this.state[key])
    if (name && market_address) {
      const market = {
        // id: this.props.product ? this.props.product.id : uuid(),
        name,
        market_address,
        cut_off_time,
        market_date
      
      };
      
      this.props.onSubmit(market);
    } else {
      alert('all fields are required');
    }
  }

  render() {
    const { name, market_address, cut_off_time,market_date } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <form 
            className="market-form" 
            onSubmit={this.onSubmit}
        >
          <div className="market-form-inputs">
            <div className="d-flex">
              <div className="market-form-field">
                <span className="d-block padding-s">Nom du Marché</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onMarketNameInput}
                    placeholder="Market Name" 
                    readOnly={isLoading}
                    type="text" 
                    value={name}
                />
              </div>
              &nbsp;
              <div className="market-form-field">
                <span className="d-block padding-s">Adresse du Marché</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onMarketAddressInput}
                    placeholder="Market  Address" 
                    readOnly={isLoading}
                    type="text" 
                    value={market_address}
                />
              </div>
            </div>
            <div className="market-form-field marlet-textarea">
              <span className="d-block padding-s">Date du  Marché</span>
              <input 
                  className="input-form d-block"
                  onChange={this.onMarketDateInput}
                  placeholder="Date du marché" 
                  readOnly={isLoading}
                  type="date" 
                  value={market_date}
              />
            </div>
            <div className="market-form-field marlet-textarea">
              <span className="d-block padding-s">Cut off time du marché</span>
              <input 
                  className="input-form d-block"
                  onChange={this.onMarketCutOffTimeInput}
                  placeholder="cut off time" 
                  readOnly={isLoading}
                  type="text" 
                  value={cut_off_time}
              />
            </div>
            <div className="market-form-field market-form-submit">
              <button 
                  className="button"
                  disabled={isLoading}
                  type="submit"
              >
                <CircularProgress visible={isLoading} theme="light" />
                {isLoading ? 'Saving Markrt' : 'Save Market'}
              </button>
            </div>
          </div>
 
        </form>
      </div>
    );
  }
}

export default MarketForm;
