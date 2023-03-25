import { useRef, useEffect } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiUserGroup } from "react-icons/hi";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  // Scroll về đầu trang 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Phản hồi đến địa chỉ email chăm sóc khách hàng
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        'service_t7s7ofa',
        'template_jv026em',
        form.current,
        'oEz9uvG237WVuznTT'
      )
      .then(
        (result) => {
          toast.success("Đã gửi tin nhắn thành công");
        },

        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };


  return (
    <section id="contact" className={styles.section_contact}>
      <div className={`container ${styles.contact}`}>
        <h2>Liên hệ với chúng tôi</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Tên</label>
              <input
                type="text"
                name="user_name"
                placeholder="Họ và tên của bạn"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Email đang sử dụng"
                required
              />
              <label>Chủ đề</label>
              <input
                type="text"
                name="subject"
                placeholder="Chủ để cần giải quyết"
                required
              />
              <label>Nội dung</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Thông tin liên hệ của chúng tôi</h3>
              <p>Điền vào biểu mẫu hoặc liên hệ với chúng tôi qua 
                các kênh được liệt kê bên dưới</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>0123 456 999</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>sp.sneakerg7@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Khu II, Đại học Cần Thơ</p>
                </span>
                <span>
                  <HiUserGroup />
                  <p>Nhóm 7</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
