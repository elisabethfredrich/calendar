import type { FC } from 'react'
import {useContext } from 'react'
import { Grid, Box, IconButton, Text } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons';
import { Context } from './Context'



type Props = {
  event: string,
  updateHandler: (event:string[]) => void
}

const Event: FC<Props> = ({event, updateHandler}) => {
  const context = useContext(Context);  

  const deleteEvent = () => {
    context.currentEvents.splice(context.currentEvents.indexOf(event),1);
    updateHandler([]);
  }

  return (
    <Box bgColor='white' padding='10px' h='70px' borderRadius='13px' marginTop='10px' display='flex' alignContent='center' paddingLeft='20px'>
      <Grid w='100%' templateColumns='6.8fr 1fr' alignItems='center' marginLeft='5px'>
        <Text>{event}</Text>
        <Box>
        <IconButton className='delete-button' bgColor='#d3d3d3' aria-label='delete event' icon={<SmallCloseIcon/>} onClick={() => deleteEvent()}/>
        </Box>
      </Grid>

    </Box>
  )
}

export default Event