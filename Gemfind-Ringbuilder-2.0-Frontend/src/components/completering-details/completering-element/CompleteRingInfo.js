import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Print from "../../../images/print_icon.gif";
import { propTypes } from "react-bootstrap/esm/Image";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import ReCAPTCHA from "react-google-recaptcha";

function formatprice(finalprice) {
    finalprice = finalprice.toString();
    var lastThree = finalprice.substring(finalprice.length - 3);
    var otherNumbers = finalprice.substring(0, finalprice.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

const CompleteRingInfo = (props) => {
    const [open, setOpen] = useState(false);
    let errors = {};
    let formIsValid = true;
    const [loaded, setLoaded] = useState(false);
    const [getTryon, setTryon] = useState("false");
    const [getTryonsrc, setTryonsrc] = useState("");
    const locationurl = useLocation();

    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

    const [recaptchaSchlToken, setSchlRecaptchaToken] = useState("");
    const [isSchlRecaptchaVerified, setIsSchlRecaptchaVerified] =
        useState(false);

    const onOpenModal = (e) => {
        e.preventDefault();
        setOpen(true);
    };
    const onCloseModal = () => setOpen(false);
    var ringprice = Number(props.settingDetailsData.cost);
    var diamondprice = Number(props.diamondDetailsData.fltPrice);
    var finalprice = ringprice + diamondprice;

    const handleRecaptchaChange = (response) => {
        setRecaptchaToken(response);
        setIsRecaptchaVerified(true); // Set verification status
    };

    const handleSchlRecaptchaChange = (response) => {
        setSchlRecaptchaToken(response);
        setIsSchlRecaptchaVerified(true); // Set verification status
    };

    const [openThird, setOpenThird] = useState(false);
    const [openFive, setOpenFive] = useState(false);
    const [openOne, setOpenOne] = useState(false);
    const [getsettingcookies, setsettingcookies] = useCookies([
        "_shopify_ringsetting",
    ]);
    const [getdiamondcookies, setdiamondcookies] = useCookies([
        "_shopify_diamondsetting",
    ]);
    const [getSelectedRingSize, setSelectedRingSize] = useState("");
    const [getSelectedDiamondId, setSelectedDiamondId] = useState("");
    const [getblankvalue, setblankvalue] = useState([""]);
    const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

    const onOpenThirdModal = (e) => {
        e.preventDefault();
        setreqname("");
        setreqemail("");
        setreqphone("");
        setreqmsg("");
        setreqcp("");
        setOpenThird(true);
    };

    const onOpenFifthModal = (e) => {
        e.preventDefault();
        setschdname("");
        setschdemail("");
        setschdphone("");
        setschdmsg("");
        setschddate("");
        setschdtime("");
        setLocation("");
        setOpenFive(true);
    };

    useEffect(() => {
        if (
            getsettingcookies._shopify_ringsetting &&
            getsettingcookies._shopify_ringsetting[0].ringsizewithdia
        ) {
            setSelectedRingSize(
                getsettingcookies._shopify_ringsetting[0].ringsizewithdia
            );
        }

        if (
            getdiamondcookies._shopify_diamondsetting &&
            getdiamondcookies._shopify_diamondsetting[0].diamondId
        ) {
            setSelectedDiamondId(
                getdiamondcookies._shopify_diamondsetting[0].diamondId
            );
        }

        window.addEventListener("message", function (event) {
            if (event.data === "closeIframe") {
                console.log("Iframe Closed");
                setLoaded(false);
                setTryon("false");
            }
        });
    }, []);

    //REQUEST MORE INFORMATION SUBMIT BUTTON

    const [getreqname, setreqname] = useState("");
    const [getreqemail, setreqemail] = useState("");
    const [getreqphone, setreqphone] = useState("");
    const [getreqmsg, setreqmsg] = useState("");
    const [getreqcp, setreqcp] = useState("");

    const [getreqerror, setreqerror] = useState([""]);

    const handleReqname = (event) => {
        setreqname(event.target.value);
    };
    const handleReqemail = (event) => {
        setreqemail(event.target.value);
    };
    const handleReqphone = (event) => {
        setreqphone(event.target.value);
    };
    const handleReqmsg = (event) => {
        setreqmsg(event.target.value);
    };
    const handleReqcp = (event) => {
        setreqcp(event.target.value);
    };

    const handlereginfoSubmit = async (e) => {
        e.preventDefault();
        setLoaded(true);

        console.log("Setting ID");
        console.log(props.settingDetailsData.settingId);
        //Validation

        //Name
        if (getreqname === "") {
            errors["yourname"] = "Please enter your name";
            formIsValid = false;
        }

        //Email
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(getreqemail) === false) {
            errors["youremail"] = "Please enter valid email";
            formIsValid = false;
        }

        //Phone no.
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(getreqphone)) {
            errors["yourphone"] = "Please enter only number";
            formIsValid = false;
        } else if (getreqphone.length != 10) {
            errors["yourphone"] = "Please enter valid phone number.";
            formIsValid = false;
        }

        //Message
        if (getreqmsg === "") {
            errors["yourmsg"] = "Please enter your message";
            formIsValid = false;
        }

        //Contact Preference
        if (getreqcp === "") {
            errors["yourcp"] = "Please select contact preference";
            formIsValid = false;
        }

        if (
            window.initData.data[0].google_site_key &&
            window.initData.data[0].google_secret_key
        ) {
            if (recaptchaToken === "") {
                errors["yourreqrecaptcha"] =
                    "The recaptcha token field is required.";
                formIsValid = false;
            }
        }

        if (formIsValid == false) {
            console.log(errors);
            setreqerror(errors);
            setLoaded(false);
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: getreqname,
                email: getreqemail,
                phone_no: getreqphone,
                req_message: getreqmsg,
                contact_preference: getreqcp,
                ring_url: window.location.href,
                settingid: props.selectedSettingId,
                islabsettings: props.settingDetailsData.isLabSetting,
                diamondurl: window.location.href,
                diamondid: props.diamondDetailsData.diamondId,
                diamondtype: props.diamondDetailsData.isLabCreated,
                completering: "completering",
                shopurl: window.initData.data[0].shop,
                currency: window.currency,
                price: props.settingDetailsData.cost
                    ? props.settingDetailsData.cost
                    : "",
                max_carat: props.settingDetailsData.centerStoneMaxCarat
                    ? props.settingDetailsData.centerStoneMaxCarat
                    : "",
                min_carat: props.settingDetailsData.centerStoneMinCarat
                    ? props.settingDetailsData.centerStoneMinCarat
                    : "",
                metalType: props.settingDetailsData.metalType
                    ? props.settingDetailsData.metalType
                    : "",
                recaptchaToken: recaptchaToken,
            }),
        };
        try {
            const res = await fetch(
                `${window.serverurl}/api/crReqInfoApi`,
                requestOptions
            );
            const reqData = await res.json();
            setOpenThird(false);
            toast("Email Send Successfully");
            setLoaded(false);
            setreqname("");
            setreqemail("");
            setreqphone("");
            setreqmsg("");
            setreqcp("");
            setreqerror("");
        } catch (errors) {
            console.log(errors);
        }
    };

    //SCHEDULE VIWING SUBMIT BUTTON

    const [getschdname, setschdname] = useState("");
    const [getschdemail, setschdemail] = useState("");
    const [getschdphone, setschdphone] = useState("");
    const [getschdmsg, setschdmsg] = useState("");
    const [getschddate, setschddate] = useState("");
    const [getschdtime, setschdtime] = useState("");
    const [location, setLocation] = useState("");

    const [getschderror, setschderror] = useState([""]);

    const handleSchdname = (event) => {
        setschdname(event.target.value);
    };
    const handleSchdemail = (event) => {
        setschdemail(event.target.value);
    };
    const handleSchdphone = (event) => {
        setschdphone(event.target.value);
    };
    const handleSchdmsg = (event) => {
        setschdmsg(event.target.value);
    };
    const handleSchddate = (event) => {
        setschddate(event.target.value);
    };
    const handleSchdtime = (event) => {
        setschdtime(event.target.value);
    };
    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleschdSubmit = async (e) => {
        e.preventDefault();
        setLoaded(true);

        //Validation

        //Name
        if (getschdname === "") {
            errors["yourname"] = "Please enter your name";
            formIsValid = false;
        }

        //Email
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(getschdemail) === false) {
            errors["youremail"] = "Please enter valid email";
            formIsValid = false;
        }

        //Phone no.
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(getschdphone)) {
            errors["yourphone"] = "Please enter only number";
            formIsValid = false;
        } else if (getschdphone.length != 10) {
            errors["yourphone"] = "Please enter valid phone number.";
            formIsValid = false;
        }

        //Message
        if (getschdmsg === "") {
            errors["yourmsg"] = "Please enter your message";
            formIsValid = false;
        }

        //Location
        if (location === "") {
            errors["yourlocation"] = "Please select your location";
            formIsValid = false;
        }

        //Availibilty Date
        if (getschddate === "") {
            errors["yourdate"] = "Please select your availibility date";
            formIsValid = false;
        }

        if (
            window.initData.data[0].google_site_key &&
            window.initData.data[0].google_secret_key
        ) {
            if (recaptchaSchlToken === "") {
                errors["yourscrecaptcha"] =
                    "The recaptcha token field is required.";
                formIsValid = false;
            }
        }

        if (formIsValid == false) {
            console.log(errors);
            setschderror(errors);
            setLoaded(false);
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: getschdname,
                email: getschdemail,
                phone_no: getschdphone,
                schl_message: getschdmsg,
                location: location,
                availability_date: getschddate,
                appnt_time: getschdtime,
                ring_url: window.location.href,
                settingid: props.selectedSettingId,
                islabsettings: props.settingDetailsData.isLabSetting,
                diamondurl: window.location.href,
                diamondid: props.diamondDetailsData.diamondId,
                diamondtype: props.diamondDetailsData.isLabCreated,
                completering: "completering",
                shopurl: window.initData.data[0].shop,
                currency: window.currency,
                price: props.settingDetailsData.cost
                    ? props.settingDetailsData.cost
                    : "",
                max_carat: props.settingDetailsData.centerStoneMaxCarat
                    ? props.settingDetailsData.centerStoneMaxCarat
                    : "",
                min_carat: props.settingDetailsData.centerStoneMinCarat
                    ? props.settingDetailsData.centerStoneMinCarat
                    : "",
                metalType: props.settingDetailsData.metalType
                    ? props.settingDetailsData.metalType
                    : "",
                recaptchaToken: recaptchaSchlToken,
            }),
        };
        try {
            const res = await fetch(
                `${window.serverurl}/api/crScheViewApi`,
                requestOptions
            );
            const schdData = await res.json();
            setOpenFive(false);
            toast("Email Send Successfully");
            setLoaded(false);
            setschdname("");
            setschdemail("");
            setschdphone("");
            setschdmsg("");
            setschddate("");
            setschdtime("");
            setLocation("");
            setschderror("");
        } catch (errors) {
            console.log(errors);
        }
    };

    const handlevirtual = (e) => {
        console.log(getsettingcookies._shopify_ringsetting[0].styleNumber);
        var styleNumber = getsettingcookies._shopify_ringsetting[0].styleNumber;
        e.preventDefault();
        setLoaded(true);
        setTryon("true");
        setTryonsrc(
            `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${styleNumber}&buynow=0`
        );
    };

    //Add To Cart
    const handleAddToCart = async (e) => {
        setLoaded(true);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                shop_domain: window.initData.data[0].shop,
                diamond_id: getSelectedDiamondId,
                setting_id:
                    getsettingcookies._shopify_ringsetting[0].setting_id,
                dealer_id: window.initData.data[0].dealerid,
                metaltype: props.settingDetailsData.metalType,
                is_lab: getdiamondcookies._shopify_diamondsetting[0]
                    .isLabCreated,
                sidestonequalityvalue:
                    getsettingcookies._shopify_ringsetting[0].sideStoneQuality,
                ringsizesettingonly: getSelectedRingSize,
                centerstonesizevalue:
                    getsettingcookies._shopify_ringsetting[0].centerStoneSize,
                type: window.initData.data[0].type_1,
            }),
        };
        try {
            const res = await fetch(
                `${window.serverurl}/api/addToCart`,
                requestOptions
            );
            const addtocartData = await res.json();
            console.log(addtocartData);
            if (addtocartData) {
                removeCookie("shopify_diamondbackvalue", { path: "/" });
                removeCookie("_wpsaveringfiltercookie", { path: "/" });
                removeCookie("_wpsavediamondfiltercookie", { path: "/" });
                removeCookie("_wpsavedcompareproductcookie", { path: "/" });
                removeCookie("_shopify_diamondsetting", { path: "/" });
                removeCookie("shopify_ringbackvalue", { path: "/" });
                removeCookie("_shopify_ringsetting", { path: "/" });
            }
            window.location.href = addtocartData;
        } catch (errors) {
            console.log(errors);
        }
    };

    return (
        <>
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
            {/* Ring Info */}

            <div className="ring-descreption">
                <LoadingOverlay className="_loading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                </LoadingOverlay>
                <div className="product-info__title">
                    <h2>{props.settingDetailsData.settingName}</h2>
                    <h4 className="ring-spacifacation">
                        <a href="#" onClick={setOpenOne}>
                            <span>
                                <i className="far fa-edit"></i>
                            </span>
                            Ring Specification
                        </a>
                    </h4>
                    <Modal
                        open={openOne}
                        onClose={() => setOpenOne(false)}
                        center
                        classNames={{
                            overlay: "popup_Overlay",
                            modal: "popup_product",
                        }}
                    >
                        <div className="popup_content">
                            <p className="popup_pr">
                                This refer to different type of Metal Type to
                                filter and select the appropriate ring as per
                                your requirements. Look for a metal type best
                                suit of your chosen ring.
                            </p>
                            <div className="diamond-information">
                                <div className="spacification-info">
                                    <h2>SETTING DETAILS</h2>
                                </div>
                                <ul>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Setting Number</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {
                                                    props.settingDetailsData
                                                        .styleNumber
                                                }
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Price</p>
                                        </div>
                                        {props.settingDetailsData.showPrice ===
                                            true && (
                                            <div className="diamonds-info">
                                                <p>
                                                    {/* {window.currency}
                          {Number(props.settingDetailsData.cost).toLocaleString(
                            undefined,
                            { maximumFractionDigits: 0 }
                          )} */}
                                                    {window.initData.data[0]
                                                        .price_row_format ===
                                                    "1"
                                                        ? props
                                                              .settingDetailsData
                                                              .currencyFrom ===
                                                          "USD"
                                                            ? window.currency +
                                                              Number(
                                                                  props
                                                                      .settingDetailsData
                                                                      .cost
                                                              ).toLocaleString(
                                                                  undefined,
                                                                  {
                                                                      maximumFractionDigits: 0,
                                                                  }
                                                              )
                                                            : props
                                                                  .settingDetailsData
                                                                  .currencyFrom +
                                                              "  " +
                                                              props
                                                                  .settingDetailsData
                                                                  .currencySymbol +
                                                              "  " +
                                                              Number(
                                                                  props
                                                                      .settingDetailsData
                                                                      .cost
                                                              ).toLocaleString(
                                                                  undefined,
                                                                  {
                                                                      maximumFractionDigits: 0,
                                                                  }
                                                              )
                                                        : props
                                                              .settingDetailsData
                                                              .currencyFrom ===
                                                          "USD"
                                                        ? window.currency +
                                                          Number(
                                                              props
                                                                  .settingDetailsData
                                                                  .cost
                                                          ).toLocaleString(
                                                              undefined,
                                                              {
                                                                  maximumFractionDigits: 0,
                                                              }
                                                          )
                                                        : Number(
                                                              props
                                                                  .settingDetailsData
                                                                  .cost
                                                          ).toLocaleString(
                                                              undefined,
                                                              {
                                                                  maximumFractionDigits: 0,
                                                              }
                                                          ) +
                                                          "  " +
                                                          props
                                                              .settingDetailsData
                                                              .currencySymbol +
                                                          "  " +
                                                          props
                                                              .settingDetailsData
                                                              .currencyFrom}
                                                </p>
                                            </div>
                                        )}
                                        {props.settingDetailsData.showPrice ===
                                            false && (
                                            <div className="diamonds-info">
                                                <p>{"Call For Price"}</p>
                                            </div>
                                        )}
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Metal Type</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {
                                                    props.settingDetailsData
                                                        .metalType
                                                }
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="spacification-info">
                                    <h2>CAN BE SET WITH</h2>
                                </div>
                                <ul>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>
                                                {
                                                    props.settingDetailsData
                                                        .centerStoneFit
                                                }
                                            </p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {
                                                    props.settingDetailsData
                                                        .centerStoneMinCarat
                                                }
                                                -
                                                {
                                                    props.settingDetailsData
                                                        .centerStoneMaxCarat
                                                }
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Modal>
                </div>

                {props.settingDetailsData.description !== "NA" && (
                    <div className="product-info__descreption">
                        <p>{props.settingDetailsData.description}</p>
                    </div>
                )}
                <div className="diaomnd-info">
                    <div className="metaltype product-dropdown">
                        <span>Metal Type</span>
                        <span className="metaldropdown">
                            {props.settingDetailsData.metalType}
                        </span>
                    </div>
                    <div className="stonesize product-dropdown">
                        <span>Center Stone Size</span>
                        <span className="stonesizedropdown">
                            {props.settingDetailsData.centerStoneMinCarat}-
                            {props.settingDetailsData.centerStoneMaxCarat}
                        </span>
                    </div>
                    <div className="ringsize product-dropdown">
                        <span>Ring Size</span>
                        <span className="ringdropdown">
                            {getSelectedRingSize ? getSelectedRingSize : "NA"}
                        </span>
                    </div>
                </div>
                {props.settingDetailsData.showPrice === true && (
                    <div className="dia-ring-price">
                        Setting Price:
                        <span className="complete_setting_price">
                            {/* {window.currency}
              {Number(props.settingDetailsData.cost).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })} */}
                            {window.initData.data[0].price_row_format === "1"
                                ? props.settingDetailsData.currencyFrom ===
                                  "USD"
                                    ? window.currency +
                                      Number(
                                          props.settingDetailsData.cost
                                      ).toLocaleString(undefined, {
                                          maximumFractionDigits: 0,
                                      })
                                    : props.settingDetailsData.currencyFrom +
                                      "  " +
                                      props.settingDetailsData.currencySymbol +
                                      "  " +
                                      Number(
                                          props.settingDetailsData.cost
                                      ).toLocaleString(undefined, {
                                          maximumFractionDigits: 0,
                                      })
                                : props.settingDetailsData.currencyFrom ===
                                  "USD"
                                ? window.currency +
                                  Number(
                                      props.settingDetailsData.cost
                                  ).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                  })
                                : Number(
                                      props.settingDetailsData.cost
                                  ).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                  }) +
                                  "  " +
                                  props.settingDetailsData.currencySymbol +
                                  "  " +
                                  props.settingDetailsData.currencyFrom}
                        </span>
                    </div>
                )}
                {props.settingDetailsData.showPrice === false && (
                    <div className="dia-ring-price">
                        Setting Price:
                        <span className="complete_setting_price">
                            {"Call For Price"}
                        </span>
                    </div>
                )}
            </div>
            {/* Diamond info    */}
            <div className="ring-descreption">
                <div className="product-info__title">
                    <h2>{props.diamondDetailsData.mainHeader}</h2>
                    <h4 className="ring-spacifacation">
                        <a href="#" onClick={onOpenModal}>
                            <span>
                                <i className="far fa-edit"></i>
                            </span>
                            Diamond Specification
                        </a>
                    </h4>
                    <Modal
                        open={open}
                        onClose={onCloseModal}
                        center
                        classNames={{
                            overlay: "popup_Overlay",
                            modal: "popup_diamond-product",
                        }}
                    >
                        <div className="popup_content">
                            {/* <p className='popup_pr'>This refer to different type of Metal Type to filter and select the appropriate ring as per your requirements. Look for a metal type best suit of your chosen ring.</p> */}
                            <div className="diamond-information">
                                <div className="spacification-info">
                                    <h2>Diamond Details</h2>
                                </div>
                                <ul className="diamond-spacification-list">
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Stock Number</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {
                                                    props.diamondDetailsData
                                                        .stockNumber
                                                }
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Price</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData
                                                    .fltPrice ===
                                                "Call for Price"
                                                    ? ""
                                                    : window.initData.data[0]
                                                          .price_row_format ===
                                                      "1"
                                                    ? props.diamondDetailsData
                                                          .currencyFrom ===
                                                      "USD"
                                                        ? window.currency +
                                                          Number(
                                                              props
                                                                  .diamondDetailsData
                                                                  .fltPrice
                                                          ).toLocaleString(
                                                              undefined,
                                                              {
                                                                  maximumFractionDigits: 0,
                                                              }
                                                          )
                                                        : props
                                                              .diamondDetailsData
                                                              .currencyFrom +
                                                          "  " +
                                                          props
                                                              .diamondDetailsData
                                                              .currencySymbol +
                                                          "  " +
                                                          Number(
                                                              props
                                                                  .diamondDetailsData
                                                                  .fltPrice
                                                          ).toLocaleString(
                                                              undefined,
                                                              {
                                                                  maximumFractionDigits: 0,
                                                              }
                                                          )
                                                    : props.diamondDetailsData
                                                          .currencyFrom ===
                                                      "USD"
                                                    ? window.currency +
                                                      Number(
                                                          props
                                                              .diamondDetailsData
                                                              .fltPrice
                                                      ).toLocaleString(
                                                          undefined,
                                                          {
                                                              maximumFractionDigits: 0,
                                                          }
                                                      )
                                                    : Number(
                                                          props
                                                              .diamondDetailsData
                                                              .fltPrice
                                                      ).toLocaleString(
                                                          undefined,
                                                          {
                                                              maximumFractionDigits: 0,
                                                          }
                                                      ) +
                                                      "  " +
                                                      props.diamondDetailsData
                                                          .currencySymbol +
                                                      "  " +
                                                      props.diamondDetailsData
                                                          .currencyFrom}
                                                {}
                                                {/* {props.diamondDetailsData.fltPrice === "Call for Price"
                          ? "Call for Price"
                          : formatprice(
                              Number(props.diamondDetailsData.fltPrice)
                            )} */}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Price Per Carat</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {/* {window.currency}
                        {props.diamondDetailsData.costPerCarat
                          ? props.diamondDetailsData.costPerCarat.split(".")[0]
                          : "-"} */}
                                                {props.diamondDetailsData
                                                    .fltPrice ===
                                                "Call for Price"
                                                    ? ""
                                                    : window.currency}
                                                {props.diamondDetailsData
                                                    .fltPrice !==
                                                "Call for Price"
                                                    ? props.diamondDetailsData.costPerCarat.split(
                                                          "."
                                                      )[0]
                                                    : "Call for Price"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Carat Weight</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData
                                                    .caratWeight
                                                    ? props.diamondDetailsData
                                                          .caratWeight
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Cut</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData.cut
                                                    ? props.diamondDetailsData
                                                          .cut
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Clarity</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData
                                                    .clarity
                                                    ? props.diamondDetailsData
                                                          .clarity
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Depth %</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData.depth
                                                    ? props.diamondDetailsData
                                                          .depth
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Table %</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData.table
                                                    ? props.diamondDetailsData
                                                          .table
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Polish</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData.polish
                                                    ? props.diamondDetailsData
                                                          .polish
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Symmetry</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData
                                                    .symmetry
                                                    ? props.diamondDetailsData
                                                          .symmetry
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Origin</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData.origin
                                                    ? props.diamondDetailsData
                                                          .origin
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Girdle</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData
                                                    .girdleThick
                                                    ? props.diamondDetailsData
                                                          .girdleThick
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Culet</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData.culet
                                                    ? props.diamondDetailsData
                                                          .culet
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Fluorescence</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData
                                                    .fluorescence
                                                    ? props.diamondDetailsData
                                                          .fluorescence
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="diamonds-details-title">
                                            <p>Measurement</p>
                                        </div>
                                        <div className="diamonds-info">
                                            <p>
                                                {props.diamondDetailsData
                                                    .measurement
                                                    ? props.diamondDetailsData
                                                          .measurement
                                                    : "-"}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="product-info__descreption">
                    <p>{props.diamondDetailsData.subHeader}</p>
                </div>
                <div className="diamond-sku">
                    <span>SKU#</span>
                    {props.diamondDetailsData.diamondId}
                </div>
                <div className="diamond-intro-field">
                    <ul>
                        <li>
                            <strong>Report:</strong>
                            <p>
                                {props.diamondDetailsData.certificate
                                    ? props.diamondDetailsData.certificate
                                    : "None"}
                            </p>
                        </li>
                        <li>
                            <strong>Cut:</strong>
                            <p>
                                {props.diamondDetailsData.cut
                                    ? props.diamondDetailsData.cut
                                    : "NA"}
                            </p>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Color:</strong>
                            <p>
                                {props.diamondDetailsData.color
                                    ? props.diamondDetailsData.color
                                    : "NA"}
                            </p>
                        </li>
                        <li>
                            <strong>Clarity:</strong>
                            <p>
                                {props.diamondDetailsData.clarity
                                    ? props.diamondDetailsData.clarity
                                    : "NA"}
                            </p>
                        </li>
                    </ul>
                </div>
                {props.diamondDetailsData.fltPrice !== "Call for Price" && (
                    <div className="dia-ring-price">
                        Diamond Price:
                        <span className="complete_setting_price">
                            {props.diamondDetailsData.fltPrice ===
                            "Call for Price"
                                ? ""
                                : window.initData.data[0].price_row_format ===
                                  "1"
                                ? props.diamondDetailsData.currencyFrom ===
                                  "USD"
                                    ? window.currency +
                                      Number(
                                          props.diamondDetailsData.fltPrice
                                      ).toLocaleString(undefined, {
                                          maximumFractionDigits: 0,
                                      })
                                    : props.diamondDetailsData.currencyFrom +
                                      "  " +
                                      props.diamondDetailsData.currencySymbol +
                                      "  " +
                                      Number(
                                          props.diamondDetailsData.fltPrice
                                      ).toLocaleString(undefined, {
                                          maximumFractionDigits: 0,
                                      })
                                : props.diamondDetailsData.currencyFrom ===
                                  "USD"
                                ? window.currency +
                                  Number(
                                      props.diamondDetailsData.fltPrice
                                  ).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                  })
                                : Number(
                                      props.diamondDetailsData.fltPrice
                                  ).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                  }) +
                                  "  " +
                                  props.diamondDetailsData.currencySymbol +
                                  "  " +
                                  props.diamondDetailsData.currencyFrom}
                            {}
                            {/* {props.diamondDetailsData.fltPrice === "Call for Price"
                ? "Call for Price"
                : formatprice(Number(props.diamondDetailsData.fltPrice))} */}
                        </span>
                    </div>
                )}
                <div className="product-controller diamond-product-controller">
                    <ul>
                        {window.initData.data[0].enable_more_info === "1" && (
                            <li>
                                <a href="#!" onClick={onOpenThirdModal}>
                                    <span>
                                        <i className="fas fa-info"></i>
                                    </span>
                                    Request More Info
                                </a>
                                <Modal
                                    open={openThird}
                                    onClose={() => setOpenThird(false)}
                                    center
                                    classNames={{
                                        overlay: "popup_Overlay",
                                        modal: "popup-form",
                                    }}
                                >
                                    <LoadingOverlay className="_loading_overlay_wrapper">
                                        <Loader fullPage loading={loaded} />
                                    </LoadingOverlay>

                                    <div className="Diamond-form--small">
                                        <div className="requested-form">
                                            <h2> REQUEST MORE INFORMATION</h2>
                                            <p>
                                                Our specialists will contact
                                                you.
                                            </p>
                                        </div>
                                        <form
                                            onSubmit={handlereginfoSubmit}
                                            className="request-form"
                                        >
                                            <div className="form-field">
                                                <TextField
                                                    id="request_name"
                                                    label="Your Name"
                                                    variant="outlined"
                                                    value={getreqname}
                                                    onChange={handleReqname}
                                                />
                                                <p> {getreqerror.yourname} </p>

                                                <TextField
                                                    id="request_email"
                                                    type="email"
                                                    label="Your E-mail"
                                                    variant="outlined"
                                                    value={getreqemail}
                                                    onChange={handleReqemail}
                                                />
                                                <p> {getreqerror.youremail} </p>

                                                <TextField
                                                    id="request_phone"
                                                    label="Your Phone Number"
                                                    variant="outlined"
                                                    value={getreqphone}
                                                    onChange={handleReqphone}
                                                />
                                                <p> {getreqerror.yourphone} </p>

                                                <TextField
                                                    id="req_message"
                                                    multiline
                                                    rows={3}
                                                    label="Add A Personal Message Here ..."
                                                    variant="outlined"
                                                    value={getreqmsg}
                                                    onChange={handleReqmsg}
                                                />
                                                <p> {getreqerror.yourmsg} </p>

                                                <div className="contact-prefrtence">
                                                    <span>
                                                        Contact Preference:
                                                    </span>
                                                    <div className="pref_container">
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                defaultValue="female"
                                                                name="radio-buttons-group"
                                                                value={getreqcp}
                                                                onChange={
                                                                    handleReqcp
                                                                }
                                                            >
                                                                <FormControlLabel
                                                                    value="By Email"
                                                                    name="contact_pref"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="By Email"
                                                                />
                                                                <FormControlLabel
                                                                    value="By Phone"
                                                                    name="contact_pref"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="By Phone"
                                                                />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                    <p> {getreqerror.yourcp}</p>
                                                </div>
                                                <div className="prefrence-action">
                                                    <div className="prefrence-action action moveUp">
                                                        {window.initData.data[0]
                                                            .google_site_key &&
                                                            window.initData
                                                                .data[0]
                                                                .google_secret_key && (
                                                                <div className="gf-grecaptcha">
                                                                    <ReCAPTCHA
                                                                        sitekey={
                                                                            window
                                                                                .initData
                                                                                .data[0]
                                                                                .google_site_key
                                                                        }
                                                                        onChange={
                                                                            handleRecaptchaChange
                                                                        }
                                                                    />
                                                                    <p>
                                                                        {
                                                                            getreqerror.yourreqrecaptcha
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        <button
                                                            type="submit"
                                                            title="Submit"
                                                            className="btn preference-btn"
                                                        >
                                                            <span>Request</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Modal>
                            </li>
                        )}
                        {window.initData.data[0].enable_schedule_viewing ===
                            "1" && (
                            <li>
                                <a href="#!" onClick={onOpenFifthModal}>
                                    <span>
                                        <i className="far fa-calendar-alt"></i>
                                    </span>
                                    Schedule Viewing
                                </a>
                                <Modal
                                    open={openFive}
                                    onClose={() => setOpenFive(false)}
                                    center
                                    classNames={{
                                        overlay: "popup_Overlay",
                                        modal: "popup-form",
                                    }}
                                >
                                    <LoadingOverlay className="_loading_overlay_wrapper">
                                        <Loader fullPage loading={loaded} />
                                    </LoadingOverlay>
                                    <div className="Diamond-form">
                                        <div className="requested-form">
                                            <h2>SCHEDULE A VIEWING</h2>
                                            <p>
                                                See This Item And More In Our
                                                Store.
                                            </p>
                                        </div>
                                        <form
                                            onSubmit={handleschdSubmit}
                                            className="schedule-form"
                                        >
                                            <div className="form-field">
                                                <TextField
                                                    id="schedule_name"
                                                    label="Your Name"
                                                    variant="outlined"
                                                    value={getschdname}
                                                    onChange={handleSchdname}
                                                />
                                                <p> {getschderror.yourname} </p>

                                                <TextField
                                                    id="schedule_email"
                                                    type="email"
                                                    label="Your E-mail Address"
                                                    variant="outlined"
                                                    value={getschdemail}
                                                    onChange={handleSchdemail}
                                                />
                                                <p>
                                                    {" "}
                                                    {
                                                        getschderror.youremail
                                                    }{" "}
                                                </p>

                                                <TextField
                                                    id="schedule_num"
                                                    label="Your Phone Number"
                                                    variant="outlined"
                                                    value={getschdphone}
                                                    onChange={handleSchdphone}
                                                />
                                                <p>
                                                    {" "}
                                                    {
                                                        getschderror.yourphone
                                                    }{" "}
                                                </p>

                                                <TextField
                                                    id="drophint_message"
                                                    multiline
                                                    rows={3}
                                                    label="Add A Personal Message Here ..."
                                                    variant="outlined"
                                                    value={getschdmsg}
                                                    onChange={handleSchdmsg}
                                                />
                                                <p> {getschderror.yourmsg} </p>

                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="select_schedule"
                                                    value={location}
                                                    onChange={handleChange}
                                                    label="Location"
                                                    variant="outlined"
                                                >
                                                    <MenuItem value={"Test"}>
                                                        Test
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={
                                                            "Newport beach123"
                                                        }
                                                    >
                                                        Newport beach123
                                                    </MenuItem>
                                                </Select>
                                                <p>
                                                    {" "}
                                                    {
                                                        getschderror.yourlocation
                                                    }{" "}
                                                </p>

                                                <TextField
                                                    label="When are you available?"
                                                    id="date"
                                                    type="date"
                                                    inputformat="MM/dd/yyyy"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={getschddate}
                                                    onChange={handleSchddate}
                                                    fullWidth
                                                />

                                                <p> {getschderror.yourdate} </p>

                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="select_time"
                                                    value={getschdtime}
                                                    onChange={handleSchdtime}
                                                    label="Time"
                                                    variant="outlined"
                                                >
                                                    <MenuItem
                                                        value={"08:00 AM"}
                                                    >
                                                        08:00 AM
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={"08:30 AM"}
                                                    >
                                                        08:30 AM
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={"09:00 AM"}
                                                    >
                                                        09:00 AM
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={"09:30 AM"}
                                                    >
                                                        09:30 AM
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={"10:00 PM"}
                                                    >
                                                        10:00 PM
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={"10:30 PM"}
                                                    >
                                                        10:30 PM
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={"11:00 PM"}
                                                    >
                                                        11:00 PM
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={"11:30 PM"}
                                                    >
                                                        11:30 PM
                                                    </MenuItem>
                                                </Select>

                                                <div className="prefrence-action">
                                                    <div className="prefrence-action action moveUp">
                                                        {window.initData.data[0]
                                                            .google_site_key &&
                                                            window.initData
                                                                .data[0]
                                                                .google_secret_key && (
                                                                <div className="gf-grecaptcha">
                                                                    <ReCAPTCHA
                                                                        sitekey={
                                                                            window
                                                                                .initData
                                                                                .data[0]
                                                                                .google_site_key
                                                                        }
                                                                        onChange={
                                                                            handleSchlRecaptchaChange
                                                                        }
                                                                    />
                                                                    <p>
                                                                        {
                                                                            getschderror.yourscrecaptcha
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        <button
                                                            type="submit"
                                                            title="Submit"
                                                            className="btn preference-btn"
                                                        >
                                                            <span>Request</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Modal>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="diamond-tryon">
                    <span>
                        {/* {props.diamondDetailsData.fltPrice === "Call for Price"
                            ? ""
                            : window.initData.data[0].price_row_format === "1"
                            ? props.diamondDetailsData.currencyFrom === "USD"
                                ? window.currency +
                                  Number(
                                      props.diamondDetailsData.fltPrice
                                  ).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                  })
                                : props.diamondDetailsData.currencyFrom +
                                  "  " +
                                  props.diamondDetailsData.currencySymbol +
                                  "  " +
                                  Number(
                                      props.diamondDetailsData.fltPrice
                                  ).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                  })
                            : props.diamondDetailsData.currencyFrom === "USD"
                            ? window.currency +
                              Number(
                                  props.diamondDetailsData.fltPrice
                              ).toLocaleString(undefined, {
                                  maximumFractionDigits: 0,
                              })
                            : Number(
                                  props.diamondDetailsData.fltPrice
                              ).toLocaleString(undefined, {
                                  maximumFractionDigits: 0,
                              }) +
                              "  " +
                              props.diamondDetailsData.currencySymbol +
                              "  " +
                              props.diamondDetailsData.currencyFrom}
                        {} */}
                        {props.diamondDetailsData.fltPrice === "Call for Price"
                            ? ""
                            : window.currency}
                        {props.diamondDetailsData.fltPrice === "Call for Price"
                            ? "Call for Price"
                            : formatprice(finalprice)}
                    </span>

                    <div className="diamond-btn">
                        {props.diamondDetailsData.fltPrice !==
                            "Call for Price" && (
                            <button
                                type="submit"
                                title="Submit"
                                onClick={handleAddToCart}
                                className="btn btn-diamond"
                            >
                                Add To Cart
                            </button>
                        )}

                        {window.initData.data[0].display_tryon === 1 && (
                            <a
                                className="btn btn-tryon"
                                onClick={handlevirtual}
                                href="#"
                            >
                                Virtual Try On
                            </a>
                        )}
                    </div>
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

export default CompleteRingInfo;
