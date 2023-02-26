import { extendTheme } from "@chakra-ui/react";
import "@fontsource/noto-sans";

const theme = extendTheme( {
    fonts:{
        body: 'Noto Sans',
    },
    components:{
        Button:{
            baseStyle:{
                borderRadius: '100%',
                marginLeft: '10px',
            },

    
        variants:{
            outline:{
                borderRadius: '100%',
            },
            solid:{
                bg: '#AF69FA',
                color: 'white',
               
            },
        },
        defaultProps:{
            size: 'sm',
        },
    },
    
}})

export default theme

