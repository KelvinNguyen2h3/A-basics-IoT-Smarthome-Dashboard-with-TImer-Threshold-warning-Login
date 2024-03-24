To run this project, you need to
- Add the "// Your web app's Firebase configuration":
  + Go to firebase website, Go to console and Add project
  + Enter-your-project-name -> off the 'Enable Google Analytics...' (or not, optional) -> Create project
  + Add app by click on the '</>', It means website, add a nickname, Register app
  + In Add Firebase SDK, choose Use a <script> tag and add the "// Your web app's Firebase configuration" to your project you has cloned
- Add Realtime Database:
  + All products/Build/Realtime Database/Create Database/Next/Enable
  + Rules -> change ".read": false,".write": false to ".read": true,".write": true -> Publish
  + And then you need dto creat the data structure like the 'tt-iot-tuan3-default-rtdb-export.json'
- Add Authentication:
  + All products/Build/Authentication/Get started/Email/Password/Enable All/Save
  + User/Add user -> Create Email(@...) and Password
