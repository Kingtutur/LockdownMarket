import React from "react";
import BasketItem from "components/basket/BasketItem";
import CheckOutHeader from "../header/CheckOutHeader";
import withAuth from "../hoc/withAuth";
import { displayMoney } from "helpers/utils";
import { ACCOUNT } from "constants/routes";

const OrderSummary = ({ basket, subtotal, dispatch, history }) => {
  const onContinue = () => {
    history.push({
      pathname: ACCOUNT,
      state: { whishList: true },
    });
  };

  const onNext = () => {
    history.push("/checkout/step2");
  };

  return (
    <div className="checkout">
      <CheckOutHeader current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Résumé de la commande</h3>
        <span className="d-block text-center">
          Récapitulatif des aliments dans votre commande
        </span>
        <br />
        {basket.map((product) => (
          <BasketItem
            key={product.id}
            product={product}
            basket={basket}
            dispatch={dispatch}
          />
        ))}
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Total:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action padding-0">
          <button className="button button-muted" onClick={onContinue}>
            Retour a la liste de souhait
          </button>
          <br />
          <button className="button" onClick={onNext}>
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(OrderSummary);
