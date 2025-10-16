import { TOKEN_MANAGER_ABIS } from '@/app/abi';
import { Address, Clause, ABIContract, VET, Units } from '@vechain/sdk-core';
import { DAppKit  } from '@vechain/dapp-kit';
const DefaultProvider = {
    mainnet: "https://mainnet.vechain.org",
    testnet: "https://testnet.vechain.org"
}

export class VeWorld {
    constructor(network, rpc) {
        this.name = "VeWorld";
        console.log("DAppKit = ",DAppKit);
        const dapp = new DAppKit({
            node: rpc || DefaultProvider[network] || "",
        });
        console.log("dapp = ",dapp);
        this.wallet = dapp.wallet;
        this.signer = dapp.signer;
        this.thor = dapp.thor;
        this.wallet.setSource('veworld');
    }

    // standard function

    async getChainId() {
        return 0;
    }

    async getAccounts() {
        try{
            const { account, verified } = await this.wallet.connect();
            console.log("🔗 已连接:", account);

            if (!verified) {
                await this.vendor.sign("cert", {
                    purpose: "identification",
                    payload: {
                        type: "text",
                        content: "Authorize this dApp to interact with VeChain",
                    },
                }).request();
            }
            this.account = account;
            return [account];
        }catch(e){
            console.error("err in getAccounts", e);
        }
    }

    async disconnect(){
        this.account = null;
        this.wallet.disconnect();
    }

    async sendTransaction(clause,sender) {
        console.log("sender of sendTransaction", sender);
        let ret = await this.signer.sendTransaction({from:sender,clauses:clause});
        console.log("result of sendTransaction",ret);
        return ret;
    }

    // 生成 addTokenPair clause
    async generateAddTokenPair(scAddr, pair) {
        const abi = ABIContract.ofAbi(TOKEN_MANAGER_ABIS);
        return [
            Clause.callFunction(
                Address.of(scAddr),
                abi.getFunction('addTokenPair'),
                [...pair]
            )
        ];
    }

    // 生成 removeTokenPair clause
    async generateRemoveTokenPair(scAddr, pair) {
        const abi = ABIContract.ofAbi(TOKEN_MANAGER_ABIS);
        return [
            Clause.callFunction(
                Address.of(scAddr),
                abi.getFunction('removeTokenPair'),
                [pair[0]],
                VET.of(0, Units.wei) // 若合约需支付手续费此处可调整
            )
        ];
    }

    // 生成 updateTokenPair clause
    async generateUpdateTokenPair(scAddr, pair) {
        const abi = ABIContract.ofAbi(TOKEN_MANAGER_ABIS);
        return [
            Clause.callFunction(
                Address.of(scAddr),
                abi.getFunction('updateTokenPair'),
                [...pair]
            )
        ];
    }


    // 调用合约方法：添加
    async addTokenPair(scAddr, pair) {
        console.log("添加 token pair...");
        let clause = await this.generateAddTokenPair(scAddr,pair);
        return await this.sendTransaction(clause,this.account);
    }

    // 调用合约方法：更新
    async updateTokenPair(scAddr, pair) {
        console.log("更新 token pair...");
        let clause = await this.generateUpdateTokenPair(scAddr,pair);
        return await this.sendTransaction(clause,this.account);
    }

    // 调用合约方法：移除
    async removeTokenPair(scAddr, pair) {
        console.log("移除 token pair...");
        let clause = await this.generateRemoveTokenPair(scAddr,pair);
        return await this.sendTransaction(clause,this.account);
    }
}