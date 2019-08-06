export interface TodaySuccess {
    success_total_count: number;
    percent_success: number;
    total_amount: number;
}

export interface TodayFailed {
    failed_total_count: number,
    percent_failed: number,
    fail_total_amount: number
}

export interface TodayTotal {
    total_count: number,
    total_amount: number,
    total_distinct_user: number
}