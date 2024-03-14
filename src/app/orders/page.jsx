"use client"
import React, { useEffect, useState } from 'react';
import { Table, TableRow, TableHead, TableContainer, TableCell, TableBody } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularIndeterminate from '@/components/clients/loader';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders(){
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/getorders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box sx={{ color: 'red', width: '100%' }}>
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ width: '100%' }} aria-label="custom pagination table">
          <TableHead sx={{ backgroundColor: '#111113', color: 'white', borderRadius: '1rem' }}>
            <TableRow>
              <TableCell style={{ width: 30, color: 'white', border: 'none' }} align="center"><b>{"Sno"}</b></TableCell>
              <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{"OrderId"}</TableCell>
              <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{"Customer Name"}</TableCell>
              <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{"TotalItems"}</TableCell>
              <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{"Total Amount"}</TableCell>
              <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{"orderStatus"}</TableCell>
              <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{"Payment Status"}</TableCell>
              <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{"Created At"}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: '#111113f2', color: 'white' }}>
            {isLoading ? (
              <TableRow sx={{ border: 'none' }}>
                <TableCell colSpan={8}  align="center" style={{ color: 'white', border: 'none' ,height:'70vh' }}><CircularIndeterminate/></TableCell>
              </TableRow>
            ) : (
              orders.map((order, index) => (
                <TableRow key={order.id} sx={{ border: 'none' }}>
                  <TableCell component="th" scope="row" style={{ width: 30, color: 'white', border: 'none' }} align="center">{index + 1}</TableCell>
                  <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{order.razorOrderId}</TableCell>
                  <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{order.customer_id}</TableCell>
                  <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{order.items.length}</TableCell>
                  <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{order.total_price}</TableCell>
                  <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{order.orderStatus}</TableCell>
                  <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{order.paymentStatus}</TableCell>
                  <TableCell style={{ width: 160, color: 'white', border: 'none' }} align="center">{order.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
