import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import Card from "../../components/card/Card";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { HiOutlineMail } from "react-icons/hi";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        {/* <div className={styles.img}>
          <img src={resetImg} alt="Reset Password" width="400" />
        </div> */}

        <Card>
          <div className={styles.form}>
            <h2>Đặt lại mật khẩu</h2>

            <form onSubmit={resetPassword}>
            <div style={{ position: 'relative' }}>
                <div className={styles.input_icon}>
                  <HiOutlineMail size={20} />
                </div>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </div>

              <button type="submit" className={styles.btn}>
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">Đăng nhập</Link>
                </p>
                <p>
                  <Link to="/register">Đăng ký</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
