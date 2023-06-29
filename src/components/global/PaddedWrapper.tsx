import { ReactNode } from "react"

export default function PaddedWrapper({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="p-5 md:p-10">
      {children}
    </div>
  )
}