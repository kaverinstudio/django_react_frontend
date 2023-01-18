import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ccyFormat, orderTableInit, priceRow, subtotal} from "../../../utils/orderTable";
import {setOrder} from "../../../redux/slices/fileSlice";
import {Link} from "react-router-dom";


const OrderTableComponent = ({filesInitial, orderButton}) => {
    const initialProps = useSelector(state => state.files.fileInitialProps)
    const [rows, setRows] = useState(null)
    const dispatch = useDispatch()

    const invoiceSubtotal = subtotal(rows);

    const TAX_RATE = 0.07;

    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceSubtotal - invoiceTaxes;

    useEffect(() =>{
        setRows(orderTableInit(filesInitial, initialProps))
        dispatch(setOrder(orderTableInit(filesInitial, initialProps)))
    },[filesInitial])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="spanning table" size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            Ваш заказ
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Фотография</TableCell>
                        <TableCell align="right">Количество</TableCell>
                        <TableCell align="right">Стоимость</TableCell>
                        <TableCell align="right">Цена</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) =>
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                            <TableCell align="right">{ccyFormat(priceRow(row.count, row.price))}</TableCell>
                        </TableRow>

                    )}

                    <TableRow>
                        <TableCell align='center' rowSpan={3} >
                                {orderButton}
                        </TableCell>
                        <TableCell colSpan={2}>Сумма</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Скидка</TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Итого</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderTableComponent;