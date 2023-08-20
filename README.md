Firstly download project on your pc.

Then install all needed packages through cmd. In backend folder with: `composer install` and in the frontend folder with `npm install`
In backend forder run those commands: `cp .env.example .env`, `php artisan key:generate`. Create in database folder db.sqlite file and run these commands `php artisan migrate`, `php artisan db:seed`.
After installing packages and migrating database you can check project yourself. Run two different command in cmd. First in backend folder `php artisan serve`. Second in frontend folder `npm run dev`.
Now you can check how project works.

P.S You need to check auto generated email to login ( Password for all users is same: password )
