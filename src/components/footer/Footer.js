import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiUserGroup } from "react-icons/hi";

// const date = new Date();
// const year = date.getFullYear();

const Footer = () => {
  return (
    <>
    <footer>
    <div className={styles.footer}>
      <div className={styles.col1}>
        <Link to="/"><h3><span>G7</span>Sneaker Store</h3></Link>
        <p>
          Bạn có thể liên hệ với chúng tôi qua hotline
          hoặc email để được hỗ trợ và tư vấn mua sắm.
          Theo dõi chúng tôi trên mạng xã hội để cập nhật
          những xu hướng mới nhất trong thế giới giày.
        </p>
      </div>
      
      <div className={styles.col2}>
        <h4>Thương hiệu</h4>
        <p>Adidas</p>
        <p>Nike</p>
        <p>Jordan</p>
        <p>Converse</p>
      </div>

      <div className={styles.col3}>
        <h4>Links</h4>
        <Link to="/cart" className={styles.icon}>
          <p className={styles.text}>Giỏ hàng</p>
        </Link>
        <Link to="/order-history" className={styles.icon}>
          <p className={styles.text}>Lịch sử đặt hàng</p>
        </Link>
        {/* <p></p> */}
        <Link to="/" className={styles.icon}>
          <p className={styles.text}>Đăng xuất</p>
        </Link>
      </div>

      <div className={styles.col4}>
        <h4>Liên hệ</h4>
        <div className={styles.icon}>
          <p><FaPhoneAlt /></p>
          <p className={styles.text}>0123 456 999</p>
        </div>

        <Link to="/contact" className={styles.icon}>
          <p><FaEnvelope /></p>
          <p className={styles.text}>sp.sneakerg7@gmail.com</p>
        </Link>

        <div className={styles.icon}>
          <p><GoLocation /></p>
          <p className={styles.text}>Khu II, Đại học Cần Thơ</p>
        </div>

        <div className={styles.icon}>
          <p><HiUserGroup /></p>
          <p className={styles.text}>Nhóm 7</p>
        </div>
      </div>
    </div>
    </footer>
    </>
  )
};

export default Footer;
