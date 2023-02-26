import type { FC } from 'react'
import { useEffect, useState, useContext } from 'react';
import {Box, GridItem, Link } from '@chakra-ui/react';
import { getDate, getMonth, format } from 'date-fns';
import { Context } from './Context';


type Props = {
  date: Date;
  selectDate: (date:Date, events:string[]) => void;
}  

const Day: FC<Props> = ({date, selectDate}) => {


    const [events, setEvents] = useState<string[]>([]);
    const context = useContext(Context);  

   

    //updating events from context if this day is currently selected
    useEffect(() => {
      if(format(context.selected, 'MM/dd/yyyy')===format(date, 'MM/dd/yyyy')){
      setEvents(context.currentEvents);
      
    
    }
    },[context.currentEvents]);


  return (
    <GridItem className={`day ${format(date, 'MM/dd/yyyy')===(format(context.selected, 'MM/dd/yyyy'))? "currentdate" : ""} 
                              ${getMonth(date)===getMonth(context.month) ? "" : "otherMonth"}`}>
      <Link h='100%' w='100%' className='link' display='flex' alignItems='flex-end' onClick={() => selectDate(date,events)}>
        <Box w='83%' textAlign='end' paddingBottom='3px'>{getDate(date)}.</Box>
      </Link>
    </GridItem>

  )
}

export default Day