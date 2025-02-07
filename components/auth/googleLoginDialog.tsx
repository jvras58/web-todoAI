"use client"

import { googleAuthenticate } from "@/actions/google-login"
import type React from "react"
import { useActionState } from "react"
import { BsGoogle } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface GoogleLoginDialogProps {
  children: React.ReactNode
}

const GoogleLoginDialog: React.FC<GoogleLoginDialogProps> = ({ children }) => {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(googleAuthenticate, undefined)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Faça login usando o Google.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col items-center gap-4" action={dispatchGoogle}>
          <Button
            variant="outline"
            className="flex flex-row items-center gap-3 w-full"
            onClick={() => dispatchGoogle()}
          >
            <BsGoogle />
            Login pelo Google
          </Button>
          {errorMsgGoogle && <p className="text-red-500">{errorMsgGoogle}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GoogleLoginDialog

