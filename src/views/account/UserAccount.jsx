import React, { lazy, Suspense } from "react";
import UserTab from "./tab/UserTab";

import CircularProgress from "components/ui/CircularProgress";
const UserAccountTab = lazy(() => import("./tab/UserAccountTab"));
const UserWishListTab = lazy(() => import("./tab/UserWishListTab"));
const UserOrdersTab = lazy(() => import("./tab/UserOrdersTab"));

const UserAccount = (props) => {
  const Loader = () => (
    <div className="chargement">
      <CircularProgress />
      <h6>Loading ... </h6>
    </div>
  );
  return (
    <UserTab default={props.location.state ? 1 : 0}>
      <div index={0} label="Compte">
        <Suspense fallback={<Loader />}>
          <UserAccountTab />
        </Suspense>
      </div>
      <div index={1} label="Ma liste de souhait">
        <Suspense fallback={<Loader />}>
          <UserWishListTab props={props} />
        </Suspense>
      </div>
      <div index={2} label="Mes commandes">
        <Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </Suspense>
      </div>
    </UserTab>
  );
};

export default UserAccount;
