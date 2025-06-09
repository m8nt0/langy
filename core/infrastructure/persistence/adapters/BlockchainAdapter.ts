// src/core/infrastructure/persistence/adapters/BlockchainAdapter.ts
export interface BlockchainAdapter {
    store(data: string): Promise<string>;
    retrieve(transactionId: string): Promise<string>;
    verify(transactionId: string): Promise<boolean>;
    getHistory(address: string): Promise<any[]>;
}

export class EthereumAdapter implements BlockchainAdapter {
    private web3: any;
    private contract: any;

    constructor(private contractAddress: string, private privateKey: string) {
        this.init();
    }

    private async init() {
        const { Web3 } = await import('web3');
        this.web3 = new Web3('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');

        // Simple storage contract ABI
        const abi = [
            {
                inputs: [{ name: 'data', type: 'string' }],
                name: 'store',
                outputs: [],
                type: 'function'
            },
            {
                inputs: [{ name: 'key', type: 'bytes32' }],
                name: 'retrieve',
                outputs: [{ name: '', type: 'string' }],
                type: 'function'
            }
        ];

        this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
    }

    async store(data: string): Promise<string> {
        const account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
        const tx = await this.contract.methods.store(data).send({
            from: account.address,
            gas: 200000
        });
        return tx.transactionHash;
    }

    async retrieve(transactionId: string): Promise<string> {
        const tx = await this.web3.eth.getTransaction(transactionId);
        const receipt = await this.web3.eth.getTransactionReceipt(transactionId);
        // Decode transaction data
        return this.web3.utils.hexToUtf8(tx.input);
    }

    async verify(transactionId: string): Promise<boolean> {
        try {
            const receipt = await this.web3.eth.getTransactionReceipt(transactionId);
            return receipt.status === true;
        } catch {
            return false;
        }
    }

    async getHistory(address: string): Promise<any[]> {
        const latest = await this.web3.eth.getBlockNumber();
        const transactions = [];

        for (let i = latest; i > latest - 100; i--) {
            const block = await this.web3.eth.getBlock(i, true);
            const userTxs = block.transactions.filter(
                (tx: any) => tx.from === address || tx.to === address
            );
            transactions.push(...userTxs);
        }

        return transactions;
    }
}
