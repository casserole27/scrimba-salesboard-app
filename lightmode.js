// storage key for light mode
const lightModeKey = "lightMode";
const lightModeToggle = document.getElementById('lightmode-toggle');

function enableLightMode() {
    document.body.classList.add('lightmode');
    lightModeToggle.checked = true;
};    

function disableLightMode() {
    document.body.classList.remove('lightmode');
    lightModeToggle.checked = false;
};
// Function to save the light mode setting to local storage
const saveLightModeSetting = (isLightMode) => localStorage.setItem(lightModeKey, isLightMode);

function loadLightModeSetting() {
    const isLightMode = localStorage.getItem(lightModeKey) === "true";
    isLightMode ? enableLightMode() : disableLightMode();
}

function renderLightMode() {
    if (document.body.classList.contains('lightmode')) {
        disableLightMode();
        saveLightModeSetting(false);
    } else {
        enableLightMode()
        saveLightModeSetting(true);
    };
};

export { lightModeToggle, loadLightModeSetting, renderLightMode };