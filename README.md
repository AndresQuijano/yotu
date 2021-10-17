# NodeJS Bootcamp final project

## How to run the app locally

1. Run MongoDB locally. 
2. Obtain the connection URL and append /yotudev at the end of the URL. It should be similar to mongodb://127.0.0.1:27017/yotudev.3. Set that value in /config/dev.env in the MONGODB_URL environment variable. This file shouldn't be uploaded to git, but it was uploaded for ease of project grade.
4. Execute run npm dev in the console.5. Go to http://localchost:3000/ in the navigator.
6. There is a set of sample videos in /.sampleVideos, again, to ease the project grade.

## How to run tests

1. Run MongoDB locally. 
2. Obtain the connection URL and append /yotutest at the end of the URL. It should be similar to mongodb://127.0.0.1:27017/yotutest.
3. Set that value in /config/test.env in the MONGODB_URL environment variable. This file shouldn't be uploaded to git, but it was uploaded for ease of project grade.
4. Execute npm t in the console.
5. The project includes test coverage and could be found at /coverage.

## Future developments:

There is a set of well-known topics that could be improved but for time reasons are included for future releases:

-Improve frontend look and feel.
-Add middleware for error handling.
-Improve data input validation in frontend.
-Add user schema.