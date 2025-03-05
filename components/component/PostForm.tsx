"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "./Icons";
import { useActionState, useRef, useState } from "react";
import { addPostAction } from "@/lib/actions";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";

export default function PostForm() {
  // const [error, setError] = useState<string | undefined>("");
  // const handleSubmit = async (formData: FormData) => {
  //   const result = await addPostAction(formData);
  //   if (!result?.success) {
  //     setError(result?.error);
  //   } else {
  //     setError("");
  //     formRef.current?.reset();
  //   }
  // }
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = {
    error: undefined,
    success: false,
  }
  const [state, formAction] = useFormState(addPostAction, initialState)

  if(state.success && formRef.current) {
    formRef.current.reset();
  }
  

  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <form
        className="flex flex-1 gap-2"
        // action={handleSubmit}
        action={formAction}
        ref={formRef}
      >
        <div className="flex-1">
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="bg-muted px-4 py-2"
            name="post"
          />
          {state.error && (
            <p className="text-destructive mt-2">{state.error}</p>
          )}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

