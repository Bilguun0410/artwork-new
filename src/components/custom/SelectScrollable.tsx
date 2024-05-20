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
import { IGenre } from "@/lib/models/genres";
import axios from "axios";

export function SelectScrollable() {
  const [genres, setGenres] = React.useState<IGenre[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4100/api/genres');
        setGenres(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(genres)

  return (
    <Select>
      <SelectTrigger className="rounded-3xl py-6 px-14 flex gap-2 w-[221.58px] justify-center bg-[#0c21c10d] text-[#0C21C1] hover:bg-[#0c21c10d]/10">
        <span className="w-6 h-6"><ChevronDown className="w-full h-full"/></span><SelectValue placeholder='Ангилал' />...
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ангилал</SelectLabel>
          {
            genres && genres.map(genre => (
              <SelectItem key={genre.name} value={genre.name}>{genre.name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
