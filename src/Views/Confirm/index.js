import classNames from "classnames/bind";
import styles from "./Confirm.module.scss";

const cx = classNames.bind(styles);

function Confirm() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("section001")}>
          <h3 className={cx("title")}>Xác nhận thông tin khách hàng</h3>
        </div>

        <div className={cx("section002")}>
          <form className={cx("info-user")}>
            <label className={cx("text-label")} htmlFor="fullName">
              Họ và tên
            </label>
            <input className={cx("text-input")} placeholder="Nguyen Van A" />
            <br />
            <label className={cx("text-label")} htmlFor="phone">
              Số điện thoại
            </label>
            <input className={cx("text-input")} placeholder="0123456789" />
            <br />
            <label className={cx("text-label")} htmlFor="address">
              Địa chỉ
            </label>
            <input
              className={cx("text-input")}
              placeholder="Số nhà, đường, xóm, thôn, xã, huyện, thành phố"
            />
            <br />
            <label className={cx("text-label")} htmlFor="cccd">
              CMND/CCCD
            </label>
            <input className={cx("text-input")} placeholder="001234567890" />
            <br />
            <label className={cx("text-label")} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className={cx("text-input")}
              placeholder="google@example.com"
            />
            <br />
          </form>
        </div>

        <div className={cx("section003")}>
          <div className={cx("submit-btn")}>
            <button className={cx("confirm-btn")}>Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
