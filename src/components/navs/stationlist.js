import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ITEM_HEIGHT = 48;

export default function StationList({ setCode }) {
    const classes = useStyles();

    const initialState = {
        stationsList: [],
    };
    const [state, setState] = useState(initialState);


    useEffect(() => {
        axios.get('https://demo5481669.mockable.io/stations/')
            .then(res => {
                setState(prev => ({ ...prev, stationsList: [...res.data.codes.slice(0, 30)] }))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ArrowDropDownCircleIcon />}
                onClick={handleClick}
            >
                Station List
            </Button>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {state.stationsList.map(code => (
                    <MenuItem onClick={() => setCode(code)}>
                        {code}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
