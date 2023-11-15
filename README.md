# React Native Music Rating App

## About the App 

TBD 

## How to Run the App 

TBD 

To run the app using your local backend, you will need to edit the IP addresses in the url's in the following lines of code: 

> music-app\Components 
> > Register.js -- 55 <br> 
> > Login.js -- 29 <br>
> > Read.js -- 35, 61, 100 <br>
> > Individual.js -- 34, 73 <br>
> > Create.js -- 51 <br>
> > Update.js -- 37 <br>

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
