# Model-View-Controller (MVC) Challenge 14: Tech Blog
![license](https://img.shields.io/badge/license-MIT-black)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How-to-Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Description
```md
The task for this assignment was to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and also comment on other developers’ posts.
```

**User Story**

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

**Acceptance Criteria**

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete blog posts
```

## Installation
<!-- audience is other developers -->

1. Clone this GitHub repo https://github.com/abrownstein2022/ch14-mvc-cms-blog
<!-- Check out the gh cli tool from github -->
```bash
$ gh repo clone https://github.com/abrownstein2022/ch14-mvc-cms-blog
```

2. From the terminal, install npm, express, date-fns and moongoose 6.8.0 packages:
    "start": "node server.js",
    "seed": "node seeds/seed.js",
    "dev": "eslint . --fix && node server.js",
    "watch": "nodemon --watch '.' --ext 'js' --exec npm run dev"
```bash
$ npm i
$ npm install express
$ npm install date-fns
$ npm install mongoose@6.8.0
```

```bash
$ gh repo clone /abrownstein2022/proj2-restaurant-mgmt-sys
```
2. From the terminal, install npm:

```bash
$ npm install
```

3. Log into mysql, create the database on your local machine and seed the database:

```bash
$mysql -u root -p < db/schema.sql
$npm run seed-database
```

<!-- [] implies user input 
 mysql> restaurant_mgr < C:\[filename].sql
-->

4. Start the local server and watch for file changes to automatically restart server:
```bash
$ npm run watch 
```

5. Open Express or a browser to test any changes you make to the application after cloning.





## Usage
1. You will need 2 terminal sessions to use this application.

2. In one of the terminal sessions, start up the mongo server:
```bash
mongod
```
3. In the other terminal session, run the application:
```bash
$npm start
```

Or to start with nodemon

```bash
$npm run dev
```

**The screenshots below show different functionality of the application:**<br>
![example image 1 terminal start commands](./assets/ch18-image1-terminal-start-commands.png)

![example image 2 create user insomnia](./assets/ch18-image2-create-user-insomnia.png)

![example image 3 find user insomnia](./assets/ch18-image3-find-users-insomnia.png)

![example image 4 update user insomnia](./assets/ch18-image4-update-user-insomnia.png)

![example image 5 delete user insomnia](./assets/ch18-image5-del-user-insomnia.png)

![example image 6 get thoughts insomnia](./assets/ch18-image6-get-thoughts-insomnia.png)

**Please review the demonstration video below to see, step-by-step, how the entire application works:**

![demo video of how to use this application](./assets//ch18-nosql-demo.gif)

**Please see the screenshots below to specifically review that thoughts are deleted when users are deleted.**

Run "find all users" to see no users have been created yet.
![example image 1 delete thoughts when user deleted](./assets/ch18-screen1-show-delete-user-thoughts.png)

Create new user brandon.
![example image 2 delete thoughts when user deleted](./assets/ch18-screen2-show-delete-user-thoughts.png)

Create thought for user brandon.
![example image 3 delete thoughts when user deleted](./assets/ch18-screen3-show-delete-user-thoughts.png)

View all thoughts to confirm the new thought has been created for Brandon.
![example image 4 delete thoughts when user deleted](./assets/ch18-screen4-show-delete-user-thoughts.png)

View all users to confirm again that the new thought has been tied to Brandon's userid. 
![example image 5 delete thoughts when user deleted](./assets/ch18-screen5-show-delete-user-thoughts.png)

Delete the user.<br>
![example image 6 delete thoughts when user deleted](./assets/ch18-screen6-show-delete-user-thoughts.png)

View all users to confirm user brandon has been deleted.
![example image 7 delete thoughts when user deleted](./assets/ch18-screen7-show-delete-user-thoughts.png)

View all thoughts to confirm brandon's thought was also deleted. 
![example image 8 delete thoughts when user deleted](./assets/ch18-screen8-show-delete-user-thoughts.png)

## Credits

```md
Alexis Brownstein, Wyzant tutor: Mike
```

## License

 ```md
 MIT 
```

Link to license text:
https://opensource.org/licenses/mit-license


![badge](https://img.shields.io/badge/license-mit-black)


## Features

<!-- 
# h1
###### h6
**bold**
*italic*
_underline_

| key | value |
|-|-|
| name | 'bob' |


- list
- items

1. numberd
1. list
1. all ones - automatic numbering
Features for *future* development
 -->
**The main features in this project are:**<br>
1. Uses Node.js, Inquirer, Express, Insomnia, Mongo DB and Mongoose
1. Example screenshots and a demonstration video
1. Necessary folder structure 
1. Professional README
1. Utils.js file in models folder to handle global functions used
1. date-fns used to format dates


## How-to-Contribute

N/A

## Tests

This application was tested with Insomnia using the routes below.

*USERS*
```md
`api/users`  
    - GET: return all users  
    - POST: create a new user  

`api/users/:user_id`  
    - GET: a single user by `_id`  
    - PUT: update a user by `_id`  
    - DELETE: delete a user by `_id`  (and also delete their thoughts if any exist)

`api/users/:user_id/friends/:friend_id`  
    - POST: add a new friend to the users list 
    - DELETE: remove a friend from the users friend list
```

*THOUGHTS*
```md
`api/thoughts`  
    - GET: get all thoughts  
    - POST: create a new thought  

`api/thoughts/:thought_id`  
    - GET: get a thought by its `_id`  
    - PUT: update a thought by its `_id`  
    - DELETE: delete a thought by its `_id`  

`api/thoughts/:thought_id/reactions`  
    - POST: create and add a reaction to the thoughts reactions list  
    - DELETE: delete a reaction by its thought id 
```

## Questions

Feel free to contact me with any questions.

I can be reached at alexis@drdatabase.com.

This GitHub repo can be found at:
  
https://github.com/abrownstein2022/ch18-nosql-social-network-api