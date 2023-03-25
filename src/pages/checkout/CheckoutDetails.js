import { useState } from "react";
// import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary.js";
import {
  // SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import styles from "./CheckoutDetails.module.scss";

const initialAddressState = {
  name: "",
  phone: "",
  street: "", //đường
  line1: "", // phường/xã
  district: "", //quận/huyện
  city: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  // const [billingAddress, setBillingAddress] = useState({
  //   ...initialAddressState,
  // });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  // const handleBilling = (e) => {
  //   const { name, value } = e.target;
  //   setBillingAddress({
  //     ...billingAddress,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    // dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout");
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Chi tiết thanh toán</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Địa chỉ giao hàng</h3>
              <label className={styles.information}>Liên hệ</label>
              <div className={styles.inf}>
                <label>Tên người nhận</label>
                <input
                  type="text"
                  placeholder="Tên người nhận"
                  required
                  name="name"
                  value={shippingAddress.name}
                  onChange={(e) => handleShipping(e)}
                />
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  required
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <label className={styles.information}>Địa chỉ</label>
              <div className={styles.inf}>
                <label>Tên đường, số nhà</label>
                <input
                  type="text"
                  placeholder="Tên đường, số nhà"
                  required
                  name="street"
                  value={shippingAddress.street}
                  onChange={(e) => handleShipping(e)}
                />
                <label>Phường/Xã</label>
                <input
                  type="text"
                  placeholder="Phường/Xã"
                  required
                  name="line1"
                  value={shippingAddress.line1}
                  onChange={(e) => handleShipping(e)}
                />
                <label>Quận/Huyện</label>
                <input
                  type="text"
                  placeholder="Quận/Huyện"
                  required
                  name="district"
                  value={shippingAddress.district}
                  onChange={(e) => handleShipping(e)}
                />
                <label>Tỉnh/Thành phố</label>
                <input
                  type="text"
                  placeholder="Tỉnh/Thành phố"
                  required
                  name="city"
                  value={shippingAddress.city}
                  onChange={(e) => handleShipping(e)}
                />
              </div>

              <button type="submit" className="--btn --btn-primary">
                Tiến Hành Thanh Toán
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
