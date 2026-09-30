"use client"

import { useState, useTransition } from "react"
import { sendEnglishResultEmail } from "@/app/admin/(dashboard)/bai-test/actions"
import { Button } from "@/components/ui/button"

export function SendResultButton({ id, ready, status }: { id: string; ready: boolean; status: string | null }) {
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  return (
    <div className="mt-3">
      <Button
        type="button"
        size="sm"
        disabled={!ready || pending}
        onClick={() => {
          setMessage(null)
          startTransition(async () => {
            const result = await sendEnglishResultEmail(id)
            setMessage(result.message)
          })
        }}
      >
        {pending ? "Đang gửi…" : status === "sent" ? "Gửi lại email" : "Gửi email kết quả"}
      </Button>
      {!ready ? <p className="mt-2 text-sm text-red-700">Thiếu họ tên, email hoặc số điện thoại. Đối chiếu trước khi gửi.</p> : null}
      {message ? <p className="mt-2 text-sm">{message}</p> : null}
    </div>
  )
}
