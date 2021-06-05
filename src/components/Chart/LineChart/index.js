import HighchartsReact from 'highcharts-react-official'
import Highchart from 'highcharts'
import React, {useState,useEffect} from 'react'
import moment from 'moment';
import { ButtonGroup, Button } from '@material-ui/core';

const generateOptions = (data) => {
    const categories = data.map(item => moment(item.Date).format('DD/MM'));
    return {
    chart: {
        height: 500,
      },
      title: {
        text: 'Tổng số ca nhiễm',
      },
      xAxis: {
        categories: categories,
        crosshair: true,
      },
      colors: ['#F3585B'],
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        labels: {
          align: 'right',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Tổng Ca nhiễm',
          data: data.map((item) => item.Confirmed),
        },
      ],
    };
    }

const LineChart = ({data})=> {
    const [options, setOptions] = useState({})
    const [reportType, setReportType] = useState('all')

    useEffect(() => {
        let customData = [];
        console.log(reportType);
        switch (reportType) {
            case 'all':
                customData = data;
                break;
            case '30':
                customData = data.slice(data.length - 30);
                break;
            case '7':
                customData = data.slice(data.length - 7);
                break;
            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData)) 
    }, [data,reportType])
    return (
        <div>
            <ButtonGroup style={{display:'flex', justifyContent: 'flex-end'}}>
                <Button color={reportType === 'all' ? 'secondary' : ''} onClick={() => setReportType('all')}>All</Button>
                <Button color={reportType === '30' ? 'secondary' : ''} onClick={() => setReportType('30')}>Last 30 days</Button>
                <Button color={reportType === '7' ? 'secondary' : ''} onClick={() => setReportType('7')}>Last 7 days</Button>
            </ButtonGroup>
            <HighchartsReact highchart={Highchart} options={options}/>
        </div>
    )
}

export default React.memo(LineChart);
