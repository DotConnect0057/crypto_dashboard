import ColumnChart from "@/components/columnChart";
import HeatMap from "@/components/heatmap";
import LineChart from "@/components/lineChart";
import RadialChart from "@/components/radialChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectHistory } from "@/components/selectHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";

type Entry = {
  result: {
    _id: string;
    strategy_id: string;
    title: string;
    subtitle: string;
    description: string;
    tags: [];
    backtest_date: string;
    start_date: string;
    end_date: string;
    pair: string;
    cumulative_returns: number;
    annual_return: number;
    drawdown: {
      balance_at_drawdown: number;
      drawdown: number;
    };
    max_return: {
      balance_at_return: number;
      return: number;
    };
    data_cum_returns_pct: {};
    data_cum_returns_benchmark_pct: {};
    data_log_cum_returns_pct: {};
    data_log_cum_returns_benchmark_pct: {};
    data_annual_returns_benchmark_pct: [];
    data_annual_returns_monthly_pct: [];
    data_annual_returns_monthly: [];
    data_annual_returns_yearly: {};
    parameters: {};
    analytics: {
      comission_ratio: number;
      initial_balance: number;
      order_size: number;
      annual_volatility: number;
      cagr: number;
      calmar_ratio: number;
      lose_count: number;
      omega: number;
      sharp_ratio: number;
      win_count: number;
      win_rate: number;
    };
  }[];
};

