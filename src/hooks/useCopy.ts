"use client"

import { toast } from "sonner";

export const useCopy = () => {
  const copy = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    .then(()=>{
      toast.success(`Copied: ${message} ${text}`);
    })
    .catch((e)=>{
      const error = e as Error
      console.error(error.message)
      toast.error(`Can't copy: ${text}` );
    })
  }
  return copy
}