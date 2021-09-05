import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, makeStyles, Button } from '@material-ui/core';

import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

export default function Search() {
    const dispatch = useDispatch();
    let [search, setSearch] = useState('');
    const classes = useStyles();
    const searchResult = useSelector(store => store.searchReducer);
    const [candle, setCandle] = useState('');


    const searchOnClick = () => {
        axios.post('/api/search', {data: search})
            .then(response => {
                dispatch({
                    type: 'SET_SEARCH_RESULTS',
                    payload: response.data,
                });
                getCandleGraph();
            })
            .catch(err => {
                console.error(err);
            })
    }

    const getCandleGraph = () => {
        axios.get('/api/search')
            .then(response => {
                setCandle(response.data);
                console.log('candle', candle);
            })
            .catch(err => {
                console.error(err);
            });
    }
    

    return (
        <>
        <div>
            <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '170vh'}}>
                <h1>Search</h1>
                <form className={classes.root} noValidate autoComplete="off" onChange={(event) => setSearch(event.target.value)}>
                    <TextField id="standard-basic" label="Search" /> 
                </form>
                <Button variant="contained" color="primary" onClick={searchOnClick}>Submit</Button>
                <div className="gifDisplay">
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography className={classes.heading}>{search} Current Price: ${searchResult.c} Day Change: {searchResult.dp > 0 ? <>&#x27B6; {searchResult.dp}</> : <>&#x27B4; {searchResult.dp}</>}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {/* <li>Change: ${searchResult.d}</li> */}
                                <li>High Price of Day: ${searchResult.h}</li>
                                <li>Low Price of Day: ${searchResult.l}</li>
                                <li>Open Price: ${searchResult.l}</li>
                                <li>Previous Close: ${searchResult.pc}</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Container>
        </div>
        </>
    )
}