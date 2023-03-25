import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={styles.table}>
        <h2>Chi tiết đơn hàng</h2>
        <div>
          <Link to="/admin/orders" className="back">&larr; Trở về</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
 
          <div className={styles.container}>
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
              <tr>
                <td>Địa chỉ giao hàng</td>
                <td>
                  <span>Địa chỉ:</span> {order.shippingAddress.street}, {order.shippingAddress.line1}
                  <br />
                  <span>Quận/Huyện:</span> {order.shippingAddress.district}
                  <br />
                  <span>Tỉnh/Thành phố:</span> {order.shippingAddress.city}
                
                </td>
              </tr>
            </table>
            <ChangeOrderStatus order={order} id={id} />
            </div>
            
            <br />
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng cộng</th>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        
      </div>
    </>
  );
};

export default OrderDetails;
