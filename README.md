# CSF Day 26 Lecture

## Proxying to Spring Boot backend
1. Create a config file
    ```js
    module.exports = [
    {
        context: ['/api'], // or /api/**
        target: 'http://localhost:8080',
        secure: false
    }
    ]
    ```

2. Run the angular frontend with `ng serve --proxy-config proxy-config.js`.


If you try to access the endpoint /api, it will be routed to springboot at http://localhost:8080. 



This is only one sub-level down (e.g. /api/user, not /api/path/user). 

This will bypass the CORS validation. 

Refer to: [Proxy API requests to another server](https://stackoverflow.com/questions/37172928/how-to-proxy-api-requests-to-another-server)


## Building
1. `ng build`
2. Copy everything in the /dist/frontend folder, and move it to the static folder in the server backend.