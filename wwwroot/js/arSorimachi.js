// ------------------------------------Data--------------------------
var data_Sorimachi = [
    { latitude: 10.7998171721485, longitude: 106.678411861847 },
    { latitude: 10.7998991736088, longitude: 106.678087985109 },
    { latitude: 10.8001323445217, longitude: 106.67846617658 },
    { latitude: 10.7998820480543, longitude: 106.678735738586 },
    { latitude: 10.7995019997753, longitude: 106.6783618927 },
    { latitude: 10.7996054043478, longitude: 106.678289150785 },
    { latitude: 10.7998991736088, longitude: 106.678087985109 }
];
var data_Luyen = [
    { latitude: 10.83914596900325, longitude: 106.79742414463762 },
    { latitude: 10.83894180636945, longitude: 106.79723035505761 },
    { latitude: 10.839017544136947, longitude: 106.79706472866916 },
    { latitude: 10.839189435868569, longitude: 106.79721761456618 }
]
var data_Luyen_NhaSach = [
    { latitude: 10.83984575603595, longitude: 106.79683733850582 },
    { latitude: 10.839786829169048, longitude: 106.79691616943926 },
    { latitude: 10.839670917745522, longitude: 106.79682631544713 },
    { latitude: 10.839728873462901, longitude: 106.7967505430508 }
]

var data_bundau = [
    { latitude: 10.839506771418405, longitude: 106.79720268636233 },
    { latitude: 10.839461206208712, longitude: 106.79726766809952 },
    { latitude: 10.83939600596755, longitude: 106.79721201226859 },
    { latitude: 10.839439466178474, longitude: 106.79714762682178 },
]

var data_TGDD = [
    { latitude: 10.840119855732384, longitude: 106.79638705665327 },
    { latitude: 10.840052679872864, longitude: 106.79643064255019 },
    { latitude: 10.839967722146413, longitude: 106.79631262535298 },
    { latitude: 10.840034239438449, longitude: 106.79625495785959 },
]


var dataUyBanPN = [
    { latitude: 10.800238702262698, longitude: 106.67790923749516 },
    { latitude: 10.800204451193762, longitude: 106.67796288166538 },
    { latitude: 10.800173493492142, longitude: 106.67794745896525 },
    { latitude: 10.800160978675683, longitude: 106.67797696326116 },
    { latitude: 10.80017744553933, longitude: 106.6778750393298 },
]

var dataAroma = [
    { latitude: 10.799151734378974, longitude: 106.67882794541399 },
    { latitude: 10.799142307826175, longitude: 106.6789892565667 },
    { latitude: 10.799031207628733, longitude: 106.67898744438929 },
    { latitude: 10.799016924737602, longitude: 106.67882399254894 },
]

var dataVietCombank = [
    { latitude: 10.799214148156763, longitude: 106.67801454631186 },
    { latitude: 10.799197022563627, longitude: 106.67824521626176 },
    { latitude: 10.79900403023501, longitude: 106.67823582853124 },
    { latitude: 10.799016389576135, longitude: 106.67800676078735 },
]
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

var data = [
    { name: "Nhà VA", polygon: dataVA },
    { name: "Chung cư mỹ phước", polygon: datachungCuMyPhuoc },
    // { name: "Báo tuổi trẻ", polygon: data_Sorimachi },
/*    { name: "Ủy ban nhân dân", polygon: dataUyBanPN },
    { name: "Aroma Tieng Anh", polygon: dataAroma },
    { name: "VietCombank", polygon: dataVietCombank },
    { name: "Nhà chị Luyên", polygon: data_Luyen },
    { name: "Nhà sách mực tím", polygon: data_Luyen_NhaSach },
    { name: "Bún đậu mắm tôm", polygon: data_bundau },
    { name: "Thế giới di động", polygon: data_TGDD },*/
]

var src_pin_location = "/img/pin_location.png";
var src_tatekanban = "/img/tatekanban.png";
var oldLocation = null;

var locationInside = null;
var arrLocation = [];
//-------------------------------------------------------------------


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

