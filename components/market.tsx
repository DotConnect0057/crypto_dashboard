import React from "react";
import { strategies } from "../data/sample.js";
import Card from "./card";

type data = {
  result: {
    count: number;
    date: string;
    latestDoc: {
      analytics: {
        annual_volatility: number;
        cagr: number;
        calmar_ratio: number;
        lose_count: number;
        omega: number;
        sharp_ratio: number;
        win_count: number;
        win_rate: number;
      };
      backtest_date: string;
      cumulative_returns: number;
      data_annual_returns_monthly: {};
      data_annual_returns_yearly: {};
      description: string;
      drawdown: {};
      end_date: string;
      max_return: {};
      pair: string;
      parameters: {};
      start_date: string;
      strategy_id: string;
      subtitle: string;
      stage: string;
      tags: [];
      title: string;
      _id: string;
    };
  }[];
};

const getBackTest = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/backtest_summary", {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading backtest", error);
  }
};

const filterTags = (data: data) => {
  return data.result.map((item) => {
    return {
      ...item,
      latestDoc: {
        ...item.latestDoc,
        tags: item.latestDoc.tags.filter((tag) => tag !== "Common"),
      },
    };
  });
};

const Market = async () => {
  const data: data = await getBackTest();
  const filteredData = filterTags(data);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {strategies.map((strategy) => (
          <Card
            key={strategy.Id}
            Id={strategy.Id}
            StrategyTitle={strategy.StrategyTitle}
            StrategySubTitle={strategy.StrategySubTitle}
            Stage={strategy.Stage}
            TotalReturn={strategy.CumulativeReturn}
            SharpRatio={strategy.SharpRatio}
            DataSource={strategy.DataSource}
            StartDate={strategy.StartDate}
            EndDate={strategy.EndDate}
            UpdateDate={strategy.UpdateDate}
            Tags={strategy.Tags}
          />
          // <div key={strategy.Id}>{strategy.StrategyTitle}</div>
        ))}

        {filteredData.map((strategy) => (
          <Card
            key={strategy.latestDoc._id}
            Id={strategy.latestDoc._id}
            StrategyTitle={strategy.latestDoc.title}
            StrategySubTitle={strategy.latestDoc.subtitle}
            Stage={strategy.latestDoc.stage}
            TotalReturn={strategy.latestDoc.cumulative_returns}
            SharpRatio={strategy.latestDoc.analytics.sharp_ratio}
            DataSource={strategy.latestDoc.pair}
            StartDate={strategy.latestDoc.start_date}
            EndDate={strategy.latestDoc.end_date}
            UpdateDate={strategy.latestDoc.backtest_date}
            Tags={strategy.latestDoc.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Market;
