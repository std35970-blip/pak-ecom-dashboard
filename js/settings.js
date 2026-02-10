// Settings.js - Settings Management Logic

// Load settings
function loadSettings() {
    const settings = getSettings();
    
    document.getElementById('settingBusinessName').value = settings.businessName;
    document.getElementById('settingOwnerName').value = settings.ownerName;
    document.getElementById('settingPhone').value = settings.phone;
    document.getElementById('settingCity').value = settings.city;
    document.getElementById('settingDefaultCourier').value = settings.defaultCourier;
    document.getElementById('settingDefaultPayment').value = settings.defaultPayment;
    
    setupSaveSettings();
}

// Setup save settings button
function setupSaveSettings() {
    const saveBtn = document.getElementById('saveSettingsBtn');
    
    if (saveBtn && !saveBtn.dataset.listenerAdded) {
        saveBtn.addEventListener('click', () => {
            const settings = {
                businessName: document.getElementById('settingBusinessName').value,
                ownerName: document.getElementById('settingOwnerName').value,
                phone: document.getElementById('settingPhone').value,
                city: document.getElementById('settingCity').value,
                defaultCourier: document.getElementById('settingDefaultCourier').value,
                defaultPayment: document.getElementById('settingDefaultPayment').value
            };
            
            saveSettings(settings);
            alert('Settings saved successfully!');
        });
        saveBtn.dataset.listenerAdded = 'true';
    }
}
