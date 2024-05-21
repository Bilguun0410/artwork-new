import useAuth from "@/lib/hooks/useAuth"
import { useUpdateUser } from "@/lib/hooks/useFetchUsers"
import { useUserDetail } from "@/lib/hooks/useUserDetail"
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
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function ProfileCurtain({children}) {
  const { currentUser } = useAuth();
  const { user } = useUserDetail(currentUser?.id);
  const { updateUser, loading } = useUpdateUser();
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  console.log(user, 'cu')

  useEffect(()=>{
    if(user){
      setLastName(user?.lastName)
      setFirstName(user?.firstName)
      setEmail(user?.email)
      setPhone(user?.phone)
    }
  },[user])

  const onSubmit = (event) => {
    event.preventDefault();
    updateUser(currentUser?.id, {lastName, firstName, email, phone}).then(() => {
      toast.success('Амжилттай солигдлоо!');
    })
  }

  return (
    <Sheet>
      <SheetTrigger className="-translate-x-5" asChild>
        <Button variant="ghost">{children}</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={onSubmit}>
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
              <Input id="l-name" value={lastName} onChange={(event) => setLastName(event.currentTarget.value)} placeholder="Овог" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                Нэр
              </Label>
              <Input id="username" value={firstName} onChange={(event) => setFirstName(event.currentTarget.value)} placeholder="Нэр" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Имэйл
              </Label>
              <Input id="email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} type="email" placeholder="Имэйл" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-left">
                Утас
              </Label>
              <Input id="phone" value={phone} onChange={(event) => setPhone(event.currentTarget.value)} placeholder="Утас" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className='rounded-3xl bg-[#0C21C1] hover:bg-[#0C21C1]/75'>{loading && <Loader className={'w-5 h-5 animate-spin'} /> || 'Хадгадах'}</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
