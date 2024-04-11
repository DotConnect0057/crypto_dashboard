import React from 'react'
import Link from "next/link";
import {
  BsGraphUpArrow,
  BsGraphDownArrow,
  BsDatabase,
  BsDatabaseAdd,
} from "react-icons/bs";
import { IoMdResize } from "react-icons/io";
import { SiSurveymonkey } from "react-icons/si";
import { IoPlayForwardCircleOutline } from "react-icons/io5";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { Separator } from "@/components/ui/separator";
import { Progress } from "./ui/progress";
import { ShieldCheck, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
type Props = {
    Id: string;
    StrategyTitle: string;
    StrategySubTitle: string;
    Stage: string | undefined;
    TotalReturn: number;
    SharpRatio: number;
    DataSource: string;
    StartDate: string;
    EndDate: string;
    UpdateDate: string;
    Tags: string[];
};

const validationState = {
    stage1: {
      name: "Idea",
      value: 12.5,
      icon: <Lightbulb />,
      bgColor: "bg-gray-500",
      textColor: "text-gray-500",
    },
    stage2: {
      name: "Small Datasets",
      value: 25,
      icon: <BsDatabase />,
      bgColor: "bg-red-500",
      textColor: "text-red-500",
    },
    stage3: {
      name: "Large Datasets",
      value: 37.5,
      icon: <BsDatabaseAdd />,
      bgColor: "bg-red-500",
      textColor: "text-red-500",
    },
    stage4: {
      name: "Monkey Test",
      value: 50,
      icon: <SiSurveymonkey />,
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    stage5: {
      name: "Walk Foward Test",
      value: 62.5,
      icon: <IoPlayForwardCircleOutline />,
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    stage6: {
      name: "Monte Carlo Sim",
      value: 75,
      icon: <TfiLayoutGrid3 />,
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    stage7: {
      name: "Sizing",
      value: 87.5,
      icon: <IoMdResize />,
      bgColor: "bg-green-500",
      textColor: "text-green-500",
    },
    stage8: {
      name: "Validated",
      value: 100,
      icon: <ShieldCheck />,
      bgColor: "bg-green-500",
      textColor: "text-green-500",
    },
  };



const Card = ({
    Id,
    StrategyTitle,
    StrategySubTitle,
    Stage = "stage1",
    TotalReturn,
    SharpRatio,
    DataSource,
    StartDate,
    EndDate,
    UpdateDate,
    Tags,
}: Props) => {
  const path = "/backtest/" + Id

  const validState = (stage: string) => {
    switch (stage) {
        case "stage1":
            return validationState.stage1;
        case "stage2":
            return validationState.stage2;
        case "stage3":
            return validationState.stage3;
        case "stage4":
            return validationState.stage4;
        case "stage5":
            return validationState.stage5;
        case "stage6":
            return validationState.stage6;
        case "stage7":
            return validationState.stage7;
        case "stage8":
            return validationState.stage8;
        default:
            return validationState.stage1;
    }
  }
  const stage = validState(Stage);

  return (
    <div className="flex flex-col p-4 w-[280px] h-[312px] gap-1 border
        hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-600"
    >
        <Link
            key="heaer"
            href={path}
            className="flex h-10 mb-2 text-left hover:text-blue-400"
        >
            { TotalReturn > 0 ? (
                <div className="text-green-400 text-[40px] w-[48px]">
                    <BsGraphUpArrow />
                </div>
            ) : (
                <div className="text-red-400 text-[40px] w-[48px]">
                    <BsGraphDownArrow />
                </div>
            )}
            <div className="ml-2 w-[200px]">
                <div className="truncate w-full">{StrategyTitle}</div>
                <div className="truncate w-full text-xs text-gray-500">
                    {StrategySubTitle}
                </div>
            </div>
        </Link>
        <Separator />
        <div className={cn(
            "flex flex-col gap-2 justify-start text-2xl",
            stage.textColor
        )}>
            <div className="flex items-center gap-2">
                {stage.icon} <p className="text-xs">{stage.name}</p>
            </div>
            <div>
                <Progress 
                    value={stage.value}
                    className="h-2 text-blue-500"
                    indicatorColor={stage.bgColor}
                />
            </div>
        </div>
        <div key="main" className="grid grid-cols-2 m-2 mt-1 gap-2 text-xs">
            <div>Total Return</div>
            <div>${TotalReturn.toLocaleString()}</div>
            <div>Sharp Ratio</div>
            <div>{SharpRatio.toLocaleString()}</div>
            <div>DataSource</div>
            <div>{DataSource}</div>
            <div className="row-span-2">Backtest Data Range</div>
            <div className="truncate">{StartDate}</div>
            <div className="truncate">{EndDate}</div>
        </div>
        <div key="tags"
            className="flex flex-wrap gap-1 justify-start items-center">
            {Tags.map((tag) => (
                <div key={tag} className="p-1 text-xs border dark:border-white rounded-md
                    w-14 text-center"
                >
                    {tag}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Card