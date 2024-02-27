import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import "react-responsive-modal/styles.css";
import MyPagination from "./Pagination";
import ListDataTable from "./ListDataTable";
import { useCookies } from "react-cookie";
import Checkbox from "rc-checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Preloader(props) {
  return (
    <img
      className="gf-rb-preloaderr"
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

const DiamondSettingsProducts = (props) => {
  const [text, setText] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [getVideo, setVideo] = useState("");
  const [videoLoading, setVideoLoading] = useState(true);
  const [getpaginationpagecount, setpaginationpagecount] = useState("12");
  const [currPage, setCurrPage] = useState(1);
  const [getInfo, setInfo] = useState("");
  const [getgrid, setgrid] = useState(true);
  const [getlist, setlist] = useState(false);
  const [getGridClass, setGridClass] = useState("grid-view-four");
  const [getlistClass, setlistClass] = useState("grid-list-view");
  const [getAscClass, setAscClass] = useState("active");
  const [getDescClass, setDescClass] = useState("inactive");
  const [getOrderType, setOrderType] = useState("ASC");
  const [getSearch, setSearch] = useState("");
  const [getclose, setClose] = useState("false");
  const [cookies, setCookie] = useCookies(["_compareitems"]);
  const [getCompare, setCompare] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [getCompareCount, setCompareCount] = useState(0);
  const [getvideoloader, setvideoloader] = useState("true");
  const [getShapeOrderType, setShapeOrderType] = useState("");
  const [getPriceOrderType, setPriceOrderType] = useState("");
  const [getCaratOrderType, setCaratOrderType] = useState("");
  const [getColorOrderType, setColorOrderType] = useState("");
  const [getClarityOrderType, setClarityOrderType] = useState("");
  const [getCutOrderType, setCutOrderType] = useState("");
  const [getDepthOrderType, setDepthOrderType] = useState("");
  const [getTableOrderType, setTableOrderType] = useState("");
  const [getPolishOrderType, setPolishOrderType] = useState("");
  const [getSymmetryOrderType, setSymmetryOrderType] = useState("");
  const [getMeasurementOrderType, setMeasurementOrderType] = useState("");
  const [getCertificateOrderType, setCertificateOrderType] = useState("");

  const spinner = () => {
    // setTimeout(() => {
    setvideoloader("false");
    // }, 500);
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
    console.log(event);
    props.changedpagesize(event.target.value);
    setpaginationpagecount(event.target.value);
  };

  const handleorderbytype = (event) => {
    console.log(event);
    props.orderbytype(event.target.value);
  };

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
    props.currentpageno(page_number);
    document.getElementById("diamondDetailScrollUp").scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleModel = async (event) => {
    setvideoloader("true");
    try {
      const res = await fetch(
        `${window.initData.data[0].getvideoapi}InventoryID=${event.target.id}&Type=Diamond`
      );
      const geturl = await res.json();
      setVideo(geturl.videoURL);
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderClass = (event) => {
    event.preventDefault();
    if (event.target.id === "asc") {
      setAscClass("inactive");
      setDescClass("active");
      setOrderType("ASC");
    } else {
      setAscClass("active");
      setDescClass("inactive");
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const closehandleModel = async (event) => {
    setModalShow(false);
  };

  const onOpenInfo = (e) => {
    e.preventDefault();
    var currentId = e.target.id;
    var c = currentId.split("-");
    setInfo(c[1]);
    if (getInfo === c[1]) {
      setInfo("");
    }
  };

  const hideInfo = (e) => {
    setInfo("");
  };

  const onOpenGrid = (e) => {
    e.preventDefault();
    setgrid(true);
    setlist(false);
    setGridClass("active");
    setlistClass("inactive");
  };
  const onOpenList = (e) => {
    e.preventDefault();
    setlist(true);
    setgrid(false);
    setGridClass("inactive");
    setlistClass("active");
  };

  const handleCompare = (e) => {
    if (e.target.checked === false) {
      var index = window.compareproduct.indexOf(e.target.value);
      if (index !== -1) {
        window.compareproduct.splice(index, 1);
      }
    }
    if (window.compareproduct.length < 6) {
      if (e.target.checked === true) {
        window.compareproduct.push(e.target.value);
      }
    } else {
      toast("You can not add more than 6 products.");
      e.target.checked = false;
    }
    setCompareCount(window.compareproduct.length);
  };

  const handlefilterprice = (e) => {
    props.orderbytype("FltPrice");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleshape = (e) => {
    props.orderbytype("Cut");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecarat = (e) => {
    props.orderbytype("Size");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleColor = (e) => {
    props.orderbytype("Color");
    if (getOrderType === "DESC") {
      setOrderType("ASC");
    } else {
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const handleIntensity = (e) => {
    props.orderbytype("FancyColorIntensity");
    if (getOrderType === "DESC") {
      setOrderType("ASC");
    } else {
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const handleclarity = (e) => {
    props.orderbytype("ClarityID");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecutgrade = (e) => {
    props.orderbytype("CutGrade");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handledepth = (e) => {
    props.orderbytype("Depth");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handletablemeasure = (e) => {
    props.orderbytype("TableMeasure");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlepolish = (e) => {
    props.orderbytype("Polish");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlesymmetry = (e) => {
    props.orderbytype("Symmetry");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlemeasurements = (e) => {
    props.orderbytype("Measurements");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecertificate = (e) => {
    props.orderbytype("Certificate");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleCheckbox = (e) => {
    setCompareCount(e);
  };

  useEffect(() => {
    if (window.initData.data[0].default_viewmode === "1") {
      setGridClass("active");
      setlistClass("inactive");
    } else {
      setGridClass("inactive");
      setlistClass("active");
    }
  }, []);

  return (
    <>
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
                className="gf-rb-preloaderr"
                alt="preLoad"
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond.gif"
                }
                style={{ width: "100px", height: "100px" }}
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
      {/* <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

      <div className="diamond-searching-result">
        <div className="result-number">
          <p>
            {props.productCount} <strong>Similar Diamonds</strong>
          </p>
          <span className="pattern-line">|</span>
          <p id="compare-items">
            <strong>
              {" "}
              Compare Items (<span id="total-price">{getCompareCount}</span>)
            </strong>
          </p>
        </div>
        <div className="diamond-search-details">
          <div className="change-view-result">
            <p>Per Page</p>
            <select
              className="result-perpage"
              defaultValue={"20"}
              id="per-page"
              name="perpage"
              onChange={handlePageSizeChange}
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="grid-view-sort">
            <select
              name="dropdown-orderby"
              defaultValue={"Shape"}
              id="dropdown-sort"
              className="dropdown-sort pooja"
              onChange={handleorderbytype}
            >
              <option value="Cut">Shape</option>
              <option value="Size">Carat</option>
              <option value="Color">Color</option>
              {props.tabvalue !== "" && (
                <option value="FancyColorIntensity">Intensity</option>
              )}
              <option value="ClarityID">Clarity</option>
              <option value="CutGrade">Cut</option>
              <option value="Depth">Depth</option>
              <option value="TableMeasure">Table</option>
              <option value="Polish">Polish</option>
              <option value="Symmetry">Symmetry</option>
              <option value="Measurements">Measurement</option>
              <option value="Certificate">Certificate</option>
              <option value="FltPrice">Price</option>
            </select>
          </div>
          <div className="grid-view-orderby">
            <a
              href="#!"
              id="asc"
              onClick={handleOrderClass}
              className={`${getAscClass}`}
            >
              ASC
            </a>
            <a
              href="#!"
              id="desc"
              onClick={handleOrderClass}
              className={` ${getDescClass}`}
            >
              DESC
            </a>
          </div>
        </div>
        <div className="diamond-search-lists">
          <div className="diamond-change-view">
            <ul>
              <li className={`grid-view ${getgrid === true ? "active" : ""} `}>
                <a
                  href=""
                  data-tip="Grid View"
                  id="grid-view-four"
                  data-grid="grid-col-four"
                  onClick={onOpenGrid}
                  className="grid-view-four"
                >
                  Grid view 3 column
                </a>
                <ReactTooltip />
              </li>
              <li className={`list-view ${getlist === true ? "active" : ""} `}>
                <a
                  href=""
                  data-tip="list view"
                  id="grid-list-view"
                  data-grid="grid-col-list"
                  onClick={onOpenList}
                  className="listview"
                >
                  List View
                </a>
                <ReactTooltip />
              </li>
            </ul>
          </div>

          <div className="search-bar">
            {/* <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                name="searchdidfield"
                                id="searchdidfield"
                                placeholder="Search Setting#"
                                value={getSearch}
                                onChange={onChange}
                                className="search-field"
                            />
                            <button type="button" className={`close_button ${getclose === "true" ? "active" : ""}`}  onClick={onClose}>x</button>
                            <button type="submit" className={`search-btn active`}  ></button>
                        </form> */}
          </div>
        </div>
      </div>
      {/* product listing starting */}

      <div className={`search-product-listing ${getGridClass}`}>
        <ul className="product-grid-view grid-col-four" id="grid-mode">
          {props.getDataSettingProductData.map((item) => (
            <li className="product-listing" key={item.$id}>
              <a href="#!" className="slidebutton" onClick={onOpenInfo}>
                <i
                  className="fas fa-ellipsis-h"
                  id={`popup-${item.diamondId}`}
                ></i>
              </a>
              <div
                className={`product-inner-info ${getInfo} ${
                  getInfo === item.diamondId ? "active" : ""
                }`}
                onClick={hideInfo}
              >
                <ul>
                  <li>
                    <p>
                      <span>Diamond ID </span>
                      <span>{item.diamondId}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Shape</span>
                      <span>{item.shape}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Carat</span>
                      <span>{item.carat ? item.carat : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Color</span>
                      <span>{item.color ? item.color : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Clarity</span>
                      <span>{item.clarity ? item.clarity : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Cut</span>
                      <span>{item.cut ? item.cut : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Depth</span>
                      <span>{item.depth ? item.depth : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Table</span>
                      <span>{item.table ? item.table : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Polish</span>
                      <span>{item.polish ? item.polish : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Symmetry</span>
                      <span>{item.symmetry ? item.symmetry : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Measurement</span>
                      <span>{item.measurement ? item.measurement : "-"}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Certificate</span>
                      <span>
                        <a href={item.certificateUrl}>
                          {item.cert ? item.cert : "-"}
                        </a>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Price</span>
                      <span>
                        {item.fltPrice === "Call for Price"
                          ? ""
                          : window.initData.data[0].price_row_format === "1"
                          ? item.currencyFrom === "USD"
                            ? window.currency +
                              Number(item.fltPrice).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })
                            : item.currencyFrom +
                              "  " +
                              item.currencySymbol +
                              "  " +
                              Number(item.fltPrice).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })
                          : item.currencyFrom === "USD"
                          ? window.currency +
                            Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            }) +
                            "  " +
                            item.currencySymbol +
                            "  " +
                            item.currencyFrom}
                        {/* {item.fltPrice !== "Call for Price"
                          ? Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })
                          : "Call For Price"} */}
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
              <a
                href="#!"
                className={`video-popup ${
                  item.videoFileName !== "" ? "video-active" : ""
                }`}
                onClick={handleModel}
              >
                <i id={item.diamondId} className="fas fa-video"></i>
              </a>
              <a
                href={
                  "/apps/engagement-rings/diamonds/product/" +
                  item.shape.replace(/\s+/g, "-").toLowerCase() +
                  "-shape-" +
                  item.carat.replace(/\s+/g, "-").toLowerCase() +
                  "-carat-" +
                  item.color.replace(/\s+/g, "-").toLowerCase() +
                  "-color-" +
                  item.clarity.replace(/\s+/g, "-").toLowerCase() +
                  "-clarity-" +
                  item.cut.replace(/\s+/g, "-").toLowerCase() +
                  "-cut-" +
                  item.cert.replace(/\s+/g, "-").toLowerCase() +
                  "-cert-" +
                  "islabgrown-" +
                  item.isLabCreated +
                  "-sku-" +
                  item.diamondId
                }
              >
                <div className="product-images">
                  <img
                    src={item.biggerDiamondimage}
                    alt={item.detailLinkText}
                  ></img>
                </div>
                <div className="product-details">
                  <div className="product-item-name">
                    <span>
                      {" "}
                      {item.shape} <strong> {item.carat} </strong> CARAT
                    </span>
                    <span>
                      {" "}
                      {item.color} , {item.clarity}{" "}
                    </span>
                  </div>
                  {/* <h2 className="product-name"> <strong> {item.name}</strong></h2> */}
                </div>
              </a>
              <h5 className="product-price">
                {/* {item.fltPrice === "Call for Price" ? "" : window.currency}
                {item.fltPrice ? Number(item.fltPrice) : "-"} */}
                {item.fltPrice === "Call for Price"
                  ? ""
                  : window.initData.data[0].price_row_format === "1"
                  ? item.currencyFrom === "USD"
                    ? window.currency +
                      Number(item.fltPrice).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    : item.currencyFrom +
                      "  " +
                      item.currencySymbol +
                      "  " +
                      Number(item.fltPrice).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                  : item.currencyFrom === "USD"
                  ? window.currency +
                    Number(item.fltPrice).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : Number(item.fltPrice).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    }) +
                    "  " +
                    item.currencySymbol +
                    "  " +
                    item.currencyFrom}
                {/* {item.fltPrice !== "Call for Price"
                  ? Number(item.fltPrice).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : "Call For Price"} */}
              </h5>
              {/* {window.compareproduct.indexOf(item.diamondId) > -1 == true && (
                <div className="product-box-action">
                  <label>
                    <Checkbox
                      value={item.diamondId}
                      onClick={handleCompare}
                      checked={true}
                    />
                    Add to Compare
                  </label>
                </div>
              )} */}
              {/* {window.compareproduct.indexOf(item.diamondId) > -1 == false && (
                <div className="product-box-action">
                  <label>
                    <Checkbox value={item.diamondId} onClick={handleCompare} />
                    Add to Compare
                  </label>
                </div>
              )} */}
            </li>
          ))}
        </ul>
      </div>
      <div className={`product-datatable ${getlistClass}`}>
        <ListDataTable
          listviewData={props.getDataSettingProductData}
          checkboxcount={handleCheckbox}
          filterPrice={handlefilterprice}
          filtershape={handleshape}
          filterCarat={handlecarat}
          filterColor={handleColor}
          filterIntensity={handleIntensity}
          filterClarity={handleclarity}
          filterCut={handlecutgrade}
          filterCertificate={handlecertificate}
          filterMeasurement={handlemeasurements}
          filterPolish={handlepolish}
          filterTable={handletablemeasure}
          filterDepth={handledepth}
          filterSummery={handlesymmetry}
          tabname={props.tabvalue}
        />
      </div>

      <div className="result-pagination">
        {/* <div className="btn-compare">
          <a href="#" id="compare-main" className="btn">
            {" "}
            Compare(<span id="totaldiamond">{getCompareCount}</span>)
          </a>
        </div> */}
        <div className="result-bottom">
          <h2>
            Results {props.startPage} to {props.endPage} of {props.productCount}{" "}
          </h2>
        </div>
        <div className="diamond-product-pagination">
          <MyPagination
            totPages={props.totalPages}
            currentPage={currPage}
            pageClicked={(ele) => {
              afterPageClicked(ele);
            }}
          ></MyPagination>
        </div>
      </div>
    </>
  );
};

export default DiamondSettingsProducts;
