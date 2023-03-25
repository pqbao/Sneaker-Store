import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import styles from "./OrderHistory.module.scss";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`} style={{height: "100vh"}}>
        <h2>Lịch sử đặt hàng</h2>
        <p>
          Mở một đơn hàng để <b>Đánh giá sản phẩm</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p>Không tìm thấy đơn đặt hàng</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ngày đặt</th>
                    <th>Order ID</th>
                    <th>Tổng thanh toán</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} lúc {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {orderAmount.toLocaleString()}
                          {"đ"}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
