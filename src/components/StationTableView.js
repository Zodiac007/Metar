import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles, Typography, } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from './theme';

const useStyles = makeStyles(theme);

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#3f51b5',
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'center',
    },
    body: {
        fontSize: 14,
        textAlign: 'center',
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


export default function StationTableView({ stationDetail, handleDeleteButton }) {
    const classes = useStyles();
    const fieldsLabel = ['Date', 'Time', 'Code', 'AbbrivationField', 'Data', 'Direction', 'Visibility', 'Sky', 'Temp', 'Pressure', 'Operation'];
    const fields = ['date', 'time', 'code', 'abbrivationField', 'data', 'direction', 'visibility', 'sky', 'temp', 'pressure', 'operation'];

    return (
        <>
            <Grid container alignContent="center" alignItems="center" spacing={2}>
                <Grid item xs="12">
                    <Paper>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>S. No.</StyledTableCell>
                                    {fieldsLabel.map(f => <StyledTableCell>{f}</StyledTableCell>)}
                                    <StyledTableCell>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stationDetail.length > 0 && stationDetail.map((e, i) =>
                                    <StyledTableRow >
                                        <StyledTableCell>{i + 1}</StyledTableCell>
                                        {fields.map(f =>
                                            <StyledTableCell>{e[f]}</StyledTableCell>)}
                                        <StyledTableCell>
                                            <Tooltip title="Delete">
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => handleDeleteButton(e.code)} />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}

                            </TableBody>
                        </Table>
                        {stationDetail.length === 0 && <Typography style={{ margin: "0 1rem" }} variant="subtitle2" component="h6">No recent search data available.</Typography>}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}























