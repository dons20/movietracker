# MovieTracker

## Scenario

I am a movie lover and I would like to be able to keep track of a movie I have watched or seen already. I should be able to search for movies by who appeared in the movie, who made or published the movie, and of course by genres to which the movies belong to. I would like to keep track of how others have rated the movie such IMDb, Rotten Tomatoes and I must be able to personally rate the movie only once. I would like to keep a record of all the movies I have watched so that it can be saved as a personal collection to keep up with other movie lovers. 


### Requirements
-	NodeJS v10+ (https://nodejs.org/en/)
-	PHP 7.2+ 
-	MySQL 5.7+
-	Note: WAMP is recommended to serve as a local server if not hosted online (http://www.wampserver.com/en/)
    -   If WAMP is used, set the port used by Apache to `3001`


## Compile Instructions

### Steps
-	Open a terminal/command prompt inside the `Code` folder
-   Use the command `npm i` to install all required dependencies
-	Use the command `npm run build` to generate a build folder
-	Use the command `npm run start` to start testing the app locally

### Hosting Instructions

-	Copy the contents of the build folder into the root of the intended hosting server. E.g. `/www/MyWebsite/`
-	Copy the API folder and place it in the same root as the main website folder. E.g. `/www/MyWebsite` and `/www/api`
-	Copy the secure folder and paste it outside of the root web folder so that it can’t be browsed to by the user.  E.g. paste in the server root as `/secure` with `/www`
Note that the API paths will need to be modified depending on where the secure folder is placed, and will fail if it can’t access it.

