import React from 'react'
import {alpha, createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles"
import { CssBaseline } from '@mui/material'
import customizeComponents from './customizations';


const PRIMARY={
    light:"#4CC417",
    main:"#41A317",
    dark:"#347C2C",
    contrastText:"#FFF",
};
const SECONDARY={
    light:"	#4EE2EC",
    main:"	#3EA99F",
    dark:"	#3B9C9C",
    contrastText:"#FFF",
};
const SUCCESS={
    light:"	#7CFC00",
    main:"	#00FF00",
    dark:"#32CD32",
    contrastText:"#FFF",
};
const GREY={
    0:"#FFFFFF",
    100:"#F9FAFB",
    200:"#F4F6F8",
    300:"#DFE3E8",
    400:"#C4CDD5",
    500:"#919EAB",
    600:"#637381",
    700:"#454F5B",
    800:"#212B36",
    900:"#161C24",
    500_8:alpha("#919EAB",0.08),
    500_12:alpha("#919EAB",0.12),
    500_16:alpha("#919EAB",0.16),
    500_24:alpha("#919EAB",0.24),
    500_32:alpha("#919EAB",0.32),
    500_48:alpha("#919EAB",0.48),
    500_56:alpha("#919EAB",0.56),
    500_80:alpha("#919EAB",0.80),
}


function ThemeProvider({children}){
    const themeOptions={
        palette:{
           primary:PRIMARY,
           secondary:SECONDARY,
           success:SUCCESS,
           text:{primary:GREY[800],secondary:GREY[600],disabled:GREY[500]},
           background:{paper:"#fff",default:"#fff",neutral:GREY[200]},
           action:{
            active:GREY[600],
            hover:GREY[500_8],
            selected:GREY[500_16],
            disabled:GREY[500_80],
            focus:GREY[500_24],
            hoverOpacity:0.08,
            disableOpacity:0.48
           }
        },
        shape:{borderRadius:8},
    }
    const theme=createTheme(themeOptions);
    theme.components=customizeComponents(theme)

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </MuiThemeProvider>
    )
}
export default ThemeProvider;