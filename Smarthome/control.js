  // Your web app's Firebase configuration


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function switchPage(evt, pageName) {
    var i, sections, links;
    sections = document.getElementsByTagName("section");
    for (i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
    }
    links = document.getElementsByClassName("active");
    for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
    }
    var targetSection = document.getElementById(pageName);
    if (targetSection.style.display !== "flex") {
      targetSection.style.display = "flex";
      evt.currentTarget.classList.add("active");
}
}

// Hàm lấy dữ liệu trên firebase hiển thị lên web
function listenToData(roomPath, dataType, elementId) {
  firebase.database().ref(roomPath + "/" + dataType).on("value", function(snapshot) {
    var data = snapshot.val();  
    document.getElementById(elementId).innerHTML = data;
    console.log(data);
  });
}

// Nhiệt độ
listenToData("/Living_room", "Temp", "ndpk");
listenToData("/Kitchen", "Temp", "ndpb");
listenToData("/Bed_room", "Temp", "ndpn");

// Độ ẩm
listenToData("/Living_room", "Humid", "dapk");
listenToData("/Kitchen", "Humid", "dapb");
listenToData("/Bed_room", "Humid", "dapn");

// Khí gas
listenToData("/Living_room", "Gas", "kgpk");
listenToData("/Kitchen", "Gas", "kgpb");
listenToData("/Bed_room", "Gas", "kgpn");

// Ánh sáng
listenToData("/Living_room", "Light", "aspk");
listenToData("/Kitchen", "Light", "aspb");
listenToData("/Bed_room", "Light", "aspn");



//Đèn--------------------------------------------------------------------------
//-----------------------------------------------------------------------------
function controlLight(roomPath, buttonOnId, buttonOffId, imageId) {
  var buttonOn = document.getElementById(buttonOnId);
  var buttonOff = document.getElementById(buttonOffId);
  var image = document.getElementById(imageId);

  buttonOn.onclick = function() {
    image.src = "./img/bulb_on.png";
    firebase.database().ref(roomPath).update({ "DEN": "ON" });
  };

  buttonOff.onclick = function() {
    image.src = "./img/bulb_off.png";
    firebase.database().ref(roomPath).update({ "DEN": "OFF" });
  };

  firebase.database().ref(roomPath).once("value", (snapshot) => {
    if (snapshot.exists()) {
      var status = snapshot.val();
      if (status["DEN"] == "ON") {
        image.src = "./img/bulb_on.png";
      } else {
        image.src = "./img/bulb_off.png";
      }
    } else {
      console.log("No data available!");
    }
  });
}

// Phòng khách
controlLight("/Living_room", "dpk_on", "dpk_off", "dpk_img");
// Bếp
controlLight("/Kitchen", "dpb_on", "dpb_off", "dpb_img");
// Phòng ngủ
controlLight("/Bed_room", "dpn_on", "dpn_off", "dpn_img");



//Quạt--------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
function controlFan(roomPath, button0Id, button1Id, button2Id, button3Id, imageId, idRoomValue) {
  var button0 = document.getElementById(button0Id);
  var button1 = document.getElementById(button1Id);
  var button2 = document.getElementById(button2Id);
  var button3 = document.getElementById(button3Id);
  var image = document.getElementById(imageId);
  var valueDiv = document.getElementById(idRoomValue);

  button0.onclick = function() {
    image.src = "./img/fan_off.png";
    firebase.database().ref(roomPath).update({ "QUAT": 0 });
  };

  button1.onclick = function() {
    image.src = "./img/fan_on.gif";
    firebase.database().ref(roomPath).update({ "QUAT": 1 });
  };
 
  button2.onclick = function() {
    image.src = "./img/fan_on.gif";
    firebase.database().ref(roomPath).update({ "QUAT": 2 });
  };

  button3.onclick = function() {
    image.src = "./img/fan_on.gif";
    firebase.database().ref(roomPath).update({ "QUAT": 3 });
  };

  firebase.database().ref(roomPath).once("value", (snapshot) => {
    if (snapshot.exists()) {
      var status = snapshot.val();
      if (status["QUAT"] == 0) {
        image.src = "./img/fan_off.png";
      } else {
        image.src = "./img/fan_on.gif";
      }
    } else {
      console.log("No data available!");
    }
  });

  const firebaseRef = firebase.database().ref(roomPath).child('QUAT');

firebaseRef.on('value', function(snapshot) {
  var status = snapshot.val();
  valueDiv.innerHTML = status;
});
}


