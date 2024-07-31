import { FormEvent, useEffect, useState } from 'react'

import { UseMutateFunction } from '@tanstack/react-query'
import { SignInResponse } from 'next-auth/react'

import LoadingSpinner from '#components/animation/loadingSpinner'
import { Button } from '#components/ui/button'
import { CardContent } from '#components/ui/card'
import { Input } from '#components/ui/input'
import { AuthCredentials } from '#store/server/auth.queries'

interface LoginFormProps {
  mutate?: UseMutateFunction<SignInResponse, Error, AuthCredentials, unknown>
  isPending: boolean
}

export default function LoginForm({ mutate, isPending }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(email.length > 0 && password.length >= 4)
  }, [email, password])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate?.({ email, password, type: 'login' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-1.5">
        <Input
          className="bg-primary-foreground"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="bg-primary-foreground"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>
      <CardContent>
        <Button type="submit" className="w-full" disabled={!isFormValid}>
          {isPending ? <LoadingSpinner /> : '로그인'}
        </Button>
      </CardContent>
    </form>
  )
}
