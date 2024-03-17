"use client"
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';



function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset'  ,backgroundColor:'#1d1d1f',border:'nonde'} }}>
        <TableCell align='center' sx={{color:'white' ,border:'none'}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{color:'white' ,border:'none'}}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell  align='center' component="th" scope="row" sx={{color:'white' ,border:'none'}}>
            {row?.Image ?  <img style={{height:'30px',width:'30' ,borderRadius:'50%'}} src={row?.Image}/>  : <PersonIcon/>}
            
        </TableCell>

        <TableCell align="center" sx={{color:'white' ,border:'none'}}>{row.Name || "N/A"}</TableCell>
        <TableCell align="center" sx={{color:'white' ,border:'none'}}>{row.phone  || "N/A"}</TableCell>
        <TableCell align="center" sx={{color:'white' ,border:'none'}}>{row.email}</TableCell>
        <TableCell align="center" sx={{color:'white' ,border:'none'}}>{row.isActive ? "YES" : "NO"}</TableCell>
        <TableCell align="center" sx={{color:'white' ,border:'none'}}>{row._id || "N/A"}</TableCell>
        <TableCell align="center" sx={{color:'white' ,border:'none'}}>{row.createdAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding:'0' ,backgroundColor:'1d1d1f' ,border:'none'}} colSpan={8}>
          <Collapse in={open} sx={{backgroundColor:'#1d1d1f'}} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 ,backgroundColor:'gray'}}>
              <Table size="small" aria-label="purchases">
                <TableHead sx={{backgroundColor:'#111113' ,border:'none'}}>
                  <TableRow>
                    <TableCell sx={{color:'white' ,border:'none'}} align="center">Order ID</TableCell>
                    <TableCell sx={{color:'white' ,border:'none'}} align="center">Order Items</TableCell>
                    <TableCell sx={{color:'white' ,border:'none'}} align="center">Contact No</TableCell>
                    <TableCell sx={{color:'white' ,border:'none'}} align="center">Address</TableCell>
                    <TableCell sx={{color:'white' ,border:'none'}} align="center">Total Amount</TableCell>
                    <TableCell  sx={{color:'white' ,border:'none'}} align="center">Order Status</TableCell>
                    <TableCell sx={{color:'white' ,border:'none'}} align="center">Payment Status</TableCell>
                    <TableCell sx={{color:'white' ,border:'none'}} align="center">createdAt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((order) => (
                    <TableRow key={order.razorOrderId}>
                      <TableCell sx={{border:'none'}} align="center" component="th" scope="row">
                        {order.razorOrderId}
                      </TableCell>
                      <TableCell sx={{border:'none'}}  align="center">{order.items.length}</TableCell>
                      <TableCell sx={{border:'none'}}  align="center">{order.billingDetails.ContactNo}</TableCell>
                      <TableCell  sx={{border:'none'}}  align="center">{order.billingDetails.address.city}/{order.billingDetails.address.state}-{order.billingDetails.address.zipcode}</TableCell>
                      <TableCell sx={{border:'none'}}  align="center">{order.total_price}</TableCell>
                      <TableCell sx={{border:'none'}}  align="center">{order.orderStatus}</TableCell>
                      <TableCell sx={{border:'none'}}  align="center">{order.paymentStatus}</TableCell>
                      <TableCell sx={{border:'none'}}  align="center">{order.date}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};

export default function CollapsibleTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/getuser')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{backgroundColor:'#111113' ,color:'white',border:'none'}}>
          <TableRow>
            <TableCell align="center"  sx={{color:'white',border:'none'}}/>
            <TableCell  align="center" sx={{color:'white',border:'none'}}>Image</TableCell>

            <TableCell  align="center" sx={{color:'white', border:'none'}}>Name</TableCell>
            <TableCell  align="center" sx={{color:'white',border:'none'}}>phone</TableCell>
            <TableCell  align="center" sx={{color:'white' ,border:'none'}}>email</TableCell>
            <TableCell  align="center" sx={{color:'white' ,border:'none'}}>isActive</TableCell>
            <TableCell  align="center" sx={{color:'white',border:'none'}}>UserID</TableCell>
            <TableCell  align="center" sx={{color:'white' ,border:'none'}}>createdAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <Row key={user._id} row={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
