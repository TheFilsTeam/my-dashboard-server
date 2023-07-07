# Focus Dashboard APIs

Backend/REST Apis code for the [Focus Dashboard website](https://fils-dashboard.netlify.app/)

Built with Express (Nodejs) & MongoDB.

## Development

1. (Fork &) Clone this project and the [Frontend one](https://github.com/TheFilsTeam/my-dashboard-client)
2. From project directory, restore the node dependencies: `npm i`
3.  create a .env file with the following environment variables

    * `ORIGIN`, with the location of your frontend app (example, `ORIGIN=https://mycoolapp.netlify.com` or `ORIGIN=http://localhost:3000` for development)
    * `TOKEN_SECRET`: used to sign auth tokens (example, `TOKEN_SECRET=this_is_my_very_secret_token`)
    
4. Run it: `npm run dev` (and run the front-end apis also)

### Demo

A demo of the REST API can be found here: [here](https://mydashboard.adaptable.app/)
