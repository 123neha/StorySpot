# StorySpot
web application that allows authors to publish stories

## Setup
To setup the entire application, 
1. `git clone` the the repo
2. cd to folder `UI`
3. run `npm i`
4. run `npm start`
5. cd to folder `APIs`
6. run `npm i`
7. make sure `mongod` is running
8. run `npm start`
Now go to browser and open [http://localhost:4200](http://localhost:4200)

## Run Unit Test cases (for Backend APIs only)
1. run command `np run test`
2. it will run all the test scenarios and print the report

### View Test Scenarios Report
1. cd to folder `mochawesome-report`
2. open file `mochawesome.html` in browser

### View Coverage Report
1. cd to folder `coverage`
2. open file `index.html` in browser

## Running Static Code Analysis (lint)
1. cd to folder `UI`
2. run command `npm run lint`
3. it will show all the lint errors, if any. 
4. similarly, run same command for backend apis.