import { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [hasInput, setHasInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  //Kiểm tra người dùng có nhập vào input chưa
  const handleInput = (e) => {
    setPassword(e.target.value);
    setHasInput(!!e.target.value);
  };

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful...");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Gooogle
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        {/* <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div> */}

        <Card>
          <div className={styles.form}>
            <h2>Đăng Nhập</h2>

            <form onSubmit={loginUser}>
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

              <div className={styles["password-input"]}>
                <div style={{ position: 'relative' }}>
                <div className={styles.input_icon}>
                  <RiShieldKeyholeLine size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={handleInput}
                />
                </div>

                {hasInput && showPassword ? (
                  <AiFillEyeInvisible size={20} className={styles["password-icon"]} onClick={toggleShowPassword} />
                ) : (
                  <AiFillEye size={20} className={styles["password-icon"]} onClick={toggleShowPassword} />
                )}
              </div>


              <button type="submit" className={styles.btn}>
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Quên mật khẩu?</Link>
              </div>
              <p>-- hoặc --</p>
            </form>
            <button
              className={styles.btngg}
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Bạn chưa có tài khoản?</p>
              <Link to="/register">Đăng ký</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
