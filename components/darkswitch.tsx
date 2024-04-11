"use client"

import { useTheme } from "next-themes"
import React from 'react'
import { Switch } from "./ui/switch"

const ModeToggle = () => {
  const { setTheme }  = useTheme()
  const handleSwitch = ((checked:boolean) => {
    if (checked) setTheme('dark')
    else setTheme('light')
  })

  return (
    <div className="flex items-center space-x-2">
        <Switch id="mode" defaultValue="dark"  defaultChecked onCheckedChange={(checked) => handleSwitch(checked)} />
    </div>
  )
}

export default ModeToggle