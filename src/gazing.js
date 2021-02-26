const GazeCloudAPI = window.GazeCloudAPI;

var timestamp;
var previous;
resetValues();

function resetValues() {
    previous = {
        x: 0,
        y: 0
    }

    timestamp = null
}

var HOVERED_CLASSNAME = 'hover';
var HOVERABLE_ITEMS = '.overview-cover';

function resetHoverClass() {
    var sliderItems = document.querySelectorAll(HOVERABLE_ITEMS);
    sliderItems.forEach(function(item) {
        item.classList.remove(HOVERED_CLASSNAME);
    });
}

function getElementByCoordinates({x, y}) {
    var element = document.elementFromPoint(x, y)

    if (element) {
        element = element.closest('.overview-cover');
    }

    if (element) {
        element.classList.add(HOVERED_CLASSNAME);
    }
}

function setHoverClass(coordinates) {
    var hoveredElement= getElementByCoordinates(coordinates);
    if (hoveredElement) {
        hoveredElement.classList.add(HOVERED_CLASSNAME);
    }
}

var gazingIsEnabled = false;

function isGazing(GazeData) {
    if (timestamp + 300 > GazeData.time ) {
        // debounce to try to make it more smoother
        return gazingIsEnabled;
    }

    var x = Math.round(GazeData.docX);
    var y = Math.round(GazeData.docY);

    console.log("X", x, previous.x, isWithinOffsetBoundry(x, previous.x))
    console.log("Y", y, previous.y, isWithinOffsetBoundry(y, previous.y))

    var isGazing = (isWithinOffsetBoundry(x, previous.x) && isWithinOffsetBoundry(y, previous.y));

    previous.x = x;
    previous.y = y;

    if (isGazing) {
        gazingIsEnabled = true;
    } else {
        gazingIsEnabled = false;
    }

    return isGazing;
}

function isWithinOffsetBoundry(a, b) {
    var offset = 100;

    var max = b + offset;
    var min = b - offset;

    if (min < a && a < max) {
        return true;
    }

    return false;
}

function resetGazing(bodyElement) {
    bodyElement.classList.remove("is-gazing");
}

function enableGazing({ bodyElement, x, y }) {
    bodyElement.classList.add("is-gazing");
    bodyElement.style.transformOrigin = `${x}px ${y}px`
}

function PlotGaze(GazeData) {

    /*
        GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
        GazeData.docX // gaze x in document coordinates
        GazeData.docY // gaze y in document cordinates
        GazeData.time // timestamp
    */

    console.log(JSON.stringify(GazeData, null, 4));

    document.getElementById("GazeData").innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;
    document.getElementById("HeadPhoseData").innerHTML = " HeadX: " + GazeData.HeadX + " HeadY: " + GazeData.HeadY + " HeadZ: " + GazeData.HeadZ;
    document.getElementById("HeadRotData").innerHTML = " Yaw: " + GazeData.HeadYaw + " Pitch: " + GazeData.HeadPitch + " Roll: " + GazeData.HeadRoll;

    var x = GazeData.docX;
    var y = GazeData.docY;

    var gaze = document.getElementById("gaze");
    x -= gaze.clientWidth / 2;
    y -= gaze.clientHeight / 2;

    gaze.style.left = x + "px";
    gaze.style.top = y + "px";

    var bodyElement = document.getElementsByTagName('body')[0];

    if (GazeData.state != 0) {
        resetGazing(bodyElement);
        resetValues()

        resetHoverClass();

        if (gaze.style.display == 'block')
            gaze.style.display = 'none';
    }
    else {
        if (gaze.style.display == 'none')
            gaze.style.display = 'block';

        resetHoverClass();
        setHoverClass({ x, y });

        if (isGazing(GazeData)) {
            if (!timestamp) {
                timestamp = GazeData.time;
                return
            }

            console.log("enable gazing..", timestamp, timestamp + 1500, GazeData.time, timestamp + 1500 < GazeData.time)

            var gazedElement = getElementByCoordinates(x, y);
            var isInAnchor = gazedElement.closest('a')

            if (isInAnchor && (timestamp + 1500 < GazeData.time)) {
                // check if already gazed..
                enableGazing({ bodyElement, x, y })
            }

            console.log("click?", timestamp, timestamp + 3000, GazeData.time, timestamp + 3000 < GazeData.time)

            if (timestamp + 3000 < GazeData.time) {
                alert('click on element!')

                var elementClicked = gazedElement;

                if (elementClicked) {
                    elementClicked.classList.add("clicked");
                    setTimeout(() => {
                        elementClicked.classList.remove("clicked");
                    }, 1000);
                }

                //document.elementFromPoint(x, y).click();

                resetGazing(bodyElement);
                resetValues();
            }

        } else {
            timestamp = null;
            console.log("DISABLE GAZING")
            resetGazing(bodyElement);
        }
    }
}

//////set callbacks/////////

GazeCloudAPI.OnCalibrationComplete = function () { console.log('gaze Calibration Complete') }
GazeCloudAPI.OnCamDenied = function () { console.log('camera  access denied') }
GazeCloudAPI.OnError = function (msg) { console.log('err: ' + msg) }
GazeCloudAPI.UseClickRecalibration = true;
GazeCloudAPI.OnResult = PlotGaze;
