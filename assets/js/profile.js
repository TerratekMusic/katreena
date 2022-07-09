async function getTransferNFTs() {
  console.log("getNfts");
  document.getElementById("cryptoLink").value = localStorage.getItem("user");
  const options = { chain: "kovan" };

  // "avalanche testnet"
  await Moralis.Web3API.account.getNFTs(options).then((nfts) => getNFTs2(nfts));
}

getNFTs2 = async (nfts) => {
  let tableOfNFTs = document.querySelector("#katreeDivB");
  tableOfNFTs.innerHTML =
    "<div class='col-md-12'><p>My Katree's (click on get NDVI to update de ndvi value of yor katree).</p></div>";
  if (nfts.result.length > 0) {
    for (eachnft of nfts.result) {
      let metadata = JSON.parse(eachnft.metadata);

      console.log(nfts.result);

      let content = `
      <div class="col-lg-4 col-lg-5">
      <div class="nft-item">
        <div class="nft-inner">
          
          <div
            class="nft-item-top d-flex justify-content-between align-items-center"
          >
            <div class="author-part">
              <ul class="author-list d-flex">
                <li class="single-author">
                  <a href="author.html"
                    ><img
                      src="assets/images/seller/01.png"
                      alt="author-img"
                  /></a>
                </li>
                <li
                  class="single-author d-flex align-items-center"
                >
                  <a
                    href="author.html"
                    class="veryfied"
                    ><img
                      src="assets/images/seller/02.gif"
                      alt="author-img"
                  /></a>
                  <h6>
                    <a href="author.html"
                      >Jhon Doe</a>
                  </h6>
                </li>
              </ul>
            </div>
            <div class="more-part">
              <div class="dropstart">
                <a
                  class="dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="25,0"
                >
                  <i class="icofont-flikr"></i>
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      ><span>
                        <i
                          class="icofont-warning"
                        ></i>
                      </span>
                      Report
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      ><span
                        ><i
                          class="icofont-reply"
                        ></i
                      ></span>
                      Share</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="nft-item-bottom">
            <div class="nft-thumb">
            <model-viewer class="mdv"
            alt="3D NFT Model"
            src="${fixURL(metadata.image)}"ar
                ar-modes="webxr scene-viewer quick-look"
                environment-image="neutral"
               poster="assets/NeilArmstrong.webp"
                seamless-poster
               shadow-intensity="1"
              camera-controls
               ></model-viewer>

              
              
            </div>
            <div class="nft-content">
              <h4>
                <a href="item-details.html"
                  >${metadata.name}</a
                >
              </h4>
              <div
                class="price-like d-flex justify-content-between align-items-center"
              >
                <p class="nft-price">
                  Price:
                  <span class="yellow-color"
                    >0.34 ETH</span
                  >
                </p>
                <a href="#" class="nft-like"
                  ><i class="icofont-heart"></i>
                  230</a
                >
              </div>
            </div>
          </div>
        </div>
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

document.getElementById("btn-getNFTs").onclick = getTransferNFTs();
