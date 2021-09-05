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

import {Line} from 'react-chartjs-2';



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

    const closeData = useSelector(store => store.closeDataReducer);
    
    const labelArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
    const createLabels = () => {
        let emptyLabel = [];
        for (let i = 0; i < closeData.length; i++) {
            emptyLabel.push(i+1);
        };
        return emptyLabel;
    };

    const ctx = {
        labels: createLabels(),
        datasets: [
            {
                label: 'Closing Price',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: closeData,
            }
        ]
    }


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
        axios.get('/api/search', {params: {symbol: search}})
            .then(response => {
                dispatch({
                    type: 'SET_CLOSE_DATA',
                    payload: response.data.c,
                })
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
                                <li>High Price of the Day: ${searchResult.h}</li>
                                <li>Low Price of the Day: ${searchResult.l}</li>
                                <li>Open Price: ${searchResult.l}</li>
                                <li>Previous Close: ${searchResult.pc}</li>
                                <li>
                                    <Line
                                        data={ctx}
                                        options={{
                                            title:{
                                                display:true,
                                                text:'Closing Prices for last week',
                                                fontSize: 20
                                            },
                                            legend:{
                                                display: true,
                                                position:'right'
                                            }
                                        }}
                                    />
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Container>
        </div>
        </>
    )
}