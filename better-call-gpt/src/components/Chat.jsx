import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';

export function Chat() {
    const [text, setText] = useState("");
    const [sendTextBubbles, setSendTextBubble] = useState([]);
    const [recieveTextBubbles, setReceiveTextBubble] = useState([]);

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (text) {
            setSendTextBubble([...sendTextBubbles, text]);
            console.log(sendTextBubbles);
            setText("");

        }
    };

    useEffect(() => {
        let tempBubbles = [];

        sendTextBubbles.map((textBubble, index) => {
            if (index % 2 === 0) {
                tempBubbles.push(
                    <div className='grid grid-cols-2 content-end my-7 mx-4'>
                        <div key={index} className='w-full rounded bg-yellow-400 col-end-3 px-3 py-2 mx-2'>
                            <span className='font-mono'>{textBubble}</span>
                        </div>
                        <div className='w-full rounded transparent '>
                        </div>
                    </div>

                )
            }
            else {
                tempBubbles.push(
                    <div className='grid grid-cols-2 my-7 mx-2'>
                        <div key={index} className='w-full rounded bg-yellow-400 col-start-1 px-3 py-2 mx-2'>
                            <span className='font-mono'>{textBubble}</span>
                        </div>
                        <div className='w-full rounded transparent float-right'>
                        </div>
                    </div>
                )
            }

        })

        setReceiveTextBubble(tempBubbles);
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
            <Grid className='scrollbar-thin scrollbar-track-zinc-900' item xl={12} lg={12} md={12} sm={12} xs={12} style={{ width: "100%", maxHeight: "83vh", overflowY: "scroll" }}>
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
                                <SendIcon />
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

