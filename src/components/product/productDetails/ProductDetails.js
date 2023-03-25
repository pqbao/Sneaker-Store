import styles from "./ProductDetails.module.scss";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import cssLoader from "../../loader/Loader.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import { FaUserCircle } from "react-icons/fa";



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Chi tiết sản phẩm</h2>
        <div>
          <Link to="/#products" className="back">&larr; Quay lại sản phẩm</Link>
        </div>
        {product === null ? (
          <span className={cssLoader.load}></span>
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`${product.price.toLocaleString()}`}đ</p>
                <p className={styles.desc}>Mô tả:</p>
                <p> {product.desc}</p>
                <p className={styles.desc}>Thông tin sản phẩm:</p>
                {/* <div className={styles.box}> */}
                
                  <p>
                    <b>Mã sản phẩm: </b> {product.id}
                  </p>
                  <p>
                    <b>Thương hiệu: </b> {product.brand}
                  </p>
                {/* </div> */}

                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  Mua Ngay
                </button>

              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Đánh giá sản phẩm</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>Không có đánh giá cho sản phẩm này.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <span>
                        <FaUserCircle size={35} />
                      </span>
                      <div className={styles.rv_detail}>
                        <b> {userName}</b>
                        <br />
                        <StarsRating value={rate} />
                    
                        <p>{review}</p>

                        <span>
                          <br />
                          <b>{reviewDate}</b>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
