import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@mui/material/ListItemText";
import InputBase from '@mui/material/InputBase';

// data from https://www.mongodb.com/docs/atlas/atlas-search/highlighting/
const fakeSearchResults = [{
  "description" : "Bananas are usually sold in bunches of five or six. ",
  "highlights" : [
    {
      "path" : "description",
      "texts" : [
        {
          "value" : "Bananas are usually sold in ",
          "type" : "text"
        },
        {
          "value" : "bunches",
          "type" : "hit"
        },
        {
          "value" : " of five or six. ",
          "type" : "text"
        }
      ],
      "score" : 1.2841906547546387
    }
  ]
},
{
  "description" : "Bosc and Bartlett are the most common varieties of pears.",
    "highlights" : [
  {
    "path" : "description",
    "texts" : [
      {
        "value" : "Bosc and Bartlett are the most common ",
        "type" : "text"
      },
      {
        "value" : "varieties",
        "type" : "hit"
      },
      {
        "value" : " of pears.",
        "type" : "text"
      }
    ],
    "score" : 1.2691514492034912
  }
]
},
{
  "description" : "Apples come in several varieties, including Fuji, Granny Smith, and Honeycrisp. The most popular varieties are McIntosh, Gala, and Granny Smith. ",
    "highlights" : [
  {
    "path" : "description",
    "texts" : [
      {
        "value" : "Apples come in several ",
        "type" : "text"
      },
      {
        "value" : "varieties",
        "type" : "hit"
      },
      {
        "value" : ", including Fuji, Granny Smith, and Honeycrisp. ",
        "type" : "text"
      }
    ],
    "score" : 1.0330637693405151
  },
  {
    "path" : "description",
    "texts" : [
      {
        "value" : "The most popular ",
        "type" : "text"
      },
      {
        "value" : "varieties",
        "type" : "hit"
      },
      {
        "value" : " are McIntosh, Gala, and Granny Smith. ",
        "type" : "text"
      }
    ],
    "score" : 1.0940992832183838
  },
]
}]


const style = {
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 5,
  height: 600
};

export default function SearchModal() {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
      <>
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={() => setOpen(true)}
          style={{
            textTransform: 'none',
            borderRadius: "10px"
          }}
          color="success"
          size="large"
        >
          Search...
        </Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              paddingTop: '10%',
            }}
            BackdropProps={{
              style:{
                opacity: 0.5
              }
            }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
            }}
            sx={style}
          >
            <InputBase
                placeholder="Search..."
                startAdornment={
                  <IconButton disabled={true} >
                    <SearchIcon fontSize={"large"} color={"success"}/>
                  </IconButton>
                }
                style={{
                  width: "100%",
                  borderBottom: "0.5px solid gray",
                  padding: "15px",
                  fontSize: "18px"
                }}
            />

            <List
                component="nav"
                style={{
                  width: "95%"
                }}
            >
              {
                fakeSearchResults.map((searchResult, idx) =>{
                  return (
                      <ListItemButton
                          onClick={() => {}}
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            backgroundColor: selected === idx ? "#92D293" : ""
                          }}
                          onMouseOver={() => setSelected(idx)}
                      >
                        {
                          searchResult.highlights.map((highlight) => {

                            return (
                                <ListItemText>
                                  <>
                                    {
                                      highlight.texts.map((text) => {

                                        if (text.type === "hit") {
                                          return (
                                              <b>
                                                {text.value}
                                              </b>
                                          )
                                        }

                                        return (
                                            <>
                                              {text.value}
                                            </>
                                        )
                                      })
                                    }
                                  </>
                                </ListItemText>

                                )})
                        }

                      </ListItemButton>
                  )
                })
              }
            </List>

          </Box>
        </Modal>
      </>
  )

}