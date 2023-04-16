import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch} from "react-redux";
import {ccyFormat, priceRow, setProductOrder, shopSubtotal} from "../../../utils/orderTable";
import {setOrder} from "../../../redux/slices/fileSlice";


const OrderShopTableComponent = ({cartInitial, orderButton}) => {
    const [rows, setRows] = useState(null)
    const dispatch = useDispatch()

    const invoiceSubtotal = shopSubtotal(rows);

    const TAX_RATE = 0.07;

    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceSubtotal - invoiceTaxes;

    useEffect(() =>{
        setRows(cartInitial)
        dispatch(setOrder(setProductOrder(cartInitial)))
    },[cartInitial])

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
                        <TableCell>Товар</TableCell>
                        <TableCell align="right">Количество</TableCell>
                        <TableCell align="right">Стоимость</TableCell>
                        <TableCell align="right">Цена</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) =>
                        <TableRow key={row.id}>
                            <TableCell>{row.product.product_name}</TableCell>
                            <TableCell align="right">{row.product_count}</TableCell>
                            <TableCell align="right">{ccyFormat(row.product.price)}</TableCell>
                            <TableCell align="right">{ccyFormat(priceRow(row.product_count, row.product.price))}</TableCell>
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

export default OrderShopTableComponent;