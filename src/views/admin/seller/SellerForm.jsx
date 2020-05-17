import React, { Component } from 'react';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';
import PhoneInput from 'react-phone-input-2';
// import uuid from 'uuid';

class SellerForm extends Component {
  state = {
    seller_name: this.props.seller ? this.props.seller.seller_name : '',
    seller_type: this.props.seller ? this.props.seller.seller_type : '',
    email: this.props.seller ? this.props.seller.email : '',
    cut_off_time: this.props.seller ? this.props.seller.cut_off_time : '',
    password: this.props.seller ? this.props.seller.password : '',
    seller_phone_number: this.props.seller ? this.props.seller.seller_phone_number : '',
    market_id: this.props.seller ? this.props.seller.market_id : '',


  };

  onMarketNameInput = (e) => {
    this.setState({ seller_name: e.target.value });
  }

  onMarketTypeInput = (e) => {
    this.setState({ seller_type: e.target.value });
  }

  onMarketCutOffTimeInput = (e) => {
    this.setState({ cut_off_time: e.target.value });
  }
  onMarketEmailInput = (e) => {
    this.setState({ email: e.target.value });
  }
  onMarketPasswordInput = (e) => {
    this.setState({ password: e.target.value });
  }
  onMarketPhoneInput = (e) => {
    this.setState({ seller_phone_number: e.target.value });
  }
  onMarketMarketIdInput = (e) => {
    this.setState({ market_id: e.target.value });
  }


  onSubmit = (e) => {
    e.preventDefault();
    const { seller_name, cut_off_time, seller_type,seller_phone_number,market_id,password,email } = this.state;
    // Object.keys(this.state).every(key => this.state[key] === !!this.state[key])
    if (seller_name && password) {
      const seller = {
        // id: this.props.product ? this.props.product.id : uuid(),
        seller_name,
        seller_phone_number,
        cut_off_time,
        seller_type,
        market_id,
        password,
        email
      
      };
      
      this.props.onSubmit(seller);
    } else {
      alert('all fields are required');
    }
  }

  render() {
    const { seller_name, cut_off_time, seller_type,seller_phone_number,market_id,password,email } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <form 
            className="market-form" 
            onSubmit={this.onSubmit}
        >
          <input 
                  onChange={this.onMarketMarketIdInput}
                  readOnly={isLoading}
                  type="hidden" 
                  value={market_id}
              />
          <div className="market-form-inputs">
            <div className="d-flex">
              <div className="market-form-field">
                <span className="d-block padding-s">Nom du Marchand</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onMarketNameInput}
                    placeholder="Market Name" 
                    readOnly={isLoading}
                    type="text" 
                    value={seller_name}
                />
              </div>
              &nbsp;
              <div className="market-form-field">
                <span className="d-block padding-s">Type du Marchand</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onMarketTypeInput}
                    placeholder="Market  Address" 
                    readOnly={isLoading}
                    type="text" 
                    value={seller_type}
                />
              </div>

            </div>
            <div className="d-flex">
              <div className="market-form-field">
                <span className="d-block padding-s">Mail</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onMarketEmailInput}
                    placeholder="Market Name" 
                    readOnly={isLoading}
                    type="text" 
                    value={email}
                />
              </div>
              &nbsp;
              <div className="market-form-field">
                <span className="d-block padding-s">Password</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onMarketPasswordInput}
                    placeholder="Market  Address" 
                    readOnly={isLoading}
                    type="text" 
                    value={password}
                />
              </div>
              
            </div>
            <div className="market-form-field marlet-textarea">
              <span className="d-block padding-s">phone</span>
              <input 
                  className="input-form d-block"
                  onChange={this.onMarketPhoneInput}
                  placeholder="Date du marché" 
                  readOnly={isLoading}
                  type="text" 
                  value={seller_phone_number}
              />
            </div>
            <div className="market-form-field marlet-textarea">
              <span className="d-block padding-s">Cut off time du marchand</span>
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
                {isLoading ? 'Saving seller' : 'Save seller'}
              </button>
            </div>
          </div>
 
        </form>
      </div>
    );
  }
}

export default SellerForm;
