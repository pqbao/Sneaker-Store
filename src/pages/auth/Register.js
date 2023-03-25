import { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { RiShieldKeyholeLine } from "react-icons/ri";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration Successful...");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };


  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Đăng Ký</h2>

            <form onSubmit={registerUser}>
              
              <div style={{ position: 'relative' }}>
                <div className={styles.input_icon}>
                  <HiOutlineMail size={20} />
                </div>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <div className={styles.input_icon}>
                  <RiShieldKeyholeLine size={20} />
                </div>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>

              <div style={{ position: 'relative' }}>
                <div className={styles.input_icon}>
                  <RiShieldKeyholeLine size={20} />
                </div>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              </div>

      

              <button type="submit" className={styles.btn}>
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Bạn đã có tài khoản?</p>
              <Link to="/login">Đăng nhập</Link>
            </span>
          </div>
        </Card>
        {/* <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div> */}
      </section>
    </>
  );
};

export default Register;
