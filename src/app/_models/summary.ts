// Today Summary
export interface TodaySuccess {
    status: boolean,
    http_code: number,
    message: string,
    data: {
        count: string,
        amount: string
    }
}

export interface TodayFailed {
    status: boolean,
    http_code: number,
    message: string,
    data: {
        count: string,
        amount: string
    }
}

export interface TodayTotal {
    status: boolean,
    http_code: number,
    message: string,
    data: {
        count: string,
        amount: string
        distinctUser: string
    }
}

// Yesterday Summary
export interface YesterdaySuccess {
    status: boolean,
    http_code: number,
    message: string,
    data: {
        count: string,
        amount: string
    }
}

export interface YesterdayFailed {
    status: boolean,
    http_code: number,
    message: string,
    data: {
        count: string,
        amount: string
    }
}

export interface YesterdayTotal {
    status: boolean,
    http_code: number,
    message: string,
    data: {
        count: string,
        amount: string
        distinctUser: string
    }
}