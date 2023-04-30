import axios from 'axios';


export async function askSaul(question) {

    const apiEndpoint = "http://localhost:9000/vector/query";

    const data = { content: question };

    // fetch(apiEndpoint, {
    //     method: 'POST',
    //     mode: 'no-cors',

    //     body: JSON.stringify(data)
    // })
    //     .then(response => {
    //         // console.log('Response:', response);
    //         // Handle the response here
    //         console.log(":)")
    //     })
    //     .catch(error => {
    //         console.error(":(");
    //         // Handle the error here
    //     });

    const saulGoodman = await axios.post(apiEndpoint, data, {
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            console.log('Response:', response);
            // Handle the response here
            return response
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error here
        });

    return saulGoodman;
}