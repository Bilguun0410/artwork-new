import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet"

export function ProfileCurtain({children}) {
  return (
    <Sheet>
      <SheetTrigger className="-translate-x-5" asChild>
        <Button variant="ghost">{children}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Профайл Засах</SheetTitle>
          <SheetDescription>
            Хэрэглэгчийн мэдээлэлээ шинэчэлнэ үү.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="l-name" className="text-left">
              Овог
            </Label>
            <Input id="l-name" placeholder="Овог" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Нэр
            </Label>
            <Input id="username" placeholder="Нэр" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Имэйл
            </Label>
            <Input id="email" type="email" placeholder="Имэйл" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-left">
              Утас
            </Label>
            <Input id="phone" placeholder="Утас" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className='rounded-3xl bg-[#0C21C1] hover:bg-[#0C21C1]/75'>Хадгадах</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
