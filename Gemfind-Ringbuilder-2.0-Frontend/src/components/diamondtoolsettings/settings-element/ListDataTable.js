import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import spinn from "../../../images/spinner.gif";
import Checkbox from "rc-checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalHeader from "react-bootstrap/ModalHeader";
// import "react-responsive-modal/styles.css";
import { LoadingOverlay, Loader } from "react-overlay-loader";
// import { Modal } from "react-responsive-modal";

import ReactTooltip from "react-tooltip";

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

const ListDataTable = (props) => {
    const [getshow, setShow] = useState(false);

    const [getDiamondID, setDiamondID] = useState(true);
    const [getShape, setShape] = useState(true);
    const [getCarat, setCarat] = useState(true);
    const [getColor, setColor] = useState(true);
    const [getClarity, setClarity] = useState(true);
    const [getDepth, setDepth] = useState(true);
    const [getTable, setTable] = useState(true);
    const [getPolish, setPolish] = useState(true);
    const [getMeasurement, setMeasurement] = useState(true);
    const [getCertificate, setCertificate] = useState(true);
    const [getPrice, setPrice] = useState(true);
    const [getSymmetry, setSymmetry] = useState(true);
    const [getCut, setCut] = useState(true);
    const [open, setOpen] = useState(false);
    const [getInfo, setInfo] = useState("");

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [getVideo, setVideo] = useState(true);
    const [getView, setView] = useState(true);
    const [getRow, setRow] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    // const [videoLoading, setVideoLoading] = useState(true);
    // const [getCompareCount, setCompareCount] = useState(0);

    const [getvideoloader, setvideoloader] = useState("true");
    const [getShapeOrderType, setShapeOrderType] = useState("");
    const [getOrderType, setOrderType] = useState("");
    const [getPriceOrderType, setPriceOrderType] = useState("");
    const [getCaratOrderType, setCaratOrderType] = useState("");
    const [getColorOrderType, setColorOrderType] = useState("");
    const [getIntensityOrderType, setIntensityOrderType] = useState("");
    const [getClarityOrderType, setClarityOrderType] = useState("");
    const [getCutOrderType, setCutOrderType] = useState("");
    const [getDepthOrderType, setDepthOrderType] = useState("");
    const [getTableOrderType, setTableOrderType] = useState("");
    const [getPolishOrderType, setPolishOrderType] = useState("");
    const [getSymmetryOrderType, setSymmetryOrderType] = useState("");
    const [getMeasurementOrderType, setMeasurementOrderType] = useState("");
    const [getCertificateOrderType, setCertificateOrderType] = useState("");
    const [loaded, setLoaded] = useState(false);

    const spinner = () => {
        // setTimeout(() => {
        setvideoloader("false");
        // }, 500);
    };
    const onClickRow = (e) => {
        e.preventDefault();
        setRow(true);
    };

    const handleShow = async (e) => {
        setLoaded(true);
        e.preventDefault();
        var currentId = e.target.id;
        var tab = props.tabname;
        console.log(tab);

        try {
            if (tab === "labgrown") {
                var url = `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${currentId}&IsLabGrown=true`;
            } else {
                var url = `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${currentId}&IsLabGrown=false`;
            }

            const res = await fetch(url);
            const productDetails = await res.json();
            console.log(productDetails);
            setDiamondID(currentId);
            setShape(productDetails.shape);
            setCarat(productDetails.caratWeight);
            setColor(productDetails.color);
            setClarity(productDetails.clarity);
            setDepth(productDetails.depth);
            setCut(productDetails.cut);
            setTable(productDetails.table);
            setPolish(productDetails.polish);
            setMeasurement(productDetails.measurement);
            setCertificate(productDetails.certificate);
            setPrice(productDetails.fltPrice);
            setSymmetry(productDetails.symmetry);
            setShow(true);
            //console.log(productId);
        } catch (error) {
            console.log(error);
        }
        setLoaded(false);
    };

    const onClickShape = (e) => {
        if (getShapeOrderType === "ASC") {
            setShapeOrderType("DESC");
        } else {
            setShapeOrderType("ASC");
        }
        props.filtershape(e);
    };

    const onClickPrice = (e) => {
        e.preventDefault();
        if (getPriceOrderType === "ASC") {
            setPriceOrderType("DESC");
        } else {
            setPriceOrderType("ASC");
        }
        props.filterPrice(e);
    };

    const onClickCarat = (e) => {
        e.preventDefault();
        if (getCaratOrderType === "ASC") {
            setCaratOrderType("DESC");
        } else {
            setCaratOrderType("ASC");
        }
        props.filterCarat(e);
    };

    console.log(props);
    const onClickColor = (e) => {
        e.preventDefault();
        console.log(props.filterColor);
        if (getColorOrderType === "ASC") {
            setColorOrderType("DESC");
        } else {
            setColorOrderType("ASC");
        }
        props.filterColor(e);
    };
    const onClickIntensity = (e) => {
        e.preventDefault();
        if (getIntensityOrderType === "ASC") {
            setIntensityOrderType("DESC");
        } else {
            setIntensityOrderType("ASC");
        }
        props.filterIntensity(e);
    };
    const onClickClarity = (e) => {
        e.preventDefault();
        if (getClarityOrderType === "ASC") {
            setClarityOrderType("DESC");
        } else {
            setClarityOrderType("ASC");
        }
        props.filterClarity(e);
    };

    const onClickDepth = (e) => {
        e.preventDefault();
        if (getDepthOrderType === "ASC") {
            setDepthOrderType("DESC");
        } else {
            setDepthOrderType("ASC");
        }
        props.filterDepth(e);
    };
    const onClickTable = (e) => {
        e.preventDefault();
        if (getTableOrderType === "ASC") {
            setTableOrderType("DESC");
        } else {
            setTableOrderType("ASC");
        }
        props.filterTable(e);
    };
    const onClickPolish = (e) => {
        e.preventDefault();
        if (getPolishOrderType === "ASC") {
            setPolishOrderType("DESC");
        } else {
            setPolishOrderType("ASC");
        }
        props.filterPolish(e);
    };
    const onClickMeasurement = (e) => {
        e.preventDefault();
        if (getMeasurementOrderType === "ASC") {
            setMeasurementOrderType("DESC");
        } else {
            setMeasurementOrderType("ASC");
        }
        props.filterMeasurement(e);
    };
    const onClickCertificate = (e) => {
        e.preventDefault();
        if (getCertificateOrderType === "ASC") {
            setCertificateOrderType("DESC");
        } else {
            setCertificateOrderType("ASC");
        }
        props.filterCertificate(e);
    };
    const onClickCut = (e) => {
        e.preventDefault();
        if (getCutOrderType === "ASC") {
            setCutOrderType("DESC");
        } else {
            setCutOrderType("ASC");
        }
        props.filterCut(e);
    };

    const onClickSymmetry = (e) => {
        e.preventDefault();
        if (getSymmetryOrderType === "ASC") {
            setSymmetryOrderType("DESC");
        } else {
            setSymmetryOrderType("ASC");
        }
        props.filterSummery(e);
    };

    const onClickVideo = (e) => {
        e.preventDefault();
        setView(true);
    };

    const onClickView = (e) => {
        e.preventDefault();
        setRow(true);
    };

    const handleClose = () => {
        console.log("close");
        setShow(false);
        console.log(getshow);
    };

    const closehandleModel = async (event) => {
        setModalShow(false);
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
            console.log();
        }
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
        props.checkboxcount(window.compareproduct.length);
    };

    const functionWithSwitch = (param) => {
        //console.log(param);
        switch (param) {
            case "Good":
                return "G";
            case "Very good":
                return "VG";
            case "Excellent":
                return "Ex";
            case "Fair":
                return "F";
            case "Ideal":
                return "I";
            default:
                return "-";
        }
    };
    // console.log(props.listviewData);
    if (props.listviewData[0]) {
        var isShowPrice = props.listviewData[0].showPrice;
    } else {
        var isShowPrice = "";
    }
    const handleUrl = (e) => {};
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
                <Modal.Header
                    closeButton
                    onClick={closehandleModel}
                ></Modal.Header>
                <Modal.Body>
                    {getvideoloader === "true" ? (
                        <div className="modal__spinner">
                            <img
                                className="preloaderr"
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

            <div className="product-list-viewdata">
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th scope="col">
                                <i className="fas fa-clone"></i>
                            </th>
                            <th
                                scope="col"
                                className={`table-sort ${getShapeOrderType}`}
                                title="Shape"
                                id="Cut"
                                onClick={onClickShape}
                            >
                                Shape
                            </th>
                            <th
                                scope="col"
                                className={`table-sort ${getCaratOrderType}`}
                                title="Carat"
                                id="Size"
                                onClick={onClickCarat}
                            >
                                Carat
                            </th>
                            <th
                                scope="col"
                                className={`table-sort ${getColorOrderType}`}
                                title="Color"
                                id="Color"
                                onClick={onClickColor}
                            >
                                Color
                            </th>
                            {props.tabname === "fancycolor" && (
                                <th
                                    scope="col"
                                    className={`table-sort ${getIntensityOrderType}`}
                                    title="Intensity"
                                    id="FancyColorIntensity"
                                    onClick={onClickIntensity}
                                >
                                    Intensity
                                </th>
                            )}
                            <th
                                scope="col"
                                className={`table-sort ${getClarityOrderType}`}
                                title="Clarity"
                                id="ClarityID"
                                onClick={onClickClarity}
                            >
                                Clarity
                            </th>
                            <th
                                scope="col"
                                className={`table-sort ${getCutOrderType}`}
                                title="Cut"
                                id="CutGrade"
                                onClick={onClickCut}
                            >
                                Cut
                            </th>
                            <th
                                scope="col"
                                className={`table-sort ${getDepthOrderType}`}
                                id="Depth"
                                title="Depth"
                                onClick={onClickDepth}
                            >
                                Depth
                            </th>
                            <th
                                scope="col"
                                className={`table-sort ${getTableOrderType}`}
                                id="TableMeasure"
                                title="Table"
                                onClick={onClickTable}
                            >
                                Table
                            </th>
                            {/* <th
                scope="col"
                className={`table-sort ${getPolishOrderType}`}
                id="Polish"
                title="Polish"
                onClick={onClickPolish}
              >
                Polish
              </th>
              <th
                scope="col"
                className={`table-sort ${getSymmetryOrderType}`}
                id="Symmetry"
                title="Symmetry"
                onClick={onClickSymmetry}
              >
                Sym.
              </th>
              <th
                scope="col"
                className={`table-sort ${getMeasurementOrderType}`}
                id="Measurements"
                title="Measurement"
                onClick={onClickMeasurement}
              >
                Measurement
              </th> */}
                            <th
                                scope="col"
                                className={`table-sort ${getCertificateOrderType}`}
                                id="Certificate"
                                title="Certificate"
                                onClick={onClickCertificate}
                            >
                                Cert.
                            </th>
                            <th
                                scope="col"
                                className={`table-sort ${getPriceOrderType}`}
                                id="FltPrice"
                                title="Price"
                                onClick={onClickPrice}
                            >
                                Price
                                {isShowPrice === true
                                    ? ` ( ${window.initData.data[0].currencyFrom} ) `
                                    : ""}
                            </th>
                            {/* <th
                scope="col"
                className="video-data"
                id="dia_video"
                onClick={onClickVideo}
              >
                Video
              </th>
              <th
                scope="col"
                className="view-data"
                id="dia_view"
                onClick={onClickView}
              >
                View
              </th> */}
                            <th
                                scope="col"
                                className="all-data"
                                id="diamond-data-icon"
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listviewData.map((item) => (
                            <tr
                                key={item.$id}
                                className={`${
                                    window.compareproduct.indexOf(
                                        item.diamondId
                                    ) >
                                        -1 ===
                                    true
                                        ? "selected_row"
                                        : ""
                                }`}
                                onClick={handleUrl}
                            >
                                <th scope="row" className="table-selecter">
                                    {window.compareproduct.indexOf(
                                        item.diamondId
                                    ) >
                                        -1 ==
                                        true && (
                                        <label>
                                            <Checkbox
                                                value={item.diamondId}
                                                onClick={handleCompare}
                                                checked={true}
                                            />
                                        </label>
                                    )}
                                    {window.compareproduct.indexOf(
                                        item.diamondId
                                    ) >
                                        -1 ==
                                        false && (
                                        <label>
                                            <Checkbox
                                                value={item.diamondId}
                                                onClick={handleCompare}
                                            />
                                        </label>
                                    )}
                                </th>
                                <td className="Cutcol">
                                    <img
                                        src={item.biggerDiamondimage}
                                        alt={item.detailLinkText}
                                        width="20"
                                        height="20"
                                        title={
                                            item.shape +
                                            " " +
                                            item.carat +
                                            " CARAT"
                                        }
                                    />
                                    <span className="shape-name">
                                        {item.shape}
                                    </span>
                                </td>
                                <td className="Sizecol">
                                    {" "}
                                    {item.carat ? item.carat : "-"}{" "}
                                </td>
                                <td className="Colorcol">
                                    {" "}
                                    {item.color ? item.color : "-"}{" "}
                                </td>
                                {props.tabname === "fancycolor" && (
                                    <td className="Intensitycol">
                                        {item.fancyColorIntensity
                                            ? item.fancyColorIntensity
                                            : "-"}
                                    </td>
                                )}
                                <td className="ClarityIDcol">
                                    {item.clarity ? item.clarity : "-"}
                                </td>
                                <td className="CutGradecol">
                                    {" "}
                                    {functionWithSwitch(item.cut)}
                                </td>
                                <td className="Depthcol">
                                    {" "}
                                    {item.depth ? item.depth : "-"}{" "}
                                </td>
                                <td className="TableMeasurecol">
                                    {" "}
                                    {item.table ? item.table : "-"}{" "}
                                </td>
                                {/* <td className="Polishcol">{functionWithSwitch(item.polish)}</td>
                <td className="Symmetrycol">
                  {functionWithSwitch(item.symmetry)}
                </td>
                <td className="Measurementscol">
                  {" "}
                  {item.measurement ? item.measurement : "-"}{" "}
                </td> */}
                                <td className="Certificatecol">
                                    {" "}
                                    <a href={item.certificateUrl}>
                                        {item.cert ? item.cert : "-"}
                                    </a>{" "}
                                </td>
                                <td className="FltPricecol">
                                    {item.fltPrice === "Call for Price"
                                        ? ""
                                        : window.initData.data[0]
                                              .price_row_format === "1"
                                        ? item.currencyFrom === "USD"
                                            ? window.currency +
                                              Number(
                                                  item.fltPrice
                                              ).toLocaleString(undefined, {
                                                  maximumFractionDigits: 0,
                                              })
                                            : item.currencyFrom +
                                              "  " +
                                              item.currencySymbol +
                                              "  " +
                                              Number(
                                                  item.fltPrice
                                              ).toLocaleString(undefined, {
                                                  maximumFractionDigits: 0,
                                              })
                                        : item.currencyFrom === "USD"
                                        ? window.currency +
                                          Number(item.fltPrice).toLocaleString(
                                              undefined,
                                              {
                                                  maximumFractionDigits: 0,
                                              }
                                          )
                                        : Number(item.fltPrice).toLocaleString(
                                              undefined,
                                              {
                                                  maximumFractionDigits: 0,
                                              }
                                          ) +
                                          "  " +
                                          item.currencySymbol +
                                          "  " +
                                          item.currencyFrom}
                                    {/* {item.fltPrice !== "Call for Price"
                          ? Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : "Call For Price"} */}
                                </td>
                                {/* <td
                  className={`video-data dia_videocol ${
                    item.videoFileName !== "" ? "video-active" : ""
                  }`}
                >
                  {item.videoFileName !== "" && (
                    <a
                      href="#!"
                      className={`video-popup ${
                        item.videoFileName !== "" ? "video-active" : ""
                      }`}
                      onClick={handleModel}
                    >
                      <i id={item.diamondId} className="fas fa-video"></i>
                    </a>
                  )}
                </td>
                <td className="view-data dia_viewcol">
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
                    title="View Diamond"
                  >
                    <i className="fas fa-eye"></i>
                  </a>
                </td> */}
                                <td className="ellipsis-data">
                                    <div className="info-diamond">
                                        <i className="fas fa-ellipsis-v"></i>
                                    </div>
                                    <div className="icon-hover">
                                        <div
                                            className={`video-icon video-data dia_videocol ${
                                                item.videoFileName !== ""
                                                    ? "video-active"
                                                    : ""
                                            }`}
                                        >
                                            {item.videoFileName !== "" && (
                                                <>
                                                    <a
                                                        href="#!"
                                                        className={`video-popup ${
                                                            item.videoFileName !==
                                                            ""
                                                                ? "video-active"
                                                                : ""
                                                        }`}
                                                        onClick={handleModel}
                                                        data-tip="Video"
                                                    >
                                                        <i
                                                            id={item.diamondId}
                                                            className="fas fa-video"
                                                        ></i>
                                                    </a>
                                                    <ReactTooltip />
                                                </>
                                            )}
                                        </div>
                                        {/* <div className="video-icon">
                      {" "}
                      <i id={item.diamondId} className="fas fa-video"></i>
                    </div> */}
                                        <div className="view-icon">
                                            <a
                                                href={
                                                    "/apps/engagement-rings/diamonds/product/" +
                                                    item.shape
                                                        .replace(/\s+/g, "-")
                                                        .toLowerCase() +
                                                    "-shape-" +
                                                    item.carat
                                                        .replace(/\s+/g, "-")
                                                        .toLowerCase() +
                                                    "-carat-" +
                                                    item.color
                                                        .replace(/\s+/g, "-")
                                                        .toLowerCase() +
                                                    "-color-" +
                                                    item.clarity
                                                        .replace(/\s+/g, "-")
                                                        .toLowerCase() +
                                                    "-clarity-" +
                                                    item.cut
                                                        .replace(/\s+/g, "-")
                                                        .toLowerCase() +
                                                    "-cut-" +
                                                    item.cert
                                                        .replace(/\s+/g, "-")
                                                        .toLowerCase() +
                                                    "-cert-" +
                                                    "islabgrown-" +
                                                    item.isLabCreated +
                                                    "-sku-" +
                                                    item.diamondId
                                                }
                                                data-tip="View Diamond Details"
                                                title="View Diamond"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </a>
                                            <ReactTooltip />
                                        </div>

                                        <div
                                            className="info-icon"
                                            onClick={handleShow}
                                        >
                                            <>
                                                <i
                                                    id={item.diamondId}
                                                    className="fas fa-info"
                                                    data-tip="Quick View"
                                                ></i>
                                                <ReactTooltip />
                                            </>
                                        </div>
                                        <Modal
                                            show={getshow}
                                            size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                        >
                                            <Modal.Header
                                                closeButton
                                                onClick={handleClose}
                                            >
                                                <Modal.Title>
                                                    Additional Information
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div class="diamond-information">
                                                    <ul class="diamond-spacification-list">
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>
                                                                    Diamond ID
                                                                </p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getDiamondID
                                                                        ? getDiamondID
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Shape</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getShape
                                                                        ? getShape
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Carat</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getCarat
                                                                        ? getCarat
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Color</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getColor
                                                                        ? getColor
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Clarity</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getClarity
                                                                        ? getClarity
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Cut</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getCut
                                                                        ? getCut
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Depth %</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getDepth
                                                                        ? getDepth
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Table %</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getTable
                                                                        ? getTable
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Polish</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getPolish
                                                                        ? getPolish
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Symmetry</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getSymmetry
                                                                        ? getSymmetry
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>
                                                                    Measurement
                                                                </p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getMeasurement
                                                                        ? getMeasurement
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>
                                                                    Certificate
                                                                </p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getCertificate
                                                                        ? getCertificate
                                                                        : "NA"}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="diamonds-details-title">
                                                                <p>Price</p>
                                                            </div>
                                                            <div class="diamonds-info">
                                                                <p>
                                                                    {getPrice ===
                                                                    "Call for Price"
                                                                        ? ""
                                                                        : window
                                                                              .initData
                                                                              .data[0]
                                                                              .price_row_format ===
                                                                          "1"
                                                                        ? item.currencyFrom ===
                                                                          "USD"
                                                                            ? window.currency +
                                                                              Number(
                                                                                  item.fltPrice
                                                                              ).toLocaleString(
                                                                                  undefined,
                                                                                  {
                                                                                      maximumFractionDigits: 0,
                                                                                  }
                                                                              )
                                                                            : item.currencyFrom +
                                                                              "  " +
                                                                              item.currencySymbol +
                                                                              "  " +
                                                                              Number(
                                                                                  item.fltPrice
                                                                              ).toLocaleString(
                                                                                  undefined,
                                                                                  {
                                                                                      maximumFractionDigits: 0,
                                                                                  }
                                                                              )
                                                                        : item.currencyFrom ===
                                                                          "USD"
                                                                        ? window.currency +
                                                                          Number(
                                                                              item.fltPrice
                                                                          ).toLocaleString(
                                                                              undefined,
                                                                              {
                                                                                  maximumFractionDigits: 0,
                                                                              }
                                                                          )
                                                                        : Number(
                                                                              item.fltPrice
                                                                          ).toLocaleString(
                                                                              undefined,
                                                                              {
                                                                                  maximumFractionDigits: 0,
                                                                              }
                                                                          ) +
                                                                          "  " +
                                                                          item.currencySymbol +
                                                                          "  " +
                                                                          item.currencyFrom}
                                                                    {/* {getPrice !== "Call for Price"
                                    ? Number(getPrice).toLocaleString(
                                        undefined,
                                        {
                                          maximumFractionDigits: 0,
                                        }
                                      )
                                    : "Call For Price"} */}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ListDataTable;
