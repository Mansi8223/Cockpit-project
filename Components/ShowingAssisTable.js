import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link'
import { Avatar } from '@mui/material';

function ShowingAssisTable({data, searchTerm}) {
  // console.log(data)
  return (
    <TableContainer className={`table m-3 h-538 border-light-gray border-rounded-12 bg-white`}>
      <Table size="small" aria-label="a dense table" >
        <TableHead className={`bg-secondary`}>
          <TableRow className={`table-header`}>
            <TableCell align="left">Assistant name</TableCell>
            <TableCell align="left">Last task</TableCell>
            <TableCell align="left">No. of hrs worked</TableCell>
            <TableCell align="left">No of revisions</TableCell>
            <TableCell align="left">No of declines</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">No. of completed tasks</TableCell>
            <TableCell align="left">View details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data && data.filter((val)=>{
            if(searchTerm == ""){
              return val
            }
            else if (val.user.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
          }).map((item,index)=>(
            <TableRow className={`table-body`} key={index+1}>
              <TableCell component="th" scope="row">
                  <div className={`d-flex d-flex-row d-align-center gap-2`}>
                      <Avatar src={item.user.image}/>
                      {item.user.name}
                  </div>
              </TableCell>
              {item.task[0] ? <TableCell align="left">{item.task[0].taskName}</TableCell>:<TableCell align="left"></TableCell>}
              <TableCell align="left">{item.workedHours}</TableCell>
              <TableCell align="left">{item.revisionsCount}</TableCell>
              <TableCell align="left">{item.declinesCount}</TableCell>
              <TableCell align="center">
                {item.status === "Available" && <button className={"btn-secondary-yellow"}>{item.status}</button>}
                {item.status === "Assigned" && <button className={"btn-secondary-green"}>{item.status}</button>}
                {item.status === "Unavailable" && <button className={"btn-secondary-red"}>{item.status}</button>}
              </TableCell>
              <TableCell align="left">{item.completedTaskCount}</TableCell>
              <TableCell align="center">
                  <Link href={`/ShowingAssistant/${item._id}`}>
                      <button className={`btn-view`}><img src='images/entypo_chevron-right.svg' alt='right-icon'/></button>
                  </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ShowingAssisTable