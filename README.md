# MovieTracker

## Scenario

I am a movie lover and I would like to be able to keep track of a movie I have watched or seen already. I should be able to search for movies by who appeared in the movie, who made or published the movie, and of course by genres to which the movies belong to. I would like to keep track of how others have rated the movie such IMDb, Rotten Tomatoes and I must be able to personally rate the movie only once. I would like to keep a record of all the movies I have watched so that it can be saved as a personal collection to keep up with other movie lovers. 

### Technical Breakdown

This web app was created with React 16.12+ using PHP on the backend for a local API endpoint to query the database and external movie API. This project uses The Movie Database API, and caches requests on the client side whenever possible using session storage. This web app should run well on any modern browsers (IE is not supported). 

### Planned Changes

- Adding Apollo Server
- Enabling PWA functionality including offline caching/loading
- Improving lazy load
- Improving interface


### Recommended Requirements
-	NodeJS v10+ (https://nodejs.org/en/)
-	PHP 7.2+ 
-	MySQL 5.7+
-	Note: WAMP is recommended to serve as a local server if not hosted online (http://www.wampserver.com/en/)
    -   If WAMP is used, set the port used by Apache to `3001`


## Instructions

This project is not intended to be a boilerplate for spinoff projects, but should you need to, here are some useful instructions to get everything working like my setup. 

### Compile Instructions
-	Open a terminal/command prompt inside the `Code` folder
-   Use the command `npm i` to install all required dependencies
-	Use the command `npm run build` to generate a build folder
    - Remove the line  `"postbuild": "node ftp.js"` from `package.json` if you don't need to automatically ftp after building
    - View [FTP-Deploy](https://github.com/simonh1000/ftp-deploy) for more information
-	Use the command `npm run start` to start testing the app locally
    - Create an empty file called `devserver` in the root `movietracker` folder for local testing
    - Create a folder called `secure` and place it wherever you'd like (ideally outside of the website root to prevent unauthorized access);
      - Create `api_key.php` in that folder and put the following inside:
        ```php
        <?php
        $api_key = 'YOUR_API_KEY_HERE';    
        ```
      - You can get your own API key from [TheMovieDB.org](https://www.themoviedb.org/faq/api) once you register
      - Ensure that `app_root.php` points to the directory that contains the `secure` folder.

### Hosting Instructions

-   Change the `"homepage"` property in `package.json` to reflect the intended url structure
-	Copy the contents of the build folder into the root of the intended hosting server. E.g. `/www/MyWebsite/`
-	Copy the API folder and place it in the same website folder as before E.g. `/www/MyWebsite/api`
-   Copy the config folder and place it in the same website folder as before E.g. `/www/MyWebsite/config`
    - Rename `config/renametoindex.php` to `config/index.php`
-	Copy the secure folder and paste it outside of the root web folder so that it can’t be browsed to by the user.  E.g. paste in the server root as `/secure` with `/www`
    - Modify the `app_root.php` in the `api` folder to point the api to the root of the secure folder.

- Folder Structure should look similar to this:

```
📁 secure
📁 MyWebsite
┣ 📁api 
┣ 📂config
┃ ┗ 📜index.php
┣ 📜Everything else from the build folder
```

## Other Notes

### Hosting on Apache

- If you're hosting this as a subfolder of a domain E.g. `MyWebsite.com/movietracker`, you'll need to configure your .htaccess file in that folder to allow it to serve the correct index.html even on a fresh page load.

  E.g.

  ```apache
  <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /movietracker/index.html [L]
   </IfModule>
   
  ```
