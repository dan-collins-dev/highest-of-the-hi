# Highest of the HI
Highest of the HI is a fictional service that allows developers of arcade-style games to sign up and have their games' hi-scores displayed to the public. The back-end is an API built specifically for this project.

## Technologies Used
| Tool       |  version  |
|------------|-----------|
| Node.js    | `v20.10.0`|
|  npm       | `10.2.5`  |
| Express.js |  `4.19.2` |

## Installation
1. Install [Node.js](https://nodejs.org/en)
2. Open your terminal and run `node -v` and `npm -v`. These versions should be `>=` `v20.10.0` and `10.2.5` respectively.
3. Run `git clone https://github.com/dan-collins-dev/highest-of-the-hi.git` in the directory of your choice.
4. CD into the cloned directory.
5. Run `npm install` to install required packages
6. To start the development server, run `npm run dev`
7. In your browser, go to `http://localhost:6500`

## Goals of this Project
- Demonstrate my current knowledge of responsive web design
- Demonstrate my current understanding of how to consume and create REST API's

## Connecting Your Game
If you'd like to test this mock service out with your own game, follow these steps.

1. Once the app is being served, click on the Sign-Up button.
2. Enter your game's name, your developer name, and cover art for your game.
3. After clicking the Submit button, an ID will be generated for you.
4. You can GET and POST scores to the endpoint `http://localhost:6500/api/scores/[YourGeneratedID]`

If you'd like to play the game I made specifically for this project, you can clone it from [this repo](https://github.com/dan-collins-dev/orbital-defense).