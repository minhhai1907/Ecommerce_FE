function Tabs(theme){
    return {
        MuiTab:{
            styleOverrides:{
                root:{
                    padding:3,
                    fontWeight:600,
                    borderTopLeftRadius:theme.shape.borderRadius,
                    borderTopRightRadius:theme.shape.borderRadius,
                    textTransform:"capitalize",
                    "&.Mui-selected":{
                        color:theme.palette.text.primary,
                    },
                    "&:not[:last-of-type]":{
                        marginRight:theme.spacing(5),
                    },
                    "@media (min-width:600px)":{
                        minWidth:48,
                    },
                },
                labelIcon:{
                    minHeight:48,
                    flexDirection:"row",
                    "& > *:first-of-type":{
                        marginBottom:0,
                        marginRight:theme.spacing(1),
                    },
                },
                wrapper:{
                    flexDirection:"row",
                    whiteSpace:"nowrap",
                },
                textColorInherit:{
                    opacity:1,
                    color:theme.palette.text.secondary,
                },
            },
        },
        MuiTabPanel:{
            styleOverrides:{
                root:{
                    padding:0,
                }
            }
        },
        MuiTabScrollButton:{
            styleOverrides:{
                root:{
                    width:48
                }
            }
        }
    }
}
export default Tabs