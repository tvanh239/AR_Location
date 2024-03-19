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

var dataLiendoan = [
    { latitude: 10.799622274684747, longitude: 106.67843450629233 },
    { latitude: 10.799756260451595, longitude: 106.67858653731433 },
    { latitude: 10.799699037370978, longitude: 106.67864621304257 },
    { latitude: 10.799639022908861, longitude: 106.67858369561299 },
    { latitude: 10.79960122906476, longitude: 106.67863098241675 },
    { latitude: 10.799522187959392, longitude: 106.67851967075488 }
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
var src_tatekanban = "/Content/images/tatekanban_new.png";
var src_redcross = "/Content/images/red_cross.png";
var data = [
    { name: "労働組合", polygon: dataLiendoan, icon_url: [src_tatekanban] },
    { name: "ソリマチ会社", polygon: data_Sorimachi, icon_url: [src_tatekanban] },
    { name: "PhuNhuan人民委員会", polygon: dataUyBanPN, icon_url: [src_tatekanban] },
    { name: "VietCom銀行", polygon: dataVietCombank, icon_url: [src_tatekanban] },

];

var oldLocation = null;
var isCreated = false;
var locationInsideId = null;
var arrLocation = [];
const sizeImgTatekanban = 8;
const sizeTextTatekanban = 5;
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

//Program Run
window.onload = () => {
    const el = document.querySelector("[gps-new-camera]");
    google.maps.Polygon.prototype.my_getBounds = function () {
        var bounds = new google.maps.LatLngBounds()
        this.getPath().forEach(function (element, index) { bounds.extend(element) })
        return bounds
    }
    el.addEventListener("gps-camera-update-position", e => {
        var my_location = { latitude: e.detail.position.latitude, longitude: e.detail.position.longitude };
        if (isCreated == false) {

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

    var flag = true;
    for (var i = 0; i < data.length; i++) {
        if (CheckIsWithinPolygon(locationGG, arrLocation[i])) {
            UpdateTatekanbanInside(i);
            flag = false;
        } else {
            UpdateTatekanban(i, locationGG);
        }
    }

    if (flag == true) {
        locationInsideId = null;
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
        var nearestPoint = FindNearstPoint(locationGG, arrLocation[i]);
        if (CheckIsWithinPolygon(locationGG, arrLocation[i])) {
            alert(data[i].name + "にいます❣");
            sizeImg = sizeImg - 3;
            sizeText = sizeText - 2;
            locationInsideId = i;
        }
        var tatekanban = CreateImageTatekanban(data[i], i, cenPoint, sizeImg, sizeText, my_location);
        scene.appendChild(tatekanban);
        arrLocation.push(tatekanban);

    }

}
//Check My location is in polygon
function CheckIsWithinPolygon(coordinate, polygon) {
    return google.maps.geometry.poly.containsLocation(coordinate, polygon);
}


function CreateImageTatekanban(data, i, centerPoint, sizeImg, sizeText, my_location) {

    CreateText3D(`text_tatekanban_${ i }`, data.name, '35px Arial', '#000000')

    /*var distance = Math.ceil(DistanceBetweenPoints(centerPoint, my_location)) + " m";
    CreateText3D(`distance_tatekanban_${i}`, distance, '25px Arial', '#000000')*/

    if (data.icon_url.length == 1) {
        const image = document.createRange().createContextualFragment(`
            <a-entity  gps-new-entity-place="latitude: ${centerPoint.latitude}; longitude: ${centerPoint.longitude};" look-at=[camera] >
                     <a-image id="imgTatekanban_${i}" src="${src_tatekanban}" scale="${sizeImg} ${sizeImg} ${sizeImg}" ></a-image>
                     <a-image id="textTatekanban_${i}" src="#text_tatekanban_${i}" scale="${sizeText} ${sizeText} ${sizeText}" position="0 1 0.65" ></a-image>
            </a-entity>

        `);
        return image;
    }
   /* else if (data.icon_url.length == 2) {
        const image = document.createRange().createContextualFragment(`
            <a-entity  gps-new-entity-place="latitude: ${centerPoint.latitude}; longitude: ${centerPoint.longitude};" look-at=[camera] >
                     <a-image id="imgTatekanban_${i}" src="${src_tatekanban}" scale="${sizeImg} ${sizeImg} ${sizeImg}" ></a-image>
                     <a-image id="imgTatekanban_${i}" src="${data.icon_url[1]}" scale="${sizeImgIcon} ${sizeImgIcon} ${sizeImgIcon}"  position="-4.5 0.85 0.65" ></a-image>
                     <a-image id="textTatekanban_${i}" src="#text_tatekanban_${i}" scale="${sizeText} ${sizeText} ${sizeText}" position="0 0.8 1" ></a-image>
            </a-entity>

        `);
        return image;
    }*/

}

//Function create text 3D
function CreateText3D(id, text, font, fillStyle) {
    var assests = document.querySelector('a-assets');

    var text_img = document.createElement('img');
    text_img.id = id;

    // Create a canvas element
    var canvas = document.createElement('canvas');

    // Get the 2D context
    var context = canvas.getContext('2d');

    // Set font and text properties
    context.font = font;
    context.fillStyle = fillStyle;
    var textX = canvas.width / 2 - context.measureText(text).width / 2;
    var textY = canvas.height / 2;

    // Draw the text on the canvas
    context.fillText(text, textX, textY);

    //get Url data
    text_img.src = canvas.toDataURL();
    assests.appendChild(text_img);
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

        imgTatekanban.setAttribute('scale', `${sizeImgTatekanban - 3} ${sizeImgTatekanban - 3} ${sizeImgTatekanban - 3}`);
        textTatekanban.setAttribute('scale', `${sizeTextTatekanban - 2} ${sizeTextTatekanban - 2} ${sizeTextTatekanban - 2}`);

        locationInsideId = i;
    }
}


function UpdateTatekanban(i,locationGG) {

    var nearestPoint = FindNearstPoint(locationGG, arrLocation[i]);
    var distance = DistanceBetweenPoints(locationGG, nearestPoint);
    
    var imgTatekanban = document.getElementById(`imgTatekanban_${i}`);
    var textTatekanban = document.getElementById(`textTatekanban_${i}`);

    var newSizeImgTatekanban = sizeImgTatekanban;
    var newSizeTextTatekanban = textTatekanban;

    if (distance < 30) {
        newSizeImgTatekanban += (1 - distance / 30);
        newSizeTextTatekanban += (1 - distance / 30);
    }
    console.log(newSizeTextTatekanban);

    imgTatekanban.setAttribute('scale', ` ${newSizeImgTatekanban} ${newSizeImgTatekanban} ${newSizeImgTatekanban}`);
   // textTatekanban.setAttribute('scale', `${newSizeTextTatekanban} ${newSizeTextTatekanban} ${newSizeTextTatekanban}`);
    /*distanceTatekanban.setAttribute('value', `${distance}`);*/

}
