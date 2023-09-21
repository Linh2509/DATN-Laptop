import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import screenLogo from "../../assets/Screen.png";
import cpuLogo from "../../assets/Cpu.png";
import ramLogo from "../../assets/Ram.png";
import hddLogo from "../../assets/Hdd.png";
import graphicsLogo from "../../assets/Graphics.png";
import weightLogo from "../../assets/Weight.png";
import { Link } from "react-router-dom";
import { app, database } from "../../firebaseConfig.js";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const collectionProduct = collection(database, "laptops");

  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    onSnapshot(collectionProduct, (data) => {
      const listProduct = data.docs.map((item) => {
        return {
          id: item.id,
          ...item.data(),
        };
      });
      setProducts(listProduct);
      setLoading(false);
      console.log(listProduct);
    });
  };

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className={cx("container")}>
          <div className={cx("section001")}>
            <img
              className={cx("cover-img")}
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/3/638187266348338663_F-C1_1200x300.jpg"
              alt=""
            />
          </div>

          <div className={cx("section003")}>
            <p className={cx("title-sec3")}>Sản phẩm được mua nhiều nhất</p>
          </div>

          <div className={cx("section002")}>
            <div className={cx("layout-section002")}>
              <div className={cx("card-grid")}>
                <div className={cx("grid-container")}>
                  {products.map((item) => (
                    <div className={cx("grid-item")} key={item.id}>
                      <Link
                        to={`/product/${item.id}`}
                        className={cx("link-card", "copybody")}
                      >
                        <div className={cx("layout-card")}>
                          <div className={cx("top-card")}>
                            <div className={cx("link-card")}>
                              <img
                                className={cx("img-card")}
                                src={item.imageLink}
                                alt={item.name}
                              />
                            </div>
                          </div>

                          <div className={cx("mid-card")}>
                            <div className={cx("sale-card")}>
                              <div className={cx("installment")}>
                                trả góp 0%
                              </div>
                              <div className={cx("discount")}>
                                giảm: 2.500.000đ
                              </div>
                            </div>

                            <div className={cx("card-name")}>
                              <p className={cx("name")}>{item.name}</p>
                            </div>

                            <div className={cx("price-card")}>
                              <div className={cx("new-price")}>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.price)}
                              </div>
                              <div className={cx("old-price")}>21.490.000đ</div>
                            </div>
                          </div>

                          <div className={cx("bot-card")}>
                            <div className={cx("config-card")}>
                              <span className={cx("space-logo")}>
                                <span>
                                  <img
                                    className={cx("logo-card")}
                                    src={screenLogo}
                                    alt=""
                                  />
                                </span>{" "}
                                {item.desktop}
                              </span>

                              <span className={cx("space-logo")}>
                                <span>
                                  <img
                                    className={cx("logo-card")}
                                    src={cpuLogo}
                                    alt=""
                                  />
                                </span>{" "}
                                {item.cpu}
                              </span>

                              <span className={cx("space-logo")}>
                                <span>
                                  <img
                                    className={cx("logo-card")}
                                    src={ramLogo}
                                    alt=""
                                  />
                                </span>{" "}
                                {item.ram}
                              </span>

                              <span className={cx("space-logo")}>
                                <span>
                                  <img
                                    className={cx("logo-card")}
                                    src={hddLogo}
                                    alt=""
                                  />
                                </span>{" "}
                                {item.hardware}
                              </span>

                              <span className={cx("space-logo")}>
                                <span>
                                  <img
                                    className={cx("logo-card")}
                                    src={graphicsLogo}
                                    alt=""
                                  />
                                </span>{" "}
                                {item.graphics}
                              </span>

                              <span className={cx("space-logo")}>
                                <span>
                                  <img
                                    className={cx("logo-card")}
                                    src={weightLogo}
                                    alt=""
                                  />
                                </span>{" "}
                                {item.weight}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                  <div className={cx("grid-item", "opa0")}>
                    <div className={cx("layout-card")}>
                      <div className={cx("top-card")}>
                        <Link to="/product" className={cx("link-card")}>
                          <img
                            className={cx("img-card")}
                            src="https://bizweb.dktcdn.net/100/378/807/products/03khdpirtkwogtrhrmodgfq-7.jpg?v=1591930428400"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className={cx("mid-card")}>
                        <div className={cx("sale-card")}>
                          <div className={cx("installment")}>trả góp 0%</div>
                          <div className={cx("discount")}>giảm: 2.500.000đ</div>
                        </div>

                        <div className={cx("card-name")}>
                          <Link href="#" className={cx("name")}>
                            MSI Gaming GF63 Thin 11UC-1230VN i5-11400H
                          </Link>
                        </div>
                        <div className={cx("price-card")}>
                          <div className={cx("new-price")}>18.990.000đ</div>
                          <div className={cx("old-price")}>21.490.000đ</div>
                        </div>
                      </div>

                      <div className={cx("bot-card")}>
                        <div className={cx("config-card")}>
                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={screenLogo}
                                alt=""
                              />
                            </span>{" "}
                            15.6 inch
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={cpuLogo}
                                alt=""
                              />
                            </span>{" "}
                            Core i5
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={ramLogo}
                                alt=""
                              />
                            </span>{" "}
                            8GB &#40;1 thanh 8 GB&#41;
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={hddLogo}
                                alt=""
                              />
                            </span>{" "}
                            SSD 512GB
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={graphicsLogo}
                                alt=""
                              />
                            </span>{" "}
                            NVIDIA GeForce GTX 1650 4GB
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={weightLogo}
                                alt=""
                              />
                            </span>{" "}
                            2.3kg
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("grid-item", "opa0")}>
                    <div className={cx("layout-card")}>
                      <div className={cx("top-card")}>
                        <Link to="/product" className={cx("link-card")}>
                          <img
                            className={cx("img-card")}
                            src="https://bizweb.dktcdn.net/100/378/807/products/03khdpirtkwogtrhrmodgfq-7.jpg?v=1591930428400"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className={cx("mid-card")}>
                        <div className={cx("sale-card")}>
                          <div className={cx("installment")}>trả góp 0%</div>
                          <div className={cx("discount")}>giảm: 2.500.000đ</div>
                        </div>

                        <div className={cx("card-name")}>
                          <Link href="#" className={cx("name")}>
                            MSI Gaming GF63 Thin 11UC-1230VN i5-11400H
                          </Link>
                        </div>
                        <div className={cx("price-card")}>
                          <div className={cx("new-price")}>18.990.000đ</div>
                          <div className={cx("old-price")}>21.490.000đ</div>
                        </div>
                      </div>

                      <div className={cx("bot-card")}>
                        <div className={cx("config-card")}>
                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={screenLogo}
                                alt=""
                              />
                            </span>{" "}
                            15.6 inch
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={cpuLogo}
                                alt=""
                              />
                            </span>{" "}
                            Core i5
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={ramLogo}
                                alt=""
                              />
                            </span>{" "}
                            8GB &#40;1 thanh 8 GB&#41;
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={hddLogo}
                                alt=""
                              />
                            </span>{" "}
                            SSD 512GB
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={graphicsLogo}
                                alt=""
                              />
                            </span>{" "}
                            NVIDIA GeForce GTX 1650 4GB
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={weightLogo}
                                alt=""
                              />
                            </span>{" "}
                            2.3kg
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("grid-item", "opa0")}>
                    <div className={cx("layout-card")}>
                      <div className={cx("top-card")}>
                        <Link to="/product" className={cx("link-card")}>
                          <img
                            className={cx("img-card")}
                            src="https://bizweb.dktcdn.net/100/378/807/products/03khdpirtkwogtrhrmodgfq-7.jpg?v=1591930428400"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className={cx("mid-card")}>
                        <div className={cx("sale-card")}>
                          <div className={cx("installment")}>trả góp 0%</div>
                          <div className={cx("discount")}>giảm: 2.500.000đ</div>
                        </div>

                        <div className={cx("card-name")}>
                          <Link href="#" className={cx("name")}>
                            MSI Gaming GF63 Thin 11UC-1230VN i5-11400H
                          </Link>
                        </div>
                        <div className={cx("price-card")}>
                          <div className={cx("new-price")}>18.990.000đ</div>
                          <div className={cx("old-price")}>21.490.000đ</div>
                        </div>
                      </div>

                      <div className={cx("bot-card")}>
                        <div className={cx("config-card")}>
                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={screenLogo}
                                alt=""
                              />
                            </span>{" "}
                            15.6 inch
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={cpuLogo}
                                alt=""
                              />
                            </span>{" "}
                            Core i5
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={ramLogo}
                                alt=""
                              />
                            </span>{" "}
                            8GB &#40;1 thanh 8 GB&#41;
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={hddLogo}
                                alt=""
                              />
                            </span>{" "}
                            SSD 512GB
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={graphicsLogo}
                                alt=""
                              />
                            </span>{" "}
                            NVIDIA GeForce GTX 1650 4GB
                          </span>

                          <span className={cx("space-logo")}>
                            <span>
                              <img
                                className={cx("logo-card")}
                                src={weightLogo}
                                alt=""
                              />
                            </span>{" "}
                            2.3kg
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
