// connect to Moralis server
const serverUrl = "https://xzb8rpvvqfhy.usemoralis.com:2053/server";
const appId = "wIp37G3Fda2Q4cKldYkfVOlUTHJh89wocBuGXH6G";

Moralis.start({ serverUrl, appId });

//login-logOut function calls
async function logIn() {
  Moralis.authenticate().then(function (user) {
    const userAdress = user.get("ethAddress");
    console.log(userAdress);
    // console.log(user.get("ethAddress"));
    document.getElementById("userAddress").innerHTML = userAdress;
  });
}

async function logOUT() {
  await Moralis.User.logOut();
  console.log("logged out");
  document.getElementById("userAddress").innerHTML = "No User";
}

async function nativeBalance() {
  let x = (await Moralis.User.current()).get("ethAddress");

  // console.log(x);

  document.getElementById("userAddress").innerHTML = x;
  return x;
}

async function getTransferNFTs() {
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
    "<div class='col-md-12'><p>Click on an NFT below to get the metadata into the search above.</p></div>";
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
                            <p class"card-text">${metadata.attributes[0]}</p>
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

// async function getNdvi() {
//   const web3Provider = await Moralis.enableWeb3();
//   let options = {
//     contractAddress: "0x19415cbbb9a8867a9dac836f1bb6d4bb97502e7b",
//     functionName: "requestNdviData",
//     abi: [
//       {
//         inputs: [],
//         name: "requestNdviData",
//         outputs: [
//           {
//             internalType: "bytes32",
//             name: "requestId",
//             type: "bytes32",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//     ],
//     params: {},
//   };
//   await Moralis.executeFunction(options);

//   // console.log(ndvi);
// }
// async function searchNdvi() {
//   console.log("getNdvi");
//   const web3Provider = await Moralis.enableWeb3();

//   const ABI = [
//     {
//       inputs: [],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "bool",
//           name: "approved",
//           type: "bool",
//         },
//       ],
//       name: "ApprovalForAll",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "bytes32",
//           name: "id",
//           type: "bytes32",
//         },
//       ],
//       name: "ChainlinkCancelled",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "bytes32",
//           name: "id",
//           type: "bytes32",
//         },
//       ],
//       name: "ChainlinkFulfilled",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "bytes32",
//           name: "id",
//           type: "bytes32",
//         },
//       ],
//       name: "ChainlinkRequested",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "previousOwner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "OwnershipTransferred",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256[]",
//           name: "ids",
//           type: "uint256[]",
//         },
//         {
//           indexed: false,
//           internalType: "uint256[]",
//           name: "values",
//           type: "uint256[]",
//         },
//       ],
//       name: "TransferBatch",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "TransferSingle",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "string",
//           name: "value",
//           type: "string",
//         },
//         {
//           indexed: true,
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//       ],
//       name: "URI",
//       type: "event",
//     },
//     {
//       inputs: [],
//       name: "KatreeB",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "KatreeG",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "KatreeY",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//       ],
//       name: "balanceOf",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address[]",
//           name: "accounts",
//           type: "address[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "ids",
//           type: "uint256[]",
//         },
//       ],
//       name: "balanceOfBatch",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_requestId",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "_ndvi",
//           type: "uint256",
//         },
//       ],
//       name: "fulfill",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//       ],
//       name: "isApprovedForAll",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "mint",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "ndvi",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "owner",
//       outputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "renounceOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "requestNdviData",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "requestId",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256[]",
//           name: "ids",
//           type: "uint256[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "amounts",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes",
//           name: "data",
//           type: "bytes",
//         },
//       ],
//       name: "safeBatchTransferFrom",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//         {
//           internalType: "bytes",
//           name: "data",
//           type: "bytes",
//         },
//       ],
//       name: "safeTransferFrom",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           internalType: "bool",
//           name: "approved",
//           type: "bool",
//         },
//       ],
//       name: "setApprovalForAll",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes4",
//           name: "interfaceId",
//           type: "bytes4",
//         },
//       ],
//       name: "supportsInterface",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "transferOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "uri",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];

//   const sendOptions = {
//     contractAddress: "0x19415cbbb9a8867a9dac836f1bb6d4bb97502e7b",
//     functionName: "requestNdviData",
//     abi: ABI,
//     params: {},
//   };

//   const transaction = await Moralis.executeFunction(sendOptions);
//   console.log(transaction.hash);
//   // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

//   // Wait until the transaction is confirmed
//   await transaction.wait();

//   // Read new value
//   const message = await Moralis.executeFunction(sendOptions);
//   console.log(message);
// }
// --> "Hello Moralis"
// fetch("http://165.227.191.227:3000/getSentinelValue")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

document.getElementById("btn-login").onclick = logIn;
document.getElementById("getMetadata").onclick = searchNdvi();
document.getElementById("btn-getNFTs").onclick = getTransferNFTs();
document.getElementById("logOut").onclick = logOUT;
