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
import { useRouter } from "next/router";
import { useAppContext } from "@/src/modules/AppContext";

export function SelectScrollable() {
  const router = useRouter();
  const [genres, setGenres] = React.useState<IGenre[]>([]);
  const { genre, handleSelect } = useAppContext();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4900/api/genres');
        setGenres(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Select onValueChange={(value) => handleSelect(value)} defaultValue={genre && genre}>
      <SelectTrigger className="rounded-3xl py-6 px-14 flex gap-2 w-[221.58px] justify-center bg-[#0c21c10d] text-[#0C21C1] hover:bg-[#0c21c10d]/10">
        <span className="w-6 h-6"><ChevronDown className="w-full h-full"/></span><SelectValue placeholder='Ангилал' />...
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ангилал</SelectLabel>
          {
            genres && genres.map((genre, idx) => (
              <SelectItem key={idx} value={genre.name}>{genre.name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
