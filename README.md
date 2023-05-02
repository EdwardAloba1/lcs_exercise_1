# LCS Programming Exercise 
This is a small project that demonstrates using a House public data source to display information about Members.
It is intended as a starting point to allow you to demonstrate your development skills.

The goal of the exercise is for you to take these rudimentary components and use them either as an example or a foundation to create something based on the Member and Committee data.

It is important that you read this entire document before you begin this exercise. 
Important instructions about estimating and planning your time are at the end of this document. 
You should set aside time to plan your effort and chose where to focus before you start coding. 


# Application outline

The application consists of two components:
1. An ASP.NET web API serving [MemberData.xml](http://clerk.house.gov/xml/lists/MemberData.xml) as JSON
1. A React app in Typescript that displays a subset of the data from the API

The ASP.NET API contains a single controller, `exercise.Controllers.TestController`, that creates an endpoint to serve data from the service class `exercise.Services.MemberDataService`.
The endpoint `http://localhost:5000/test/json` serves `MemberData.xml` as JSON.

The React app consists of a single component in `App.tsx` that fetches data from the `http://localhost:5000/test/json` endpoint with `useEffect()` and displays Member names.
This demonstrates a simple example of fetching data from the API and verifying that you can display a part of it. 

## Running the application

If you have the .NET SDK and Yarn installed locally, you can start the components in two different shells with:

```
$ cd api
$ dotnet watch run
```
and
```
$ cd frontend
$ yarn install
$ yarn start
```

Once the components are started you can open the UI at `http://localhost:3000/` and browse the API documentation at `http://localhost:5000/swagger`.

If you have Docker Desktop installed you can use the included `docker-compose.yml` file to run the stack with the command `docker compose up --build`.

# Exercise tasks

You may build anything that you feel highlights your skills and experience as a software engineer. 
However, we ask that you base your submission on the [MemberData.xml](http://clerk.house.gov/xml/lists/MemberData.xml) data.
This provides us with a common baseline for data that is relevant to the House.

To help guide your efforts, there are five areas that are common to many applications we build and can be demonstrated with this sample.

1. listing - fetching and presenting data
1. sorting - changing the order in which records are returned and presented
1. pagination - fetching and presenting subsets of the data and having cursor-like access forward and backward between subsets of the data
1. searching - entering criteria to find data and returning the relevant records
1. filtering - applying predicates to records to select a subset of the data

Focus on areas where you are most comfortable and most skilled.
If you are more comfortable with UI development and design, then highlight the interactions and design aspects of the `frontend` application.
If you are more data and API focused then you may consider adding search features to the API.
Conversely, you may minimize aspects that you do not feel will show your strengths. 
For example, if you were to add search or filtering to the API you can demonstrate that with `curl` commands and ignore the UI integration.
Likewise, you can leave the API as-is and do all of your data manipulation in the UI if you are more familiar with that technology.
Just be sure to document how to use the components you build by updating this README or creating a separate document to describe what you did.

Make sure that you set a goal and area to focus on before begining to change the code. 
There are many options to focus on and you only have time to work on one or two features at most. 
It is more important that your solution be clear and stable versus trying to cover too many areas and leaving them incomplete.

In additon to the code, write a simple summary &mdash; either as part of this README or in a new document &mdash; of what you have done and what you wanted to accomplish.
This documentation will be part of the evaluation and will be used to guide evaluators on what to look for in your code.

## Alternative technologies

If the .NET, React and Typescript technologies are unfamiliar to you, or you feel your skills would be better shown in another language or platform, you may submit the exercise using different technologies.
As noted, please base your exercise on [MemberData.xml](http://clerk.house.gov/xml/lists/MemberData.xml) regardless.

If you submit your exercise using different technologies please explain your choice in your documentation. 
You should still focus on either creating an API for the data or a UI for presenting it.

You must use a technology which is freely available and which the evaluators can run with minimal setup.
If you use a proprietary tool such as Visual Studio to create your solution you may not require evaluators to use those tools to run your application. It must be possible to setup and run your application with a few simple commands.

# Evaluation

Members of our software engineering team will be evaluating your work by running your application and reading your code and documentation. 
It is important that the package you submit be easy to unpack, setup and run. 

We wil run your code to see how it behaves and read your code to understand how you approached this exercise. 
We will look for clearly written code following common patterns and documenting complex sections or approaches.

We will read your  docuumentation and compare it to your code.
We will evaluate whether or not your explanation aligns with your approach.
We will look for explanations of your goals and descriptions of areas where you may have planned to make changes but did not have time. 


# Estimated Time 

Plan on using one to two hours to review this document and plan your effort for this project. 
Taking some time to plan out what you want to accomplish will help you scope the application. 
You will not have time to do everything. 
Focus on stability and the areas of application development that you know well. 
Plan on spending three to six hours developing the application. 
Again, focus on stability over new features. 
If you have an idea at the last minute for how to add a new feature it is better to leave a `TODO` in the code or explain it in the README versus adding something you do not have time to work on to ensure it is stable. 
In total, plan on at least four hours to work on this exercise and up to eight. 
Adding more code or more features will not necessarily produce a better result. 
The evaluators are trying to get a sense of your level of knowledge and experience with these tools, your overall engineering approach and your ability to communicate what you have done.


