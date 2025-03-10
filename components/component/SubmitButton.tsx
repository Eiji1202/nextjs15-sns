import React from 'react'
import { Button } from '../ui/button'
import { SendIcon } from './Icons'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="ghost" size="icon" disabled={pending} type="submit">
      <SendIcon className="h-5 w-5 text-muted-foreground" />
      <span className="sr-only">Tweet</span>
    </Button>
  )
}
