import redis from 'redis';

const client = redis.createClient();

const rateLimiter = (req,res,next) => {
    const apiKey = req.header('x-api-key');
    if(!apiKey){
        return res.status(401).json({message:"Unauthorized"});
    }
    const requestsKey = `rate-limit:$(apiKey)`;

    client.get(requestsKey,(err,requests)=>{
        if(err) throw err;
        if(requests === null){
            client.setEx(requestsKey,3600,1);
            next();
        } else if( parseInt(requests) < 100) {
            client.INCR(requestsKey);
            next();
        } else {
            return res.status(429).json({message:"Too many requests"});
        }
    })
}
export default rateLimiter;