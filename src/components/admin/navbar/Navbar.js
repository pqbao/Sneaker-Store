import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { RiPlayListAddFill } from "react-icons/ri";
import { HiOutlineViewList } from "react-icons/hi";


const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>MENU</li>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              <MdOutlineSpaceDashboard size={20}/>
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              <HiOutlineViewList size={20}/>
              <p>All Products</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              <RiPlayListAddFill size={18}/>
              <p>Add Product</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              <CgNotes size={20}/>
              <p>Orders</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
