import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./OrderDetails.module.scss";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`} style={{height: "100vh"}}>
        <h2>Chi tiết đơn đặt hàng</h2>
        <div>
          <Link to="/order-history" className="back">&larr; Trở về</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <table className={styles.detail_order}>
              <tr>
                <td>Order ID</td>
                <td>{order.id}</td>
              </tr>
              <tr>
                <td>Tổng thanh toán</td>
                <td>{order.orderAmount.toLocaleString()}đ</td>
              </tr>
              <tr>
                <td>Trạng thái đơn hàng</td>
                <td>{order.orderStatus}</td>
              </tr>
            </table>

            <br />
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng cộng</th>
                  <th>Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price.toLocaleString()}đ</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toLocaleString()}đ</td>
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">
                            Đánh giá
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
