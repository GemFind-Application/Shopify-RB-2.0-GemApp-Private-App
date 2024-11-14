import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Topheader from "../elements/Topheader";
import Data from "../elements/data";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import CompleteRingInfo from "./completering-element/CompleteRingInfo";
import CompleteRingGallary from "./completering-element/CompleteRingGallary";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { browserHistory } from "react-router";

window.addEventListener("pageshow", function (event) {
    var historyTraversal =
        event.persisted ||
        (typeof window.performance != "undefined" &&
            window.performance.navigation.type === 2);
    if (historyTraversal) {
        // Handle page restore.
        //alert('refresh');
        window.location.reload();
    }
});

const CompleteringSetting = () => {
    const [getsettingcookies, setsettingcookies] = useCookies([
        "_shopify_ringsetting",
    ]);
    const [getdiamondcookies, setdiamondcookies] = useCookies([
        "_shopify_diamondsetting",
    ]);
    const [getSelectedSettingId, setSelectedSettingId] = useState("");
    const [getSelectedProductId, setSelectedProductId] = useState("");
    const [getSelectedDiamondId, setSelectedDiamondId] = useState("");
    const [loadvarible, setloadvariable] = useState(false);
    const [getSettingProductData, setSettingProductData] = useState("");
    const [getdiamondProductData, setdiamondProductData] = useState("");
    const [skeltonLoad, setskeltonLoad] = useState(false);
    const navigate = useNavigate();

    const getRingData = async (
        DealerID,
        getSettingId,
        getSelectedProductId
    ) => {
        try {
            if (window.initData.data[0].is_api === "false") {
                var url = `${window.initData.data[0].server_url}/api/getProductDetails/${window.initData.data[0].shop}/${getSelectedProductId}/${getSettingId}`;
                // console.log(getSelectedProductId);
                // console.log(getSettingId);
            } else {
                var url = `${window.initData.data[0].mountinglistapifancy}DealerID=${DealerID}&SID=${getSettingId}`;
            }

            const res = await fetch(url);
            const productDetails = await res.json();
            setSettingProductData(productDetails);
        } catch (error) {
            console.log(error);
        }
    };

    const getDiamondData = async (DealerID, getDiamondId) => {
        try {
            console.log(getdiamondcookies._shopify_diamondsetting);
            if (
                getdiamondcookies._shopify_diamondsetting[0].isLabCreated ===
                true
            ) {
                var url = `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&DID=${getDiamondId}&IsLabGrown=true`;
            } else {
                var url = `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&DID=${getDiamondId}`;
            }

            const res = await fetch(url);
            const productDetails = await res.json();
            console.log(productDetails);
            setdiamondProductData(productDetails);
            console.log(getdiamondProductData);
            setTimeout(() => {
                setskeltonLoad(true);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //if(loadvarible === false){

        console.log(getdiamondcookies._shopify_diamondsetting);
        console.log(getsettingcookies);
        if (
            getdiamondcookies._shopify_diamondsetting === undefined &&
            getsettingcookies._shopify_ringsetting === undefined
        ) {
            if (window.initData.data[0].is_api === "false") {
                navigate("/collections/ringbuilder-settings");
            } else {
                navigate("/apps/engagement-rings/");
            }
        }
        if (
            window.initData.data[0].is_api === "false" &&
            getsettingcookies._shopify_ringsetting
        ) {
            setSelectedProductId(
                getsettingcookies._shopify_ringsetting[0].product_id
            );
        }
        if (
            getsettingcookies._shopify_ringsetting &&
            getsettingcookies._shopify_ringsetting[0].setting_id
        ) {
            setSelectedSettingId(
                getsettingcookies._shopify_ringsetting[0].setting_id
            );
        }
        if (
            getdiamondcookies._shopify_diamondsetting &&
            getdiamondcookies._shopify_diamondsetting[0].diamondId
        ) {
            setSelectedDiamondId(
                getdiamondcookies._shopify_diamondsetting[0].diamondId
            );
            setloadvariable(true);
        }
        // }
        if (loadvarible === true) {
            getRingData(
                window.initData.data[0].dealerid,
                getSelectedSettingId,
                getSelectedProductId
            );
            getDiamondData(
                window.initData.data[0].dealerid,
                getSelectedDiamondId
            );
        }
    }, [getSelectedSettingId, getSelectedDiamondId]);

    if (skeltonLoad == false) {
        return (
            <>
                <div className="tool-container">
                    <Skeleton height={80} />
                    <Skeleton />
                    <div className="Skeleton-type">
                        <Skeleton count={9} height={60} />
                    </div>
                    <div className="Skeleton-settings">
                        <div className="skeleton-div">
                            <div className="skelton-info">
                                {/* <h4 className="div-left"><Skeleton /></h4> */}
                                <div className="div-right2">
                                    {" "}
                                    <Skeleton height={300} />
                                </div>
                            </div>
                        </div>
                        <div className="skeleton-div">
                            <div className="skelton-info">
                                {/* <h4 className="div-left"><Skeleton /></h4> */}
                                <div className="div-right-price">
                                    <Skeleton height={40} />
                                    <Skeleton height={60} />
                                    <Skeleton height={30} width={200} />
                                    <Skeleton height={30} width={200} />
                                    <Skeleton height={30} width={200} />
                                    <Skeleton height={20} />
                                    <Skeleton height={40} />
                                    <div className="div-inner">
                                        <div className="div-skelton-inner">
                                            {" "}
                                            <Skeleton height={40} />
                                        </div>
                                        <div className="div-skelton-inner">
                                            {" "}
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <Skeleton />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Skeleton />
                </div>
            </>
        );
    } else {
        return (
            <>
                <style>
                    {`.product-info .top-icons span:hover i {
                color: ${window.initData["data"][0].hover_colour};
            }
            .product-info .product-controller ul li a:hover{
              color: ${window.initData["data"][0].hover_colour};
            }
            .product-info .product-controller ul li a:hover span i{
              background-color: ${window.initData["data"][0].hover_colour};
              color: ${window.initData["data"][0].link_colour};
            }
            .product-info .diamond-tryon .btn-diamond{
              background-color: ${window.initData["data"][0].button_colour};
            }
             .btn:hover{
              background-color: ${window.initData["data"][0].hover_colour} !important;
            `}
                </style>
                <div className="tool-container">
                    <Topheader></Topheader>
                    <div className="breadCumbs">
                        {Data.map((item) => (
                            <Breadcumb Data={item} key={item.key} />
                        ))}
                    </div>
                    <div className="completeRing product-info">
                        <div className="product-info__box">
                            <div className="product-info__image completering-info">
                                <CompleteRingGallary
                                    productDetailsData={getSettingProductData}
                                />
                            </div>
                            <p className="imagenote">
                                <span>NOTE:</span> All metal color images may
                                not be available.{" "}
                            </p>
                        </div>

                        <div className="product-info__detail">
                            <CompleteRingInfo
                                settingDetailsData={getSettingProductData}
                                diamondDetailsData={getdiamondProductData}
                                selectedSettingId={getSelectedSettingId}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default CompleteringSetting;