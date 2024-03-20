import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
// import PageItem from 'react-bootstrap/PageItem';
import Modal from "react-bootstrap/Modal";
// import ModalBody from 'react-bootstrap/ModalBody';
import "react-responsive-modal/styles.css";
import MyPagination from "./Pagination";
import ImageLoader from "react-load-image";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import { LoadingOverlay, Loader } from "react-overlay-loader";

function Preloader(props) {
  return (
    <img
      className="preloaderr"
      alt="spinner"
      src={
        window.initData.data[0].server_url +
        process.env.PUBLIC_URL +
        "/images/spinner.gif"
      }
      style={{ width: "21px", height: "24px" }}
    />
  );
}

const SettingsProduct = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [getGridClass, setGridClass] = useState("grid-col-three");
  const [getlithreeClass, setlithreeClass] = useState("active");
  const [getprouductClass, setprouductClass] = useState();
  const [getlifourClass, setlifourClass] = useState("inactive");
  const [getpaginationpagecount, setpaginationpagecount] = useState("12");
  const [currPage, setCurrPage] = useState(1);
  const [getSearch, setSearch] = useState("");
  const [getclose, setClose] = useState("false");
  const [getVideo, setVideo] = useState("");
  const [getvideoloader, setvideoloader] = useState("true");
  const [getbrowsercookies, setbrowsercookies] = useCookies([
    "shopify_ringbackvalue",
  ]);
  const [getproductselected, productselected] = useState();
  const [getTryon, setTryon] = useState("false");
  const [getTryonsrc, setTryonsrc] = useState("");
  const [getTryonmodalShow, setTryonmodalShow] = React.useState(false);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const spinner = () => {
    // setTimeout(() => {
    setvideoloader("false");
    // }, 500);
  };

  console.log("setting data");
  console.log(props);

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
    props.currentpageno(page_number);
    document.getElementById("ringbuilderSettingScrollUp").scrollIntoView({
      behavior: "smooth",
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (getSearch === "") {
      alert("Please enter your search value");
      return false;
    }
    props.searchvalue(getSearch);
    setClose("true");
  };

  const onChange = (evt) => {
    setSearch(evt.target.value);
  };

  const onClose = (evt) => {
    evt.preventDefault();
    setSearch("");
    props.searchvalue("");
    setClose("false");
  };

  const handlePageSizeChange = (event) => {
    props.pagesize(event.target.value);
    setpaginationpagecount(event.target.value);
  };

  const handlePageAscDesc = (event) => {
    props.priceascdesc(event.target.value);
  };

  const gridClassChange = (event) => {
    event.preventDefault();
    if (event.target.id === "grid-col-four") {
      setlifourClass("active");
      setlithreeClass("inactive");
    } else {
      setlifourClass("inactive");
      setlithreeClass("active");
    }
    setGridClass(event.target.id);
  };

  useEffect(() => {
    if (getbrowsercookies.shopify_ringbackvalue) {
      if (
        getbrowsercookies.shopify_ringbackvalue &&
        getbrowsercookies.shopify_ringbackvalue[0].settingId
      ) {
        productselected(getbrowsercookies.shopify_ringbackvalue[0].settingId);
      }
    }
    setprouductClass(getproductselected);
    window.addEventListener("message", function (event) {
      if (event.data === "closeIframe") {
        console.log("Iframe Closed");
        setLoaded(false);
        setTryon("false");
        setTryonmodalShow(false);
      }
    });
  }, [getproductselected]);

  const handleModel = async (event) => {
    setvideoloader("true");
    try {
      const res = await fetch(
        `${window.initData.data[0].getvideoapi}InventoryID=${event.target.id}&Type=Jewelry`
      );
      const geturl = await res.json();
      setVideo(geturl.videoURL);
      setModalShow(true);
      //setvideoloader("false");
    } catch (error) {
      console.log(error);
    }
  };

  const closehandleModel = async (event) => {
    setModalShow(false);
  };

  const handlevirtualtryon = (item, e) => {
    // console.log(props);
    // console.log("ITEMS");
    // console.log(item);
    e.preventDefault();
    setLoaded(true);
    setTryon("true");
    setTryonmodalShow(true);
    setTryonsrc(
      `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${item.stockNumber}&buynow=0`
    );
  };

  const handleSetBackValue = (item, e) => {
    e.preventDefault();
    console.log("selecetd product");
    console.log(item);

    var settingCollection = item.collections[0].collectionName;

    if (props.currentMinPrice === "" && props.currentMaxPrice === "") {
      var minpricedata = props.getpriceRangedata[0].minPrice;
      var maxpricedata = props.getpriceRangedata[0].maxPrice;
    } else {
      minpricedata = props.currentMinPrice;
      maxpricedata = props.currentMaxPrice;
    }
    // console.log(props.currentMinPrice);
    // console.log(props.currentMaxPrice);
    var finalSetBackValue = [];
    finalSetBackValue.push({
      shape: props.currentShape,
      collection: props.currentCollection,
      metaltype: props.currentMetalType,
      minprice: minpricedata,
      maxprice: maxpricedata,
      pagesize: props.currentpagesize,
      orderby: props.currentorderby,
      pageno: props.currentpageno,
      settingId: item.settingId,
      tab: props.currenttab,
    });

    console.log("props -somin");
    console.log(props);

    setbrowsercookies("shopify_ringbackvalue", finalSetBackValue, {
      path: "/",
      maxAge: 604800,
    });

    if (props.currenttab === "mined") {
      var navsettingurl = "settings/";
    }

    if (props.currenttab === "labgrown") {
      navsettingurl = "labgrownsettings/";
    }

    if (props.currentMetalType) {
      navigate(
        "/apps/engagement-rings/" +
          navsettingurl +
          settingCollection.replace(/\s+/g, "-").toLowerCase() +
          "/" +
          props.currentMetalType.replace(/\s+/g, "-").toLowerCase() +
          "-sku-" +
          item.priceSettingId
      );
    } else {
      navigate(
        "/apps/engagement-rings/" +
          navsettingurl +
          settingCollection.replace(/\s+/g, "-").toLowerCase() +
          "/" +
          item.metalTypes[0].metalType.replace(/\s+/g, "-").toLowerCase() +
          "-sku-" +
          item.priceSettingId
      );
    }

    // if (props.currentMetalType) {
    //   navigate(
    //     "/apps/engagement-rings/settings/" +
    //       settingCollection.replace(/\s+/g, "-").toLowerCase() +
    //       "/" +
    //       props.currentMetalType.replace(/\s+/g, "-").toLowerCase() +
    //       "-sku-" +
    //       item.priceSettingId
    //   );
    // } else {
    //   navigate(
    //     "/apps/engagement-rings/settings/" +
    //       settingCollection.replace(/\s+/g, "-").toLowerCase() +
    //       "/" +
    //       item.metalTypes[0].metalType.replace(/\s+/g, "-").toLowerCase() +
    //       "-sku-" +
    //       item.priceSettingId
    //   );
    // }
  };

  console.log("props.getDataSettingProductData");
  console.log(props.getDataSettingProductData[0]);

  return (
    <>
      <LoadingOverlay className="_loading_overlay_wrapper">
        <Loader fullPage loading={loaded} />{" "}
      </LoadingOverlay>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={closehandleModel}></Modal.Header>
        <Modal.Body>
          {getvideoloader === "true" ? (
            <div className="modal__spinner">
              <img
                className="preloaderr"
                alt="preLoad"
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/ring.gif"
                }
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          ) : null}
          <iframe
            className="modal__video-style"
            onLoad={spinner}
            width="100%"
            height="500"
            title="Video"
            src={getVideo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>

      <div className="searching-result">
        <div className="result-number">
          <p>
            {props.productCount} <strong>Settings</strong>
          </p>
        </div>
        <div className="search-details">
          <div className="change-view-result">
            <select
              className="result-pagesize"
              id="pagesize"
              name="pagesize"
              onChange={handlePageSizeChange}
            >
              <option value="12">Records Per Page: 12</option>
              <option value="24">Records Per Page: 24</option>
              <option value="48">Records Per Page: 48</option>
              <option value="99">Records Per Page: 99</option>
            </select>
          </div>
          <div className="grid-view-sort">
            <select
              name="dropdown-orderby"
              id="dropdown-sort"
              className="dropdown-sort"
              onChange={handlePageAscDesc}
            >
              <option value="cost+asc">Price: Low - High</option>
              <option value="cost+desc">Price: High - Low</option>
            </select>
          </div>
          <div className="change-view">
            <ul>
              <li className={`grid-view ${getlithreeClass}`}>
                <a
                  href="#"
                  data-tip="Grid view 3 columns"
                  id="grid-col-three"
                  data-grid="grid-col-three"
                  onClick={gridClassChange}
                  className="grid-view-three"
                >
                  Grid view 3 columns
                </a>
              </li>
              <li className={`grid-view-wide ${getlifourClass}`}>
                <a
                  href="#"
                  data-tip="Grid view 4 columns"
                  id="grid-col-four"
                  data-grid="grid-col-four"
                  onClick={gridClassChange}
                  className="grid-view-four"
                >
                  Grid view 4 columns
                </a>
              </li>
              <ReactTooltip className="ringbuilder_tooltip" />
            </ul>
          </div>
          <div className="search-bar">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="searchdidfield"
                id="searchdidfield"
                placeholder="Search Setting#"
                value={getSearch}
                onChange={onChange}
                className="search-field"
              />
              <button
                type="button"
                className={`close_button ${
                  getclose === "true" ? "active" : ""
                }`}
                onClick={onClose}
              >
                x
              </button>
              <button type="submit" className={`search-btn active`}></button>
            </form>
          </div>
        </div>
      </div>
      {/* product listing starting */}

      <div className="search-product-listing">
        <ul className={`product-grid-view ${getGridClass}`} id="grid-mode">
          {props.getDataSettingProductData.map((item) => (
            <li
              className={`product-listing ${
                getprouductClass === item.settingId ? "active" : ""
              }`}
              key={item.$id}
              id={item.settingId}
            >
              <a
                href="#!"
                className={`video-popup ${
                  item.videoURL !== "" ? "video-active" : ""
                }`}
                onClick={handleModel}
              >
                <i id={item.settingId} className="fas fa-video"></i>
              </a>
              <a href="#" onClick={(e) => handleSetBackValue(item, e)}>
                <div className="product-images">
                  <ImageLoader src={item.imageUrl}>
                    <img />
                    <div>Error!</div>
                    <div className="image_loaader">
                      {" "}
                      <Preloader />{" "}
                    </div>
                  </ImageLoader>
                </div>
                <div className="product-details">
                  <h2 className="product-name">
                    {" "}
                    <strong> {item.name}</strong>
                  </h2>
                  {item.showPrice === true && (
                    <h5 className="product-price">
                      {window.initData.data[0].price_row_format === "1"
                        ? item.currencyFrom === "USD"
                          ? window.currency +
                            Number(item.cost).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : item.currencyFrom +
                            "  " +
                            item.currencySymbol +
                            "  " +
                            Number(item.cost).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                        : item.currencyFrom === "USD"
                        ? window.currency +
                          Number(item.cost).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })
                        : Number(item.cost).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          }) +
                          "  " +
                          item.currencySymbol +
                          "  " +
                          item.currencyFrom}

                      {/* {Number(item.cost).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })} */}
                    </h5>
                  )}
                  {item.showPrice === false && (
                    <h5 className="product-price">{"Call For Price"}</h5>
                  )}
                </div>
              </a>

              <a
                className="btn btn-tryon"
                id={item.settingId}
                // onClick={handlevirtual}
                onClick={(e) => handlevirtualtryon(item, e)}
                href="#"
              >
                Virtual Try On
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="result-pagination">
        <div className="result-bottom">
          <h2>
            Results {props.startPage} to {props.endPage} of {props.productCount}{" "}
          </h2>
        </div>
        <div className="product-pagination">
          <MyPagination
            totPages={props.totalPages}
            currentPage={currPage}
            pageClicked={(ele) => {
              afterPageClicked(ele);
            }}
          ></MyPagination>
        </div>
      </div>

      {getTryon === "true" && (
        <>
          <iframe
            id="tryoniframe"
            src={getTryonsrc}
            allow="camera"
            width={"100%"}
            style={{
              position: "fixed",
              left: "0",
              top: "0",
              overflow: "hidden",
            }}
            height={"100%"}
          ></iframe>
          <style>
            {`body{
                    overflow: hidden;
                } 
                #tryoniframe{
                  z-index : 99;
                }
                
                `}
          </style>
        </>
      )}
    </>
  );
};

export default SettingsProduct;
