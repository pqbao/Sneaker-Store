import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  // FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";
import styles from "./ProductFilter.module.scss";
import { RiFilterOffLine } from "react-icons/ri";

const ProductFilter = () => {
  // const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(0);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);


  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  // const allBrands = [
  //   "All",
  //   ...new Set(products.map((product) => product.brand)),
  // ];

  // useEffect(() => {
  //   dispatch(FILTER_BY_BRAND({ products, brand }));
  // }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setBrand(cat);
    dispatch(FILTER_BY_BRAND({ products, brand: cat }));
  };

  const clearFilters = () => {
    setBrand("All");
    // setBrand("All");
    setPrice(maxPrice);
  };


  return (
    <div className={styles.filter}>
      <div className={styles.productFil}>
      <h4>Thương hiệu</h4>
      <div className={styles.brand}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${brand}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              {/* &#8250; {cat}  */}
               {cat}
            </button>
            
          );
        })}
        <button className={styles.clearFil} onClick={clearFilters}>
          <RiFilterOffLine color="white"/>
        </button>
      </div>
      </div>

      {/* <h4>Hãng</h4>  */}
      <div className={styles.brand}>
        {/* <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select> */}
        {/* <h4>Giá</h4> */}
        <div>
        <p>Giá: {`${Number(price).toLocaleString()} đ`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        </div>
        
      </div>
      {/* <div>
      <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Clear Filter
        </button>
      </div> */}
    </div>
  );
};

export default ProductFilter;
