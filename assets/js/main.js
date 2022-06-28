// connect to Moralis server
const serverUrl = "https://xzb8rpvvqfhy.usemoralis.com:2053/server";
const appId = "wIp37G3Fda2Q4cKldYkfVOlUTHJh89wocBuGXH6G";

Moralis.start({ serverUrl, appId });

function displayUser() {
  if (user) {
    const userAdress = user.get("ethAddress");
    document.getElementById("userAddress").innerHTML = userAdress;
  }
}

//login-logOut function calls
async function logIn() {
  Moralis.authenticate().then(function (user) {
    const userAdress = user.get("ethAddress");
    localStorage.setItem("user", userAdress);

    document.location.reload(true);
    document.getElementById("userAddress").innerHTML = userAdress;
  });
}

async function logOUT() {
  await Moralis.User.logOut();
  localStorage.removeItem("user");
  console.log("logged out");
  document.getElementById("userAddress").innerHTML = "No User";
  document.location.reload(true);
}

async function nativeBalance() {
  let x = (await Moralis.User.current()).get("ethAddress");

  // console.log(x);

  document.getElementById("userAddress").innerHTML = x;
  return x;
}

async function getTransferNFTs() {
  console.log("getNfts");
  document.getElementById("userAddress").innerHTML =
    localStorage.getItem("user");
  const options = { chain: "kovan" };

  // "avalanche testnet"
  await Moralis.Web3API.account.getNFTs(options).then((nfts) => getNFTs2(nfts));
}

// fetch(
//   `https://deep-index.moralis.io/api/v2/${uAdress}/nft?chain=kovan&format=decimal`,
//   {
//     method: "GET",
//     headers: new Headers({
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "X-API-Key":
//         "uzzWZRnFo5hGJ5z0sZhf4EhmJr8kdLj6u6lsSJnHuZVthEhObmR0ObSP8hmwDTmo",
//     }),
//   }
// ).then((nfts) => getNFTs2(nfts));

// async function getKatreeMetadata() {
//   const options = {
//     address: "0x19415cbbb9a8867a9dac836f1bb6d4bb97502e7b",
//     chain: "kovan",
//   };
//   const metaData = await Moralis.Web3API.token.getNFTMetadata(options);
//   console.log(metaData);
//   return metaData;
// }

fixURL = (url) => {
  if (url.startsWith("ipfs")) {
    const fix1 =
      "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1);
    const fix2 = fix1.replace(
      "000000000000000000000000000000000000000000000000000000000000000",
      "0000000000000000000000000000000000000000000000000000000000000000"
    );
    return fix2;
  } else {
    return url + "?format=json";
  }
};

getNFTs2 = async (nfts) => {
  let tableOfNFTs = document.querySelector("#katreeDiv");
  tableOfNFTs.innerHTML =
    "<div class='col-md-12'><p>My Katree's (click on get NDVI to update de ndvi value of yor katree).</p></div>";
  if (nfts.result.length > 0) {
    for (eachnft of nfts.result) {
      let metadata = JSON.parse(eachnft.metadata);

      console.log(nfts.result);

      let content = `
                    <div  data-id="${eachnft.token_id}" data-address="${
        eachnft.token_address
      }" data-type="${eachnft.contract_type}">
                      <model-viewer
                            alt="3D NFT Model"
                            src="${fixURL(metadata.image)}"ar
                                ar-modes="webxr scene-viewer quick-look"
                                environment-image="neutral"
                               poster="assets/NeilArmstrong.webp"
                                seamless-poster
                               shadow-intensity="1"
                              camera-controls
                               ></model-viewer>
                            <div class="card-body">
                            <h5 class="card-title">${metadata.name}</h5>
                            <p class="card-text">${metadata.description}</p>
                            <h6 class="card-title">Token Address</h6>
                            <p class="card-text">${eachnft.token_address}</p>
                            <h6 class="card-title">Token ID</h6>
                            <p class="card-text">${eachnft.token_id}</p>
                            <h6 class="card-title">Contract Type</h6>
                            <p class="card-text">${eachnft.contract_type}</p>
                            <h6 class="card-title">Available Balance</h6>
                            <p class="card-text">${eachnft.amount}</p>
                            
                        </div>
                    </div>
                    `;
      tableOfNFTs.innerHTML += content;
      // console.log(eachnft.metadata.image);
    }
  }

  // <h5 class="card-title">${metadata.name}</h5>
  //                         <p class="card-text">${metadata.description}</p>
  setTimeout(function () {
    let theNFTs = document.getElementsByClassName("nfts");
    for (let i = 0; i <= theNFTs.length - 1; i++) {
      console.log(theNFTs[i].attributes);
      theNFTs[i].onclick = function () {
        document.querySelector("#nft-transfer-token-id").value =
          theNFTs[i].attributes[1].value;
        document.querySelector("#nft-transfer-type").value =
          theNFTs[i].attributes[3].value.toLowerCase();
        document.querySelector("#nft-transfer-contract-address").value =
          theNFTs[i].attributes[2].value;
      };
    }
  }, 1000);
};

/* <p class"card-text">${metadata.attributes[0]}</p> */
document.getElementById("btn-login").onclick = logIn;
// document.getElementById("getMetadata").onclick = searchNdvi();
document.getElementById("btn-getNFTs").onclick = getTransferNFTs();
document.getElementById("logOut").onclick = logOUT;
