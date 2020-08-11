export class Transaction {
    dateRange: Date ;
    terminalId: string;
    walletId: string;
    accountNumber: string;
    paymentMethod: string;
    cardRRN: string;
    transactionReference: string;
    phoneNumber: string;
    sequenceNumber: string;
    debitReference: string;
    product: string;
    transactionType: string;
    transactionStatus: string;
    transactionChannel: string;
    searchField: string;
    viewPage: number;
}

export class TransactionLimit {
    wallet: string;
    password: string;
}