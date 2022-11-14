import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link'
function TemplateTable({data,searchTerm}) {
    // console.log(data)
  return (
        <TableContainer className={`table m-3 h-538 border-light-gray border-rounded-12 bg-white`}>
            <Table size="small" aria-label="a dense table" >
                <TableHead className={`bg-secondary`}>
                <TableRow className={`table-header`}>
                    <TableCell align="left">Task type</TableCell>
                    <TableCell align="left">Task name</TableCell>
                    <TableCell align="left">Task type</TableCell>
                    <TableCell align="left">Sub-tasks</TableCell>
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
                    <TableRow key={index+1} className={`table-body`}>
                        <TableCell component="th" scope="row" align='center'><img src='images/unsplash_2kecpb73aqy (1).png' alt='image'/></TableCell>
                        <TableCell align="left">{item.taskName}</TableCell>
                        <TableCell align="left">{item.taskType}</TableCell>
                        <TableCell align="left">{item.subTask.length}</TableCell>
                        <TableCell align="center">
                        <Link href={`/SubTasks/${item._id}`}>
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

export default TemplateTable