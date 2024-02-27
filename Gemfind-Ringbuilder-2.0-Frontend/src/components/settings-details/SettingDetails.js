import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Topheader from "../elements/Topheader";
import Data from "../elements/data";
import ProductGallary from "./settingsdetails-element/ProductGallary";
import ProductInformation from "./settingsdetails-element/ProductInformation";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import DataDiamond from "../elements/data-diamond";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const SettingDetails = () => {
  const location = useLocation();
  var productUrl = location.pathname;
  var stoneSize = [];
  // console.log(productUrl);
  var part = productUrl.substring(productUrl.lastIndexOf("-") + 1);
  const [getCurrentProductId, setCurrentProductId] = useState(part);
  const [getProductData, setProductData] = useState("");
  const [getselectedStone, setselectedStone] = useState("");
  const [getselectedSideStone, setselectedSideStone] = useState("");

  const [skeltonLoad, setskeltonLoad] = useState(false);
  var selectedmetal = productUrl.substring(productUrl.lastIndexOf("/") + 1);
  // console.log(selectedmetal);
  const [getIp, setIp] = useState("");
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const navigate = useNavigate();
  const [getstonesizedata, setstonesizedata] = useState([]);

  const getProductDetails = async (DealerID, productId) => {
    try {
      const res = await fetch(
        `${window.initData.data[0].mountinglistapifancy}DealerID=${DealerID}&SID=${productId}`
      );
      console.log("res");
      console.log(res);
      const productDetails = await res.json();
      setProductData(productDetails);

      var findConfigStone = productDetails.configurableProduct.filter(function (
        v
      ) {
        return v.gfInventoryId == productId;
      });

      if (findConfigStone.length > 0) {
        setselectedStone(findConfigStone[0].centerStoneSize);
        setselectedSideStone(findConfigStone[0].sideStoneQuality);
      }

      console.log("detail side stone");
      console.log(findConfigStone[0]);

      console.log("productDetails");
      console.log(productDetails);
      console.log(productDetails.sideStoneQuality[0]);

      const stoneItems = productDetails.configurableProduct.map((val) => {
        if (
          productDetails.metalType !== "" &&
          productDetails.sideStoneQuality.length !== 0
        ) {
          console.log("coming inside if");
          console.log(val.centerStoneSize);
          if (
            productDetails.metalType.replace(/\s+/g, "-").toLowerCase() ===
              val.metalType.replace(/\s+/g, "-").toLowerCase()
            
          ) {
            stoneSize.push({
              type: val.metalType,
              configid: val.gfInventoryId,
              stonesize: val.centerStoneSize,
              sidestone: val.sideStoneQuality,
            });
          }
        } else {
          console.log("coming inside else");
          if (
            productDetails.metalType.replace(/\s+/g, "-").toLowerCase() ===
            val.metalType.replace(/\s+/g, "-").toLowerCase()
          ) {
            stoneSize.push({
              type: val.metalType,
              configid: val.gfInventoryId,
              stonesize: val.centerStoneSize,
            });
          }
        }
      });
      console.log(stoneSize);
      setstonesizedata(stoneSize);
      setskeltonLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGallery = (e) => {
    var productUrl1 = location.pathname;
    var part = productUrl1.substring(productUrl.lastIndexOf("-") + 1);
    console.log(part);
    setCurrentProductId(part);
    getProductDetails(window.initData.data[0].dealerid, part);
  };

  const initpingback = async (DealerID, productId) => {
    try {
      const res = await fetch(
        `${window.initData.data[0].mountinglistapifancy}DealerID=${DealerID}&SID=${productId}`
      );
      const productDetails = await res.json();
      //console.log(productDetails)

      //GET THE  CURRENT USER IP
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      setIp(data.IPv4);

      //POST THE  PINGBACK URL TO SERVER
      const response1 = await fetch(
        `https://platform.jewelcloud.com/ProductTracking.aspx?RetailerID=${DealerID}&VendorID=${productDetails.retailerInfo.retailerID}&GFInventoryID=${productId}&URL=${window.location.href}&price=${productDetails.cost}&MetalType=${productDetails.metalType}&MetalColor=${productDetails.colorID}&UsersIPAddress=${data.IPv4}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.initData.data[0].is_api === "false") {
      window.location.href = "/collections/ringbuilder-settings";
    }
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
    initpingback(window.initData.data[0].dealerid, getCurrentProductId);
    getProductDetails(window.initData.data[0].dealerid, getCurrentProductId);
  }, []);

  if (skeltonLoad == false) {
    return (
      <>
        <div className="tool-container">
          <Skeleton height={80} /> <Skeleton />
          <div className="Skeleton-type">
            <Skeleton count={9} height={60} />{" "}
          </div>{" "}
          <div className="Skeleton-settings">
            <div className="skeleton-div">
              <div className="skelton-info">
                {" "}
                {/* <h4 className="div-left"><Skeleton /></h4> */}{" "}
                <div className="div-right2">
                  {" "}
                  <Skeleton height={300} />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="skeleton-div">
              <div className="skelton-info">
                {" "}
                {/* <h4 className="div-left"><Skeleton /></h4> */}{" "}
                <div className="div-right-price">
                  <Skeleton height={40} /> <Skeleton height={60} />{" "}
                  <Skeleton height={30} width={200} />{" "}
                  <Skeleton height={30} width={200} />{" "}
                  <Skeleton height={30} width={200} /> <Skeleton height={20} />{" "}
                  <Skeleton height={40} />{" "}
                  <div className="div-inner">
                    <div className="div-skelton-inner">
                      {" "}
                      <Skeleton height={40} />{" "}
                    </div>{" "}
                    <div className="div-skelton-inner">
                      {" "}
                      <Skeleton height={40} />{" "}
                    </div>{" "}
                  </div>{" "}
                  <Skeleton />
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <Skeleton />
        </div>{" "}
      </>
    );
  } else {
    return (
      <>
        <style>
          {" "}
          {`.product-info .top-icons span:hover i {
                color: ${window.initData["data"][0].hover_colour};
            }
            .product-info .product-controller ul li a:hover{
                  color:  ${window.initData["data"][0].hover_colour};
            }
            .product-info .product-controller ul li a:hover span i{
              background-color: ${window.initData["data"][0].hover_colour};
              color:  ${window.initData["data"][0].link_colour};
            }
            .product-info .diamond-tryon .btn-diamond{
              background-color:${window.initData["data"][0].button_colour} ;
            }
            .btn:hover{
               background-color: ${window.initData["data"][0].hover_colour};
            }
            
            
            
            
            
            
            `}{" "}
        </style>{" "}
        <div className="tool-container">
          <Topheader> </Topheader>{" "}
          {getsettingcookie === false && getDiamondCookie === true && (
            <div className="breadCumbs">
              {" "}
              {DataDiamond.map((item) => (
                <Breadcumb Data={item} key={item.key} />
              ))}{" "}
            </div>
          )}{" "}
          {getsettingcookie === true && getDiamondCookie === false && (
            <div className="breadCumbs">
              {" "}
              {Data.map((item) => (
                <Breadcumb Data={item} key={item.key} />
              ))}{" "}
            </div>
          )}{" "}
          {getsettingcookie === false && getDiamondCookie === false && (
            <div className="breadCumbs">
              {" "}
              {Data.map((item) => (
                <Breadcumb Data={item} key={item.key} />
              ))}{" "}
            </div>
          )}{" "}
          {getsettingcookie === true && getDiamondCookie === true && (
            <div className="breadCumbs">
              {" "}
              {Data.map((item) => (
                <Breadcumb Data={item} key={item.key} />
              ))}{" "}
            </div>
          )}{" "}
          <div className="product-info">
            <div className="product-info__image">
              <ProductGallary
                productDetailsData={getProductData}
                currenturl={selectedmetal}
              />{" "}
            </div>{" "}
            <div className="product-info__detail">
              <ProductInformation
                productDetailsData={getProductData}
                centerstoneData={getstonesizedata}
                selectedCenterStone={getselectedStone}
                selectedSideStone={getselectedSideStone}
                currenturl={selectedmetal}
                callback={handleGallery}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </>
    );
  }
};

export default SettingDetails;
