// ------------------------------------Data--------------------------
var data_Sorimachi = [
    { latitude: 10.7998171721485, longitude: 106.678411861847     },
    { latitude: 10.7998991736088, longitude: 106.678087985109     },
    { latitude: 10.8001323445217, longitude: 106.67846617658      },
    { latitude: 10.7998820480543, longitude: 106.678735738586     },
    { latitude: 10.7995019997753, longitude: 106.6783618927       },
    { latitude: 10.7996054043478, longitude: 106.678289150785     },
    { latitude: 10.7998991736088, longitude: 106.678087985109     }
];
var data_Luyen = [
    { latitude: 10.83914596900325, longitude: 106.79742414463762  },
    { latitude: 10.83894180636945, longitude: 106.79723035505761  },
    { latitude: 10.839017544136947, longitude: 106.79706472866916 },
    { latitude: 10.839189435868569, longitude: 106.79721761456618 }
]

var data_VA = [
    { latitude: 10.799818677032112, longitude: 106.70102751667682 },
    { latitude: 10.799857947805597, longitude: 106.70110007095303 },
    { latitude: 10.799732863101804, longitude: 106.70113708844089 },
    { latitude: 10.799676138625944, longitude: 106.70105268856857 },
]

var data_Ba_Chieu = [
    { latitude: 10.802242382762962, longitude: 106.6985319333211  },
    { latitude: 10.802331961876853, longitude: 106.69870091249344 },
    { latitude: 10.802216035959669, longitude: 106.6987411456297  },
    { latitude: 10.802129091492407, longitude: 106.69855339099378 },
]

var data_chua = [
    { latitude: 10.803733260077955, longitude: 106.70367798738026 },
    { latitude: 10.803733260077955, longitude: 106.70377464175996 },
    { latitude: 10.803574698464109, longitude: 106.70377563819687 },
    { latitude: 10.803576656015402, longitude: 106.70368097669096 },
]
var data_chungcu= [
    { latitude: 10.8001178486308, longitude: 106.70170698617459 },
    { latitude: 10.800125678925731, longitude: 106.70193018803192 },
    { latitude: 10.799606921443226, longitude: 106.70222114761889 },
    { latitude: 10.799512957728288, longitude: 106.70202385312001 },
]
var data_dh_HongBang = [
    { latitude: 10.797388744190782, longitude: 106.70349447346798 },
    { latitude: 10.797268864275024, longitude: 106.7033147654386 },
    { latitude: 10.797433534476697, longitude: 106.70301838130057 },
    { latitude: 10.79768515037054, longitude: 106.703228934738 },
]


var data = [
    { name: "Báo tuổi trẻ", polygon: data_Sorimachi },
/*    { name: "Nhà Việt Anh", polygon: data_VA },*/
    { name: "Chợ bà chiểu", polygon: data_Ba_Chieu },
    { name: "Chùa bồ đề", polygon: data_chua },
    { name: "đại học Kinh tế tài chính", polygon: data_dh_HongBang },
    { name: "chung cư mỹ phước", polygon: data_chungcu }
]

var src_pin_location = "/img/pin_location.png";
var src_tatekanban = "/img/tatekanban.png";
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
    // Set location per second
    let scene = document.querySelector('a-camera');
    let gps = document.createAttribute('gps-projected-camera');
    gps.value = `simulateLatitude: ${position.coords.latitude}; simulateLongitude: ${position.coords.longitude } ;minDistance: 0.5`;
    scene.setAttributeNode(gps);
    InitImage(position.coords);
}

//Error when can't get location
function errorCallback(error) {
    console.log('error', error);
}


//Init image pin location
function InitImage(my_location) {
    const scene = document.querySelector('a-scene');
    if (arrLocation.length == 0) {
        console.log("Init Image");
        for (var i = 0; i < data.length; i++) {
            var pin_location = CreateImagePinLocation(my_location, data[i].polygon);
            var tatekanban = CreateImageTatekanban(my_location, data[i], i);
            scene.appendChild(pin_location);
            scene.appendChild(tatekanban);
            arrLocation.push({ pin_location, tatekanban});
        }
    }
}

//Create Image Pin Location 
function CreateImagePinLocation(my_location, data) {
    var NearstPoint = FindNearstPoint(my_location, data);
    const image = document.createRange().createContextualFragment(`
         <a-image src="#pinLocation" scale="20 20 20" gps-projected-entity-place="latitude: ${NearstPoint.latitude}; longitude: ${NearstPoint.longitude};"></a-image>
    `);
    return image;

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
    context.font = '45px Arial';
    context.fillStyle = '#000000';
    var textX = canvas.width / 2 - context.measureText(data.name).width / 2;
    var textY = canvas.height / 2;

    // Draw the text on the canvas
    context.fillText(data.name, textX, textY);

    //get Url data
    text_tatekanban_img.src = canvas.toDataURL();
    assests.appendChild(text_tatekanban_img);

    const image = document.createRange().createContextualFragment(`
         <a-image src="${src_tatekanban}" scale="32 32 32" gps-projected-entity-place="latitude: ${NearstPoint.latitude}; longitude: ${NearstPoint.longitude};" position="0 26 0"></a-image>
         <a-image src="#text_tatekanban_${i}" scale="32 32 32" gps-projected-entity-place="latitude: ${NearstPoint.latitude}; longitude: ${NearstPoint.longitude};" position="0 26 -0.1"></a-image>
    `);
    return image;
}




//Find nearst point from my location
function FindNearstPoint(my_location, polygon) {
    var lat, long;
    var distance = 0;
    for (var i = 0; i < polygon.length; i++) {
        var cur_distance = DistanceBetweenPoints(my_location, polygon[i]); 
        if (distance == 0 || cur_distance < distance ) {
            distance = cur_distance;
            lat = polygon[i].latitude;
            long = polygon[i].longitude;
        } 
    }
    return { latitude: lat, longitude: long };
}

//Cal distance between 2 point
function DistanceBetweenPoints(pointA, pointB) {
    return Math.sqrt((pointA.latitude - pointB.latitude) * (pointA.latitude - pointB.latitude) + (pointA.longitude - pointB.longitude) * (pointA.longitude - pointB.longitude))
}

