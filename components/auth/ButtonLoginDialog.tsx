"use client"

import { googleAuthenticate } from "@/actions/google-login"
import type React from "react"
import { useActionState } from "react"
import { BsGoogle } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { BackButton } from "./forms/back-button"
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
          <DialogDescription>Faça login usando email ou Google.</DialogDescription>
        </DialogHeader>

        <Link href="/auth/login" className="w-full">
          <Button className="w-full">
            Login com email e senha
          </Button>
        </Link>

        <div className="relative my-4">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground">
            ou
          </span>
        </div>

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

        <BackButton 
          href="/auth/register"
          label="Não tenho conta"
        />
      </DialogContent>
    </Dialog>
  )
}

export default GoogleLoginDialog