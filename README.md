# shifts_app_assignment

The application Includes:

* __My shifts__
  * lists all booked shifts
  * shifts are grouped by dates
  * shifts can be cancelled


* __Available shifts__
  * filter shifts by the city
  * shifts are grouped by dates
  * shifts can be booked or cancelled

Considerations:

* If a shift already started you will look started label and the book or cancel button blocked
* If a shift is already finished it will be filtered by the list
* If Shift overlaps with booked shift above makes reservation button disabled
* Available shifts has the main filter by city name
* I used native indicator instead of SVG assets to show loading actions because RN doesn't support SVG animations, to support them we should use Lottie library or create the animation from scratch and that takes more time

How does the project look like? https://monosnap.com/file/ToGMVTwtE8jZOA1HguJ7RKTSZIO63v

## Necessary setup to run API locally
1. Clone the project https://github.com/woltapp/react-native-assignment
2. Use nvm to install latest node version available
3. Run `npm i` to install libraries
4. Run `npm start` to start the local API it should run in http://127.0.0.1:8080
5. Follow the next step for local setup of shifts_app_assignment

## Local setup shifts_app_assignment
1. You should setup your RN env if you haven't it yet https://reactnative.dev/docs/environment-setup
2. Clone the project
3. Use nvm to install latest node version available
4. Run `npm i` to install libraries
5. Run `npx pod-install ios` to install cocoapods libraries
6. Run `npm run ios` to start the project in IOS or Run `npm run android` to start the project in Android
