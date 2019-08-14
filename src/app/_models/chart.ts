export class LastWeekChart {
    status: boolean;
    http_code: number;
    message: string;
    data: {
        POS_COUNT: number,
        POS_AMOUNT: number,
        WEB_COUNT: number,
        WEB_AMOUNT: number,
        DEFAULT_COUNT: number,
        DEFAULT_AMOUNT: number,
        ANDROIDPOS_COUNT: number,
        ANDROIDPOS_AMOUNT: number,
        ANDROID_COUNT: number,
        ANDROID_AMOUNT: number,
        TotalAmount: number,
        TotalCount: number

    }
}