"use client";
import React, { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

type Props = {
  series: {
    category: string[];
    data: number[];
  };
  benchmark?: {
    category: string[];
    data: number[];
  };
  seriesName: string;
  benchmarkName?: string;
};

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ series, benchmark, seriesName, benchmarkName }: Props) => {
  const { setTheme, theme } = useTheme();
  const [crtTheme, setCrtTheme] = useState({
    bg: "#fff",
    font: "#000",
    grid: "#d1d5db",
  });

  const updateBgColor = () => {
    if (theme === "light") {
      return { bg: "#fff", font: "#000", grid: "#d1d5db" };
    } else {
      return { bg: "#0c0a09", font: "#fff", grid: "#374151" };
    }
  };

  useEffect(() => {
    setCrtTheme(updateBgColor());
  }, [theme]);

  let seriesData;
  if (!benchmark) {
    seriesData = [
      {
        name: seriesName,
        data: series.data,
      },
    ];
  } else {
    seriesData = [
      {
        name: seriesName,
        data: series.data,
      },
      {
        name: benchmarkName,
        data: benchmark.data,
      },
    ];
  }

  const state = {
    series: seriesData,
    options: {
      chart: {
        type: "area",
        // height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        background: crtTheme.bg,
        foreColor: crtTheme.font,
      },
      colors: ["#546E7A", "#FF1654"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Cumulative Returns(%)",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        type: "datetime",
        categories: series.category,
        tickAmount: 10,
      },
      yaxis: {
        labels: {
          formatter: function (val: number) {
            return val.toFixed(2);
          },
        },
        titlle: {
          text: "Returns",
        },
      },
      grid: {
        show: true,
        borderColor: crtTheme.grid,
        strokeDashArray: 4,
      },
      theme: {
        mode: theme,
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val: number) {
            return val.toFixed(0);
          },
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={250}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default LineChart;
