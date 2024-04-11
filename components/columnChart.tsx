'use client'
import React, { use, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

type Props = {
    Title: string,
    Series: {Data: number[], Category: string[]},
    Avg: boolean,
    Metric: string,
    categoryFormat?: string,
}

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ColumnChart = ({ Title, Series, Avg, Metric, categoryFormat }: Props) => {
    const { setTheme, theme } = useTheme()
    const [ crtTheme, setCrtTheme ] = useState({ bg:'#fff', font:'#000', grid: '#d1d5db' })

    const Total = Series.Data.reduce((a, b) => a + b, 0)
    const AverageValue = Total / Series.Data.length
    // console.log(Total)

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
        series: [{
            name: Title,
            data: Series.Data
        }],
        options: {
            chart: {
                type: 'bar',
                height: 300,
                background: crtTheme.bg,
            },
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [{
                            from: -100000000,
                            to: -0,
                            color: "#F15B46"
                        }, {
                            from: 1,
                            to: 100000000,
                            // color: "#FEB019"
                        }]
                    },
                    columnWidth: '80%',
                },
            },
            title: {
                text: Title,
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: categoryFormat,
                categories: Series.Category,
                labels: {
                    rotate: -90
                }
            },
            yaxis: {
                title: {
                    text: "Growths",
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0)
                    }
                }
            },
            grid: {
                show: true,
                borderColor: crtTheme.grid,
                strokeDashArray: 4,
            },
            theme: {
                mode: theme
            },
        }
    }
    const stateWithAvg = {
        series: [{
            name: Title,
            data: Series.Data
        }, {
            name: 'Average',
            data: Series.Data.map(() => Avg)
        }],
        options: {
            chart: {
                type: 'bar',
                height: 300,
                background: crtTheme.bg,
            },
            annotations: {
                yaxis: [{
                    y: AverageValue,
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            color: '#fff',
                            background: '#00E396',
                        },
                        text: 'Avg'
                    }
                }]
            },
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [{
                            from: -100000000,
                            to: -0,
                            color: "#F15B46"
                        }, {
                            from: 1,
                            to: 100000000,
                            // color: "#FEB019"
                        }]
                    },
                    columnWidth: '80%',
                },
            },
            title: {
                text: Title,
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: categoryFormat,
                categories: Series.Category,
                labels: {
                    rotate: -90
                }
            },
            yaxis: {
                title: {
                    text: "Growths",
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0)
                    }
                }
            },
            grid: {
                show: true,
                borderColor: crtTheme.grid,
                strokeDashArray: 4,
            },
            theme: {
                mode: theme
            },
        }
    }
    return (
        <div>
            {Avg?
                <ApexChart options={stateWithAvg.options} series={state.series} type="bar" height={300} width={"100%"} />
                :
                <ApexChart options={state.options} series={state.series} type="bar" height={300} width={"100%"}/>
            }
        </div>
    )



}

export default ColumnChart