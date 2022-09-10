## TEAM NEARBY Proejct Backend document

--------------------------------------

### Backend Architecture Overview

--------------------------------------

<img src="./img/SWArchitecture.png" ></img>


This repository is for Central Backend Server in the figure above. 

### API Document

The API Document for this repository is in the [link](https://documenter.getpostman.com/view/20596012/UzdxzmiZ) here

### How to use

> Install Dependency

```sh
npm i --save
```

> Start Development Server

Start environment setup with env/.development.env

```sh
npm run start:dev
```

> Start Stage Server

Start environment setup with env/.stage.env

```sh
npm run start:stage
```

> Start Production Server

Start environment setup with env/.production.env

```sh
npm run start:prod
```

> Seed initial data to the Database

```sh
npm run seed:run
```