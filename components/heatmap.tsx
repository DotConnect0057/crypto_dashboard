'use client'
import React, { use, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

type Props = {
    series: [],
    seriesName: string,
}

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const HeatMap = ({ series, seriesName }: Props) => {
    const { setTheme, theme } = useTheme()
    const [ crtTheme, setCrtTheme ] = useState({ bg:'#fff', font:'#000', grid: '#d1d5db' })

    const updateBgColor = (() => {
        if (theme === 'light') {
            return { bg:'#fff', font:'#000', grid: '#d1d5db' }
        } else {
            return { bg:'#0c0a09', font:'#fff', grid: '#374151' }
        }
    })

    useEffect(() => {
        setCrtTheme(updateBgColor())
    }, [theme])


    const state = { 
        series: series,
        options: {
            chart: {
                type: 'heatmap',
                height: 450,
                background: crtTheme.bg,
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#008FFB"],
            xaxis: {
                type: 'category',
            },
            title: {
                text: "Heatmap",
            },
            grid: {
                padding: {
                    right: 20,
                },
                borderColor: crtTheme.grid,
                strokeDashArray: 4,
            },
            stroke: {
                width: 1,
                colors: [crtTheme.font]
            },
            plotOptions: {
                heatmap: {
                    enableShades: false,
                    colorScale: {
                        ranges: [{
                            from: -100000,
                            to: -51,
                            color: '#ef4444',
                            name: 'under -50%'
                        },
                        {
                            from: -50,
                            to: -0.00000001,
                            color: '#f59e0b',
                            name: 'between 0 <> -50%'
                        },
                        {
                            from: 0,
                            to: 0,
                            color: '#000000',
                            name: '0'
                        },
                        {
                            from: 0.00000001,
                            to: 50,
                            color: '#84cc16',
                            name: 'between 0 <> 50%'
                        },
                        {
                            from: 51,
                            to: 100000,
                            color: '#06b6d4',
                            name: 'above 50%'
                        }]
                    }
                }
            },
            theme: {
                mode: theme
            },
        }
    }

    return (
        <div>
            <ApexChart options={state.options} series={state.series} type="heatmap" height={300} width={"100%"} />
        </div>
    )
}
export default HeatMap