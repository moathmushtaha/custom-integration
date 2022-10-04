## Overview

Custom Monday.com integration use for listen on item column changes then update it or store -if not exists- in MongoDB, getting data from Monday.com using custom item mapping.

For more details click [Here](https://github.com/moazmoshtha/custom-integration).

## Run and Test
#### After clone this repository 

1-  Visit [MongoDB Atlas Database](https://www.mongodb.com/cloud/atlas/register) and create account.

2-  Update .env MONGODB_URI key with yours, [Get MongoDB URL Connection String](https://www.mongodb.com/docs/guides/atlas/connection-string/)

3-  Create Monday.com account.

4-  Create new Monday.com App, visit [Managing your apps](https://developer.monday.com/apps/docs/manage) for more details.
![Create new Monday.com App](https://dapulse-res.cloudinary.com/image/upload/w_900/v1585080975/remote_mondaycom_static/developers/screenshots/create-app.gif)

5-  Update .env MONDAY_SIGNING_SECRET key with yours, you can find it at the bottom of the app basic information page (App Credentials
section).

6- Open cmd in project path and run:
``
npm install
``
``
npm run start
``

7- Create public url using [ngrok](https://ngrok.com/download), after install run:
``
ngrok http 8302
``

8- Add an [integration](https://developer.monday.com/apps/docs/quickstart-integration) to your Monday app.
![Add an integration to your monday app](https://dapulse-res.cloudinary.com/image/upload/v1615323590/remote_mondaycom_static/uploads/DiproBhowmik/integration_template.gif)

9- Copy ngrok url from result of step 7, and paste it in URL input when add integration.

