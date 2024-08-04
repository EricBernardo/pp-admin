import { UserProps } from '@/types/user'
import { get } from '@/utils/api'

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount))

export async function signInRequest(data: UserProps) {
  await delay()

  const result = await get<UserProps[]>('/account', {
    email: data.email,
    password: data.password,
  })

  const findUser = result.find((e) => e.password === data.password)

  if (!result.length || !findUser) {
    return {
      user: null,
    }
  }

  return {
    user: {
      name: findUser.name,
      email: findUser.email,
    },
  }
}
