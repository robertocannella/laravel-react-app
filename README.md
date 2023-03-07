# Things You Need on Your Machine

* php
* composer
* mysql shell {https://dev.mysql.com/downloads/shell/}
* laravel
* nom

# ADD DOCKER MYSQL SUPPORT

## Link
* https://aregsar.com/blog/2020/laravel-app-with-mysql-in-docker/

## Create the docker file
```
touch docker-compose.yml
echo 'version: "3.1"' >> docker-compose.yml
echo 'services:' >> docker-compose.yml
```
## TO Persist data
Adds a volume directory (See Config Below)
```
echo '/data' >> .gitignore
mkdir data
```

## Update .env
``` 
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=8001 
DB_DATABASE=myapp
DB_USERNAME=myapp
DB_PASSWORD=myapp
```

## Add mysql to docker compose:
```
version: "3.1"
services:
    mysql:
      image: mysql:8.0
      container_name: mysql
      volumes:
        - ./data/mysql:/var/lib/mysql
      environment:
        - MYSQL_ROOT_PASSWORD=myapp
        - MYSQL_DATABASE=larvel-react-app-db
        - MYSQL_USER=myapp
        - MYSQL_PASSWORD=myapp
      ports:
        - "8001:3306"

```


## Configure DEFAUST DB Connection inside config/database.php

```
'mysql' => [
        'driver' => 'mysql',
        'url' => env('DATABASE_URL'),
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '8001'),
        'database' => env('DB_DATABASE', 'laravel-react-app-db'),
        'username' => env('DB_USERNAME', 'myapp'),
        'password' => env('DB_PASSWORD', 'myapp'),
        'unix_socket' => env('DB_SOCKET', ''),
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
        'strict' => true,
        'engine' => null,
        'options' => extension_loaded('pdo_mysql') ? array_filter([
            PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
        ]) : [],
    ],
]

```

## Start Laravel Server
```
php artisan serve
```

## Start docker container
``` 
 docker-compose up -d 
```
## Test database connection through MYSQL SHell

https://dev.mysql.com/downloads/shell/
``` 
 sudo mysqlsh --sql -h localhost -P 8001 -u myapp -pmyapp -D myapp 
 ```
 
 YOU MAY BE PROMPTED FOR DEVICE PASSWORD HERE



## Run first migration
``` 
 php artisan migrate 
 ```

# ADD REACT

## Create a new  @vite app (allows Laravel to communicate to FrontEnd Frameworkds)

```
npm create vite

```


* Project name: … react
* Select a framework: › React
* Select a variant: › TypeScript + SWC

Now run 
``` 
  cd react
  npm install
  npm run dev

```

If you'd like, you can change the port that the front end is running on via the react/package.json file


``` 
...

  "type": "module",
  "scripts": {
    "dev": "vite --port=3000",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
...
  
```

## Add react router-dom

``` 
npm install react-router-dom -S
```
# CSS AND STYLES

## ADD SASS
https://www.youtube.com/watch?v=VaDZ4NS6dbY
```  
npm add -D sass 
mkdir styles
touch styles/_main.css
echo "h1 {color: red;}" > styles/_main.css 

```

If styles are working, you are all set. Continue to install dev dependencies:


## Add normalize.css
``` 
npm i normalize.css

```
Add import to _main.scss

``` 
/* _main.scss */

```

Add theme support
https://javascript.plainenglish.io/building-a-custom-theme-provider-using-reacts-context-api-4e10de8eaf43]
https://felixgerschau.com/react-typescript-context/

# ADD AUTH CONTROLLER

```` 
php artisan make:controller Api/AuthController  
````

### Add requests

``` 
php artisan make:request LoginRequest

php artisan make:request SignupRequest
```

# Add NEW Columns to table

``` 
php artisan make:migration add_first_and_last_to_users --table="users"

```
# Original Laravel README.md



<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel



Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
