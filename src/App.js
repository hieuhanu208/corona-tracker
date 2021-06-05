import { getCountries, getReportByCountry } from './apis';
import {useEffect, useState} from 'react';
import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
import sortBy from 'lodash.sortby';

moment.locale('vi');
function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('') 
  const [report, setReport] = useState([])
  useEffect(() => {
    getCountries().then((res) => {
      const countries = sortBy(res.data, 'Country');
      setCountries(countries);
      setSelectedCountry('vn');
    })
  }, [])

  const handleOnChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    if(selectedCountry) {
      console.log(countries);
      const {Slug} = countries.find((country) => country.ISO2.toLowerCase() === selectedCountry);
      
      getReportByCountry(Slug).then((res) => {
      
        res.data.pop();
         setReport(res.data)
      });
    }
  }, [countries, selectedCountry])
  return (
   <Container>
     <Typography variant='h2' component='h2'>
       Số liệu COVID 19
     </Typography>
     <Typography>
       {moment().format('LLL')}
     </Typography>
     <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountry}/>
      <Highlight report={report}/>
      <Summary selectedCountry={selectedCountry} report={report}/>
   </Container>
  );
}

export default App;
