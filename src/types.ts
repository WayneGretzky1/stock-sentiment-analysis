// export type TStock_data = {
//     stock_name: string;
//     sent_score: number;
//     company_name: string;
//     open: number;
//     adj_close: number;
//     volume: number;
//     one_day_return: number;
//     two_day_return: number;
//     three_day_return: number;
//     seven_day_return: number;
//     volatility_two_day: number;
//     volatility_ten_day: number;
//     volatility_thirty_day: number;
//     date: Date;
//     tweet: string;
// }


export type TLine_data = {
    stock_name: string;
    date: Date,
    sent_score: number,
    one_day_return: number,
    two_day_return: number,
    three_day_return: number,
    seven_day_return: number;
}

export type TLag_data = {
    stock_name: string;
    max_correlation: number;
    lag: number;
}

export type THeatmap_data = {
    stock_name: string;
    one_day_lag: number;
    two_day_lag: number;
    three_day_lag: number;
    four_day_lag: number;
    five_day_lag: number;
}

export interface CorrelationData {
    stock_name: string;
    max_correlation: number;
    lag: number;
  }