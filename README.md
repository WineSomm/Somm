# SOMM-Legacy

A wine exploration application that allows the user to search for and favorite wines, find wines online, get food pairings based on food or wine preferences, chat with others about wine, and find local wine stores based on location.

### Demo for this app is available at: https://wine-somm.herokuapp.com

## Stack 

* AngularJS: https://angularjs.org
* Node.js: http://nodejs.org/
* Express.js: http://expressjs.com/
* Moongoose.js (for MongoDB interaction): http://mongoosejs.com/


## Prerequisites  

```
Download node.js if you have not already http://nodejs.org/. You can confirm that node is successfully installed on your machine by opening up Terminal and typing 'node'. If you don't get an error, it's installed! You can exit the node process with Ctrl+c.
```

### Once you are in the code, run npm install to get all required libraries.
```
npm install
```
### You will need to create a MongoDB and link it in the server.js file. 
```
app.db = mongoose.connect(<Your MongoDB DB here>);
```
### You will need the following API keys:
```
  * Snooth
  * Edamam
  * eBay
  * Google Maps
  * Google Places
```
# Getting started with your local development server  

### Starting the Server

We're ready to go! 
```
node server.js  // This will run locally and will need to be restarted on change
```
You can stop the server with Ctrl+c.

However, a slight annoyance here is that every time you change your code, you'll need to stop and restart your server.


A better option is to auto restart your server after you make some changes to your code. To do this, install Nodemon. Nodemon will watch your files and restart the server for you whenever your code changes.

Install Nodemon (you only need to do this once, and then it will be installed globally on your machine). In Terminal type,
```
npm install --save nodemon
```
Then, you can start the app with:
```
npm run dev  // Defined in package.json
```
Open web browser to http://localhost:9000 to view the web app.

Stop the web server press Ctrl+c in the Terminal window.

## Authors

* Matthew Reid - (https://github.com/MatthewCReid)

* Athena Turek - (https://github.com/athenaturek)

* Senai Ayalew - (https://github.com/SenaiAlayew)
