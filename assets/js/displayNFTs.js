const ABI = [
  {
    inputs: [],
    name: "message",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newMessage",
        type: "string",
      },
    ],
    name: "setMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const sendOptions = {
  contractAddress: "0xe...56",
  functionName: "setMessage",
  abi: ABI,
  params: {
    _newMessage: "Hello Moralis",
  },
};

const transaction = await Moralis.executeFunction(sendOptions);
console.log(transaction.hash);
// --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

// Wait until the transaction is confirmed
await transaction.wait();

// Read new value
const message = await Moralis.executeFunction(readOptions);
console.log(message);
// --> "Hello Moralis"
