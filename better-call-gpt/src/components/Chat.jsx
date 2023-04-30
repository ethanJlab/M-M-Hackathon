import { useState, useEffect } from 'react';
import { Button, TextField, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import { askSaul } from './apiHelper';
import SaulGoodman from '../images/Saul_Goodman.jpg'

export function Chat() {
    const [text, setText] = useState("");
    const [sendTextBubbles, setSendTextBubble] = useState([]);
    const [recieveTextBubbles, setReceiveTextBubble] = useState([]);
    const [responseText, setResponseText] = useState("");


    const handleTextSubmit = async (e) => {
        e.preventDefault();
        if (text) {
            console.log(text);

            setSendTextBubble([...sendTextBubbles, text]);
            setText("");

            console.log("First sendText", sendTextBubbles);
            const response = await askSaul(text).then((response) => {

                return response.data;
            });
            setResponseText(response);

            // setSendTextBubble([...sendTextBubbles, response]);
            console.log("Second sendText", sendTextBubbles);


            //given the text lets set up a query to the legal bot

        }
    };
    useEffect(() => {
        if (responseText !== "") {
            setSendTextBubble([...sendTextBubbles, responseText])
        }
    }, [responseText]);

    useEffect(() => {
        // console.log("bing");
        let tempBubbles = [];

        sendTextBubbles.map((textBubble, index) => {
            if (index % 2 === 0) {
                tempBubbles.push(
                    <div key={index} className='grid grid-cols-2 content-end my-7 mx-4'>
                        <div className='w-full rounded bg-yellow-400 col-end-3 px-3 py-2 mx-2'>

                            <span className='font-mono'>{textBubble}</span>
                        </div>
                        <div className='w-full rounded transparent '>
                        </div>
                    </div>

                )
            }
            else {
                tempBubbles.push(
                    <div key={index} className='grid grid-cols-2 my-7 mx-2'>
                        <div className='w-full rounded bg-yellow-400 col-start-1 px-3 py-2 mx-2 flex'>
                            <Avatar className='mt-2 border-black' alt='Saul Goodman' src={SaulGoodman} />
                            <span className='font-mono pl-5'>{textBubble}</span>
                        </div>
                        <div className='w-full rounded transparent float-right'>
                        </div>
                    </div>
                )
            }

        })

        setReceiveTextBubble(tempBubbles);

        // console.log("Updated sendTextBubbles", sendTextBubbles);
    }, [sendTextBubbles]);

    return (
        // <div className='w-full h-96 grid grid-rows-2 content-end'>
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            style={{ position: 'fixed', bottom: '0', width: '75%', paddingRight: "8px", paddingLeft: "8px", paddingBottom: "8px" }}
        >
            <Grid className='scrollbar-thin scrollbar-thumb-zinc-900' item xl={12} lg={12} md={12} sm={12} xs={12} style={{ width: "100%", maxHeight: "83vh", overflowY: "scroll" }}>
                {recieveTextBubbles}
            </Grid>

            {/* <div className='flex justify-center content-center'>
            //     <div className="w-11/12 h-12 rounded-lg bg-white"> */}
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ width: "100%" }}>


                <TextField placeholder="Ask a question about the case!" value={text} className='w-full' onChange={(e) => setText(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleTextSubmit(event);
                        }
                    }}

                    InputProps={{
                        endAdornment: (
                            <Button onClick={handleTextSubmit}>
                                <SendIcon className='text-black' />
                            </Button>
                        ),
                    }}>

                </TextField>
            </Grid>

            {/* //         </div> */}
            {/* //     </div> */}

            {/* // </div> */}
        </Grid>
    );
}

