
# Clock App

This is a **Clock App** built using **React**, with **Howler.js** for handling ringtones, and styled with **Bootstrap**. The app is deployed using **GitHub Pages**.

## Features

- **Clock Display**: Displays the current time in hours, minutes, and seconds.
- **Alarm Feature**: Set an alarm and receive a notification with sound when it triggers.
- **Custom Ringtones**: Integrated **Howler.js** for managing ringtones, allowing custom audio for alarms.
- **Responsive Design**: Styled using **Bootstrap** for a modern and responsive user interface.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Howler.js**: JavaScript audio library used for playing ringtones.
- **Bootstrap**: For styling the app and making it responsive.
- **GitHub Pages**: Deployed the app using GitHub Pages for easy access.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/clock-app.git
   cd clock-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```
![Alt text for your image](./public/sona.jpg)

## Deployment

The app is deployed using **GitHub Pages**. You can view the live demo [here](https://your-username.github.io/clock-app).

To deploy on GitHub Pages, use the following commands:
```bash
npm install gh-pages --save-dev
```

Add the following to your `package.json`:
```json
"homepage": "https://your-username.github.io/clock-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

To deploy:
```bash
npm run deploy
```

## Contributions

Feel free to fork this repository, create a new branch, and submit a pull request if you have improvements or bug fixes.
