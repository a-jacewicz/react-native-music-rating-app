# React Native Music Rating App

## About the App 

This is code written by Kelleigh Entrekin and Aleks Jacewicz. 
It makes up a mobile phone app consisting of registration and login pages for users to register and log into a music rating app called M, as well as pages only accessible once the user is logged in. These include a "read" page where the user can read all the artist names and song titles of previously written ratings and access a search bar, an "individual" page where all the data for a specific ratings can be seen and where delete and edit icons allow for deletion of the ratings/link to an appropriate page if the user logged in made the given post, a page where a new rating can be submitted, and a page where the existing post can be edited. 
## How to Run the App  
Firstly, to set up the backend, you are going to need to download XAMPP and use MYSQL Database. Once you have this set up, go to http://localhost/phpmyadmin and make a database called `music_db`. Within that database make two datatables, one called `ratings` and the other `users`. To do so, click the SQL tab within `music_db` and input the following SQL queries.

```sql
-- creates users table
CREATE TABLE `music_db`.`users` ( `username` VARCHAR(250) NOT NULL ,
                                  `password` VARCHAR(255) NOT NULL ,
                                  PRIMARY KEY (`username`),
                                  UNIQUE (`username`))
                                  ENGINE = MyISAM;


-- creates ratings table
CREATE TABLE `music_db`.`ratings` ( `id` INT(11) AUTO_INCREMENT NOT NULL,
                                    `username` VARCHAR(250) NOT NULL ,
                                    `artist` VARCHAR(255) NOT NULL ,
                                    `song` VARCHAR(255) NOT NULL ,
                                    `rating` INT(1) NOT NULL ,
                                    PRIMARY KEY (`id`),
                                    FOREIGN KEY (`username`) REFERENCES `user`(`username`))
                                    ENGINE = MyISAM;
```

Once you have your database set up, you will need to download the files found within this repo. Of these files, some are backend and some are frontend. All files you need to run to get access to our app should be found in the main branch. The frontend files can be found in the 'music-app' folder and the backend files can be found in the 'backend' folder. Within this folder there are several other folders, with these folder being called `Model`, `Controller` and `inc`. In addition, one of the backend files (index.php) is directly inside of `backend`. All of the backend files need to be moved to the inside of htdocs, which is inside of XAMPP. When moving them, copy and paste the contents from `backend` (`index.php`, `Model`, `inc`, and `Controller`) directly into your htdocs folder. Note: `backend` should not be in your htdocs folder; only its contents.

To run the app using your local backend, you will need to edit the IP addresses in the url's in the following lines of code: 

> music-app\Components 
> > Register.js -- 55 <br> 
> > Login.js -- 29 <br>
> > Read.js -- 35, 61, 100 <br>
> > Individual.js -- 34, 73 <br>
> > Create.js -- 51 <br>
> > Update.js -- 37 <br>

You will need to add your own IP address and follow the format of the link that is currently there in order for the app to work. For example, inside of handleCreate, you will need to change the code to be "http://YOURIP/index.php/rating/create".

Once you have your files downloaded properly placed and the correct code uncommented, the next thing you will need to do is download various packages to allow the features we added to our app to work. You will perform the code found below in the Packages section of this README in your command line.


At this point, you should be able to run our app! Start Apache and MySQL in XAMPP and start your android emulator using Android Studio, then cd into the frontend 'music-app' code so that you are in music-app. Then type in the command 'npx expo start' and choose 'a' to link to your android emulator. You should get the app running in the simulator, begining from a login page.

<b>Important Note:<b> When using the app, everytime you make changes to the ratings data--i.e., deleting, editing, creating data--you need to refresh the Read component page by swiping your finger down to produce the swirling refresh icon. 

## Files 

> backend -- folder containing backend code <br>
> > index.php -- <br>
> > Controller -- folder containing backend controllers <br>
> > > BaseController.php <br>
> > > RatingsController.php -- controller functions for ratings functionality <br>
> > > UserController.php -- controller functions for users functionality <br>

> > Model -- folder containing backend models <br>
> > > DataBase.php <br>
> > > RatingsModel.php -- model functions for ratings table functionality <br>
> > > UserModel.php -- model functions for users table functionality  <br>

> > inc <br>
> > > bootstrap.php <br>
> > > config.php -- connects to database <br>

<br>

> music-app -- folder containing react native app <br>
> > App.js -- files that routes different components <br>
> > Components -- folder containing different components <br>
> > > logo.png -- logo image <br>
> > > Register.js -- register component file to register user <br>
> > > Login.js -- login component file to log user in <br>
> > > Read.js -- component file that lists all of the ratings data from backend <br>
> > > Individual.js -- component file that displays details of an individual rating entry and can delete the rating entry <br>
> > > Create.js -- create component file for users to create a rating <br>
> > > Update.js -- update component file for users to edit their ratings <br>

## Packages 

Install the following packages: 

```npm
npm i --save react-native-svg # ** 
npm i --save @fortawesome/fontawesome-svg-core 
npm i --save @fortawesome/free-solid-svg-icons 
npm i --save @fortawesome/react-native-fontawesome  
npm install @react-native-async-storage/async-storage 
``` 

<br>
<br>
<br>

Work was distributed 50/50. <br>
Have a wonderful day and enjoy! ♥
