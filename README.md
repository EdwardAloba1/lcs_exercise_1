# Edward Aloba Documentation
## Intro
My goal for this project was to be able to demonstrate my skills with front end and back end work. My goal was to be able to abstract all the code so it's easy for anyone to read. I created a class for Members Table, and Commitee table.


#### [Navigation Bar](frontend/src/compoonents/Nav/Nav.tsx)
The top of the page includes a navigation bar with 
the office of the clerk logo and 6 elements. The home and Member Information page don't do anything and the other elements link to the corresponding pages on the actual website.

#### Introduction section of page
After the Navigation bar there is a brief introduction that welcomes you to the office of the clerk as well as the current clerk in office.

#### Tables

###### Member Information
After the introduction, it goes to the Member Information table. This table includes many different elements that you can sort by, and also has a search bar you can use to search for member names.

Along with being able to sort members by various different selections, this table also includes a dropdown that shows the committees and subcommittees of the different members

###### Commitee Information
After the member information table we see the commitee table. This table includes sorting and a search bar similar to the Members table. What's different about this table is that it has a drop down element to see te sub-commitees in the commitee.

#### Thank you 
I would also like to use this opportunity to thank everyone at The office of the clerk team as well for this interview process. This project was a very fun project and I'm glad and excited I'm at this point in the interview. Definetly looking forward to what the future holds.

Now, to my code!

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

## [App.tsx](frontend)
This file handles all of the headers and Nav bar information for the page. It also grabs all of the essential json information to pass into the html render at the bottom of the page. 

In the HTML render that's returned at the bottom of the page, you see two different elements in the body. We have the [Members](frontend/src/compoonents/Members.tsx) element and we have the [Commitee](frontend/src/compoonents/Commitee.tsx) element. These two elements both take in the MembersData json as a parameter and returns a table.

## [Members.tsx](frontend/src/compoonents/Members.tsx)

In the Members element, the first thing we do is filter the json information passed through the members parameter and filter it down to each member. 
CommiteeData is the data structure used to define the elements that will be inputted into the table.

The function pushData gets all the json information as defined in CommiteeData and pushes it into an array called data of type CommiteeData info about the members.

The sortedData, filteredData and handleFilter are all functions that handle the sorting, and searching within the table. By default, the table is sorted by name in alphabetical order.

One feature I wanted to add in this element was a dropdown table for each member. I wanted to add a drop down menu so I can be able to reduce the amounts of elements in the table, as well include commitee information for each member which I didn't get the chance to do.

## [Commitee.tsx](frontend/src/compoonents/Commitee.tsx)

In the Commitee element we define our variables as well as filter the json similar to how we did in the Members class. We also define a 2 type data structures, one of which is a type called CommiteeData and the other called SubcomiteeData. Subcomitee is an array within the ComiteeData type structure. This is what allows us to have a nested table.

The pushData function pushed all the commitee info into the structures via variable data of type ComiteeData[].

We then have our filtering/searching function filteredData, handleFilter, and sorted data which we discussed above. And we also have our functions that allow us to expand the table.


## Closing Thoughts
Because of the time constraints it was difficult to incorporate all of the different features I had in mind and the time constraints in place. Especially given the fact more ideas kept popping up.

Overrall I think there are some things that could have been improved with this design such as making the subcommittees a drop down under the committees table in member information.

Another thing that could have been done is separating the member and commitee information tables by pages. I felt like this would be a great idea and would make sense, but was difficult because of the other feature priorities and time.

Again, thank you for the opportunity to work on this project/interview. I very much enjoyed it.

My final words...

# Thank You!
