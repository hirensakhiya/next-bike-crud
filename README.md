Fictional Bike Store is a web platform for managing bike listings, allowing admin to create, read, update, and delete bikes. It features admin authentication, search, and filtering options. Built with a modern tech stack, it ensures a user-friendly experience for both bike enthusiasts and administrators.

## Installation

Clone the project

```bash
  git clone https://github.com/hirensakhiya/next-bike.git
```

Go to the project directory

```bash
  cd next-bike
```

Copy ```.env.example``` file into ```.env``` file

Install dependencies

```bash
  npm install
```

or

```bash
  pnpm install
```

## Create Vercel Project

1. Create Project on Vercel

2. Create Blob read and write token
    - Go to storage tab
    - Select **Connect Database** button
      ![CreateDatabase](public/screenshots/create_database.png?raw=true "Success Output")
    - Select **Blob** and **Continue**
      ![BlobReadWriteToken](public/screenshots/blobl_read_write_token.png?raw=true "Success Output")

3. Run below command to install vercel
    ```bash 
      npm install -g vercel
    ```
4. Run below command to integrate vercel blob
    ```bash 
      vercel link
    ```
    ```bash 
      vercel env pull .env.prod
    ```
5. Copy ```BLOB_READ_WRITE_TOKEN``` from **.env.prod** to **.env** and **docker-compose.yml** file

6. Delete **.env.prod** file


## Configure Docker

Run the docker with build

```bash
  docker compose up --build
```
Run existing docker build (optional)

```bash
  docker compose up
```

Remove the docker

```bash
  docker compose down
```

## Create Admin User

Make sure to configure database in .env as per docker-compose.yml or database server before running below command, to check which fields to use you can take reference of .env.example

Run below command for create admin profile

```bash
  npm run create-admin <username> <password>
```

or

```bash
  pnpm create-admin <username> <password>
```


## Run the project separately

```bash
  npm run dev
```

or

```bash
  pnpm dev
```

## Run build locally

### Create production build of project

```bash
  npm run build
```

or

```bash
  pnpm build
```

### Run production build

```bash
  npm start
```

or

```bash
  pnpm start
```

## Project Routes
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/admin](http://localhost:3000/admin) with your browser to see the admin panel.


[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/bike](http://localhost:3000/api/bike). This endpoint can be edited in `pages/api/bike.js`.


## Screenshots and Links

[Visitor Home Page](https://next-bike-crud.vercel.app/)

![VisitorHomePage](public/screenshots/bike_visitor_home.png?raw=true "Success Output")

[Admin Home Page](https://next-bike-crud.vercel.app/admin)

![AdminHomePage](public/screenshots/bike_admin_home.png?raw=true "Success Output")

## 🛠 Skills/Tech Stack

PostgreSQL (Database), NextJS, Rest API, Tailwind CSS, Docker

## Features

**Owner (Admin)**

- Can view listing of all bikes with search functionality
- Can able to add, update, delete bike details

**Customer**

- Can view listing of all bikes with search functionality

## Authors

- [@hirensakhiya](https://github.com/hirensakhiya)