// Phòng khách
controlFan("/Living_room", "qpk_0", "qpk_1", "qpk_2", "qpk_3", "qpk_img", "qpk_value");
// Bếp
controlFan("/Kitchen", "qpb_0", "qpb_1", "qpb_2", "qpb_3", "qpb_img", "qpb_value");
// Phòng ngủ
controlFan("/Bed_room", "qpn_0", "qpn_1", "qpn_2", "qpn_3", "qpn_img", "qpn_value");



//Máy lạnh Slider----------------------------------------------------------------------
//-------------------------------------------------------------------------------------
function controlAirConditioner(roomPath, sliderId, sliderValueId) {
  var slider = document.getElementById(sliderId);
  var sliderValue = document.getElementById(sliderValueId);

  sliderValue.innerHTML = slider.value;

  slider.oninput = function() {
      sliderValue.innerHTML = this.value;
      var firebaseRef = firebase.database().ref(roomPath).child("MAYLANH_TEM");
      firebaseRef.set(this.value);           
  }

  firebase.database().ref(roomPath + "/MAYLANH_TEM").on("value", function(snapshot) {
      var temperature = snapshot.val();
      slider.value = temperature;
      sliderValue.innerHTML = temperature;
  });
}

// Sử dụng hàm cho từng phòng
controlAirConditioner("/Living_room", "slider_mlpk_id", "slider_mlpk_value");
controlAirConditioner("/Kitchen", "slider_mlpb_id", "slider_mlpb_value");
controlAirConditioner("/Bed_room", "slider_mlpn_id", "slider_mlpn_value");


//Switch-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
function controlSwitch(roomPath, switchId, switchImgId) {
  var switchElem = document.getElementById(switchId);
  var switchImgElem = document.getElementById(switchImgId);

  switchElem.addEventListener('change', function() {
      var status = this.checked ? "ON" : "OFF";
      var imgSrc = status === "ON" ? "./img/aircon_on.png" : "./img/aircon_off.png";
      
      switchImgElem.src = imgSrc;

      firebase.database().ref(roomPath).update({
          "MAYLANH": status
      });
  });

  firebase.database().ref(roomPath + "/MAYLANH").once('value').then(function(snapshot) {
      var status = snapshot.val();
      switchElem.checked = status === "ON";
      switchImgElem.src = status === "ON" ? "./img/aircon_on.png" : "./img/aircon_off.png";
  });
}

// Máy lạnh
controlSwitch("/Living_room", "mlpk", "mlpk_img");
controlSwitch("/Kitchen", "mlpb", "mlpb_img");
controlSwitch("/Bed_room", "mlpn", "mlpn_img");



function setupCheckboxListener(roomPath, checkboxId) {
  var checkbox = document.getElementById(checkboxId);
  
  checkbox.addEventListener('change', function() {
      var status = this.checked ? "ON" : "OFF";
      
      firebase.database().ref(roomPath).update({
          [checkboxId.toUpperCase()]: status
      });
  });
  
  firebase.database().ref(roomPath + "/" + checkboxId.toUpperCase()).once('value').then(function(snapshot) {
      var status = snapshot.val();
      checkbox.checked = status === "ON";
  });
}

// Thực hiện thiết lập cho các checkbox của phòng khách
setupCheckboxListener("/Living_room", "campk");
setupCheckboxListener("/Living_room", "tvpk");

// Thực hiện thiết lập cho các checkbox của phòng bếp
setupCheckboxListener("/Kitchen", "campb");
setupCheckboxListener("/Kitchen", "nc");
setupCheckboxListener("/Kitchen", "bd");

// Thực hiện thiết lập cho các checkbox của phòng ngủ
setupCheckboxListener("/Bed_room", "campn");
setupCheckboxListener("/Bed_room", "tvpn");
// setupCheckboxListener("/Bed_room", "music");



