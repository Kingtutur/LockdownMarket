import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import withAuth from "../hoc/withAuth";
import CheckOutHeader from "../header/CheckOutHeader";
import useFieldHandler from "hooks/useFieldHandler";
import { PayPalButton } from "react-paypal-button-v2";

import { displayMoney, displayActionMessage } from "helpers/utils";

const Payment = (props) => {
  const {
    field,
    setField,
    onFieldChange,
    errorField,
    setErrorField,
  } = useFieldHandler({
    name: "",
    cardnumber: "",
    expiry: "",
    ccv: "",
  });
  const [paymentMode, setPaymentMode] = useState("paypal");
  const collapseCreditHeight = useRef(null);
  const cardInputRef = useRef(null);
  const { shipping, subtotal } = props;

  const onCreditModeChange = (e) => {
    setPaymentMode("credit");
    const parent = e.target.closest(".checkout-fieldset-collapse");
    const checkBoxContainer = e.target.closest(".checkout-checkbox-field");

    cardInputRef.current.focus();
    parent.style.height =
      checkBoxContainer.offsetHeight +
      collapseCreditHeight.current.offsetHeight +
      "px";
  };

  const onPayPalModeChange = () => {
    setPaymentMode("paypal");
    collapseCreditHeight.current.parentElement.style.height = "97px";
  };

  const onCardNameInput = (e) => onFieldChange(e, "name", false);

  const onCardNumberInput = (e) => {
    const val = e.target.value.trim();

    onFieldChange(e, "cardnumber", false);

    if (!(val.length >= 13 && val.length <= 19)) {
      setErrorField({ ...errorField, cardnumber: "Card number is invalid" });
    }
  };

  const onExpiryInput = (e) => onFieldChange(e, "expiry", false);

  const onCcvInput = (e) => {
    onFieldChange(e, "ccv", false);

    if (e.target.value.trim().length < 3) {
      setErrorField({ ...errorField, ccv: "CCV is invalid" });
    }
  };

  const errorClassName = (field) => {
    return errorField[field] ? "input-error" : "";
  };

  const onConfirm = (e) => {
    e.preventDefault();

    if (!paymentMode) return;
    if (paymentMode === "credit") {
      const ready =
        Object.keys(field).every((key) => field[key] !== "") &&
        Object.keys(errorField).every((key) => errorField[key] === "");

      if (ready) {
        displayActionMessage("Feature not ready yet :)", "info");
      } else {
        displayActionMessage(
          "All credentials for credit payment required!",
          "error"
        );
      }
    } else {
      displayActionMessage("Feature not ready yet :)", "info");
    }
  };

  return (
    <div className="checkout">
      {!shipping.isDone && <Redirect to="/checkout/step1" />}
      <CheckOutHeader current={3} />
      <form className="checkout-step-3" onSubmit={onConfirm}>
        <h3 className="text-center">Paiement</h3>
        <br />
        <span className="d-block padding-s">Option de Paiement</span>
        <PayPalButton
          amount="0.01"
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            });
          }}
          options={{
            clientId: "sb",
            currency: "EUR",
          }}
        />
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Total:</p>
          <h2 className="basket-total-amount">
            {displayMoney(subtotal + (shipping.isInternational ? 50 : 0))}
          </h2>
        </div>
        <br />
        <div className="checkout-shipping-action padding-0">
          <button
            className="button button-muted checkout-shipping-back"
            onClick={() => props.history.push("/checkout/step2")}
            type="button"
          >
            Retour
          </button>
          <button className="button" disabled={!!!paymentMode} type="submit">
            Payer
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(Payment);
