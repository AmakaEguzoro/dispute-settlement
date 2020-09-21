export class Register {
    field: string;
    value: string;
}

export class RegisterB2B {
    username: string;
    Mode: string;
    wallet: string;
    vendType: string;
    ip: string;
    companyName: string;
    email: string;
}

export class UpdateB2B {
    username: string;
    key: string;
    organisationCode: string;
    Mode: string;
    wallet: string;
    vendType: string;
    ip: string;
    name: string;
    companyName: string;
}

export class RegisterData {
    type: string;
    tariff_id: string;
    code: string;
    duration: string;
    amount: string;
    price: string;
    value: string;
    description: string;
}

export class RegisterWallet {
    walletId: string;
    limit: string;
    dailyLimit: string;
    acctNo: string;
    merchantName: string;
    transfer: string;
    tp: string;
    itex: string;
}
