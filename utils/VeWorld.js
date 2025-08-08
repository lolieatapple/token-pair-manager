import { TOKEN_MANAGER_ABIS } from '@/app/abi';
import { Address, Clause, ABIContract, VET, Units } from '@vechain/sdk-core';
import { DAppKit } from '@vechain/dapp-kit';
const DefaultProvider = {
    mainnet: "https://mainnet.vechain.org",
    testnet: "https://testnet.vechain.org"
}

export class VeWorld {
    constructor(network, rpc) {
        this.name = "VeWorld";
        this.network = network;
        console.log("DAppKit = ",DAppKit);
        this.kit = new DAppKit({ // { thor, vendor, wallet }
            nodeUrl: rpc || DefaultProvider[network] || "",
            genesis: (network === "mainnet")? 'main' : 'test'
        });
        this.kit.wallet.setSource('veworld');
    }

    // standard function

    async getChainId() {
        return 0;
    }

    async getAccounts() {
        let {account} = await this.kit.wallet.connect();
        this.account = account;
        return [account];
    }

    async disconnect(){
        this.account = null;
        await this.kit.wallet.disconnect();
    }

    async sendTransaction(clauses, sender) {
        let tx = this.kit.vendor.sign('tx', clauses).signer(sender);
        let { txid } = await tx.request();
        return txid;
    }

    // customized function

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
        console.log("this.kit)",this.kit);
        const clauses = await this.generateAddTokenPair(scAddr, pair);
        return await this.sendTransaction(clauses, this.account);
    }

    // 调用合约方法：更新
    async updateTokenPair(scAddr, pair) {
        console.log("更新 token pair...");
        const clauses = await this.generateUpdateTokenPair(scAddr, pair);
        return await this.sendTransaction(clauses, this.account);
    }

    // 调用合约方法：移除
    async removeTokenPair(scAddr, pair) {
        console.log("移除 token pair...");
        const clauses = await this.generateRemoveTokenPair(scAddr, pair);
        return await this.sendTransaction(clauses, this.account);
    }
}