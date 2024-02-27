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
    { latitude: 10.840034239438449, longitude:  106.79625495785959  },
]


var dataUyBanPN = [
    { latitude: 10.800238702262698, longitude: 106.67790923749516 },
    { latitude: 10.800204451193762, longitude: 106.67796288166538 },
    { latitude: 10.800173493492142, longitude: 106.67794745896525 },
    { latitude: 10.800160978675683, longitude: 106.67797696326116 },
    { latitude: 10.80017744553933,  longitude: 106.6778750393298 },
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

var dataLiendoan = [
    { latitude: 10.799622274684747, longitude: 106.67843450629233 },
    { latitude: 10.799756260451595, longitude: 106.67858653731433 },
    { latitude: 10.799699037370978, longitude: 106.67864621304257 },
    { latitude: 10.799639022908861, longitude: 106.67858369561299 },
    { latitude: 10.79960122906476, longitude: 106.67863098241675 },
    { latitude: 10.799522187959392, longitude:  106.67851967075488 }
]
var dataSang = [
    { latitude: 10.78091361749272, longitude: 106.6508851429197 },
    { latitude: 10.78107188830222, longitude: 106.65089146734765 },
    { latitude: 10.781075220943432, longitude: 106.65083969520745 },
    { latitude: 10.78091647025328, longitude: 106.65083231913346 }
]
var dataSauNhu = [
    { latitude: 10.780869680473089, longitude: 106.65087760176131 },
    { latitude: 10.78087099790675, longitude: 106.65090375329635 },
    { latitude: 10.780770872931942, longitude: 106.65091247047467 },
    { latitude: 10.780768447246013, longitude: 106.65088211042914 },
]

var data = [
/*    { name: "Sangの家", polygon: dataSang },
    { name: "Sau Như", polygon: dataSauNhu },*/
    { name: "労働組合", polygon: dataLiendoan },
   { name: "ソリマチ会社", polygon: data_Sorimachi },
    { name: "PhuNhuan人民委員会" , polygon: dataUyBanPN },
    { name: "Aroma英語", polygon: dataAroma },
    { name: "VietCom銀行", polygon: dataVietCombank },
    { name: "Nhà chị Luyên", polygon: data_Luyen },
    { name: "Nhà sách mực tím", polygon: data_Luyen_NhaSach },
    { name: "Bún đậu mắm tôm", polygon: data_bundau },
    { name: "Thế giới di động", polygon: data_TGDD },
]

var src_pin_location = "/Content/images/pin_location.png";
var src_tatekanban = "/Content/images/tatekanban.png";
var oldLocation = null;

var locationInside = null;
var arrLocation = [];
var isCreated = false;

var custormDistance = 10;
var sizePinLocationLessThanDistance = 3;
var posTatekanbanLessThanDistance = 5;
var sizeImgTatekanbanLessThanDistance = 7.5;
var sizeTextTatekanbanLessThanDistance = 4;


var sizePinLocation = 8;
var posTatekanban = 10;
var sizeImgTatekanban = 12;
var sizeTextTatekanban = 5;

var sizePinLocationInside = 1;
var posTatekanbanInside = 3;
var sizeImgTatekanbanInside = 4;
var sizeTextTatekanbanInside = 2.5;
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
    google.maps.Polygon.prototype.my_getBounds = function () {
        var bounds = new google.maps.LatLngBounds()
        this.getPath().forEach(function (element, index) { bounds.extend(element) })
        return bounds
    }
    CreateArrPolygon();
    InitLocation();

});
//Create Polygon 
function CreateArrPolygon() {
    for (var i = 0; i < data.length; i++) {
        var polygonGG = CreatePolyGon(data[i].polygon);
        arrLocation.push(polygonGG);
    }
}

// init location
function InitLocation() {
    if (navigator.geolocation) {
        watchPosition = navigator.geolocation.watchPosition(WatchCurrentPosition, errorCallback);
    } else {
        alert("現在地の取得に失敗しました。");
    }
}


