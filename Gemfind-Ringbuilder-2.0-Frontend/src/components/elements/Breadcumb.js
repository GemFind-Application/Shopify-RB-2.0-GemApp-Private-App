import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Breadcumb = (props) => {
    const location = useLocation();
    var settingsurl = location.pathname.includes("settings");
    var diamondtoolurl = location.pathname.includes("diamonds");
    var compareurl = location.pathname.includes("compare");
    var completeRingurl = location.pathname.includes("completering");
    var labgownurl = location.pathname.includes("navfancycolored");
    var fancycolorurl = location.pathname.includes("navlabgrown");
    const [getsettingcookies, setsettingcookies] = useCookies([
        "_shopify_ringsetting",
    ]);
    const [getdiamondcookies, setdiamondcookies] = useCookies([
        "_shopify_diamondsetting",
    ]);

    const [getDiamondCookie, setDiamondCookie] = useState(false);
    const [getsettingcookie, setsettingcookie] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([
        "shopify_ringbackvalue",
    ]);
    const navigate = useNavigate();

    var currentNavValue = "settings";
    if (settingsurl) {
        currentNavValue = "settings";
    }
    if (diamondtoolurl) {
        currentNavValue = "diamonds";
    }
    if (labgownurl) {
        currentNavValue = "diamonds";
    }
    if (fancycolorurl) {
        currentNavValue = "diamonds";
    }
    if (completeRingurl) {
        currentNavValue = "completeRing";
    }
    if (compareurl) {
        currentNavValue = "diamonds";
    }
    //console.log(currentNavValue);

    const handlenavigation = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        if (e.target.id === "completeRing") {
            if (getDiamondCookie === true && getsettingcookie === true) {
                navigate("/apps/engagement-rings/completeRing");
            }
        }
        if (e.target.id === "settings") {
            if (window.initData.data[0].is_api === "false") {
                window.location.href = "/collections/ringbuilder-settings";
            } else {
                navigate("/apps/engagement-rings/" + e.target.id);
            }

            //Remove diamond cookies on tab toggling
            if (
                getsettingcookies._shopify_ringsetting &&
                getsettingcookies._shopify_ringsetting[0].setting_id
            ) {
                removeCookie("_shopify_ringsetting", { path: "/" });
            }
            if (cookies.shopify_ringbackvalue) {
                removeCookie("shopify_ringbackvalue", { path: "/" });
            }
        }
        if (e.target.id === "diamonds") {
            //Remove ring setting cookies on tab toggling
            if (
                getdiamondcookies._shopify_diamondsetting &&
                getdiamondcookies._shopify_diamondsetting[0].diamondId
            ) {
                removeCookie("_shopify_diamondsetting", { path: "/" });
            }

            if (
                getdiamondcookies.shopify_diamondbackvalue &&
                getdiamondcookies.shopify_diamondbackvalue[0].diamondId
            ) {
                removeCookie("shopify_diamondbackvalue", { path: "/" });
            }

            // if (
            //   window.initData.data[0].is_api === "false"
            //   // &&
            //   // getsettingcookie === false
            // ) {
            //   window.location.href = "/collections/ringbuilder-settings";
            // } else {
            navigate("/apps/engagement-rings/" + e.target.id);
            //}
        }
    };

    useEffect(() => {
        if (
            getsettingcookies._shopify_ringsetting &&
            getsettingcookies._shopify_ringsetting[0].setting_id
        ) {
            setsettingcookie(true);
        }
        if (
            getdiamondcookies._shopify_diamondsetting &&
            getdiamondcookies._shopify_diamondsetting[0].diamondId
        ) {
            setDiamondCookie(true);
        }
    }, []);

    return (
        <>
            <style>
                {`.gf-rb-breadCumbs .active a {
                background-color: ${window.initData["data"][0].header_colour};
                
            }
            // .gf-rb-breadCumbs .breadCumb.active h2{
            // color: ${window.initData["data"][0].link_colour};
            // }
            // .gf-rb-breadCumbs .active a p.subTitle{
            //   color: ${window.initData["data"][0].link_colour};
            // }
            .gf-rb-breadCumbs .active a::before , .gf-rb-breadCumbs .active a::after{
              border-left-color:${window.initData["data"][0].header_colour};
            }
            `}
            </style>
            <div
                className={`breadCumb ${
                    currentNavValue === props.Data.urlkey ? "active" : ""
                }`}
            >
                <a
                    href="#"
                    id={`${props.Data.urlkey}`}
                    onClick={handlenavigation}
                >
                    <span
                        id={`${props.Data.urlkey}`}
                        className="breadcumb-title"
                    >
                        <p className="subTitle" id={`${props.Data.urlkey}`}>
                            {props.Data.subTitle}{" "}
                        </p>
                        <h2 className="btitle" id={`${props.Data.urlkey}`}>
                            {props.Data.title}
                        </h2>
                    </span>
                    <i
                        className={props.Data.image}
                        id={`${props.Data.urlkey}`}
                    ></i>
                </a>
            </div>
        </>
    );
};

export default Breadcumb;
