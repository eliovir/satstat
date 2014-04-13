var images = new Array(); // array of images for thumbs and slide show
var index = 0; //current mage in slide show

function bodyLoad() {
    var containers = document.getElementsByClassName("screenshots");
    if (containers.length > 0) {
        var container = containers[0];
        for (i = 0; i < images.length; i++) {
            var newImageElement = document.createElement("img");
            newImageElement.setAttribute("src", images[i].src);
            //TODO: set alt text
            newImageElement.setAttribute("onclick", "javascript:startSlideShow('" + i + "')");
            container.appendChild(newImageElement);
        };
    };
    displayNavButtons();
};

function bodyResize() {
    //FIXME: "scroll backward" if we gained room for more screenshots in thumbs list
    displayNavButtons();
    if (document.getElementById("slideshow").style.display != "none") {
        resizeSlideShow();
    }
};

function scrollBack() {
    var containers = document.getElementsByClassName("screenshots");
    if (containers.length > 0) {
        var container = containers[0];
        var screenshots = container.getElementsByTagName("img");
        
        if (screenshots[0].style.display == "none") {
            for (i = 1; i < screenshots.length; i++) {
                if (screenshots[i].style.display != "none") {
                    screenshots[i - 1].style.display = "inline";
                    break;
                }
            };
        };
        displayNavButtons();
    };
};

function scrollForward() {
    var containers = document.getElementsByClassName("screenshots");
    if (containers.length > 0) {
        var container = containers[0];
        var screenshots = container.getElementsByTagName("img");
        
        var lastScreenshot = screenshots[screenshots.length - 1];
        
        // Screenshots with an offsetTop > 0 are those that did not fit on one row and got truncated
        if (lastScreenshot.offsetTop > 0) {
            for (i = 0; i < screenshots.length; i++) {
                if (screenshots[i].style.display != "none") {
                    screenshots[i].style.display = "none";
                    break;
                }
            };
        };
        displayNavButtons();
    };
};

function displayNavButtons() {
    var containers = document.getElementsByClassName("screenshots");
    if (containers.length > 0) {
        var container = containers[0];
        var backButton = document.getElementById("nav_back");
        var forwardButton = document.getElementById("nav_forward");
        var screenshots = container.getElementsByTagName("img");
        
        if (screenshots[0].style.display == "none") {
            backButton.style.display = "block";
        } else {
            backButton.style.display = "none";
        };
        
        if (screenshots[screenshots.length - 1].offsetTop > 0) {
            forwardButton.style.display = "block";
        } else {
            forwardButton.style.display = "none";
        };
        
    };
};

function resizeSlideShow() {
    //TODO
    //get viewport dimensions
    //set width and height for div id=slideshow_image (pixels)
};

function startSlideShow(newIndex) {
    var slideshow = document.getElementById("slideshow"); 
    resizeSlideShow();
    index = newIndex;
    updateSlideShow();
    slideshow.style.display = "block";
};

function closeSlideShow() {
    document.getElementById("slideshow").style.display = "none";
};

function showPrev() {
    if (index > 0) {
        index--;
    };
    updateSlideShow();
};

function showNext() {
    if (index < images.length - 1) {
        index++;
    };
    updateSlideShow();
};

function updateSlideShow() {
    var imageObj = document.getElementById("slideshow_image_obj");
    imageObj.src = images[index].src;
    if (index == 0) {
        document.getElementById("slideshow_prev").style.display = "none";
    } else {
        document.getElementById("slideshow_prev").style.display = "block";
    };
    if (index == images.length - 1) {
        document.getElementById("slideshow_next").style.display = "none";
    } else {
        document.getElementById("slideshow_next").style.display = "block";
    };
};
