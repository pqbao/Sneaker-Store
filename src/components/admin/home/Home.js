import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import { BsWallet2 } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Chart from "../../chart/Chart";

//Icons
const earningIcon = <BsWallet2 size={30} color="41b4e1"/>;
const productIcon = <BsCart4 size={30} color="7641e1" />;
const ordersIcon = <FaCartArrowDown size={30} color="f6cb6d" />;

const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  // Định dạng VND
  const priceVND = (number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
      number
    );

  return (
    <div className={styles.home}>
      <h2>Dashbroad</h2>
      <div className={styles["info-box"]}>
        <InfoBox 
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Doanh thu"}
          count={`${priceVND(totalOrderAmount)}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Tổng sản phẩm"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Tổng đơn hàng"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
