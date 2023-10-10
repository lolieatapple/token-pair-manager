import { NextResponse } from 'next/server';
import iWanClient from '@wandevs/iwan-sdk';
import { MAINNET_TOKEN_MANAGER, TESTNET_TOKEN_MANAGER } from '@/app/config';


async function handleRequest(request, { params }) {
  const { network } = params;
  let pairs = MAINNET_TOKEN_MANAGER;
  let option = {
    url:"api.wanchain.org",
    port:8443,
    flag:"ws",
    version:"v3",
    timeout: 50000
  };
  if (network === 'testnet') {
    option = {
      url:"apitest.wanchain.org",
      port:8443,
      flag:"ws",
      version:"v3",
      timeout: 50000
    };
    pairs = TESTNET_TOKEN_MANAGER;
  }

  let apiClient;
  let ret;
  try {
    apiClient = new iWanClient(process.env.IWAN_APIKEY, process.env.IWAN_SECKEY, option);
    let value = await apiClient.getSupportedChainInfo();
    for(let i=0; i<value.length; i++) {
      let chainID = value[i].chainID;
      // find in pairs 
      let pair = pairs.find((pair) => {
        return Number(pair.chainID) === Number(chainID);
      });
      if (pair) {
        value[i].walletChainId = pair.walletChainId;
      }
    }
    ret = { success: true, data: value };
  } catch (err) {
    console.log(err);
    ret = { success: false, error: err.message };
  }
  apiClient.close();

  return NextResponse.json(ret);
}


export const POST = handleRequest;

export const GET = handleRequest;