//Get location success
function WatchCurrentPosition(position) {

    // Set location per second
    InitImage(position.coords);
}

//Error when can't get location
function errorCallback(error) {
    console.log('error', error);
}


//Init image pin location
function InitImage(my_location) {
    var locationGG = new google.maps.LatLng(my_location.latitude, my_location.longitude);
    const scene = document.querySelector('a-scene');
    if (isCreated == false) {
        console.log("Init Image");
        //var kaisha_location = new google.maps.LatLng(10.799794, 106.678385);
        for (var i = 0; i < data.length; i++) {
            //Check Inside Polygon
            var CenterPoint = arrLocation[i].my_getBounds().getCenter();
            //console.log(polygonGG.my_getBounds().getCenter().lat(), polygonGG.my_getBounds().getCenter().lng());
            if (CheckIsWithinPolygon(locationGG, arrLocation[i])) {
                alert("Inside " + data[i].name);
                var tatekanban = CreateImageTatekanbanInside(data[i].name, i, { latitude: CenterPoint.lat(), longitude: CenterPoint.lng() });
                locationInside = data[i];
            } else {
                var tatekanban = CreateImageTatekanban(my_location, data[i], i, { latitude: CenterPoint.lat(), longitude: CenterPoint.lng() });
            }
            scene.appendChild(tatekanban);
        }
        isCreated = true;
    } else {
        for (var index = 0; index < data.length; index++) {
            //var kaisha_location = new google.maps.LatLng(10.799794, 106.678385);
            if (!CheckIsWithinPolygon(locationGG, arrLocation[index])) {
                var NearstPoint = FindNearstPoint(my_location, data[index].polygon);
                /*if (NearstPoint.distance < 30) {
                    UpdateTatekanban(index);
                } else {
                    CheckTatekanban(index);
                }*/
                CheckDistanceTatekanban(index, NearstPoint.distance);
            } else {
                UpdateTatekanbanInside(index);
                //var NearstPoint = FindNearstPoint(my_location, data[index].polygon);
               
            }
            
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


// When inside, create tatekanban
function CreateImageTatekanbanInside(name, i, my_location) {
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
    const image = document.createRange().createContextualFragment(`
        <a-entity gps-new-entity-place="latitude: ${my_location.latitude}; longitude: ${my_location.longitude};">
                <a-image id="pinlocation_${i}" src="#pinLocation" scale="${sizePinLocationInside} ${sizePinLocationInside} ${sizePinLocationInside} " look-at=[camera]   ></a-image>
                <a-entity id="tatekanban_${i}" position="0 ${posTatekanbanInside} 0" look-at=[camera]>
                     <a-image id="imgTatekanban_${i}" scale="${sizeImgTatekanbanInside} ${sizeImgTatekanbanInside} ${sizeImgTatekanbanInside}" src="${src_tatekanban}" ></a-image>
                     <a-image id="textTatekanban_${i}" scale="${sizeTextTatekanbanInside} ${sizeTextTatekanbanInside} ${sizeTextTatekanbanInside}" src="#text_tatekanban_${i}" position="0 0 0.5"  ></a-image>
                </a-entity>
        </a-entity>
    `);
    return image;
}

//Check My location is in polygon
function CheckIsWithinPolygon(coordinate, polygon) {
    return google.maps.geometry.poly.containsLocation(coordinate, polygon);
}


function CreateImageTatekanban(my_location, data, i,centerPoint) {

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
    /*if (NearstPoint.distance < 30) {
        const image = document.createRange().createContextualFragment(`
        <a-entity  gps-new-entity-place="latitude: ${centerPoint.latitude}; longitude: ${centerPoint.longitude};" look-at=[camera] >
             <a-image id="pinlocation_${i}" src="#pinLocation" scale="3 3 3"></a-image>
             <a-entity id="tatekanban_${i}" position="0 5 0">
                 <a-image id="imgTatekanban_${i}" src="${src_tatekanban}" scale="7.5 7.5 7.5"></a-image>
                 <a-image id="textTatekanban_${i}" src="#text_tatekanban_${i}" scale="4 4 4" position="0 0 0.5" ></a-image>
            </a-entity>  
        </a-entity>
    `);
        return image;
    } else {
        const image = document.createRange().createContextualFragment(`
        <a-entity gps-new-entity-place="latitude: ${centerPoint.latitude}; longitude: ${centerPoint.longitude};" look-at=[camera] >
             <a-image id="pinlocation_${i}" src="#pinLocation" scale="7 7 7" ></a-image>
             <a-entity id="tatekanban_${i}" position="0 13 0">
                 <a-image id="imgTatekanban_${i}"  src="${src_tatekanban}" scale="12 12 12"></a-image>
                 <a-image id="textTatekanban_${i}" src="#text_tatekanban_${i}" scale="6 6 6" position="0 0 0.5" ></a-image>
            </a-entity>  
        </a-entity>
    `);
        return image;
    }*/
    const image = document.createRange().createContextualFragment(`
        <a-entity gps-new-entity-place="latitude: ${centerPoint.latitude}; longitude: ${centerPoint.longitude};" look-at=[camera] >
             <a-image id="pinlocation_${i}" src="#pinLocation" scale="${sizePinLocation} ${sizePinLocation} ${sizePinLocation}" ></a-image>
             <a-entity id="tatekanban_${i}" position="0 ${posTatekanban} 0">
                 <a-image id="imgTatekanban_${i}"  src="${src_tatekanban}" scale="${sizeImgTatekanban} ${sizeImgTatekanban} ${sizeImgTatekanban}"></a-image>
                 <a-image id="textTatekanban_${i}" src="#text_tatekanban_${i}" scale="${sizeTextTatekanban} ${sizeTextTatekanban} ${sizeTextTatekanban}" position="0 0 0.5" ></a-image>
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
    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pointA.latitude, pointA.longitude), new google.maps.LatLng(pointB.latitude, pointB.longitude));
    return distance;
    // return Math.sqrt((pointA.latitude - pointB.latitude) * (pointA.latitude - pointB.latitude) + (pointA.longitude - pointB.longitude) * (pointA.longitude - pointB.longitude))
}
//Update tatekanban when near <30 meter
function UpdateTatekanban( i) {
    var pinLocation = document.getElementById(`pinlocation_${i}`);
    var tatekanban = document.getElementById(`tatekanban_${i}`);
    var imgTatekanban = document.getElementById(`imgTatekanban_${i}`);
    var textTatekanban = document.getElementById(`imgTatekanban_${i}`);
    //Set pin location
    pinLocation.setAttribute('scale', '3 3 3');
    tatekanban.setAttribute('position', '0 5 0');
    imgTatekanban.setAttribute('scale', '7.5 7.5 7.5');
    textTatekanban.setAttribute('scale', '4 4 4');
}

//Check tatekanban attribute 
function CheckTatekanban(i) {
    var pinLocation = document.getElementById(`pinlocation_${i}`);
    var tatekanban = document.getElementById(`tatekanban_${i}`);
    var imgTatekanban = document.getElementById(`imgTatekanban_${i}`);
    var textTatekanban = document.getElementById(`imgTatekanban_${i}`);

    if (pinLocation.getAttribute('scale').x != 7 ) {
        pinLocation.setAttribute('scale', '7 7 7');
        tatekanban.setAttribute('position', '0 13 0');
        imgTatekanban.setAttribute('scale', '12 12 12');
        textTatekanban.setAttribute('scale', '6 6 6');
    } 
}
//Check this tatekanban is inside ?
function UpdateTatekanbanInside(i) {
    var pinLocation = document.getElementById(`pinlocation_${i}`);
    var tatekanban = document.getElementById(`tatekanban_${i}`);
    var imgTatekanban = document.getElementById(`imgTatekanban_${i}`);
    var textTatekanban = document.getElementById(`imgTatekanban_${i}`);
    if (pinLocation.getAttribute('scale').x != 1) {
        pinLocation.setAttribute('scale', '1 1 1');
        tatekanban.setAttribute('position', '0 3 0');
        imgTatekanban.setAttribute('scale', '4 4 4');
        textTatekanban.setAttribute('scale', '2.5 2.5 2.5');
    }
}
function CheckDistanceTatekanban(i, distance) {
    var pinLocation = document.getElementById(`pinlocation_${i}`);
    var tatekanban = document.getElementById(`tatekanban_${i}`);
    var imgTatekanban = document.getElementById(`imgTatekanban_${i}`);
    var textTatekanban = document.getElementById(`imgTatekanban_${i}`);
    if (distance <= 10) {
        const scaleFactor = Math.min(1, distance / 10);
        const newpinLocationScale = new THREE.Vector3().lerpVectors(new THREE.Vector3(sizeImgTatekanbanLessThanDistance, sizeImgTatekanbanLessThanDistance, sizeImgTatekanbanLessThanDistance), new THREE.Vector3(sizeImgTatekanban, sizeImgTatekanban, sizeImgTatekanban), scaleFactor);
        const newtatekanbanScale = new THREE.Vector3().lerpVectors(new THREE.Vector3(0, posTatekanbanLessThanDistance, 0), new THREE.Vector3(0, posTatekanban, 0), scaleFactor);
        const newimgTatekanbanScale = new THREE.Vector3().lerpVectors(new THREE.Vector3(sizeImgTatekanbanLessThanDistance, sizeImgTatekanbanLessThanDistance, sizeImgTatekanbanLessThanDistance), new THREE.Vector3(sizeImgTatekanban, sizeImgTatekanban, sizeImgTatekanban), scaleFactor);
        const newtextTatekanbanScale = new THREE.Vector3().lerpVectors(new THREE.Vector3(sizeTextTatekanbanLessThanDistance, sizeTextTatekanbanLessThanDistance, sizeTextTatekanbanLessThanDistance), new THREE.Vector3(5, 5, 5), scaleFactor);
        pinLocation.setAttribute('scale', `${newpinLocationScale.x} ${newpinLocationScale.y} ${newpinLocationScale.z}`);
        tatekanban.setAttribute('position', `${newtatekanbanScale.x} ${newtatekanbanScale.y} ${newtatekanbanScale.z}`);
        imgTatekanban.setAttribute('scale', `${newimgTatekanbanScale.x} ${newimgTatekanbanScale.y} ${newimgTatekanbanScale.z}`);
        textTatekanban.setAttribute('scale', `${newtextTatekanbanScale.x} ${newtextTatekanbanScale.y} ${newtextTatekanbanScale.z}`);
        //alert(`${data[i].name} pinlocation_${i}` + '\n' + newpinLocationScale.x + " " + newpinLocationScale.y + " " + newpinLocationScale.z + `\n tatekanban_${i}` + '\n' + newtatekanbanScale.x + " " + newtatekanbanScale.y + " " + newtatekanbanScale.z + ` \n imgTatekanban_${i}` + '\n' + newimgTatekanbanScale.x + " " + newimgTatekanbanScale.y + " " + newimgTatekanbanScale.z + `\n textTatekanban_${i}` + '\n' + newtextTatekanbanScale.x + " " + newtextTatekanbanScale.y + " " + newtextTatekanbanScale.z);
    } else {
        if (pinLocation.getAttribute('scale').x != sizePinLocation) {
            pinLocation.setAttribute('scale', `${sizePinLocation} ${sizePinLocation} ${sizePinLocation}`);
            tatekanban.setAttribute('position', `0 ${posTatekanban} 0`);
            imgTatekanban.setAttribute('scale', `${sizeImgTatekanban} ${sizeImgTatekanban} ${sizeImgTatekanban}`);
            textTatekanban.setAttribute('scale', `${sizeTextTatekanban} ${sizeTextTatekanban} ${sizeTextTatekanban}`);
        }
    }
}
