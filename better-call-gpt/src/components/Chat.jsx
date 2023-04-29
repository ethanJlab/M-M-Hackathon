import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export function Chat()
{
    const [text, setText] = useState("");
    const [sendTextBubbles, setSendTextBubble] = useState([]);
    const [recieveTextBubbles, setReceiveTextBubble] = useState([]);

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (text) 
        {
            setSendTextBubble([...sendTextBubbles, text]);
            console.log(sendTextBubbles);
            setText("");
            
        }
    };

    useEffect(() => {
        let tempBubbles = [];

        sendTextBubbles.map((textBubble, index) => {
            if (index % 2 == 0)
            {
                tempBubbles.push(
                    <div>
                        <div key={index} className='w-1/2 h-10 rounded bg-violet-500 float-right'>
                            <span>{textBubble}</span>
                        </div>
                        <div className='w-1/2 h-10 rounded transparent float-left'>
                        </div>
                    </div>
                    
                )
            }
            else
            {
                tempBubbles.push(
                    <div>
                        <div key={index} className='w-1/2 h-10 rounded bg-violet-500 float-left'>
                            <span>{textBubble}</span>
                        </div>
                        <div className='w-1/2 h-10 rounded transparent float-right'>
                        </div>
                    </div>
                )
            }
            
        })

        setReceiveTextBubble(tempBubbles);
    }, [sendTextBubbles]);

    return (
        <div className='w-3/4 h-80 bg-gray-400 content-end rounded'>
            {recieveTextBubbles}

            <div className="flex justify-center content-center w-full h-12 rounded-lg bg-white">
                {/* <form onSubmit={handleTextSubmit} className='w-11/12'>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Ask a question about the case!'
                        className="w-full h-4/5 rounded-xl"/>
                    <button type='submit'><SendIcon/></button>
                </form> */}
                <TextField placeholder="Ask a question about the case!" value={text} className='w-full' onChange={(e) => setText(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleTextSubmit(event);
                        }
                      }}
                      
                    InputProps={{
                        endAdornment: (
                            <Button onClick={handleTextSubmit}>
                                <SendIcon/>
                            </Button>
                        ),
                    }}>
                    
                </TextField>
                
            </div>
        </div>
    );
}

