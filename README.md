__# Rate Repository App
Mobile application which shows ratings for several demo Github repositories. 
Users can sign up and login. 
They can navigate to specific repository pages, and comment publicly. 
They can also modify their existing reviews.
## Implementation and Functionalities
The frontend uses **React js** and **React Native**.
For styling, uses CSS stylesheet.
The connection with the backend is implemented utilizing **graphQL** queries.
For this, we use **Apollo Client**.
The pages are routed utilizing **React Router**.
Finally, the functionality is tested using the expo application for android.
### Homepage
All the repositories in the database are displayed to the user.
This page implements **infinite scrolling**.
The users can filter the repositories.
![Homepage](/rate-repository-app/assets/demo/homepage/home1.png)
A search bar can also be used to search for repositories.
![Homepage](/rate-repository-app/assets/demo/homepage/home2.png)
### Single repository page
Singular information for a repository is shown. 
Below are also shown the reviews left by the users of the application.
![Repository](/rate-repository-app/assets/demo/repo/img.png)
### Sign in and sign up forms
Users can sign up and sign in. 
The form is implemented using formik.
User authorization is also managed using a combination of the React Context API, Local Storage and Apollo Client.
A JSON Web Token is stored in local storage.
![Signin](/rate-repository-app/assets/demo/signin/sigin.png)
![Signup](/rate-repository-app/assets/demo/signin/signup.png)
### Review form
There is also a review form where users set reviews for the repositories they wish.
![Review form](/rate-repository-app/assets/demo/reviews/reviewform.png)
Users can also view all their reviews, view the repositories they are in and perform a mutation to delete reviews.
![Review page](/rate-repository-app/assets/demo/reviews/reviewpage.png)
![Review delete](/rate-repository-app/assets/demo/reviews/reviewdelete.png)__
