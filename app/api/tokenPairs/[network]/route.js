import { NextResponse } from 'next/server';
import iWanClient from '@wandevs/iwan-sdk';


async function handleRequest(request, { params }) {
  const { network } = params;
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
  }

  let apiClient;
  let ret;
  try {
    apiClient = new iWanClient(process.env.IWAN_APIKEY, process.env.IWAN_SECKEY, option);
    let value = await apiClient.getTokenPairs({isAllTokenPairs: true});
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


