import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className="text-center text-lg-start bg-light text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Left */}
        <div className="me-5 d-none d-lg-block">
          <span>Hãy kết nối với chúng tôi trên mạng xã hội</span>
        </div>

        {/* Right */}
        <Link href="" className="me-4 text-reset">
          <i className="fab fa-facebook-f"></i>
        </Link>
        <Link href="" className="me-4 text-reset">
          <i className="fab fa-twitter"></i>
        </Link>
        <Link href="" className="me-4 text-reset">
          <i className="fab fa-google"></i>
        </Link>
        <Link href="" className="me-4 text-reset">
          <i className="fab fa-instagram"></i>
        </Link>
        <Link href="" className="me-4 text-reset">
          <i className="fab fa-linkedin"></i>
        </Link>
        <Link href="" className="me-4 text-reset">
          <i className="fab fa-github"></i>
        </Link>
      </section>

      <section className={cx("wrapper")}>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Laptop Linh
              </h6>
              <p>Luôn mang tới những sản phẩm rẻ, chất lượng nhất và uy tín</p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Sản phẩm</h6>
              <p>
                <a href="#!" className="text-reset">
                  ASUS
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  MacBook
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Dell
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  HP
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Đường dẫn hữu dụng
              </h6>
              <p>
                <a href="#!" className="text-reset">
                  Trang chủ
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Hàng bán chạy
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Giỏ hàng
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Đơn hàng
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
              <p>
                <i className="fas fa-home me-3"></i> Phenikaa University, Hà
                Đông, Hà Nội
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                linh@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={cx("background")}>
        <div className="text-center p-4">
          ©2023 Bản quyền:
          <a
            className="text-reset fw-bold"
            href="https://www.facebook.com/vietlinh1604"
          >
            &nbsp; Phan Viet Linh
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
