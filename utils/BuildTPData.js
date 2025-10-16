import { TOKEN_MANAGER_ABIS } from '@/app/abi';
import { Address, Clause, ABIContract, VET, Units } from '@vechain/sdk-core';

export const DefaultProvider = {
    mainnet: "https://mainnet.vechain.org",
    testnet: "https://testnet.vechain.org"
}

export class BuildTPData {
    constructor() {
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
}