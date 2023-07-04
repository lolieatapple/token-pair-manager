export const TOKEN_MANAGER_ABIS = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1785f53c"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "removeTokenPair",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2b565905"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "burnToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x3416794d"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getTokenPairInfoSlim",
    "outputs": [
      {
        "name": "fromChainID",
        "type": "uint256"
      },
      {
        "name": "fromAccount",
        "type": "bytes"
      },
      {
        "name": "toChainID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3ad8873a"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "acceptTokenOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x3cc281df"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferTokenOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x408e743d"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "changeTokenOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x41246e53"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "components": [
          {
            "name": "account",
            "type": "bytes"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "uint8"
          },
          {
            "name": "chainID",
            "type": "uint256"
          }
        ],
        "name": "aInfo",
        "type": "tuple"
      },
      {
        "name": "fromChainID",
        "type": "uint256"
      },
      {
        "name": "fromAccount",
        "type": "bytes"
      },
      {
        "name": "toChainID",
        "type": "uint256"
      },
      {
        "name": "toAccount",
        "type": "bytes"
      }
    ],
    "name": "addTokenPair",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x4f600ae8"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x4fb2e45d"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "chainID1",
        "type": "uint256"
      },
      {
        "name": "chainID2",
        "type": "uint256"
      }
    ],
    "name": "getTokenPairsByChainID",
    "outputs": [
      {
        "name": "id",
        "type": "uint256[]"
      },
      {
        "name": "fromChainID",
        "type": "uint256[]"
      },
      {
        "name": "fromAccount",
        "type": "bytes[]"
      },
      {
        "name": "toChainID",
        "type": "uint256[]"
      },
      {
        "name": "toAccount",
        "type": "bytes[]"
      },
      {
        "name": "ancestorSymbol",
        "type": "string[]"
      },
      {
        "name": "ancestorDecimals",
        "type": "uint8[]"
      },
      {
        "name": "ancestorAccount",
        "type": "bytes[]"
      },
      {
        "name": "ancestorName",
        "type": "string[]"
      },
      {
        "name": "ancestorChainID",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x563cb1ab"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "mapTokenPairIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x58a007fb"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "mapTokenPairInfo",
    "outputs": [
      {
        "components": [
          {
            "name": "account",
            "type": "bytes"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "uint8"
          },
          {
            "name": "chainID",
            "type": "uint256"
          }
        ],
        "name": "aInfo",
        "type": "tuple"
      },
      {
        "name": "fromChainID",
        "type": "uint256"
      },
      {
        "name": "fromAccount",
        "type": "bytes"
      },
      {
        "name": "toChainID",
        "type": "uint256"
      },
      {
        "name": "toAccount",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x5d2e9ead"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "mintToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x6bec32da"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "components": [
          {
            "name": "account",
            "type": "bytes"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "uint8"
          },
          {
            "name": "chainID",
            "type": "uint256"
          }
        ],
        "name": "aInfo",
        "type": "tuple"
      },
      {
        "name": "fromChainID",
        "type": "uint256"
      },
      {
        "name": "fromAccount",
        "type": "bytes"
      },
      {
        "name": "toChainID",
        "type": "uint256"
      },
      {
        "name": "toAccount",
        "type": "bytes"
      }
    ],
    "name": "updateTokenPair",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x6c45e2dc"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x70480275"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x79ba5097"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getTokenInfo",
    "outputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "decimals",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8c7a63ae"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getAncestorInfo",
    "outputs": [
      {
        "name": "account",
        "type": "bytes"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "decimals",
        "type": "uint8"
      },
      {
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x9027e6f7"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "changeOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa6f9dae1"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      }
    ],
    "name": "updateToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xaf33f17e"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getTokenPairInfo",
    "outputs": [
      {
        "name": "fromChainID",
        "type": "uint256"
      },
      {
        "name": "fromAccount",
        "type": "bytes"
      },
      {
        "name": "toChainID",
        "type": "uint256"
      },
      {
        "name": "toAccount",
        "type": "bytes"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xb9073276"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalTokenPairs",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd0ad718d"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd4ee1d90"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "mapAdmin",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd51dddd7"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getAncestorSymbol",
    "outputs": [
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "decimals",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe101d3c1"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTokenPairs",
    "outputs": [
      {
        "name": "id",
        "type": "uint256[]"
      },
      {
        "name": "fromChainID",
        "type": "uint256[]"
      },
      {
        "name": "fromAccount",
        "type": "bytes[]"
      },
      {
        "name": "toChainID",
        "type": "uint256[]"
      },
      {
        "name": "toAccount",
        "type": "bytes[]"
      },
      {
        "name": "ancestorSymbol",
        "type": "string[]"
      },
      {
        "name": "ancestorDecimals",
        "type": "uint8[]"
      },
      {
        "name": "ancestorAccount",
        "type": "bytes[]"
      },
      {
        "name": "ancestorName",
        "type": "string[]"
      },
      {
        "name": "ancestorChainID",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe24e4fdb"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "decimals",
        "type": "uint8"
      }
    ],
    "name": "addToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf3bdd863"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getAncestorChainID",
    "outputs": [
      {
        "name": "chainID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf4debe1e"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "symbol",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "decimals",
        "type": "uint8"
      }
    ],
    "name": "AddToken",
    "type": "event",
    "signature": "0xbb5f9980e27ec75b79e41ce422e643c6c0116fd9f599776a72f89032f70fe205"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "fromChainID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "fromAccount",
        "type": "bytes"
      },
      {
        "indexed": false,
        "name": "toChainID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "toAccount",
        "type": "bytes"
      }
    ],
    "name": "AddTokenPair",
    "type": "event",
    "signature": "0x226f08da880957e11c8affd4d622bb21b058cf67830d2ee56bb82d9b7197e9a7"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "uint256"
      },
      {
        "components": [
          {
            "name": "account",
            "type": "bytes"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "uint8"
          },
          {
            "name": "chainID",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "name": "aInfo",
        "type": "tuple"
      },
      {
        "indexed": false,
        "name": "fromChainID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "fromAccount",
        "type": "bytes"
      },
      {
        "indexed": false,
        "name": "toChainID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "toAccount",
        "type": "bytes"
      }
    ],
    "name": "UpdateTokenPair",
    "type": "event",
    "signature": "0x4eb0f9fb05e08613a2eba9dc272a43421cf32f9ccab592725ab663e3238f5f55"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "RemoveTokenPair",
    "type": "event",
    "signature": "0xa219112a711e6173c2e8978836823d4e86832d96c0ea2fd05ec77687b7a073ab"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "symbol",
        "type": "string"
      }
    ],
    "name": "UpdateToken",
    "type": "event",
    "signature": "0x86ead451719b8f4b763de2648808971e9bf540eed93efadafb044cd7ef5d91f4"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "AddAdmin",
    "type": "event",
    "signature": "0xad6de4452a631e641cb59902236607946ce9272b9b981f2f80e8d129cb9084ba"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "RemoveAdmin",
    "type": "event",
    "signature": "0x753f40ca3312b2408759a67875b367955e7baa221daf08aa3d643d96202ac12b"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  }
]