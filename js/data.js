"use strict";
const tokenAddress = "0x144297DF93f94CEE909C45F27AfB486ed08dc3B3";
const wbnb = "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b";
const treasuryAddress = "0x9bd0b62F00b702F3E2BB097B187f2624Bb380043";
const pairAddress = "0xB774E9755A0CD8c94da2dCC6533Aa7329Ca67310";

const apiKey = "UM4N11P519SCDJCWTY9CNRJRA8E38KIW6C";
const apiKey2 = "89BPS4Q9XQW7T1TJGETDX42CDTMMXFQX62";
const decimals = 18;

const options = { style: "currency", currency: "USD" };
const numberFormat = new Intl.NumberFormat("en-US", options);

let reqHeader = new Headers();
// reqHeader.append('Content-Type', 'application/javascript');
// reqHeader.append('Allow-Control-Allow-Origin', '*');

let initObject = {
  method: "GET",
  headers: reqHeader,
};

Promise.all([
  fetch(
    "https://api.pancakeswap.info/api/v2/tokens/" + tokenAddress,
    initObject
  ),
  fetch(
    "https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      wbnb +
      "&address=" +
      pairAddress +
      "&tag=latest&apikey=" +
      apiKey,
    initObject
  ),
  fetch(
    "https://api.cronoscan.com/api?module=account&action=balance&address=" +
      treasuryAddress +
      "&tag=latest&apikey=" +
      apiKey,
    initObject
  ),
  fetch("https://api.pancakeswap.info/api/v2/tokens/" + wbnb, initObject),
  fetch(
    "https://api.cronoscan.com/api?module=stats&action=tokenCsupply&contractaddress=" +
      tokenAddress +
      "&apikey" +
      apiKey2,
    initObject
  ),
])
  .then(function (responses) {
    return Promise.all(
      responses.map(function (response) {
        return response.json();
      })
    );
  })
  .then(function (data) {
    let price = data[0].data.price;
    let pairBalance = data[1].result;
    let treasury = data[2].result;
    let bnbPrice = data[3].data.price;
    let supply = data[4].result;

    console.log(bnbPrice);
    console.log(supply);
    console.log(price);
    console.log(pairBalance);
    console.log(treasury);

    document.getElementById("treasury").innerHTML = numberFormat.format(
      ((treasury / Math.pow(10, decimals)) * bnbPrice).toFixed(2)
    );
    document.getElementById("pool").innerHTML =
      "$" + ((pairBalance / Math.pow(10, decimals)) * bnbPrice).toFixed(2);
    document.getElementById("dropbtn").innerHTML =
      "yourToken " + "$" + Number(price).toFixed(3);
    document.getElementById("price").innerHTML = "$" + Number(price).toFixed(3);
    document.getElementById("price2").innerHTML =
      "$" + Number(price).toFixed(3);
    document.getElementById("price3").innerHTML =
      "$" + Number(price).toFixed(3);

    document.getElementById("input_price").innerHTML =
      "$" + Number(price).toFixed(3);

    document.getElementById("totalsupply").innerHTML = (
      supply / Math.pow(10, decimals)
    ).toFixed(0);
    document.getElementById("circulatingsupply").innerHTML = (
      supply / Math.pow(10, decimals)
    ).toFixed(0);
    document.getElementById("marketcap").innerHTML = numberFormat.format(
      (price * (supply / Math.pow(10, decimals))).toFixed(0)
    );
  });
