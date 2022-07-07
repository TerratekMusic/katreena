const nft_contract_address = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431" //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.

// Available deployed contracts
// Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
// Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
// BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD


const web3 = new Web3(window.ethereum);

//frontend logic

async function generarNFT(_uri) {
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "mintToken",
        type: "function",
        inputs: [{
            type: 'string',
            name: 'tokenURI'
        }]
    }, [_uri]);

    const transactionParameters = {
        to: nft_contract_address,
        from: ethereum.selectedAddress,
        data: encodedFunction
    };
    const txt = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
    });
    return txt
}

async function notify(_txt) {
    document.getElementById("resultSpace").innerHTML =
        `<input disabled = "true" id="result" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1" value="Your NFT was minted in transaction ${_txt}">`;
}