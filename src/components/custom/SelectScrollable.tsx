import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="rounded-3xl py-6 px-14 flex gap-2 w-[221.58px] justify-center bg-[#0c21c10d] text-[#0C21C1] hover:bg-[#0c21c10d]/10">
        <span className="w-6 h-6"><ChevronDown className="w-full h-full"/></span><SelectValue placeholder='Ангилал' />...
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ангилал</SelectLabel>
          <SelectItem value="book">Ном, утга зохиолын бүтээл</SelectItem>
          <SelectItem value="music">Хөгжмийн урлагийн бүтээл</SelectItem>
          <SelectItem value="teatre">Тайзны урлагийн бүтээл</SelectItem>
          <SelectItem value="photography">Дүрслэх урлаг, уран сайхны гэрэл зураг, гар урлал, хэрэглээний урлагийн бүтээл</SelectItem>
          <SelectItem value="art">Кино урлаг, дуу-дүрсний уран бүтээл</SelectItem>
          <SelectItem value="social">Интернэт орчин, тоон технологид суурилсан соёлын агуулга, харилцаа бүхий цахим</SelectItem>
          <SelectItem value="architecture">Дизайн, архитектурын бүтээл</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
