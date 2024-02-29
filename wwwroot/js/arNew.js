var dataVA = [
    { latitude: 10.79975224771338, longitude: 106.70103220154627 },
    { latitude: 10.799774642678182, longitude: 106.70107243467827 },
    { latitude: 10.799700212347506, longitude: 106.70111467946687 },
    { latitude: 10.799676500025885, longitude: 106.70106841136506 }
]
var datachungCuMyPhuoc = [
    { latitude: 10.800125296185898, longitude: 106.7017088672338 },
    { latitude: 10.800130779289834, longitude: 106.70192576695544 },
    { latitude: 10.799596567834131, longitude: 106.70223038349812 },
    { latitude: 10.799505704791214, longitude: 106.70206372158573 }
]

var src_tatekanban = "/img/tatekanban_new.png";
var oldLocation = null;
var isCreated = false;
var locationInsideId = null;
var arrLocation = [];
var sizeImgTatekanban = 20;
var sizeTextTatekanban = 10;
//-------------------------------------------------------------------

var data = [
    { name: "Nhà VA", polygon: dataVA },
    { name: "chung cư Mỹ Phước", polygon: datachungCuMyPhuoc },
    // { name: "Báo tuổi trẻ", polygon: data_Sorimachi },
    /*    { name: "Ủy ban nhân dân", polygon: dataUyBanPN },
        { name: "Aroma Tieng Anh", polygon: dataAroma },
        { name: "VietCombank", polygon: dataVietCombank },
        { name: "Nhà chị Luyên", polygon: data_Luyen },
        { name: "Nhà sách mực tím", polygon: data_Luyen_NhaSach },
        { name: "Bún đậu mắm tôm", polygon: data_bundau },
        { name: "Thế giới di động", polygon: data_TGDD },*/
];

//Fix the conflict in jquery
(function () {
    if (typeof EventTarget !== 'undefined') {
        let supportsPassive = false;
        try {
            // Test via a getter in the options object to see if the passive property is accessed
            const opts = Object.defineProperty({}, 'passive', {
                get: () => {
                    supportsPassive = true;
                },
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) { }
        const func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn) {
            this.func = func;
            this.func(type, fn, supportsPassive ? { passive: false } : false);
        };
    }
})();

//Program Run
window.onload = () => {
    const el = document.querySelector("[gps-new-camera]");
    alert("123")
    el.addEventListener("gps-camera-update-position", e => {
        var my_location = { latitude: e.detail.position.latitude, longitude: e.detail.position.longitude };
        //alert(my_location.latitude + " " + my_location.longitude);
        if (isCreated == false) {
            google.maps.Polygon.prototype.my_getBounds = function () {
                var bounds = new google.maps.LatLngBounds()
                this.getPath().forEach(function (element, index) { bounds.extend(element) })
                return bounds
            }
            CreateArrPolygon();
            InitImage(my_location);
            isCreated = true;
        } else {
            UpdateGPSCamera(my_location);
        }
    });


};

//Create Polygon 
function CreateArrPolygon() {
    for (var i = 0; i < data.length; i++) {
        var polygonGG = CreatePolyGon(data[i].polygon);
        arrLocation.push(polygonGG);
    }
}

function UpdateGPSCamera(my_location) {
    //alert(my_location.latitude + " " + my_location.longitude);
    var locationGG = new google.maps.LatLng(my_location.latitude, my_location.longitude);
    for (var i = 0; i < data.length; i++) {
        if (CheckIsWithinPolygon(locationGG, arrLocation[i])) {
            UpdateTatekanbanInside(i);
        } 
    }
}

//Create polygon google map
function CreatePolyGon(arr) {
    var path = new Array;
    var path2 = new Array;
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        path.push(new google.maps.LatLng(element.latitude, element.longitude))

        path2.push({ lat: element.latitude, lng: element.longitude })
    }
    polygon = new google.maps.Polygon({ paths: path2 });
    return polygon;
}

