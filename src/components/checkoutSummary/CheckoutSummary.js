import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import styles from "./CheckoutSummary.module.scss";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3>Tóm tắt thanh toán</h3>
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>Không có mặt hàng nào trong giỏ hàng của bạn.</p>
            <button className="--btn">
              <Link to="/#products">Quay lại cửa hàng</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Tổng số sản phẩm: ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Tổng tiền:</h4>
              <h3>{cartTotalAmount.toLocaleString()}đ</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Sản phẩm: {name}</h4>
                  <p>Số lượng: {cartQuantity}</p>
                  <p>Đơn giá: {price.toLocaleString()}đ</p>
                  <p>Tổng cộng: {(price * cartQuantity).toLocaleString()}đ</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
