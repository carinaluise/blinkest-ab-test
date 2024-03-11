# Blog AB-Testing

<b>🚀 deployed on [surge](https://ab-testing-blog.surge.sh/)</b>

This project is an [Astro](https://astro.build/) blog application that uses A/B testing for tracking user interactions. It allows users to read blog posts and tracks page views and their interactions with buttons using A/B variant tracking.

![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

- Node.js installed on your machine (`v18.14.1` or higher.)
- Text editor
- Terminal - Astro is accessed through its command-line interface (CLI).
- npm or yarn package manager

### Installation

1. Clone the repository to your local machine:

```
git clone git@github.com:carinaluise/blinkest-ab-test.git
```

2. Navigate to the project directory:

```
cd blinkest-ab-test
```

3. Install dependencies using yarn or npm:

Using yarn:

```
yarn install
```

Using npm:

```
npm install
```

### Running the Application

To run the Astro blog application locally, use the following command:

Using yarn:

```
yarn start
```

Using npm:

```
npm start
```

The application will start locally and can be accessed at [http://localhost:4321/](http://localhost:4321/) in your web browser.

## Tracking User Interactions

This project implements A/B testing for tracking page views and user interactions with buttons. Here's how it works:

- A/B variant tracking is implemented using localStorage to store the user's variant.
- When a user visits the application, a random variant (either "control" or "test") is assigned and stored in localStorage.
- Only content with `data-ab` attribute matching the varient keyname (or fixed content with no `data-ab` attribute) will be rendered.
- The application tracks page views and user interactions with buttons, as well as recording unique clicks using localStorage.
- A tracking event is fired when a user loads the page, and it includes information about the page and varient.
- A tracking event is fired when a button is clicked, and it includes information about the page, variant, and event type.
- All (currently implemented) tracking events will be recorded, however the unique = true key will only be fired once per unique user (regardless of how many times user refreshes page or clicks on button). This will mean that using the API later on developer could store both unique clicks and total clicks. As a user can only effectively convert aka signup once, the counts for the CTR computation need to be unique per user. So a single user clicking ten times and reloading the page 5 times should still be only counted as one converted user. Using a unique key for unique click/page views will make calculating the CTR more accurate.

Improvements:

- Implement tracking across links as well as buttons
- Implement tracking on homepage (currently this is only set up within blog post template)
- Store unique click event values as an object to clean up storage or use cookies
- Implement data processing in API, send through JS objects or snakecased strings instead of current imitation(example) strings to API.
- Conditionally render html based on varient type instead of using js to remove element
- Implement TS properly
- Add a landing page as index instead of the blog/ organize url structure better
