import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link'
function TaskTable() {
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
          <TableRow className={`table-body`}>
            <TableCell component="th" scope="row">Labore magnam nemo repellendus.</TableCell>
            <TableCell align="left">Showing assistant</TableCell>
            <TableCell align="left">Floyd Miles</TableCell>
            <TableCell align="left">Esther Howard</TableCell>
            <TableCell align="center"><button className={`btn-secondary-gray`}>Unassigned</button></TableCell>
            <TableCell align="left">5 hours</TableCell>
            <TableCell align="left">8/30/14</TableCell>
            <TableCell align="center">
              <Link  href='/ViewTask'>
                <button className={`btn-view`}><img src='images/entypo_chevron-right.svg' alt='right-icon'/></button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TaskTable