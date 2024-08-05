type PaginationProps = {
  currentPage: number
  totalPages: number
  handleClickPrev: () => void
  handleClickNext: () => void
  handleClickPage: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  handleClickPrev,
  handleClickNext,
  handleClickPage,
}: PaginationProps) {
  const buttonClass =
    'p-4 rounded-md border border-black w-5 h-5 flex items-center justify-center mb-5 mr-2'

  const calculatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const offset = 2
    let start = Math.max(1, currentPage - offset)
    let end = Math.min(currentPage + offset, totalPages)

    if (currentPage <= offset) {
      end = 1 + offset * 2
    } else if (currentPage >= totalPages - offset) {
      start = totalPages - offset * 2
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  const pageNumbers = calculatePageNumbers()

  if (totalPages <= 1) return null

  return (
    <nav className="flex md:justify-end mt-4 justify-center">
      <button
        onClick={handleClickPrev}
        disabled={currentPage === 1}
        className={`${buttonClass} bg-white disabled:opacity-40`}
      >
        &lt;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handleClickPage(page)}
          disabled={page === currentPage}
          className={`${buttonClass} disabled:opacity-40`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleClickNext}
        disabled={currentPage === totalPages}
        className={`${buttonClass} bg-white disabled:opacity-40`}
      >
        &gt;
      </button>
    </nav>
  )
}
