import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import NavBar from './components/navs/nav';
import StationTableView from './components/StationTableView';
import Snackbar from './components/Snackbar';
import BarGraph from './components/barChart';

export default function Base() {

    const initialState = {
        stationDetail: [],
        open: false,
        message: "No Station Found."
        // stationsList: []
    }
    const [state, setState] = useState(initialState);

    const [code, setCode] = useState('');

    // Table Content
    const fields = ['date', 'time', 'code', 'abbrivationField', 'data', 'direction', 'visibility', 'sky', 'temp', 'pressure'];

    const updateState = (name, value) => {
        setState(prev => ({ ...prev, [name]: value }));
    }
    // ADD ROW TO THE TABLE

    const handleDeleteButton = (code) => {
        let index;
        let filterdState = [...state.stationDetail];
        filterdState.forEach((e, i) => {
            if (e.code === code)
                index = i;
        });
        filterdState.splice(index, 1);
        console.log(filterdState);
        updateState('stationDetail', [...filterdState]);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        updateState('open', false);
    }

    const modifyResponse = (res) => {
        const detailObj = {};
        const data = res.data.replace(/\n/g, " ");
        data.split(" ").map((e, i) => {
            detailObj[fields[i]] = e;
        })
        console.log(detailObj)
        return detailObj;
    }

    useEffect(() => {
        axios.get(`https://www.attendancebot.com/kik/data/observations/metar/stations/${code}/`)
            .then(res => {
                const modifiedResponse = modifyResponse(res);
                updateState('stationDetail', [...state.stationDetail, modifiedResponse]);
            })
            .catch(err => {
                updateState('open', true)
            }, []);
    }, [code])


    return (
        <div>
            <NavBar setCode={setCode} />
            <Typography variant="h6" component="h6" guttorBottom style={{ margin: "2% 0 0 1rem", fontWeight: "bold" }}>Recent Search</Typography>
            <StationTableView stationDetail={[...state.stationDetail]} handleDeleteButton={handleDeleteButton} />
            <Snackbar open={state.open} handleClose={handleClose} message={state.message} />
            <BarGraph stationDetail={[...state.stationDetail]} handleDeleteButton={handleDeleteButton} />
        </div >
    )
}