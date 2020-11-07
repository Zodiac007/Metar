import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
        backgroundColor: "#3f51b5"
    },
    table_ele: {
        color: "#ffffff"
    }
});


export default function StationTable(props) {
    const classes = useStyles();

    return (

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    <TableRow>
                        {props.tableData.map(row => (
                            <TableCell>
                                {row}
                            </TableCell>
                        ))}
                        {/* <TableCell>Delete</TableCell> */}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
