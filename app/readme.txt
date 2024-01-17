Full Stack 2048 Game Site

-------------
Description
-------------

    A site where users can play the game 2048 where players are given 
a 4x4 board with numbered tiles. The application displays the top 10 
highscores from players that are stored in a backend, and if the player
gets a highscore, they can submit to this backend. The game also allows
users to log in with their Google account which gives them the ability to
save and load their game progress. 

Detailed instructions on how to play are provided in the instructions modal of the
game and later in this readme file. 


-------------------
Tools Used and Why
-------------------

1. NextJS - I made this a NextJS project primarily to take advantage of
            its feature allowing both the front and back end to be made in 
            the same project. 

2. Tailwind and DaisyUI - To save time during styling and practice using Tailwind

3. Zod - To simplify data validation when user submits their highscore. 

4. React-Hook-Form - Used to simplify form submissions and error handling within the 
                     HighscoreSubmitForm component where the user submits their highscore.
                     
                     The package @hookform/resolvers/zod is used to integrate react-hook-form
                     with zod to use the validationSchema that checks if a user entered a name
                     or not when trying to submit their highscore.

5. React-Query and Axios - Used to simplify the fetching and posting of highscores and game data.
                           They are also used for performing specific behaviors in the UI depending 
                           on whether or not the fetching or posting succeeds, fails, or is loading.

                           Examples
                           --------- 
                           1. Save Game Modal - The submit button says Save Game, but when 
                                                submitting, the button will be disabled and 
                                                display "Saving..." instead of "Save Game".

                                                If the submission fails, an error message is
                                                shown, and if it succeeds, the modal will close.
                            
                            2. Highscore Modal - If the highscores are being fetched, a Spinner
                                                 will be displayed and an error message will 
                                                 be shown if the highscores can't be fetched.

6. NextAuth.js and Google Provider - Used for authentication, specifically to allow the user to 
                                     log in with their Google accounts so that they can save and 
                                     load their game data. 

7. Prisma - The ORM used for working with the backend, specifically to send and retrive a user's 
            highscore, saved game, and session data. 


------------
How to Play
------------

Objective - To merge the tiles on the board repeatedly to create a tile 
            with the value of 2048
            
            If the board fills up with tiles and no valid moves remain, 
            the game is lost. 

New Tiles - At the start of each game, two tiles will be generated in 
            random spots within the 4 x 4 board. 

            After each move, a new tile will be generated in a random 
            empty space on the board with either a value of 2 or 4.

            Newly generated tiles will have a 90% chance of holding a value
            of 2 and 10% it will be 4.

Moving Tiles - W, A, S, D keys to move all tiles on the board to the left,
               right, top, or bottom of the board. 

               W = Up
               S = Down
               A = Left 
               D = Right

Merging Tiles - With each move, tiles with the same value and no other tiles
                between them in the direction of the move made will become a 
                single tile. 

                This new tile's value will be double the value held by the 
                merged two tiles. 

Score - When two tiles merge, the new value will be added to the player's score. 
        
        Whether you win or lose, if you achieve a highscore, you will have 
        the option of entering your  name and submitting it. 

Save and Load Game - To save and load your game, you must log in 
                        with your Google account.


-----------------
Challenges Faced 
-----------------

1. The Learning Curve - This was the biggest challenge. This project was made mainly 
                        as a learning experience and to practice all of the tools used 
                        in the project. This project was my first time using NextJS, 
                        prisma, and NextAuth to make a full stack application.

2. Correct tile behavior - This was challenging because not only did the tiles have to 
                           move in the proper direction, there had to be correct merging
                           behavior, checking if the board had changed after each key press 
                           to know when to generate a new tile, as well as checking after
                           every move whether or not the player still had empty tiles or moves
                           they could make. 

3. Issues with the modals - Making the modals themselves was not a big deal. The challenge 
                            was making sure the game wouldn't react to the move keys (w, a, s, d)
                            and to make sure that the player couldn't have a bunch of modals open 
                            at the same time. 

                            While each modal has its own state variable to tell the application 
                            when to open each one, I also included a global variable using React
                            Context that tracks whether or not a modal is open in general in order
                            to halt key presses and disable the modal buttons in the nav bar to 
                            keep the player from opening multiple at a time. 

4. Working on this alone - Every part of the project was done by me alone and as a result, took a 
                           tremendous amount of time and energy. Working on this alone in addition 
                           to the learning curve resulted in this project taking several months to 
                           complete. 


-----------------------------
Features I hope to implement
-----------------------------

1. Animations - Right now, the tiles move instantaneously across the board. Right now I have no 
                experience when it comes to making animations, so it is something I will have to 
                take time to learn.

2. Multiple Saves - Right now, each player can only have one save game at a time, but later I may 
                    implement a feature to have a modal displaying a list of saved games for the 
                    player to choose from when loading. 
            


