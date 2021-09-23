<img src="/frontEnd/image/NAHLogo.png" width="200px" height="auto">

# Need a Hand - Full Stack CRUD Application
> Need a Hand was born when four school friends came together and decided New Zealand students need a platform to gain paid work experience in their study field before leaving school. The Team have created an application which allows students and employers to connect.

## Table of Contents
* [How Does It Work?](#How-Does-It-Work?)
* [Productions Tools and Workflow](#Productions-tools-and-workflow)
* [Installation](#Installation)
* [Validation](#validation)
* [JS Style Guide](#js-style-guide)
* [Features](#features)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

=======================================

## Productions Tools and Workflow

#### *Atom Editor*

Atom was used as tool for seamlessly editing code. The benefit of atom is that it high-lights files to you that have they have not been pushed to Github. Markup is colour-coded for ease on the eye. You can install packages to help and guide you while writing code. We installed packages atom-beautify 0.33.2 and atom-live-server 2.3.0.  


#### *Google Chrome Browser*

Google Chrome’s browser has been used to view the application. The console has been used to monitor logs and for testing purposes. By using the inspect console functionality, the Team have been able to quickly resolve any errors that appeared.  


#### *Npm*

We used npm package manager as it allowed us to quickly and easily install dependencies to our application which helped our it to run smoothly. Bootstrap, jQuery, grunt are all encapsulated in our node modules. You will need to ensure to run the 'npm i' in your terminal to install the dependencies.


#### *MongoDB*

You will need to set up a collection database in MongoDB called 'need-a-hand' and link it to the application.


#### *Grunt*

Grunt has been used as the main task manage the application. Tasks include:

jshint - live javaScript linking tool.
css lint - live css linking tool.
sass - sass compiler
uglify - minifier
watch - monitors the markup


#### *Github*

Github has been used to store the files within a shared Team repository. Several branches have been created for each member of the Team to access and work within, without disrupting the master branch.


===========================================


## Features


### **JavaScript Libraries**

1. Bootstrap
2. jQuery
3. Slick Slider
 * Icons used throughout app UI
4. Font Awesome
5. Material icons



=======================================

## How Does It Work?

Employers and students have the ability to register and login to the Need a Hand application and create their own account. Once registered, a profile is automatically created on the users behalf. Profiles can be edited by clicking the profile photo thumbnail on the top right-hand corner of any page and selecting 'Profile'.

#### *Employers*

Once logged in, employers are navigated to their 'Employer Dashboard' page where they are able to post their own job ads post. Once posted, an employer has the ability to edit or delete their ads post as necessary. Some employers may decide to reach out to students directly, they can do this by browsing student profiles on the 'Student Profile' page.

#### *Students*

Once logged in, students are navigated to their personal 'Student Dashboard'. They can view job ads and bookmark ads they are interested in. They also have the ability to reach out to employers by commenting on the employers ad post.


## Installation

Ensure you have WAMP (for Mac) or MAMP (for PC) downloaded. Clone this project in to your htdocs WAMP folder.

Run the following commands in your terminal or cmd window

1. git clone ....

2. cd need-a-hand

#### *Lets get your backend up and running*

Ensure you are logged in to MongoDB and have set up a collection for your data. You will need to connect your project.

Run the following commands in your terminal or cmd window

3. cd backEnd

4. npm i (will install dependencies)

5. nodemon index (will monitor your server)

Jump in to your code editor and add a file called 'config.json' to your backEnd root directory. Add the following code with your MongoDB user, password and cluter name.

`
{
  "MONGO_USER":"",
  "MONGO_PASSWORD":"",
  "MONGO_CLUSTER_NAME" : ""
}
`

#### *Lets get your frontend up and running*

Your backend must be running before you get the frontend up and running.

Run the following commands in your terminal or cmd window

1. cd frontEnd

2. npm i (will install dependencies)

3. grunt (grunt is your task manager)


Jump in to your code editor and add a file called 'config.json' to your frontEnd root directory. Add the following code with your server url and server port details.

`
{
  "SERVER_URL" : "",
  "SERVER_PORT" : ""
}
`



## Endpoints

**Endpoints**       | **Description**             |**Acceptable values**| **Method**|
--------------------|-----------------------------|---------------------|-----------|
|/addPost       | add posts to mongodb |                 | POST       |
|/registerEmployer     | add a new employer user to mongodb |       | POST       |
|/registerStudent      | add a new student user to mongodb          |                   | POST      |
|/loginEmployer          | check for  existing employer user to login     |                     | POST       |
|/loginStudent         | check for  existing student user to login  |               | POST      |
|/allStudents | view all student profiles from db    |                    | GET       |
|/allPosts        | view all posts from mongodb        |                      | GET      |
|/getEmployer/:id    | use an id to view a specific employer     |  ObjectId         | GET     |
|/getStudent/:id    | use an id to view a specific student     |  ObjectId         | GET     |
|/updatePost/:id    | modify a post using id  |  ObjectId          | PATCH     |
|/updateEmployer/:id    | modify a employer profile using id |  ObjectId            | PATCH     |
|/updateStudent/:id    | modify a student profile using id  |  ObjectId          | PATCH     |
|/postComment/:id    | post a comment to mongodb  |            | POST     |
|/deletePost/:id    | remove a post from mongodb  |          | DELETE    |



=======================================

## Acknowledgements

- Many thanks to everyone who helped us in some way or another to complete this project, the many resources found online to find inspiration and all the open-source plugins, libraries and api used.


=======================================

## Contact
Created by [Charissa, Bee, Mo and Ambar ]() - feel free to contact us if you have any questions or queries!


=======================================


## Project Status
Project is: _complete_
