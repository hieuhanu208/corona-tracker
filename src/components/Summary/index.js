import { Grid } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import HighMap from '../Chart/HighMap'
import LineChart from '../Chart/LineChart'

export default function Summary({report, selectedCountry}) {
    const [mapData, setMapData] = useState({});
    useEffect(() => {
        if(selectedCountry) {
           import(`@highcharts/map-collection/countries/${selectedCountry}/${selectedCountry}-all.geo.json`).then((res) => setMapData(res));
        }
    }, [selectedCountry])
    return (
        <div style={{ height: '500px', marginTop: 10 }}>
           <Grid container spacing={3}>
                <Grid item sm={8} xs={12}><LineChart data={report}/></Grid>
                <Grid item sm={4} xs={12}>
                    <HighMap mapData= {mapData}/>
                </Grid>
           </Grid>
        </div>
    )
}
