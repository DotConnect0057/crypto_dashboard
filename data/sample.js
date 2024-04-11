export const strategies = [
    {
        Id: "1",
        StrategyTitle: "SAMPLE Nadaraya",
        StrategySubTitle: "NWE and RSI strategy",
        Stage: "stage8",
        CumulativeReturn: 120000,
        InitialBalance: 10000,
        AnnualReturn: 4.25,
        AnnualVolatility: 19.9,
        MaxDrawdown: {
            AbsDrawdown: 1200,
            BalanceAtDrawdown: 120000
        },
        SharpRatio: 1.223,
        DataSource: "BTCUSDT",
        StartDate: "2023-01-01",
        EndDate: "2023-12-31",
        UpdateDate: "today",
        WinCount: 120,
        LoseCount: 45,
        Tags: ["SMA", "RSI", "NWE", "MACD", "WILLR"],
    },
    {
        Id: "2",
        StrategyTitle: "SAMPLE RSI basic",
        StrategySubTitle: "Just RSI based",
        Stage: "stage4",
        CumulativeReturn: 1000,
        InitialBalance: 100,
        AnnualReturn: 4.25,
        AnnualVolatility: 19.9,
        MaxDrawdown: {
            AbsDrawdown: 1200,
            BalanceAtDrawdown: 120000
        },
        SharpRatio: 0.833,
        DataSource: "BTCUSDT",
        StartDate: "2023-01-01",
        EndDate: "2023-12-31",
        UpdateDate: "today",
        WinCount: 120,
        LoseCount: 45,
        Tags: ["RSI"],
    },
    {
        Id: "3",
        StrategyTitle: "SAMPLE Willams R basic",
        StrategySubTitle: "Just Williams R based",
        Stage: "stage3",
        CumulativeReturn: -35000,
        InitialBalance: 10000,
        AnnualReturn: 4.25,
        AnnualVolatility: 19.9,
        MaxDrawdown: {
            AbsDrawdown: 1200,
            BalanceAtDrawdown: 120000
        },
        SharpRatio: -1.2,
        DataSource: "BTCUSDT",
        StartDate: "2023-01-01",
        EndDate: "2023-12-31",
        UpdateDate: "today",
        WinCount: 120,
        LoseCount: 45,
        Tags: ["WILLR"],
    },
    {
        Id: "4",
        StrategyTitle: "SAMPLE SMA basic",
        StrategySubTitle: "Just SMA trend follow",
        Stage: "stage6",
        CumulativeReturn: 1200,
        AnnualReturn: 4.25,
        AnnualVolatility: 19.9,
        InitialBalance: 100,
        MaxDrawdown: {
            AbsDrawdown: 1200,
            BalanceAtDrawdown: 120000
        },
        SharpRatio: 0.933,
        DataSource: "BTCUSDT",
        StartDate: "2023-01-01",
        EndDate: "2023-12-31",
        UpdateDate: "today",
        WinCount: 120,
        LoseCount: 45,
        Tags: ["SMA"],
    },
    {
        Id: "5",
        StrategyTitle: "SAMPLE MACD basic",
        StrategySubTitle: "MACD mean reversion",
        Stage: "stage7",
        CumulativeReturn: 1200,
        AnnualReturn: 4.25,
        AnnualVolatility: 19.9,
        InitialBalance: 100,
        MaxDrawdown: {
            AbsDrawdown: 1200,
            BalanceAtDrawdown: 120000
        },
        SharpRatio: 0.933,
        DataSource: "BTCUSDT",
        StartDate: "2023-01-01",
        EndDate: "2023-12-31",
        UpdateDate: "today",
        WinCount: 120,
        LoseCount: 45,
        Tags: ["MACD"],
    },
    {
        Id: "4",
        StrategyTitle: "SAMPLE EMA Mean Reversion",
        StrategySubTitle: "EMA Mean Reversion Strategy", 
        Stage: "stage2",
        CumulativeReturn: 1200,
        AnnualReturn: 4.25,
        AnnualVolatility: 19.9,
        InitialBalance: 100,
        MaxDrawdown: {
            AbsDrawdown: 1200,
            BalanceAtDrawdown: 120000
        },
        SharpRatio: 0.933,
        DataSource: "BTCUSDT",
        StartDate: "2023-01-01",
        EndDate: "2023-12-31",
        UpdateDate: "today",
        WinCount: 120,
        LoseCount: 45,
        Tags: ["EMA"],
    },

]