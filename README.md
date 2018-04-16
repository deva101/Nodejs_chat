## Title
NodeJS Chat and Scheduled Messages

### Summary
It includes features real time chat and scheduled messages


## Built With

* Linux 14.04.5
* Nodejs
* Express
* MongoDB Driver and Mongoose
* Socket.io
* Semantic UI
* Jquery 2.2.3
* CodeIgniter 3.1.5

### Running the service

To run the service make sure to have nodejs, npm and appropriate mongodb driver.

run npm install to install the dependencies


### files 

routes & backend logic
```
routes/auth.js for authentication
routes/users.js for user logic
```
models
```
models/conversations.js schema for conversations
models/user.js schema for user
models/schedule.js schema for storing future scheduled messages

```
configuration
```
config/passport.js passport for authentication
config/chat.js socket connection and function
config/cron.js cron for running a task for every 20 seconds
config/database.js database
```

view
```
views/login.ejs 
views/register.ejs
views/home.ejs homepage showing all chatrooms
views/chat.ejs page for real time chat in a chatroom
