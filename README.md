# Shoes Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This app & api are designed to be the base app of a an e-commerce app, easily modifiable to add more features in the future.   

## Features
 - [x] List all items
 - [x] Add, update or delete items

## Requirements
- Npm 

## Usage
Use Git or checkout with SVN using the web URL : 
```
https://github.com/watcheur/shoes-manager.git
```

⚠️ You must include the --recurse-submodules option when cloning the project, otherwise, you'll need to run

```
git submodule update --init --recursive 
```

inside the project folder

From a terminal, go to each submodule folder (app & api) and run : 
```
npm install
```

## Project's URL
API will use the 3005 port while the App will use the 3000 port.
You'll find the OpenAPI documentation in the /api/ url when api is started( http://localhost:3005/api)

## Notes on project development  
### Some context  
At the time I wrote this, I didn't have the opportunity to work on a profesional JavaScript project for the past years (but i had 3 years of experience on it prior this).  
But to keep me in touch with JavaScript development, I've completed a micro-projects this past month :   
- [x] https://github.com/watcheur/Raid-Manager (Help me management of a roster for a World of Warcraft guild)

This project introduced me to the NestJS environment and I loved it !

### Technical choices  
#### [NestJS](https://nestjs.com/)  
I choosed to work with NestJS, it seems to me it's the best current framework to create an efficient, reliable and scalable server
#### [React](https://fr.reactjs.org/)
The current most reliable JavaScript library to build a Front app
#### [Shards-Dashboard](https://github.com/DesignRevision/shards-dashboard)
Shards-Dashboard is a nice Bootstrap wrapper to gain time in front development

### Project possible improvements  
#### UI/UX  
- Item form should be more beautiful

## Time spent
The repartition of time used to make this project is the following : 
- [x] 2 hours on project design, app scketch & building api
- [x] 2 hours on main project development
- [x] 0.5 hour on tests

For a total of 4.5 hours.  
*I've enjoyed this time, it's good working with Nest & React !* 

## Contribute
Even if this app shows only some basics, i'm always trying to improve and any feedback would be appreciated.  
If you find any issue or possible improvement with the code feel free to leave an [issue](https://github.com/watcheur/shoes-manager/issues). I'll always appreciate contibutor's point of view ! 
