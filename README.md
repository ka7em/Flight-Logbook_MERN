# Flight-Logbook_MERN
 
This App allows commercial pilots to record their flight data in a webapp instead of traditional flight logbook.
 
For proper functioning of this app, you are required to create a .env file in your the project's root folder and server folder
then, inside .env file, specify the port for running server side (default is PORT is set to 3000). And then enter your google maps API key and MongoDB connection string.


here is an example of text inside your .env file 




TOKEN_SECRET="alpha"

PORT=3000

DATABASE='your mongoDB atlas connection string here. Get details from https://www.mongodb.com/docs/guides/atlas/connection-string/'

REACT_APP_GOOGLE_MAPS_API_KEY='google map API key here. Get details from https://developers.google.com/maps/documentation/javascript/get-api-key'



That's it, save all and run server with the command ts-node server.ts 

& client with npm start ! thats it!!
