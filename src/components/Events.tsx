import type { FC } from 'react'
import {useState, useContext, useEffect } from 'react'
import {getDate} from 'date-fns';
import { Box, Input, Text, FormControl, FormErrorMessage, IconButton, Grid } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import { Context } from './Context'
import Event from './Event'



  const Events: FC = () => {
  const context = useContext(Context);
  const [input, setInput] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const handleInputChange = (e:any) => {setInput(e.target.value); setFormErrors("")};
  const [, setEvents] = useState<string[]>([]);
   
  
  // if user inputs an event, it gets saved in the context 
  const handleSubmit = (e:any) => {
    e.preventDefault();
    let error = "";
    if (!input) {
      error = "Field cannot be empty";
    }
    else if (error===""){
    context.currentEvents.splice(context.currentEvents.length,0,input);

  }
  setFormErrors(error);
  setInput("");
  };

   useEffect(() => {
    setFormErrors("");
  },[context.selected]); 


  return (
    <Box >
      <Text fontSize='1.5em' paddingLeft='10px' color='#565656'>{context.selected.toLocaleString('default', {month:'long'}) + " " + getDate(context.selected)}</Text>

      <Box bgColor='white' padding='10px' minHeight='70px' borderRadius='13px' marginTop='10px' display='flex' alignItems='center'>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={formErrors!==''}>
            {/* Input field for a new event and add-button */}
            <Grid w='100%' templateColumns='10fr 1fr'>
              <Input type='text' value={input} onChange={handleInputChange} minHeight='40px'  placeholder='Add new event' />      
              <IconButton className='icon-button' type='submit' aria-label='add event' alignSelf='center' icon={<AddIcon/>}/>
            </Grid>
            {/* If the field is empty on submit, an error message is shown */}
            <FormErrorMessage>{formErrors}</FormErrorMessage>
          </FormControl>
        </form>
      </Box>

      {/* Events scheduled for the same day are shoen here */}
      {context.currentEvents.map((event)=>(<Event key={context.currentEvents.indexOf(event)} event={event} updateHandler={setEvents}/>))}
    </Box>
  )
}

export default Events