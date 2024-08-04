type SignInRequestData = {
  email: string
  password: string
}

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  await delay()

  return {
    user: {
      name: 'eric sousa',
      email: 'eric.sousa',
    },
  }
}
