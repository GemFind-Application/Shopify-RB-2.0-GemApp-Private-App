import { elementAcceptingRef } from "@mui/utils";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Filter = (props) => {
  const location = useLocation();
  var productUrl = location.pathname;
  var part = productUrl.substring(productUrl.lastIndexOf("/") + 1);
  const [openFirsts, setOpenFirsts] = useState(false);
  const [openSeconds, setOpenSeconds] = useState(false);
  const [openThirds, setOpenThirds] = useState(false);
  const [openResetModal, setOpenResetModal] = React.useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const [loaded, setLoaded] = useState(false);
  const [getTab, setTab] = useState("mined");
  const navigate = useNavigate();
  const [getcomparecookies, setcomparecookies] = useCookies([
    "_wpsavedcompareproductcookie",
  ]);
  const [skeletoncomparedata, setskeletoncomparedata] = useState(false);
  const [loadcomparedata, setloadcomparedata] = useState(false);
  const [getfinalcomparedata, setfinalcomparedata] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    props.callBack(false);
    //console.log(getTab);
    console.log(props);
    if (getTab === "mined") {
      setCookie("_wpsavediamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
    if (getTab === "labgrown") {
      setCookie("_wpsavedlabgowndiamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
    if (getTab === "fancycolor") {
      setCookie("_wpsavedfancydiamondfiltercookie", props, {
        path: "/",
        maxAge: 604800,
      });
    }
  };

  const setOpenConfirm = (e) => {
    e.preventDefault();
    props.callBack(false);
    setLoaded(true);

    //console.log(getTab);
    removeCookie("shopify_diamondbackvalue", { path: "/" });
    removeCookie("_wpsaveringfiltercookie", { path: "/" });
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_shopify_diamondsetting", { path: "/" });
    removeCookie("shopify_ringbackvalue", { path: "/" });
    removeCookie("_shopify_ringsetting", { path: "/" });
    //if (getTab === "mined") {
    //console.log("mined selected");
    removeCookie("_wpsavediamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    //}
    // if (getTab === "labgrown") {
    removeCookie("_wpsavedlabgowndiamondfiltercookie", { path: "/" });
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    //}
    //if (getTab === "fancycolor") {
    removeCookie("_wpsavedcompareproductcookie", { path: "/" });
    removeCookie("_wpsavedfancydiamondfiltercookie", { path: "/" });
    removeCookie("compareproductcookie", { path: "/" });
    removeCookie("finalcompareproductcookie", { path: "/" });

    //}

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleresetpopup = (e) => {
    e.preventDefault();
    setLoaded(false);
    setOpenResetModal(true);
  };

  //console.log(props);
  const handletab = (e) => {
    //e.preventDefault();
    if (window.compareproduct.length < 2 && e.target.id === "compare") {
      toast.error("Please select minimum 2 diamonds to compare.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log(e.target.id);

      setCookie("compareproductcookie", JSON.stringify(window.compareproduct), {
        path: "/",
        maxAge: 604800,
      });

      if (e.target.id === "compare") {
        setTab(e.target.id);
        console.log("loaded");
        console.log(loaded);
        setLoaded(true);
        console.log(JSON.stringify(window.compareproduct));
        if (window.compareproduct !== "") {
          setCookie(
            "_wpsavedcompareproductcookie",
            JSON.stringify(window.compareproduct),
            { path: "/", maxAge: 604800 }
          );
        }

        if (window.compareproduct) {
          var finalCompareData = [];
          var compareProductdata = "";
          var compareProductdata1 = "";
          var compareProductdata2 = "";

          var cookielength = window.compareproduct.length;
          console.log(cookielength);
          const subFetch = async (element) => {
            const res = await fetch(
              `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${element}&IsLabGrown=false`
            );
            compareProductdata1 = await res.json();
            if (
              compareProductdata1.diamondId === null ||
              compareProductdata1.diamondId === 0
            ) {
              const res1 = await fetch(
                `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${element}&IsLabGrown=true`
              );
              compareProductdata2 = await res1.json();
              compareProductdata = compareProductdata2;
            } else {
              compareProductdata = compareProductdata1;
            }

            console.log(compareProductdata);
            console.log("compareProductdata1.diamondId");
            console.log(compareProductdata1.diamondI);

            return compareProductdata;
          };
          console.log(window.compareproduct.length);
          var i = 0;
          window.compareproduct.forEach((element) => {
            subFetch(element).then((compareProductdata) => {
              finalCompareData.push({
                shape: compareProductdata.shape,
                diamondId: compareProductdata.diamondId,
                caratWeight: compareProductdata.caratWeight,
                table: compareProductdata.table,
                color: compareProductdata.color,
                polish: compareProductdata.polish,
                symmetry: compareProductdata.symmetry,
                clarity: compareProductdata.clarity,
                fluorescence: compareProductdata.fluorescence,
                measurement: compareProductdata.measurement,
                certificate: compareProductdata.certificate,
                cut: compareProductdata.cut,
                mainHeader: compareProductdata.mainHeader,
                defaultDiamondImage: compareProductdata.defaultDiamondImage,
                fltPrice: compareProductdata.fltPrice,
                isLabCreated: compareProductdata.isLabCreated,
              });
              i++;
              if (i === window.compareproduct.length) {
                setTimeout(() => {
                  setLoaded(false);
                  navigate(`${process.env.PUBLIC_URL}/compare`);
                  window.location.reload();
                }, 6000);
              }
            });
          });

          setfinalcomparedata(finalCompareData);
          console.log(finalCompareData.length);
        }
        setTimeout(() => {
          setCookie("finalcompareproductcookie", finalCompareData, {
            path: "/",
            maxAge: 604800,
          });
        }, 5000);

        // setTimeout(() => {
        //   setLoaded(false);
        //   navigate(`${process.env.PUBLIC_URL}/compare`);
        //   window.location.reload();
        // }, 6000);
      }

      if (e.target.id === "mined") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}/diamonds`);
        window.location.reload();
      }
      if (e.target.id === "labgrown") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}/navlabgrown`);
        window.location.reload();
      }
      if (e.target.id === "fancycolor") {
        setTab(e.target.id);
        setLoaded(true);
        props.callbacktab(e.target.id);
        navigate(`${process.env.PUBLIC_URL}/navfancycolored`);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (loaded === false) {
      console.log(part);
      if (part === "navlabgrown") {
        setTab("labgrown");
        setLoaded(true);
      }
      if (part === "navfancycolored") {
        setTab("fancycolor");
        setLoaded(true);
      }
      if (part === "compare") {
        setTab("compare");
        //setLoaded(true);
      }
      if (window.compareproduct.length < 1 && part === "compare") {
        console.log("test");
        // window.location.href = "diamondtools";
        //navigate(`diamontools`);
        navigate(`${process.env.PUBLIC_URL}/diamonds`);
        window.location.reload();
      }
    }
  }, [getTab]);

  return (
    <>
      <style>
        {`.diamond-filter{
          background-color:${window.initData["data"][0].header_colour}; 
        }
        .diamond-filter .navigation_filter_left .n_filter_left li.active a {
                color: ${window.initData["data"][0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li.active{
              background-color:${window.initData["data"][0].hover_colour}; 
            }
            .diamond-filter .navigation_filter_left .n_filter_left li.active span i{
                color: ${window.initData["data"][0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover a{
               background-color:${window.initData["data"][0].hover_colour}; 
                color: ${window.initData["data"][0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover span{
               background-color:${window.initData["data"][0].hover_colour}; 
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover span i{
              color: ${window.initData["data"][0].link_colour};
            }
            .diamond-filter .save-reset-filter .navigation_right li a:hover{
              color: ${window.initData["data"][0].hover_colour};
            }
            .compareitems table tfoot tr td a{
              background-color:${window.initData["data"][0].button_colour}; 
            }
             .compareitems table tfoot tr td a:hover{
              background-color:${window.initData["data"][0].hover_colour}; 
              color: #fff;
            }
            `}
      </style>
      <div className="navigation_filter_left ">
        {getTab === "compare" && (
          <LoadingOverlay className="_loading_overlay_wrapper">
            <Loader fullPage loading={loaded} />
          </LoadingOverlay>
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ul className="n_filter_left">
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
                  Formed over billions of years, natural diamonds are mined from
                  the earth. Diamonds are the hardest mineral on earth, which
                  makes them an ideal material for daily wear over a lifetime.
                  Our natural diamonds are conflict-free and GIA certified.
                </p>{" "}
              </div>
            </Modal>
          </li>
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
                  high heat and high pressure environment that causes a natural
                  diamond to form. They are compositionally identical to natural
                  mined diamonds (hardness, density, light refraction, etc), and
                  the two look exactly the same. A lab-grown diamond is an
                  attractive alternative for those seeking a product with less
                  environmental footprint.
                </p>{" "}
              </div>
            </Modal>
          </li>
          <li className={`${getTab === "fancycolor" ? "active" : ""}`}>
            <a href="#!" onClick={handletab} id="fancycolor">
              Fancy Color
            </a>
            <span onClick={() => setOpenThirds(true)}>
              <i className="fas fa-info-circle"></i>{" "}
            </span>
            <Modal
              open={openThirds}
              onClose={() => setOpenThirds(false)}
              center
              classNames={{
                overlay: "popup_Overlay",
                modal: "popup_Modal",
              }}
            >
              <div className="popup_content">
                <p>
                  Also known as fancy color diamonds, these are diamonds with
                  colors that extend beyond GIA’s D-Z color grading scale. They
                  fall all over the color spectrum, with a range of intensities
                  and saturation. The most popular colors are pink and yellow.
                </p>
              </div>
            </Modal>
          </li>
          <li className={`${getTab === "compare" ? "active" : ""}`}>
            <a href="#!" onClick={handletab} id="compare">
              Compare
            </a>
          </li>
        </ul>
      </div>

      <div className="save-reset-filter">
        <ul className="navigation_right">
          <li>
            <a href="#!" onClick={onChange} className="save-icon">
              Save Search
            </a>
          </li>
          <li>
            <a href="#!" onClick={handleresetpopup} className="reset-icon">
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
              <p>Are you sure you want to reset data?</p>
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

export default Filter;
