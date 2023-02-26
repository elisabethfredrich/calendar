import "./style.css";
import { Box, Center } from "@chakra-ui/react"
import Calendar from "./components/Calendar"
import { Context } from "./components/Context"


function App() {
  
  return (
    <Box bg='#F4F4F4' w='100%' h='100vh' p='10'>
      <Center>
        <Box>   
          <Context.Provider value={{month: new Date(), selected: new Date(), currentEvents: [],}}>
            <Calendar/>
          </Context.Provider>
        </Box>
      </Center>
    </Box>
  );
}
export default App;

