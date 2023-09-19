import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import searchLogo from "../../assets/Search.png";
import cartLogo from "../../assets/Cart.png";
import userLogo from "../../assets/User.png";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

const cx = classNames.bind(styles);

function Header() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("inner1")}>
          <Link to="/" className={cx("logo-header", "cover-img")}>
            <div className={cx("w100")}>
              <img className={cx("logo")} src={logo} alt="" />
            </div>
          </Link>
          <div className={cx("content")}>
            <div className={cx("search-cart-login")}>
              <div className={cx("search")}>
                <input
                  className={cx("search-input")}
                  placeholder="Search name laptop you want..."
                  spellCheck={false}
                />
                <button className={cx("search-btn")} onClick={handleSubmit}>
                  <img className={cx("search-logo")} src={searchLogo} alt="" />
                </button>
              </div>
              <div className={cx("cart")}>
                <Link to="/cart">
                  <img className={cx("cart-logo")} src={cartLogo} alt="" />
                </Link>
              </div>
              <div className={cx("user")}>
                <img className={cx("user-logo")} src={userLogo} alt="" />
                <Link to="/login">Login</Link>
              </div>
            </div>
            <nav className={cx("navi")}>
              <Popup trigger={<p className={cx("text")}>Laptop brand</p>}>
                <div>
                  <Link className={cx("text")}>MacBook</Link>
                </div>
                <div>
                  <Link className={cx("text")}>HP</Link>
                </div>
                <div>
                  <Link className={cx("text")}>DELL</Link>
                </div>
                <div>
                  <Link className={cx("text")}>ASUS</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Lenovo</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Acer</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Xiaomi</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Microsoft Surface</Link>
                </div>
                <div>
                  <Link className={cx("text")}>LG</Link>
                </div>
                <div>
                  <Link className={cx("text")}>HUAWEI</Link>
                </div>
                <div>
                  <Link className={cx("text")}>MSI</Link>
                </div>
                <div>
                  <Link className={cx("text")}>GIGABYTE</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Fujitsu</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Intel</Link>
                </div>
              </Popup>

              <Popup trigger={<p className={cx("text")}>Price</p>}>
                <div>
                  <Link className={cx("text")}>Dưới 10 triệu</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Từ 10-15 triệu</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Từ 15-20 triệu</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Từ 20-25 triệu</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Trên 25 triệu</Link>
                </div>
              </Popup>

              <Popup trigger={<p className={cx("text")}>CPU</p>}>
                <div>
                  <Link className={cx("text")}>Intel celeron</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Intel pentium</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Intel core i3</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Intel core i5</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Intel core i7</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Amd ryzen 3</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Amd ryzen 5</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Amd ryzen 7</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Amd ryzen 9</Link>
                </div>
              </Popup>

              <Popup trigger={<p className={cx("text", "hidden")}>Monitor</p>}>
                <div>
                  <Link className={cx("text")}>Khoảng 13 inch</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Khoảng 14 inch</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Khoảng 15 inch</Link>
                </div>
              </Popup>

              <Popup trigger={<p className={cx("text")}>Ram</p>}>
                <div>
                  <Link className={cx("text")}>4GB</Link>
                </div>
                <div>
                  <Link className={cx("text")}>8GB</Link>
                </div>
                <div>
                  <Link className={cx("text")}>16GB</Link>
                </div>
                <div>
                  <Link className={cx("text")}>32GB</Link>
                </div>
              </Popup>

              <Popup trigger={<p className={cx("text")}>Graphics</p>}>
                <div>
                  <Link className={cx("text")}>NVIDIA GeForce Series</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Card Onboard</Link>
                </div>
                <div>
                  <Link className={cx("text")}>AMD Radeon Series</Link>
                </div>
              </Popup>

              <Popup trigger={<p className={cx("text", "hidden")}>Hardware</p>}>
                <div>
                  <Link className={cx("text")}>SSD 128GB</Link>
                </div>
                <div>
                  <Link className={cx("text")}>SSD 256GB</Link>
                </div>
                <div>
                  <Link className={cx("text")}>SSD 512GB</Link>
                </div>
                <div>
                  <Link className={cx("text")}>SSD 1TB</Link>
                </div>
              </Popup>

              <Popup
                trigger={
                  <p className={cx("text", "hidden")}>Special features</p>
                }
              >
                <div>
                  <Link className={cx("text")}>Hỗ trợ công nghệ Optane</Link>
                </div>
                <div>
                  <Link className={cx("text")}>CPU Intel</Link>
                </div>
                <div>
                  <Link className={cx("text")}>CPU Intel Gen 13</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Card RTX Series 4000</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Sử dụng tấm nền IPS</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Màn hình cảm ứng</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Bảo vệ trẻ em</Link>
                </div>
                <div>
                  <Link className={cx("text")}>CPU AMD</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Windows bản quyền</Link>
                </div>
                <div>
                  <Link className={cx("text")}>Mở khóa vân tay</Link>
                </div>
              </Popup>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