function setupTVChannelInput(room, inputId) {
  var channelInput = document.getElementById(inputId);

  channelInput.oninput = function() {
      var firebaseRef = firebase.database().ref("/" + room).child("TV_Channel");
      firebaseRef.set(channelInput.value);
  };

  var firebaseRef = firebase.database().ref("/" + room + "/TV_Channel");
  firebaseRef.once('value')
      .then(function(snapshot) {
          var channelValue = snapshot.val();
          channelInput.value = channelValue;
      })
      .catch(function(error) {
          console.error("Error reading TV_Channel value: " + error);
      });
}

// Thiết lập kênh truyền hình cho phòng khách
setupTVChannelInput("Living_room", "channel_tvpk");
// Thiết lập kênh truyền hình cho phòng ngủ
setupTVChannelInput("Bed_room", "channel_tvpn");




//Bếp điện------------------------------------------------------------------------
//--------------------------------------------------------------------------------
var small_fire = document.getElementById("small_fire");
var medium_fire = document.getElementById("medium_fire");
var large_fire = document.getElementById("large_fire");
small_fire.onclick = function(){
  firebase.database().ref("/Kitchen").update({
  "BEPDIEN_LUA": "SMALL"
})
}
medium_fire.onclick = function(){
  firebase.database().ref("/Kitchen").update({
  "BEPDIEN_LUA": "MEDIUM"
})
}
large_fire.onclick = function(){
  firebase.database().ref("/Kitchen").update({
  "BEPDIEN_LUA": "LARGE"
})
}

var stepDiv = document.getElementById("muc_bd");
const firebaseRef = firebase.database().ref("/Kitchen").child('BEPDIEN_LUA');

firebaseRef.on('value', function(snapshot) {
  var status = snapshot.val();
  stepDiv.innerHTML = status;
});

// Lamp----------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function controlLamp(sliderId, sliderValueId, roomPath) {
  var slider = document.getElementById(sliderId);
  var sliderValue = document.getElementById(sliderValueId);
  var lampImg = document.getElementById("lamp_img");

  sliderValue.innerHTML = slider.value;
  lampImg.style.opacity = slider.value / 5;

  slider.oninput = function() {
    sliderValue.innerHTML = this.value;
    lampImg.style.opacity = this.value / 5;

    var firebaseRef = firebase.database().ref(roomPath).child("LAMP_BRIGHTNESS");
    firebaseRef.set(this.value);
  };

  firebase.database().ref(roomPath + "/LAMP_BRIGHTNESS").on("value", function(snapshot) {
    var brightness = snapshot.val();
    slider.value = brightness;
    sliderValue.innerHTML = brightness;
    lampImg.style.opacity = brightness / 5;
  });
}

// Sử dụng hàm controlLamp
controlLamp("slider_lamp_id", "slider_lamp_value", "/Bed_room");

// Hàm toggle kết hợp cả việc cập nhật giao diện và dữ liệu trong Firebase
function toggle() {
  var button = document.getElementById("toggleButton");
  var currentStatus = button.classList.contains("on") ? "OFF" : "ON";

  // Cập nhật giao diện nút
  if (currentStatus === "ON") {
      button.innerHTML = "ON";
      button.classList.remove("off");
      button.classList.add("on");
  } else {
      button.innerHTML = "OFF";
      button.classList.remove("on");
      button.classList.add("off");
  }

  // Cập nhật dữ liệu trong Firebase
  firebase.database().ref('Living_room/WIFI').set(currentStatus);
}

// Khi trang được tải, thiết lập lắng nghe sự thay đổi trong dữ liệu Firebase
firebase.database().ref('Living_room/WIFI').on('value', function(snapshot) {
  var wifiStatus = snapshot.val();
  updateToggleButton(wifiStatus);
});

// Hàm cập nhật trạng thái của nút khi dữ liệu trong Firebase thay đổi
function updateToggleButton(wifiStatus) {
  var button = document.getElementById("toggleButton");
  if (wifiStatus === "ON") {
      button.innerHTML = "ON";
      button.classList.remove("off");
      button.classList.add("on");
  } else {
      button.innerHTML = "OFF";
      button.classList.remove("on");
      button.classList.add("off");
  }
}