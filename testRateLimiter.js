import axios from "axios";

const url = "http://localhost:5000/api/testing"

const numberOfRequests = 50;

const apiKey = "";

const makeRequest = async () => {
    try {
        const response = await axios.post(url,{
            headers:{
                'x-api-key':apiKey
            }
        });
        console.log("Status: ",response.status);
    } catch (error) {
        if (error.response) {
            console.log('Status:', error.response.status, '| Message:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
    }
}

const testRateLimiter = async() => {
    const requests =[];
    for(let i=0;i<numberOfRequests;i++) {
        requests.push(makeRequest());
    }
    await Promise.all(requests);
    console.log(`${numberOfRequests} are completed`);
}

testRateLimiter();