//Program run
$(function () {
    InitLocation();

});

// init location
function InitLocation() {
    if (navigator.geolocation) {
        console.log("Get Location");
        watchPosition = navigator.geolocation.watchPosition(WatchCurrentPosition, errorCallback);
    } else {
        alert("現在地の取得に失敗しました。");
    }
}


//Get location success
function WatchCurrentPosition(position) {
    console.log("Get Location success");
    InitImage(position.coords);
}

//Error when can't get location
function errorCallback(error) {
    console.log('error', error);
}


//Init image pin location
function InitImage(my_location) {
    //var locationGG = new google.maps.LatLng(my_location.latitude, my_location.longitude);
    const scene = document.querySelector('a-scene');
    if (arrLocation.length == 0) {
        console.log("Init Image");

        for (var i = 0; i < data.length; i++) {
            //Check Inside Polygon

            //var polygonGG = CreatePolyGon(data[i].polygon);
            /*if (CheckIsWithinPolygon(locationGG, polygonGG)) {*/
            /*if (data[i].name == 'Nhà VA') {
                alert("Inside " + data[i].name);
                var tatekanban = CreateImageTatekanbanInside(my_location, data[i].name, i);
                locationInside = data[i];
            } else {
                var tatekanban = CreateImageTatekanban(my_location, data[i], i);
            }*/
            var nearstPoint = FindNearstPoint(my_location, data[i].polygon);
            alert(nearstPoint.distance);
            if (nearstPoint.distance < 0.0005) {
                var tatekanban = CreateImageTatekanban(my_location, data[i], i);
            } else {
                var tatekanban = CreateImageTatekanban(my_location, data[i], i);
            }
            
            scene.appendChild(tatekanban);
            arrLocation.push(tatekanban);

        }
    } else {

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


// When inside, create tatekanban
function CreateImageTatekanbanInside(my_location, name, i) {
    console.log("created tatekanban");
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
    var textX = canvas.width / 2 - context.measureText(name).width / 2;
    var textY = canvas.height / 2;

    // Draw the text on the canvas
    context.fillText(name, textX, textY);

    //get Url data
    text_tatekanban_img.src = canvas.toDataURL();
    assests.appendChild(text_tatekanban_img);
    console.log(my_location);
    const image = document.createRange().createContextualFragment(`
        <a-entity  gps-new-entity-place="latitude: ${my_location.latitude -0.055}; longitude: ${my_location.longitude};" >
                <a-image src="#pinLocation" scale="1 1 1" look-at=[camera] ></a-image>
                <a-entity position="0 2 0" >
                     <a-image src="${src_tatekanban}" ></a-image>
                     <a-image src="#text_tatekanban_${i}" position="0 0 -0.5"  ></a-image>
                </a-entity>
        </a-entity>
    `);
    return image;
}

//Check My location is in polygon
function CheckIsWithinPolygon(coordinate, polygon) {
    return google.maps.geometry.poly.containsLocation(coordinate, polygon);
}

function CreateImageTatekanban(my_location, data, i) {

    var assests = document.querySelector('a-assets');
    var NearstPoint = FindNearstPoint(my_location, data.polygon);
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
        <a-entity  gps-new-entity-place="latitude: ${NearstPoint.latitude}; longitude: ${NearstPoint.longitude};" look-at=[camera]>
             <a-image src="#pinLocation" scale="7 7 7"></a-image>
             <a-entity position="0 13 0">
                 <a-image src="${src_tatekanban}" scale="12 12 12"></a-image>
                 <a-image src="#text_tatekanban_${i}" scale="5 5 5" position="0 0 0.5" ></a-image>
            </a-entity>  
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
   /* var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pointA.latitude, pointA.longitude), new google.maps.LatLng(pointB.latitude, pointB.longitude));
    return distance;*/
     return Math.sqrt((pointA.latitude - pointB.latitude) * (pointA.latitude - pointB.latitude) + (pointA.longitude - pointB.longitude) * (pointA.longitude - pointB.longitude))
}