//Init image pin location
function InitImage(my_location) {
    var locationGG = new google.maps.LatLng(my_location.latitude, my_location.longitude);
    const scene = document.querySelector('a-scene');
    
    for (var i = 0; i < data.length; i++) {
        var sizeImg = sizeImgTatekanban;
        var sizeText = sizeTextTatekanban
        var CenterPointGG = arrLocation[i].my_getBounds().getCenter();
        var cenPoint = { latitude: CenterPointGG.lat(), longitude: CenterPointGG.lng() };
        if (CheckIsWithinPolygon(locationGG, arrLocation[i])) {
            alert(data[i].name + "にいます❣");
            sizeImg = sizeImg - 2;
            sizeText = sizeText - 2;
            locationInsideId = i;
        }
        var tatekanban = CreateImageTatekanban(data[i], i, cenPoint, sizeImg, sizeText);
        scene.appendChild(tatekanban);
        arrLocation.push(tatekanban);

    }

}
//Check My location is in polygon
function CheckIsWithinPolygon(coordinate, polygon) {
    return google.maps.geometry.poly.containsLocation(coordinate, polygon);
}

function CreateImageTatekanban( data, i,centerPoint,sizeImg,sizeText) {

    var assests = document.querySelector('a-assets');

    var text_tatekanban_img = document.createElement('img');
    text_tatekanban_img.id = `text_tatekanban_${i}`;

    // Create a canvas element
    var canvas = document.createElement('canvas');

    // Get the 2D context
    var context = canvas.getContext('2d');

    // Set font and text properties
    context.font = '35px Arial';
    context.fillStyle = '#000000';
    var textX = canvas.width / 2 - context.measureText(data.name).width / 2;
    var textY = canvas.height / 2;

    // Draw the text on the canvas
    context.fillText(data.name, textX, textY);

    //get Url data
    text_tatekanban_img.src = canvas.toDataURL();
    assests.appendChild(text_tatekanban_img);

    const image = document.createRange().createContextualFragment(`
        <a-entity  gps-new-entity-place="latitude: ${centerPoint.latitude}; longitude: ${centerPoint.longitude};" look-at=[camera] >
                 <a-image id="imgTatekanban_${i}" src="${src_tatekanban}" scale="${sizeImg} ${sizeImg} ${sizeImg}" ></a-image>
                 <a-image id="textTatekanban_${i}" src="#text_tatekanban_${i}" scale="${sizeText} ${sizeText} ${sizeText}" position="0 2 0.65" ></a-image>
        </a-entity>
    `);
    return image;
}



//Find nearst point from my location
function FindNearstPoint(my_location, polygon) {
    var lat, long;
    var distance = 0;
    for (var i = 0; i < polygon.length; i++) {
        var cur_distance = DistanceBetweenPoints(my_location, polygon[i]);
        if (distance == 0 || cur_distance < distance) {
            distance = cur_distance;
            lat = polygon[i].latitude;
            long = polygon[i].longitude;
        }
    }
    return { latitude: lat, longitude: long, distance: distance };
}

//Cal distance between 2 point
function DistanceBetweenPoints(pointA, pointB) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pointA.latitude, pointA.longitude), new google.maps.LatLng(pointB.latitude, pointB.longitude));
    return distance;
/*    return Math.sqrt((pointA.latitude - pointB.latitude) * (pointA.latitude - pointB.latitude) + (pointA.longitude - pointB.longitude) * (pointA.longitude - pointB.longitude));*/
}

//Check this tatekanban is inside ?
function UpdateTatekanbanInside(i) {
    if (locationInsideId != i) {

        //Make inside tatekanban into normal
        var imgBeforeTatekanban = document.getElementById(`imgTatekanban_${locationInsideId}`);
        var textBeforeTatekanban = document.getElementById(`textTatekanban_${locationInsideId}`);
        imgBeforeTatekanban.setAttribute('scale', `${sizeImgTatekanban} ${sizeImgTatekanban} ${sizeImgTatekanban}`);
        textBeforeTatekanban.setAttribute('scale', `${sizeTextTatekanban} ${sizeTextTatekanban} ${sizeTextTatekanban}`);

        //Make current tatekanban into inside
        var imgTatekanban = document.getElementById(`imgTatekanban_${i}`);
        var textTatekanban = document.getElementById(`textTatekanban_${i}`);

        imgTatekanban.setAttribute('scale', `${sizeImgTatekanban - 2} ${sizeImgTatekanban - 2} ${sizeImgTatekanban - 2}`);
        textTatekanban.setAttribute('scale', `${sizeTextTatekanban - 2} ${sizeTextTatekanban - 2} ${sizeTextTatekanban - 2}`);
       

    }
}