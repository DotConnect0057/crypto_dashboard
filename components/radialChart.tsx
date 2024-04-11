"use client";
import React, { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

type Props = {
  Title: string;
  Series: number;
  Min: number;
  Max: number;
};

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadialChart = ({ Title, Series, Min, Max }: Props) => {
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

  const value = ((Series - Min) * 100) / (Max - Min);
  const state = {
    series: [value],
    options: {
      chart: {
        height: 350,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: -5,
            size: "70%",
            background: crtTheme.bg,
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
          },
          track: {
            background: crtTheme.bg,
            strokeWidth: "70%",
            margin: 0, // margin is in pixels
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "14px",
            },
            value: {
              formatter: function () {
                return Series;
              },
              color: crtTheme.font,
              fontSize: "32px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        dashArray: 2,
      },
      labels: [Title],
    },
  };

  return (
    <div id={Title} className="w-[60%] flex justify-center items-top">
      <ApexChart
        options={state.options}
        series={state.series}
        type="radialBar"
        height={180}
        width="70%"
      />
    </div>
  );
};
export default RadialChart;
