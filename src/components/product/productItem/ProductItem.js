import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";
import { RiShoppingBagLine } from "react-icons/ri";

const ProductItem = ({ product, grid, id, name, price, desc, imageURL, brand}) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={styles.grid}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <Link to={`/product-details/${id}`}>
          <span className={styles.brand}>{`${brand}`}</span>
            <h4>{shortenText(name, 45)}</h4>
          </Link>
          <p>{`${Number(price).toLocaleString()}đ `}
            <RiShoppingBagLine size={20} className={styles.addToCart} onClick={() => addToCart(product)}/>
          </p>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
      </div>
    </Card>
  );
};

export default ProductItem;
