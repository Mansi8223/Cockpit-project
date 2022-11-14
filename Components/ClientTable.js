import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link'
import { Avatar } from '@mui/material';

function ClientTable({data, searchTerm}) {
  // console.log(data)
  return (
    <TableContainer className={`table m-3 h-538 border-light-gray border-rounded-12 bg-white oy-scroll`}>
      <Table size="small" aria-label="a dense table" >
        <TableHead className={`bg-secondary`}>
          <TableRow className={`table-header`}>
            <TableCell align="left">Client name</TableCell>
            <TableCell align="left">No. of unused hrs</TableCell>
            <TableCell align="left">No. of used hrs</TableCell>
            <TableCell align="left">Last order</TableCell>
            <TableCell align="left">No of revisions req.</TableCell>
            <TableCell align="left">Tasks used</TableCell>
            <TableCell align="left">Reward pts</TableCell>
            <TableCell align="left">Revenue generated</TableCell>
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
              <TableCell align="left">{item.unusedHours}</TableCell>
              <TableCell align="left">{item.usedHours}</TableCell>
              {item.task[0] ? <TableCell align="left">{item.task[0].taskName}</TableCell>:<TableCell align="left"></TableCell>}
              <TableCell align="left">{item.revisionRequests}</TableCell>
              <TableCell align="left">{item.task.length}</TableCell>
              <TableCell align="left">{item.rewardPoints}</TableCell>
              <TableCell align="left">{item.revenueGenerated}</TableCell>
              <TableCell align="center">
                  <Link href={`/Clients/${item._id}`}>
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

export default ClientTable