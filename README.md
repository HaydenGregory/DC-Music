# DC Music

## Artist information at your fingertips


An application used to filter data from Deezer API, BandsinTown API, The Audio DB API, and display the information using HTML, JavaScript, and CSS.

## Developers
 - Hayden Gregory
    - <a href="https://www.linkedin.com/in/hayden-gregory-55b960a5?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BccJaD5ANR2uWfbiN00YZqg%3D%3D"> Linkedin </a>
    - <a href="https://github.com/HaydenGregory">Github</a>
 - Kevin Leon
    - <a href="https://github.com/kevinleon01">Github</a>
 - Karen Seunsom
    - <a href="https://www.linkedin.com/in/rasinie-seunsom/"> Linkedin </a>
    - <a href="https://github.com/karenseunsom">Github</a>
 - William Wilkerson
    - <a href="https://www.linkedin.com/in/willie-wilkerson-337675202/"> Linkedin </a>
    - <a href="https://github.com/williewilkerson27">Github</a>

## Project Status
Working for the first three months after launch. The student API key for BandsinTown will expire after that. All other functionality should remain the same.

## Project Screen Shot(s)

#### Example:   

[ PRETEND SCREEN SHOT IS HERE ]

[ PRETEND OTHER SCREEN SHOT IS HERE ]

## Reflection

  - One week group project for Digital Crafts
  - Set out to build website that delivers useful artist information to the user.
  - This project was a learning experience for storage things in local storage to use on other pages, pulling large payloads from APIs, and large user interactivity.
  - Unexpected obstacles:
    - YouTube URLs delivered from the Audio DB API had a lot of variation and needed to be edited to embed on the the page. Used regular expression to grab the ID's at the end of all the varying links then created new links with the ID's.
    - 
  - What tools did you use to implement this project?
      - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your choices and justify them here.  

#### Example:  

This was a 3 week long project built during my third module at Turing School of Software and Design. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to pull data from the Twitter API based on what they were interested in, such as 'most tagged users'. I started this process by using the `create-react-app` boilerplate, then adding `react-router-4.0` and `redux`.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

At the end of the day, the technologies implemented in this project are React, React-Router 4.0, Redux, LoDash, D3, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a `webpack.config.js` file to more fully understand the build process.