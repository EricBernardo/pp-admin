import { useState } from "react"

export function Table({data, handleClickPagination} TableProps) {
    const [tasks, setTasks] = useState<TableProps>(data)
    
  
    return(
        <Table data={data} onClick={handleClickPagination} />
    )
}