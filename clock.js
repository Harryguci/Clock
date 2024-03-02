var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var tickState = true

function updateTime() {
    var diff = new Date('03/04/2024 08:00:00') - Date.now();
    
    var totalSeconds = parseInt(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    var last = new Date(0)
    last.setUTCHours(-1)

    var lastTime = {
        hours: hours,
        mins: minutes,
        seconds: seconds
    }

    var now = { ...lastTime }

    now.seconds -= 1;

    if (now.seconds <= 0) {
        now.seconds = 59;
        now.mins -= 1;
    }

    if (now.mins <= 0) {
        now.mins = 59
        now.hours -= 1;
    }

    if (now.hours <= 0) {
        return window.alert('Hết Giờ');
    }

    if (last.hours !== now.hours) {
        updateContainer(hoursContainer, now.hours + '')
    }

    if (last.mins !== now.mins) {
        updateContainer(minutesContainer, now.mins + '')
    }

    if (last.seconds !== now.seconds) {
        //tick()
        updateContainer(secondsContainer, now.seconds + '')
    }

    lastTime = now
}

function tick() {
    tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer(container, newTime) {
    var time = newTime.split('')

    if (time.length === 1) {
        time.unshift('0')
    }

    var first = container.firstElementChild
    if (first.lastElementChild.textContent !== time[0]) {
        updateNumber(first, time[0])
    }

    var last = container.lastElementChild
    if (last.lastElementChild.textContent !== time[1]) {
        updateNumber(last, time[1])
    }
}

function updateNumber(element, number) {
    //element.lastElementChild.textContent = number
    var second = element.lastElementChild.cloneNode(true)
    second.textContent = number

    element.appendChild(second)
    element.classList.add('move')

    setTimeout(function () {
        element.classList.remove('move')
    }, 990)
    setTimeout(function () {
        element.removeChild(element.firstElementChild)
    }, 990)
}

setInterval(updateTime, 500)