const getBackTestEntry = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/backtest_entry?id=${id}`,
      {
        cache: "no-cache",
      },
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.log("There was an error!", error);
  }
};

const getBackTestHistory = async (title: string) => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/backtest_history?title=" + title,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading backtests", error);
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  const formatChartData = (inData: Record<string, number>) => {
    let keys: string[] = [];
    let values: number[] = [];
    try {
      Object.entries(inData).forEach(([key, value]) => {
        keys.push(key);
        values.push(value);
      });
      const outData = {
        category: keys,
        data: values,
      };
      return outData;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const getLongestDrawDown = (arr: number[]) => {
    let crtGroup = [];
    let negGroup = [];
    let negSumGroup: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < 0) {
        crtGroup.push(arr[i]);
      } else {
        negGroup.push(crtGroup);
        crtGroup = [];
      }
    }
    if (crtGroup.length > 0) {
      negGroup.push(crtGroup);
    }

    let negSum = negGroup.reduce((sum: number, group: number[]) => {
      negSumGroup.push(
        group.reduce((groupSum, element) => groupSum + element, 0),
      );
      return group.reduce((groupSum, element) => groupSum + element, 0);
    }, 0);
    const longestDrawDown = Math.min(...negSumGroup);
    return longestDrawDown;
  };

  const formatHeatMapData = (inData: { year: string; data: [] }[]) => {
    type Data = {
      month: string;
      value: number;
    };
    type typeOutData = {
      name: string;
      data: { x: string; y: number };
    };

    let outData: typeOutData[] = [];
    inData.map((item, index) => {
      let values = [];
      let row: { name: string; data: { x: string; y: number }[] } = {
        name: "",
        data: [],
      };
      let dataArr: number[] = [];
      Object.entries(item).map(([key, value]) => {
        if (typeof value === "string") {
          row.name = value;
        } else {
          if (value.length < 12 && index !== inData.length - 1) {
            [...Array(12 - value.length)].map((_, index) => {
              const record = { x: (index + 1).toString(), y: 0 };
              values.push(record);
              dataArr.push(0);
            });
            value.map((data: Data) => {
              const record = { x: data.month.toString(), y: data.value };
              values.push(record);
              dataArr.push(data.value);
            });
          } else if (value.length < 12 && index === inData.length - 1) {
            value.map((data: Data) => {
              const record = { x: data.month.toString(), y: data.value };
              values.push(record);
              dataArr.push(data.value);
            });
            [...Array(12 - value.length)].map((_, index) => {
              const record = { x: (index + 1).toString(), y: 0 };
              values.push(record);
              dataArr.push(0);
            });
          } else {
            value.map((data: Data) => {
              const record = { x: data.month.toString(), y: data.value };
              values.push(record);
              dataArr.push(data.value);
            });
          }
        }
      });
      const DD = getLongestDrawDown(dataArr);
      values.push({ x: "DD", y: DD });
      row.data = values;
      outData.push(row);
    });
    return outData;
  };

  const entry: Entry = await getBackTestEntry(params.slug);
  const history: History = await getBackTestHistory(entry.result[0].title);
  const seriesLineChartData = formatChartData(
    entry.result[0].data_cum_returns_pct,
  );
  const benchmarkLineChartData = formatChartData(
    entry.result[0].data_cum_returns_benchmark_pct,
  );
  const logSeriesLineChartData = formatChartData(
    entry.result[0].data_log_cum_returns_pct,
  );
  const logBenchmarkLineChartData = formatChartData(
    entry.result[0].data_log_cum_returns_benchmark_pct,
  );
  const heatMapData = formatHeatMapData(
    entry.result[0].data_annual_returns_monthly_pct,
  );
  const annualReturnsData = {
    data: Object.values(entry.result[0].data_annual_returns_yearly),
    category: Object.keys(entry.result[0].data_annual_returns_yearly),
  };

  const CumulativeReturns = Math.round(entry.result[0].cumulative_returns);
  const cumulativeReturnsPercent = Math.round(
    (CumulativeReturns / entry.result[0].analytics.initial_balance) * 100,
  );
  const maxDrawDown = Math.round(entry.result[0].drawdown.drawdown);
  const maxDrawDownPercent = Math.round(
    (maxDrawDown / entry.result[0].drawdown.balance_at_drawdown) * 100,
  );
  const maxDrawDownDate = [
    entry.result[0].drawdown.balance_at_drawdown,
    entry.result[0].drawdown.drawdown,
    entry.result[0].max_return.balance_at_return,
    entry.result[0].max_return.return,
  ];
  const sharpRatio =
    Math.round(entry.result[0].analytics.sharp_ratio * 100) / 100;
  const calmarRatio =
    Math.round(entry.result[0].analytics.calmar_ratio * 100) / 100;
  const winRate = Math.round(entry.result[0].analytics.win_rate);
  const annualReturn = Math.round(entry.result[0].annual_return * 100) / 100;
  const annualVolatilty =
    Math.round(entry.result[0].analytics.annual_volatility * 100) / 100;
  const cagr = Math.round(entry.result[0].analytics.cagr * 100) / 100;
  const omega = Math.round(entry.result[0].analytics.omega * 100) / 100;

  if (entry) {
    return (
      <div>
        <div className="m-2 md:w-[768px] xl:w-[1280px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-2 md:col-span-2 xl:col-span-4">
              {/* header */}
              <div>
                {entry.result[0].cumulative_returns > 0 ? (
                  <span className="text-green-500 text-[40px] w-[48px]">
                    <BsGraphUpArrow />
                  </span>
                ) : (
                  <span className="text-red-500 text-[40px] w-[48px]">
                    <BsGraphDownArrow />
                  </span>
                )}
              </div>
              <div className="ml-2">
                <h1 className="text-left text-lg">{entry.result[0].title}</h1>
                <p className="text-left text-sm text-muted-foreground">
                  {entry.result[0].subtitle}
                </p>
              </div>
              <div className="ml-8">
                <p className="text-left text-sm">
                  {entry.result[0].description}
                </p>
              </div>
            </div>
            {/* first row */}
            <div className="flex flex-row p-2 pl-4 pr-4 border h-[80px] rounded-lg justify-between">
              <div key="first box" className="w-1/2">
                <p className="text-sm">Update Date</p>
                <p className="font-bold truncate">
                  {entry.result[0].backtest_date}
                </p>
                <p className="text-xs text-gray-500">23 days left</p>
              </div>
              <div key="second box">
                <p className="text-sm">Trading Pair</p>
                <p className="font-bold">{entry.result[0].pair}</p>
                <p className="text-xs text-gray-500">Bybit</p>
              </div>
            </div>
            <div className="flex flex-row p-2 pl-4 pr-4 border h-[80px] rounded-lg col-span-2 justify-between">
              <div key="first box">
                <p className="text-sm">Return of Investment</p>
                {entry.result[0].cumulative_returns > 0 ? (
                  <p className="font-bold text-green-500">
                    ${CumulativeReturns.toLocaleString()}
                  </p>
                ) : (
                  <p className="font-bold text-red-500">
                    ${CumulativeReturns.toLocaleString()}
                  </p>
                )}
              </div>
              <div key="second box">
                <p className="text-sm">Return of Investment</p>
                {entry.result[0].cumulative_returns > 0 ? (
                  <p className="font-bold text-green-500">
                    {cumulativeReturnsPercent.toLocaleString()}%
                  </p>
                ) : (
                  <p className="font-bold text-red-500">
                    {cumulativeReturnsPercent.toLocaleString()}%
                  </p>
                )}
              </div>
              <div key="third box">
                <p className="text-sm">Max Drawdown</p>
                <p className="font-bold text-red-500">
                  {maxDrawDown.toLocaleString()}%
                </p>
                <p className="text-xs text-gray-500">Doller</p>
              </div>
            </div>

            <div className="flex flex-col p-2 pl-4 pr-4 border h-[80px] rounded-lg justify-items-center">
              <div key="first box" className="text-sm mb-2">
                BackTest History
              </div>
              {/* <div key="second box" className="flex gap-1 p-2">
                  {data.Tags.map((tag) => (
                      <div key={tag} className="p-1 text-xs border rounded-lg w-14 text-center">{tag}</div>
                  ))}
              </div> */}
              {history.result === undefined ? (
                <></>
              ) : (
                <SelectHistory
                  Histories={history.result}
                  prefix="/backtest/"
                  id={entry.result[0].strategy_id}
                />
              )}
            </div>

            {/* second row */}
            <div className="col-span-2 xl:col-span-3 p-2 pl-4 border h-[320px] rounded-lg">
              <Tabs defaultValue="regular" className="w-full">
                <TabsList>
                  <TabsTrigger value="regular" className="text-sm">
                    Regular
                  </TabsTrigger>
                  <TabsTrigger value="logscale" className="text-sm">
                    Logscale
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="regular">
                  {seriesLineChartData === undefined ||
                  benchmarkLineChartData === undefined ? (
                    <></>
                  ) : (
                    <LineChart
                      series={seriesLineChartData}
                      benchmark={benchmarkLineChartData}
                      seriesName={entry.result[0].title}
                      benchmarkName="benchmark"
                    />
                  )}
                  <></>
                </TabsContent>
                <TabsContent value="logscale">
                  {logSeriesLineChartData === undefined ||
                  logBenchmarkLineChartData === undefined ? (
                    <></>
                  ) : (
                    <LineChart
                      series={logSeriesLineChartData}
                      benchmark={logBenchmarkLineChartData}
                      seriesName={entry.result[0].title}
                      benchmarkName="benchmark"
                    />
                  )}
                </TabsContent>
              </Tabs>
            </div>
            <div className="p-2 pl-4 pr-4 border h-[320px] rounded-lg text-xs gap-2">
              <div className="text-sm font-bold">Parameters</div>
              <div className="flex p-2 m-2">
                <ScrollArea className="h-64 w-[270px] rounded-md">
                  {Object.keys(entry.result[0].parameters).map((key) => (
                    <>
                      <div className="text-xs font-bold">{key}</div>
                      <Table className="text-xs">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">
                              Parameter
                            </TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.keys(entry.result[0].parameters[key]).map(
                            (subKey) => (
                              <TableRow key={subKey}>
                                <TableCell key={subKey}>{subKey}</TableCell>
                                <TableCell>
                                  {entry.result[0].parameters[key][subKey]}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </>
                  ))}
                </ScrollArea>
              </div>
            </div>
            {/* third row */}
            <div className="flex justify-center p-2 border h-[160px] rounded-lg">
              <RadialChart
                Title="Sharp Ratio"
                Series={sharpRatio}
                Min={0}
                Max={2}
              />
              <div className="w-1/3 m-2 mt-4 text-xs">
                <div className="flex justify-between">
                  <p>UnQualified:</p>
                  <p>0</p>
                </div>
                <div className="flex justify-between">
                  <p>Qualified:</p>
                  <p>0 - 0.5</p>
                </div>
                <div className="flex justify-between">
                  <p>Good:</p>
                  <p>0.5 - 1</p>
                </div>
                <div className="flex justify-between">
                  <p>Great:</p>
                  <p>1 - 1.5</p>
                </div>
                <div className="flex justify-between">
                  <p>Excellent:</p>
                  <p>1.5 - 2</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-2 border h-[160px] rounded-lg">
              <RadialChart
                Title="Calmar Ratio"
                Series={calmarRatio}
                Min={0}
                Max={3}
              />
              <div className="w-1/3 m-2 mt-4 text-xs">
                <div className="flex justify-between">
                  <p>UnQualified:</p>
                  <p>0</p>
                </div>
                <div className="flex justify-between">
                  <p>Qualified:</p>
                  <p>0 - 1</p>
                </div>
                <div className="flex justify-between">
                  <p>Good:</p>
                  <p>1 - 3</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-2 border h-[160px] rounded-lg">
              <RadialChart
                Title="Win Rate"
                Series={winRate}
                Min={0}
                Max={100}
              />
              <div className="w-1/3 m-2 mt-4 text-xs">
                <div className="flex justify-between">
                  <p>Win:</p>
                  <p>{entry.result[0].analytics.win_count}</p>
                </div>
                <div className="flex justify-between">
                  <p>Lose:</p>
                  <p>{entry.result[0].analytics.lose_count}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-2 pl-4 pr-4 border h-[160px] rounded-lg">
              <ScrollArea className="h-64 w-[270px] rounded-md">
                <div className="text-sm font-bold">Backtest Report</div>
                <div className="m-2 mt-4 text-xs font-mono">
                  <div className="flex justify-between">
                    <p className="">Start Date</p>
                    <p>{entry.result[0].start_date}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">End Date</p>
                    <p>{entry.result[0].end_date}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">CAGR</p>
                    <p>{cagr}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Cumulative Return</p>
                    <p>{cumulativeReturnsPercent}%</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Annual Volatility</p>
                    <p>{annualVolatilty}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Sharp Ratio</p>
                    <p>{sharpRatio}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Omega</p>
                    <p>{omega}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Max DrawDown</p>
                    <p>{maxDrawDownPercent}%</p>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* forth row */}
            <div className="col-span-2 xl:col-span-2 p-2 pl-6 border h-[320px] rounded-lg">
              {heatMapData === undefined ? (
                <></>
              ) : (
                <HeatMap
                  series={heatMapData}
                  seriesName={entry.result[0].title}
                />
              )}
            </div>
            <div className="col-span-1 xl:col-span-1 p-2 pl-6 border h-[320px] rounded-lg">
              <ColumnChart
                Title="Max Drawdown & Return (USDT)"
                Series={{
                  Data: maxDrawDownDate,
                  Category: [
                    "Balance at Down",
                    "MaxDrawDown",
                    "Balance at Return",
                    "MaxReturn",
                  ],
                }}
                Avg={false}
                Metric="$"
              />
            </div>
            <div className="col-span-1 xl:col-span-1 p-2 pl-6 border h-[320px] rounded-lg">
              <ColumnChart
                Title="Annual Returns"
                Series={{
                  Data: annualReturnsData.data,
                  Category: annualReturnsData.category,
                }}
                Avg={true}
                Metric="%"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <>Loading...</>;
  }

  // return (
  //   <div>
  //       <p>{params.slug}</p>
  //       <p>{entry.result[0].title}</p>
  //   </div>
  // )
}
