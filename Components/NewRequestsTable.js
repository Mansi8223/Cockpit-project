import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link'
function NewRequestsTable({data, searchTerm}) {
  return (
    <TableContainer className={`table m-3 h-538 border-light-gray border-rounded-12 bg-white`}>
      <Table size="small" aria-label="a dense table" >
        <TableHead className={`bg-secondary`}>
          <TableRow className={`table-header`}>
            <TableCell align="left">Task name</TableCell>
            <TableCell align="left">Task type</TableCell>
            <TableCell align="left">Assigned by</TableCell>
            <TableCell align="left">Assignee</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Time left</TableCell>
            <TableCell align="left">Deadline</TableCell>
            <TableCell align="left">View details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data && data.filter((val)=>{
            if(searchTerm == ""){
              return val
            }else if (val.taskName.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
          }).map((item,index)=>(
            <TableRow className={`table-body`} key={index+1}>
              <TableCell component="th" scope="row">{item.taskName}</TableCell>
              <TableCell align="left">{item.taskType}</TableCell>
              {item.assignedBy?<TableCell align="left">{item.assignedBy.user.name}</TableCell>:<TableCell align="left">N/A</TableCell>}
              {item.assignee?<TableCell align="left">{item.assignee.user.name}</TableCell>:<TableCell align="left">N/A</TableCell>}
              <TableCell align="center">
                {item.requestStatus === "pending-approval" && <button className={"btn-secondary-red"}>Pending appr.</button>}
                {item.requestStatus === "upcoming-request" && <button className={"btn-secondary-black"}>Upcoming req.</button>}
                {item.requestStatus === "approved" && <> </>}
                {item.requestStatus === "denyed" && <></>}
              </TableCell>
              <TableCell align="left">{item.timeLeft}</TableCell>
              <TableCell align="left">{item.Deadline}</TableCell>
              <TableCell align="center">
                <Link href={`/NewRequest/${item._id}`}>
                  <button className={`btn-view`}><img src='images/entypo_chevron-right.svg' alt='right-icon'/></button>
                </Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default NewRequestsTable