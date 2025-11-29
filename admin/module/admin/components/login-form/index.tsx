"use client"
import React, { useEffect } from "react"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation"

import { useAdminLogin } from "../../api/mutations"
import { useToast } from "@/hooks/useToast"
import { LoginPayload } from "../../api/types"
import { flatZodError } from "@/lib/flatZodError"
import { adminLoginSchema, loginFormDefaultValues } from "../../utils/schema"
import { logger } from "@/lib/utils"

import InputField from "@/components/form/input-field"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"


const Loginform : React.FC = () => {
  const { mutate, isPending } = useAdminLogin()
  const toast = useToast()
  const router = useRouter()

  const { control, handleSubmit, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: loginFormDefaultValues
  })

  const onSubmit = (formData: LoginPayload) => {
    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message)
        router.push('/')
      },
      onError: (error) => {
        logger('errror in onsubmit', error)
        toast.error(error.message)
      }
    })
  }

  useEffect(() => {
    if(Object.entries(errors).length > 0) {
      const errMsg = flatZodError(adminLoginSchema, getValues())
      if(errMsg) toast.error(errMsg)
    }
  }, [errors])

  toast.isLoading(isPending, "Logging in...")


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <Controller
            name='email'
            control={control}
            disabled={isPending}
            render={({ field, fieldState }) => (
                <InputField
                  type="email"
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="m@example.com"
                  required
                />
            )}
          />
        </Field>
        <Field>
          <Controller
            name='password'
            control={control}
            disabled={isPending}
            render={({ field, fieldState }) => (
                <InputField
                  type="password"
                  label="Password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="m@example.com"
                  required
                />
            )}
          />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default Loginform