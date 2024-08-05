import { TaskDataProps } from '@/components/Table/types'
import formatDate from '@/helpers/format-date'
import { TaskProps } from '@/types/task'
import { del, get } from '@/utils/api'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid'
import { FormEvent, useEffect, useState } from 'react'

export function Table() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [search, setSearch] = useState<string>('')

  const handlerFormSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    listTasks()
  }

  const handlerDeleteItem = (id: string | undefined) => {
    if (confirm('Tem certeza de que deseja deletar este item?')) {
      del<TaskDataProps>('/tasks/' + id).then(() => {
        listTasks()
      })
    }
  }

  const listTasks = () => {
    get<TaskDataProps>('/tasks', {
      _page: 1,
      _per_page: 5,
      name: search,
    }).then((result) => {
      setTasks(result.data)
    })
  }

  useEffect(() => {
    listTasks()
  }, [])

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white relative shadow-lg sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center" onSubmit={handlerFormSearch}>
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon width={20} />
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="border text-sm rounded-lg pl-10 p-2"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row">
              <button
                type="button"
                className="text-white bg-green rounded-lg text-sm px-4 py-2"
              >
                Adicionar
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Usuário
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Título
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Data
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Valor
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Pago
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  return (
                    <tr className="border-b" key={task.id}>
                      <th className="px-4 py-3">{task.name}</th>
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
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <ArrowLeftIcon width={20} />
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <ArrowRightIcon width={20} />
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
