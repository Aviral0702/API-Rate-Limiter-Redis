# API Rate Limiter

A simple API rate limiter built using Node.js and Redis. This rate limiter controls the number of API requests a user can make within a specified time frame. It's useful for protecting your server from being overwhelmed by excessive requests.

## Features

- Limit the number of requests based on a specified time window.
- Uses Redis for fast, efficient request counting.
- Supports API key-based rate limiting via request headers.
- Easily configurable rate limits.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later recommended)
- [Redis](https://redis.io/) (running locally or in a cloud environment)

## Architecture
![WhatsApp Image 2024-10-19 at 19 14 16_d0f63077](https://github.com/user-attachments/assets/0045bc09-d78d-4f65-82ab-4b31dc34b1e7)


## 1.Installation
```bash
git clone https://www.github.com/Aviral0702/API-Rate-Limiter-Redis.git
cd API RATE-LIMITER
```
#### 2.Install all the dependencies
```bash
npm install
```

#### 3.Configure Redis
Make sure redis is running on Port:6379. If you are using different configuration for redis, update the settings for your redis in the code.

## Usage
#### 1.Start the server
```bash
npm run start
```
This will run the backend server for the application.

#### 2.Use a tool like Postman or cURL to make request to the API
```bash
curl -X POST http://localhost:5000/api/testing 
  -H "x-api-key: your-api-key-here" 
```

#### 3.Testing the rate limit
```bash
for i in {1..100}; do
  curl -X POST http://localhost:5000/api/testing 
    -H "x-api-key: your-api-key-here" 
done
```
Also for the testing purposes I have created a script in the application which is named as `testRateLimiter.js`, in this script you can change the number of request and change the apiKey as per your API Key provided when you registered.
Run `node ./testRateLimiter.js` to run the file. 
Make sure Redis server is up and running.

## Project Structure
```bash
API-RATE-LIMITER/
├── config
  ├── dbconfig.js
├── middleware
  ├── rateLimiter.js
├── models
  ├── userModel.js
├── routes
  ├── apiRoutes.js
  ├── testingAPI.js
├── .env
├── server.js      # Main server file
├── package.json   # Project dependencies
└── README.md      # Project documentation
```

## Features

- [ ] Implement different rate limits for different user roles (e.g., free, premium).
- [ ] Add support for custom rate limit settings via environment variables.
- [ ] Implement IP-based rate limiting as an alternative to API key-based limiting.
- [ ] Add a dashboard for monitoring rate limit statistics and usage metrics.

## Improvements

- [ ] Optimize Redis configuration for better performance in high-traffic scenarios.
- [ ] Add unit tests for the rate limiter to ensure reliability.
- [ ] Handle Redis connection failures gracefully with fallback mechanisms.
- [ ] Improve logging with a proper logging library like `winston` or `morgan`.
- [ ] Refactor code to use TypeScript for better type safety and maintainability.

## Bugs

- [ ] Fix the issue where expired keys are not being cleared immediately.
- [ ] Address cases where rate limiting does not reset properly after the time window.

## Code Cleanup

- [x] Refactor the rate limiter middleware to be more modular.
- [x] Remove any hardcoded values and replace them with configuration options.
- [x] Perform code linting and formatting for consistency.

## Ideas for Future Features

- [ ] Add support for distributed rate limiting across multiple servers.
- [ ] Allow dynamic adjustment of rate limits based on server load.
- [ ] Integrate with a monitoring tool like Prometheus for tracking metrics.
