'use client'

import { TaskDataProps } from '@/components/Table/types'
import { formatDate } from '@/helpers/format-date'
import { TaskProps } from '@/types/task'
import { del, get } from '@/utils/api'
import {
  CheckCircleIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid'

import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

import { AlertNotification } from '@/components/AlertNotification'
import { ButtonSort } from '@/components/ButtonSort'
import { Pagination } from '@/components/Pagination'

import { AlertNotificationProps } from '@/types/alertNotification'

export function Table() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(0)
  const [prevPage, setPrevPage] = useState<number>(0)
  const [sort, setSort] = useState<string>('ASC')
  const [sortColumn, setColumnSort] = useState<string>('name')
  const [notification, setNotification] = useState<AlertNotificationProps>({
    message: null,
    type: null,
  })

  const router = useRouter()

  const handlerFormSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentPage(1)
    listTasks()
  }

  const handlerDeleteItem = (id: string | number | undefined) => {
    if (confirm('Tem certeza de que deseja deletar este item?')) {
      del<TaskDataProps>('/tasks/' + id)
        .then(() => {
          listTasks()
        })
        .catch((e) => {
          setNotification({ message: e.message, type: 'error' })
        })
    }
  }

  const handlerEditItem = (id: string | number | undefined) => {
    router.replace('/tasks/' + id)
  }

  const listTasks = () => {
    get<TaskDataProps>('/tasks', {
      _page: currentPage,
      _per_page: 10,
      name: search,
      _sort: `${sort === 'DESC' ? '-' : ''}${sortColumn}`,
    }).then((result) => {
      setTasks(result.data)

      setTotalPage(result.pages)
      setNextPage(result.next)
      setPrevPage(result.prev)
    })
  }

  const handleClickNextPage = (): void => {
    setCurrentPage(nextPage)
  }
  const handleClickPrevPage = (): void => {
    setCurrentPage(prevPage)
  }

  const handleClickPage = (page: number): void => {
    setCurrentPage(page)
    listTasks()
  }

  const handleSortinColumn = (column: string): void => {
    setColumnSort(column)
    setSort(sort === 'ASC' ? 'DESC' : 'ASC')
  }

  const handleRedirectCreate = () => {
    router.replace('/tasks/create')
  }

  useEffect(() => {
    listTasks()
  }, [])

  useEffect(() => {
    listTasks()
  }, [currentPage, sort, sortColumn])

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white relative shadow-lg sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <form
              className="flex items-center w-full md:w-auto"
              onSubmit={handlerFormSearch}
            >
              <label className="sr-only">Buscar</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon width={20} />
                </div>
                <input
                  type="text"
                  id="search"
                  className="border text-sm rounded-lg pl-10 p-2 w-full"
                  placeholder="Buscar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
            <div className="w-full md:w-auto flex flex-col md:flex-row">
              <button
                type="button"
                className="text-white bg-green rounded-lg text-sm px-4 py-2"
                onClick={handleRedirectCreate}
              >
                Adicionar
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400 border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 w-1/6">
                    <ButtonSort
                      handleOnClick={() => handleSortinColumn('name')}
                    >
                      Usuário
                      <ChevronUpDownIcon height={20} />
                    </ButtonSort>
                  </th>
                  <th scope="col" className="px-4 py-3 w-1/6">
                    <ButtonSort
                      handleOnClick={() => handleSortinColumn('title')}
                    >
                      Título
                      <ChevronUpDownIcon height={20} />
                    </ButtonSort>
                  </th>
                  <th scope="col" className="px-4 py-3 w-1/6">
                    <ButtonSort
                      handleOnClick={() => handleSortinColumn('date')}
                    >
                      Data
                      <ChevronUpDownIcon height={20} />
                    </ButtonSort>
                  </th>
                  <th scope="col" className="px-4 py-3 w-1/6">
                    <ButtonSort
                      handleOnClick={() => handleSortinColumn('value')}
                    >
                      Valor
                      <ChevronUpDownIcon height={20} />
                    </ButtonSort>
                  </th>
                  <th scope="col" className="px-4 py-3 w-1/6">
                    <ButtonSort
                      handleOnClick={() => handleSortinColumn('isPayed')}
                    >
                      Pago
                      <ChevronUpDownIcon height={20} />
                    </ButtonSort>
                  </th>
                  <th scope="col" className="px-4 py-3 text-end">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  return (
                    <tr className="border-b" key={task.id}>
                      <td className="px-4 py-3">{task.name}</td>
                      <td className="px-4 py-3">{task.title}</td>
                      <td className="px-4 py-3">{formatDate(task.date)}</td>
                      <td className="px-4 py-3">R$ {task.value}</td>
                      <td className="px-4 py-3">
                        {task.isPayed ? (
                          <CheckCircleIcon className="text-green" width={20} />
                        ) : (
                          <XMarkIcon className="text-red" width={20} />
                        )}
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          type="button"
                          className="text-white bg-green rounded-lg text-sm py-1 px-3 mr-2"
                          onClick={() => handlerEditItem(task.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="text-white bg-red rounded-lg text-sm py-1 px-3"
                          onClick={() => handlerDeleteItem(task.id)}
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleClickNext={handleClickNextPage}
            handleClickPage={handleClickPage}
            handleClickPrev={handleClickPrevPage}
          />
        </div>
      </div>
      <AlertNotification
        message={notification.message}
        type={notification.type}
      />
    </section>
  )
}
