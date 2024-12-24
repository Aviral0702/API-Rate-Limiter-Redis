import { createClient } from 'redis';
//configuring the redis client 
const redisClient = createClient({
    url: 'redis://redis:6379'
  });

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();

const rateLimiter = async (req, res, next) => {
    //getting the api key from the user in the headers
    const apiKey = req.header('x-api-key');
    if (!apiKey) {
        console.log("No API key provided");
        return res.status(401).json({ message: "Unauthorized" });
    }
    //making the requestsKey
    const requestsKey = `rate-limit:${apiKey}`;

    try {
        let requests = await redisClient.get(requestsKey);
        if (requests === null) {
            //when there is first request from the user
            await redisClient.setEx(requestsKey, 3600, '1');
            console.log("First request from this key, setting it to 1");
            next();
        } else {
            requests = parseInt(requests);
            //parsing the requests into integer 
            if (requests < 100) {
                //As redis accepts the argument in string type we need to convert the argument into a string type
                //we are manually increasing the number of requests for a user
                await redisClient.INCR(requestsKey, (requests + 1).toString());
                console.log("Incrementing request count:", requests + 1);
                next();
            } else {
                console.log("Rate limit exceeded");
                return res.status(429).json({ message: "Too many requests" });
            }
        }
    } catch (err) {
        console.error('Redis error:', err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { rateLimiter, redisClient };