"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const SelectHistory = async ({ Histories, prefix, id }: { Histories:[], prefix:string, id:string }) => {
  console.log(id)
  return (
    <Select defaultOpen={false} onValueChange={(value) => redirect(prefix + value)}>
      <SelectTrigger className="w-full text-xs h-18">
        <SelectValue placeholder="Select BackTest History" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>BackTest History</SelectLabel>
          {Histories.map((item: { _id: string, strategy_id: string }) => (
            <SelectItem key={item._id} value={item._id} className="text-xs">{item.strategy_id}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
