import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link'

function SubTaskTable({data,searchTerm}) {
  return (
    <TableContainer className={`table m-3 h-358 border-light-gray border-rounded-12 bg-white`}>
      <Table size="small" aria-label="a dense table" >
        <TableHead className={`bg-secondary`}>
          <TableRow className={`table-header`}>
            <TableCell align="left">Sub-task image</TableCell>
            <TableCell align="left">Sub-task name</TableCell>
            <TableCell align="left">Checklists</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Deliverables</TableCell>
            <TableCell align="left">View details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data && data.filter((val)=>{
            if(searchTerm == ""){
            return val
            }else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
            }
        }).map((item,index)=>(
          <TableRow key={index+1} className={`table-body`}>
            {item.propertyPhoto?<TableCell component="th" scope="row" align='center'><img className={`h-48 w-100px border-rounded-8`} src={item.propertyPhoto} alt='image'/></TableCell>:
            <TableCell component="th" scope="row" align='center'><div className={`p-8 bg-lighter-gray border-rounded-8`}></div></TableCell>}
            <TableCell align="left">{item.title}</TableCell>
            <TableCell align="left">{item.checklist.length}</TableCell>
            <TableCell align="left">5 hours</TableCell>
            <TableCell align="left">Et qui sit facere fugit voluptas consequuntur</TableCell>
            <TableCell align="center">
              <Link  href={`/ViewSubTask/${item._id}`}>
                <button className={`btn-view`}><img src='/images/entypo_chevron-right.svg' alt='right-icon'/></button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SubTaskTable