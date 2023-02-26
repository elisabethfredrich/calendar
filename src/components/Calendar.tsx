import type { FC } from 'react'
import { useState, useEffect, useContext } from 'react'
import { Box, Button, Grid, GridItem, IconButton, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {getYear, getDay, subDays, addDays, addMonths, format} from 'date-fns';
import Day from "./Day"
import { Context } from './Context';
import Events from './Events';

const Calendar: FC = () => {

    const [monthState, setMonthState] = useState<Date[]>([]);
    const [todaysEvents, setTodaysEvents] = useState<string[]>([]);
    const context = useContext(Context);  

    //set calendar to current month on first render
    useEffect(() => {
      setMonthArray(new Date());
    }, []);

    //create an array of the dates of the current month
    const setMonthArray = (date:Date) => {
      const firstDayOfMonth:Date = new Date(date.getFullYear(), date.getMonth(),1);
      const firstMonday:Date = subDays(firstDayOfMonth, getDay(firstDayOfMonth)===0 ? 6 : getDay(firstDayOfMonth)-1);

        let day:Date = firstMonday;
        let dateArray:Date[]=[];
        let num:number = 0;

        while(num<42){
            dateArray.push(day);
            day = addDays(day, 1);
            num++;
        };
        context.month=date;
        setMonthState(dateArray);
        if(format(date, 'MM/dd/yyyy')===format(new Date(), 'MM/dd/yyyy')){
          context.selected= date;
          context.currentEvents=todaysEvents;
        }
        };

        const selectDate = (date:Date, events:string[]) => {
          context.selected = date;
          context.currentEvents = events;
          if(format(date, 'MM/dd/yyyy')===format(new Date(), 'MM/dd/yyyy')){
            setTodaysEvents(events);
          }
          setMonthArray(date);
        }



  return (
    <Box  w='500px'  h='100%' borderRadius='13px' boxShadow='0 0 99px 0px rgba(0, 0, 0, 0.04)' mb='10' display='flex' flexDirection='column'>

    <Box  w='500px' bg='white' h='400px' borderRadius='13px' boxShadow='0 0 99px 0px rgba(0, 0, 0, 0.04)' mb='10' display='flex' paddingTop='20px' overflow='hidden'>

      <Grid templateRows='1fr 5fr' w='100%' h='100%' alignItems='end'>
      
        <Box display='flex' flexDirection='row' justifyContent='space-between' paddingLeft='20px' paddingRight='20px' alignSelf='start'>

          {/* Month & Year */}
          <Text color='#565656' fontSize='1.3em'><Text as='span' fontWeight='900'>{context.month.toLocaleString('default', {month:'long'})}</Text> {getYear(context.month)}</Text>

          {/* Navigation */}            
            <Box  display= 'flex' flex-direction='row' align-items='center'>   
              <IconButton className='icon-button' onClick={() => setMonthArray(addMonths(context.month, -1))} aria-label='previous month' icon={<ChevronLeftIcon/>}/>
              <Button borderRadius='md' bgColor='rgba(255, 0, 0, 0.0)' color='#AF69FA' fontSize='1em' onClick={() => setMonthArray(new Date())}>Today</Button>
              <IconButton className='icon-button' aria-label='next month' icon={<ChevronRightIcon/>} onClick={() => setMonthArray(addMonths(context.month,1))}/>
            </Box>
        </Box>
        
         {/* Calendar grid */}   
        <Grid templateRows='repeat(7, 1fr)' templateColumns='repeat(7, 1fr)' autoFlow='row' w='100%' h='100%' alignContent='end'>
          <GridItem className='weekday'>Mo</GridItem>
          <GridItem className='weekday'>Tu</GridItem>
          <GridItem className='weekday'>We</GridItem>
          <GridItem className='weekday'>Th</GridItem>
          <GridItem className='weekday'>Fr</GridItem>
          <GridItem className='weekday'>Sa</GridItem>
          <GridItem className='weekday'>Su</GridItem>

          {monthState.map((day)=>(<Day key={monthState.indexOf(day)} date={day} selectDate={selectDate}/>))}  
        </Grid>
      </Grid>
    </Box>
      <Events/>
    </Box>
  )
}

export default Calendar