import React, { useState } from "react";
import withAuth from "../hoc/withAuth";
import ReactPhoneInput from "react-phone-input-2";
import CheckOutHeader from "../header/CheckOutHeader";
import useFieldHandler from "hooks/useFieldHandler";

import { displayMoney } from "helpers/utils";
import { setShippingDetails } from "actions/checkoutActions";

const ShippingDetails = ({
  profile,
  dispatch,
  shipping,
  subtotal,
  history,
}) => {
  const { field, setField, onFieldChange, errorField } = useFieldHandler({
    fullname: profile.fullname ? profile.fullname : "",
    email: profile.email ? profile.email : "",
    address: profile.address
      ? profile.address
      : shipping.address
      ? shipping.address
      : "",
    //mobile: profile.mobile ? profile.mobile : shipping.mobile ? shipping.mobile : '',
    isDone: false,
  });

  const onFullNameInput = (e) => onFieldChange(e, "fullname", false);

  const onEmailInput = (e) => onFieldChange(e, "email", false);

  const onAddressInput = (e) => onFieldChange(e, "address", false);

  const onMobileInput = (e, data) => {
    onFieldChange(e, "mobile", false, data);
  };

  const errorClassName = (key) => (errorField[key] ? "input-error" : "");

  const onClickNext = () => {
    const noError = Object.keys(errorField).every(
      (key) => errorField[key] === ""
    );
    const allFieldsFilled = Object.keys(field).every(
      (key) => field[key] !== ""
    );

    if (noError && allFieldsFilled) {
      dispatch(setShippingDetails({ ...field, isDone: true }));
      history.push("/checkout/step3");
    }
  };

  return (
    <div className="checkout">
      <CheckOutHeader current={2} />
      <div className="checkout-step-2">
        <h3 className="text-center">Shipping Details</h3>
        <div className="checkout-shipping-wrapper">
          <div className="checkout-shipping-form">
            <div className="checkout-fieldset">
              <div className="d-block checkout-field">
                {errorField.fullname ? (
                  <span className="input-message">{errorField.fullname}</span>
                ) : (
                  <span className="d-block padding-s">Full Name</span>
                )}
                <input
                  className={`input-form d-block ${errorClassName("fullname")}`}
                  onChange={onFullNameInput}
                  placeholder="Your full name"
                  style={{ textTransform: "capitalize" }}
                  type="text"
                  value={field.fullname}
                />
              </div>
              <div className="d-block checkout-field">
                {errorField.email && (
                  <span className="input-message">{errorField.email}</span>
                )}
                <span className="d-block padding-s">Email</span>
                <input
                  className={`input-form d-block ${errorClassName("email")}`}
                  onChange={onEmailInput}
                  placeholder="Your email"
                  type="email"
                  value={field.email}
                />
              </div>
            </div>
            <div className="checkout-fieldset">
              <div className="d-block checkout-field">
                {errorField.address ? (
                  <span className="input-message">{errorField.address}</span>
                ) : (
                  <span className="d-block padding-s">Shipping Address</span>
                )}
                <input
                  className={`input-form d-block ${errorClassName("address")}`}
                  onChange={onAddressInput}
                  placeholder="#05 Brgy. Maligalig, Arayat Pampanga, Philippines"
                  type="text"
                  value={field.address}
                />
              </div>
            </div>
            <div className="checkout-fieldset"></div>
            <br />
            <div className="checkout-total d-flex-end padding-right-m">
              <table>
                <td>
                  <span className="d-block margin-0 padding-right-s text-right">
                    Total: &nbsp;
                  </span>
                </td>
                <td>
                  <h2 className="basket-total-amount text-right">
                    {displayMoney(subtotal + (field.isInternational ? 50 : 0))}
                  </h2>
                </td>
              </table>
            </div>
            <br />
            <div className="checkout-shipping-action">
              <button
                className="button button-muted checkout-shipping-back"
                onClick={() => history.push("/checkout/step1")}
                type="button"
              >
                Back
              </button>
              <button
                className="button checkout-shipping-back"
                disabled={
                  !(
                    Object.keys(errorField).every(
                      (key) => errorField[key] === ""
                    ) && Object.keys(field).every((key) => field[key] !== "")
                  )
                }
                onClick={onClickNext}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ShippingDetails);
