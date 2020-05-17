import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import { CHECKOUT_STEP_1 } from "constants/routes";

// Just add this feature if you want :P

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  load: {
    minHeight: 650,
  },
});
function createData(seller, date, id) {
  return { seller, date, id };
}

const rows = [
  createData("Marchant 1", "25/05/2020", 2),
  createData("Marchant 2", "23/05/2020", 3),
];
const onCheckOut = (props, id) => {
  props.props.history.push({
    pathname: CHECKOUT_STEP_1,
  });
};

const UserWishListTab = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.load}>
      <strong>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Commerçant de la commande</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.seller}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">
                    <button
                      className="basket-checkout-button button"
                      onClick={() => onCheckOut(props, row.id)}
                    >
                      Payer
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </strong>
    </div>
  );
};

export default withRouter(UserWishListTab);
