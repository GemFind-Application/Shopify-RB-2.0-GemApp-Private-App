import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { Modal } from "react-responsive-modal";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = (props) => {
  console.log(props);
  const [cookies, setCookie, removeCookie] = useCookies([
    "_wpsaveringfiltercookie",
  ]);
  const location = useLocation();
  var productUrl = location.pathname;
  var part = productUrl.substring(productUrl.lastIndexOf("/") + 1);

  const [openFirsts, setOpenFirsts] = useState(false);
  const [openSeconds, setOpenSeconds] = useState(false);
  const [openThirds, setOpenThirds] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openResetModal, setOpenResetModal] = React.useState(false);
  const [getTab, setTab] = useState("mined");
  const [getlabsetting, setlabsetting] = useState("");
  const [getminedsetting, setminedsetting] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    props.callBack(false);
    //console.log(props);
    setCookie("_wpsaveringfiltercookie", props, { path: "/", maxAge: 604800 });
  };

  const setOpenConfirm = (e) => {
    e.preventDefault();
    setLoaded(true);
    removeCookie("_wpsaveringfiltercookie", { path: "/" });
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_shopify_diamondsetting", { path: "/" });
    removeCookie("shopify_ringbackvalue", { path: "/" });
    removeCookie("shopify_diamondbackvalue", { path: "/" });
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_wpsavedlabgowndiamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_wpsavedfancydiamondfiltercookie", { path: "/" });

    props.callBack(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleresetpopup = (e) => {
    setLoaded(false);
    setOpenResetModal(true);
  };

  const handletab = (e) => {
    // e.preventDefault();
    console.log(e.target.id);
    // setTab(e.target.id);
    // setLoaded(true);
    // props.callbacktab(e.target.id);

    if (e.target.id === "mined") {
      navigate(`${process.env.PUBLIC_URL}/settings`);
      window.location.reload();
    }

    if (e.target.id === "labgrown") {
      navigate(`${process.env.PUBLIC_URL}/labgrownsettings`);
      window.location.reload();
    }
  };

  const getNavigationData = async () => {
    try {
      var url =
        `http://api.jewelcloud.com/api/RingBuilder/GetRBNavigation?DealerID=` +
        window.initData.data[0].dealerid;

      const res = await fetch(url);
      // console.log("navigation url");
      // console.log(url);

      const acrualRes = await res.json();
      setminedsetting(acrualRes[0].navMinedSetting);
      setlabsetting(acrualRes[0].navLabSetting);
      // console.log(getminedsetting);
      // console.log(getlabsetting);
      // console.log(acrualRes[0].navLabSetting);
      // console.log(acrualRes[0].navMinedSetting);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    console.log(loaded);
    if (loaded === false) {
      if (part === "labgrownsettings") {
        setTab("labgrown");
        setLoaded(true);
      }
    }

    getNavigationData();
  }, []);

  return (
    <>
    
      <div className="navigation_filter_left">
        <ul className="n_filter_left">
          {getminedsetting !== "" && getminedsetting !== null && (
            <li className={`${getTab === "mined" ? "active" : ""}`}>
              <a href="#!" onClick={handletab} id="mined">
                Mined
              </a>
              <span onClick={() => setOpenFirsts(true)}>
                <i className="fas fa-info-circle"></i>{" "}
              </span>
              <Modal
                open={openFirsts}
                onClose={() => setOpenFirsts(false)}
                center
                classNames={{
                  overlay: "popup_Overlay",
                  modal: "popup_Modal",
                }}
              >
                <div className="popup_content">
                  <p>
                    Formed over billions of years, natural diamonds are mined
                    from the earth. Diamonds are the hardest mineral on earth,
                    which makes them an ideal material for daily wear over a
                    lifetime. Our natural diamonds are conflict-free and GIA
                    certified.
                  </p>{" "}
                </div>
              </Modal>
            </li>
          )}
          {getlabsetting !== "" && getlabsetting !== null && (
            <li className={`${getTab === "labgrown" ? "active" : ""}`}>
              <a href="#!" onClick={handletab} id="labgrown">
                Lab Grown
              </a>
              <span onClick={() => setOpenSeconds(true)}>
                <i className="fas fa-info-circle"></i>{" "}
              </span>
              <Modal
                open={openSeconds}
                onClose={() => setOpenSeconds(false)}
                center
                classNames={{
                  overlay: "popup_Overlay",
                  modal: "popup_Modal",
                }}
              >
                <div className="popup_content">
                  <p>
                    Lab-grown diamonds are created in a lab by replicating the
                    high heat and high pressure environment that causes a
                    natural diamond to form. They are compositionally identical
                    to natural mined diamonds (hardness, density, light
                    refraction, etc), and the two look exactly the same. A
                    lab-grown diamond is an attractive alternative for those
                    seeking a product with less environmental footprint.
                  </p>{" "}
                </div>
              </Modal>
            </li>
          )}
        </ul>
      </div>
      <div className="save-reset-filter">
        <ul className="navigation_right">
          <li>
            <a href="#" className="save-icon" onClick={onChange}>
              Save Search{" "}
            </a>
          </li>
          <li>
            <a href="#!" className="reset-icon" onClick={handleresetpopup}>
              Reset
            </a>
            <Modal
              open={openResetModal}
              onClose={() => setOpenResetModal(false)}
              center
              classNames={{
                overlay: "popup_Overlay",
                modal: "popup__reset",
              }}
            >
              <LoadingOverlay className="_loading_overlay_wrapper">
                <Loader fullPage loading={loaded} />
              </LoadingOverlay>
              <p style={{ textAlign: "center" }}>
                Are you sure you want to reset data?
              </p>
              <div className="reset_popup-btn">
                <button
                  className="button btn btn_left"
                  onClick={setOpenConfirm}
                >
                  OK
                </button>
                <button
                  className="button btn"
                  onClick={() => setOpenResetModal(false)}
                >
                  CANCLE
                </button>
              </div>
            </Modal>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
