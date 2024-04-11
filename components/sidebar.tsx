"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  AcademicCapIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { Key } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  {
    name: "Live Trade",
    href: "/livetrade",
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: "Backtest",
    href: "/backtest",
    icon: AcademicCapIcon,
    current: false,
  },
  { name: "Market", href: "#", icon: CalendarIcon, current: false },
  {
    name: "Blog Article",
    href: "/blog",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Reports", href: "/report", icon: ChartPieIcon, current: false },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <div
        className="p-2 hidden lg:fixed lg:inset-y-0
            lg:z-50 lg:flex lg:w-56 lg:flex-col bg-muted/40"
      >
        <div className="m-2 mb-6">BackTest HUB</div>
        <div>
          <div className="">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex mb-2 group gap-x-3 items-center p-2 leading-6 rounded-md font-semibold",
                  item.href === pathname
                    ? "bg-gray-800 text-white"
                    : "tet-gray-400 hover:text-white hover:bg-gray-800",
                )}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* sidebar for small screen */}
      <div className="w-14 p-2 fixed inset-y-0 lg:hidden bg-muted/40">
        <div className="mb-3">
          <Avatar>
            <AvatarImage asChild src="/dc_logo.png">
              <Image src="/dc_logo.png" alt="logo" width={40} height={40} />
            </AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800",
                  "flex mb-2 w-10 group gap-x-3 rounded-md p-2 items-center leading-6 font-semibold",
                )}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <item.icon
                        className="w-6 h-6 shrink-0"
                        aria-hidden="true"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
