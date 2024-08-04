import { get } from '@/utils/api'

type SignInRequestData = {
  email: string
  password: string
}

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  await delay()

  const result = await get<User[]>('/account', {
    email: data.email,
    password: data.password,
  })

  if (result.length) {
    const findUser = result.find((e) => e.password === data.password)

    if (findUser) {
      return {
        user: {
          name: findUser.name,
          email: findUser.email,
        },
      }
    }
  }

  return {
    user: null,
  }
}
