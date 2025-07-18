chrome.alarms.create("Timer", {
    periodInMinutes: 1/60,
}) // create a timer in minutes

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "Timer") {
        chrome.storage.local.get(["timer", "isRunning"], (res) => {
            if(res.isRunning) {
                let timer = res.timer + 1
                let isRunning = true;
                if (timer === 60*25) {
                    this.registration.showNotification("Timer", {
                        body: "25 minutes has passed!",
                        icon: "icon.png",
                    })
                    timer = 0
                    isRunning = false
                }
                chrome.storage.local.set({
                    timer, // this saves it
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        isRunning: "isRunning" in res ? res.isRunning : false
    })
})