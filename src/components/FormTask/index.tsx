'use client'

import { Button } from '@/components/Button'
import { ShowErrors } from '@/components/ShowErrors'
import { TaskProps } from '@/types/task'
import { post } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'

export default function FormTask() {
  const [task, setTask] = useState<TaskProps>({
    name: '',
    username: '',
    title: '',
    value: 0,
    date: '',
    isPayed: false,
  })

  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleClickCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setTask((prevState) => ({
      ...prevState,
      [name]: value === 'on' ? true : false,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError(null)

    if (!task.value) {
      setError('Preencha o campo Valor')
      return
    }

    setLoading(true)

    try {
      post<TaskProps>('/tasks', task).then((result) => {
        if (result.id) {
          router.replace('/tasks/' + result.id)
          return true
        }
      })
    } catch (error) {
      setError('Ocorreu algum erro. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <Input
          id="name"
          name="name"
          label="Usuário"
          value={task.name}
          handleChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Input
          id="title"
          name="title"
          label="Título"
          value={task.title}
          handleChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Input
          id="date"
          name="date"
          type="date"
          label="Data"
          value={task.date}
          handleChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 top-7 flex items-center ps-3.5">
            R$
          </div>
          <Input
            id="value"
            name="value"
            label="Valor"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={task.value}
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <Checkbox
          id="isPayed"
          name="isPayed"
          label="Pago"
          handleOnClick={handleClickCheckbox}
        />
      </div>

      <ShowErrors error={error} />
      <Button label={loading ? 'Aguarde...' : 'Salvar'} disabled={loading} />
    </form>
  )
}
