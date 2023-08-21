// set day, date, and time
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

let theDay = document.querySelector('.day');
let theDate = document.querySelector('.date');
let clock = document.querySelector('.clock');

// day
let thisDay = new Date(), day;
day = days[thisDay.getDay()];

theDay.innerHTML = `Hari: ${day}`;

// date
let dates = new Date(), date, month, year;
date = dates.getDate();
month = months[dates.getMonth()];
year = dates.getFullYear();

date = date < 10 ? '0' + date : date;
month = month < 10 ? '0' + month : month;

theDate.innerHTML = `Tanggal: ${date}-${month}-${year}`;

// copyright year
document.querySelector('.copy').innerHTML = `${year}`;

// time
function timer() {
    let time = new Date(), hours, minutes, seconds;
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    clock.innerHTML = `Jam: ${hours}:${minutes}:${seconds}`;
}; setInterval(timer, 1000);

// load content on event window onload
window.onload = function () {
    // monday
    displayMondaySheduleContent();
    displayMondayTotalSchedule();

    // tuesday
    displayTuesdaySheduleContent();
    displayTuesdayTotalSchedule();

    // wednesday
    displayWednesdaySheduleContent();
    displayWednesdayTotalSchedule();

    // thursday
    displayThursdaySheduleContent();
    displayThursdayTotalSchedule();

    // friday
    displayFridaySheduleContent();
    displayFridayTotalSchedule();

    // saturday
    displaySaturdaySheduleContent();
    displaySaturdayTotalSchedule();
};

// ==================== monday ==================== //

// create local storage to save data input
const mondaySchedulesArray = localStorage.getItem('monday-schedules') ? JSON.parse(localStorage.getItem('monday-schedules')) : [];

const mondayFormInput = document.querySelector('.monday-form-input');
const mondayBtnCreate = document.querySelector('.monday-btn-create');

let updatedScheduleIndex = -1;

mondayBtnCreate.addEventListener('click', (e) => {
    let mondayFormInput = mondayBtnCreate.previousElementSibling;

    if (mondayFormInput.value.trim() == '') {
        let alert = document.querySelector('.alert');

        function showAlert() {
            alert.style.display = 'block';
            setTimeout(function () {
                alert.style.display = 'none';
            }, 3000);
        };
        showAlert();

        e.preventDefault();
    } else if (updatedScheduleIndex !== -1) {
        updateSchedule();
    } else {
        createMondayScheduleInput(mondayFormInput);
    };

    mondayFormInput.value = '';
});

// create monday schedule input executed
function createMondayScheduleInput(mondayFormInput) {
    mondaySchedulesArray.push(mondayFormInput.value);
    localStorage.setItem('monday-schedules', JSON.stringify(mondaySchedulesArray));
    location.reload();
};

// display monday total schedule executed
function displayMondayTotalSchedule() {
    let totalSchedule = mondaySchedulesArray.length;
    document.querySelector('.monday-total-schedule').innerHTML = `${totalSchedule}`;
};

// display monday schedule content executed
function displayMondaySheduleContent() {
    let mondaySchedules = '';

    if (mondaySchedulesArray.length === 0) {
        mondaySchedules +=
            `
                    <div class="monday-schedule-notif text-center italic">
                        <i class="fa-solid fa-clipboard-list text-5xl text-slate-500"></i>
                        <br>
                        <small>Belum ada jadwal di hari ini</small>
                    </div>
                    `
        document.querySelector('.monday-schedule-content').innerHTML = `${mondaySchedules}`;

        document.querySelector('.monday-btn-clear-all').style.display = 'none';
    } else {
        for (let i = 0; i < mondaySchedulesArray.length; i++) {
            mondaySchedules +=
                `
                        <li class="w-full p-2 flex justify-between items-center capitalize border border-slate-500 rounded-md bg-slate-700">
                            ${mondaySchedulesArray[i]}
                            <span class="flex gap-2">
                                <button class="btn-edit w-10 py-1 bg-amber-500 rounded-md hover:bg-amber-600">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="btn-delete w-10 py-1 bg-rose-500 rounded-md hover:bg-rose-600">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </span>
                        </li>
                        `
        };
        document.querySelector('.monday-schedule-content').innerHTML = `${mondaySchedules}`;
    };
    activateBtnEdit();
    activateBtnDelete();
    activateBtnClearAll();
};

// activate btn edit activated
function activateBtnEdit() {
    const btnEdit = document.querySelectorAll('.btn-edit');

    btnEdit.forEach((edit, index) => {
        edit.addEventListener('click', () => {
            let scheduleItem = edit.parentNode.previousSibling.textContent;
            mondayFormInput.focus();

            editSchedule(scheduleItem, index);
        });
    });
};

function editSchedule(scheduleItem, index) {
    mondayFormInput.value = scheduleItem.trim();
    mondayFormInput.select();
    updatedScheduleIndex = index;
};

function updateSchedule() {
    if (updatedScheduleIndex !== -1) {
        mondaySchedulesArray[updatedScheduleIndex] = mondayFormInput.value;
        updatedScheduleIndex = -1;

        saveUpdatedScheduleIndex();
    };
};

function saveUpdatedScheduleIndex() {
    localStorage.setItem('monday-schedules', JSON.stringify(mondaySchedulesArray));
    location.reload();
};

// activate btn delete activated
function activateBtnDelete() {
    const btnDelete = document.querySelectorAll('.btn-delete');

    btnDelete.forEach((del, i) => {
        del.addEventListener('click', () => {
            deleteScheduleItem(i);
        });
    });
};

function deleteScheduleItem(i) {
    mondaySchedulesArray.splice(i, 1);
    localStorage.setItem('monday-schedules', JSON.stringify(mondaySchedulesArray));
    location.reload();
};

// activate btn clear all activated
function activateBtnClearAll() {
    const btnClearAll = document.querySelector('.monday-btn-clear-all');
    btnClearAll.addEventListener('click', () => {
        localStorage.removeItem('monday-schedules', JSON.stringify(mondaySchedulesArray));
        location.reload();
    });
};

// ==================== tuesday ==================== //

// create local storage to save data input
const tuesdaySchedulesArray = localStorage.getItem('tuesday-schedules') ? JSON.parse(localStorage.getItem('tuesday-schedules')) : [];

const tuesdayFormInput = document.querySelector('.tuesday-form-input');
const tuesdayBtnCreate = document.querySelector('.tuesday-btn-create');

let tuesdayUpdatedScheduleIndex = -1;

tuesdayBtnCreate.addEventListener('click', (e) => {
    let tuesdayFormInput = tuesdayBtnCreate.previousElementSibling;

    if (tuesdayFormInput.value.trim() == '') {
        let alert = document.querySelector('.alert');

        function showAlert() {
            alert.style.display = 'block';
            setTimeout(function () {
                alert.style.display = 'none';
            }, 3000);
        };
        showAlert();

        e.preventDefault();
    } else if (tuesdayUpdatedScheduleIndex !== -1) {
        tuesdayUpdateSchedule();
    } else {
        createTuesdayScheduleInput(tuesdayFormInput);
    };

    tuesdayFormInput.value = '';
});

// create tuesday schedule input executed
function createTuesdayScheduleInput(tuesdayFormInput) {
    tuesdaySchedulesArray.push(tuesdayFormInput.value);
    localStorage.setItem('tuesday-schedules', JSON.stringify(tuesdaySchedulesArray));
    location.reload();
};

// display monday total schedule executed
function displayTuesdayTotalSchedule() {
    let tuesdayTotalSchedule = tuesdaySchedulesArray.length;
    document.querySelector('.tuesday-total-schedule').innerHTML = `${tuesdayTotalSchedule}`;
};

// display tuesday schedule content executed
function displayTuesdaySheduleContent() {
    let tuesdaySchedules = '';

    if (tuesdaySchedulesArray.length === 0) {
        tuesdaySchedules +=
            `
                    <div class="tuesday-schedule-notif text-center italic">
                        <i class="fa-solid fa-clipboard-list text-5xl text-slate-500"></i>
                        <br>
                        <small>Belum ada jadwal di hari ini</small>
                    </div>
                    `
        document.querySelector('.tuesday-schedule-content').innerHTML = `${tuesdaySchedules}`;

        document.querySelector('.tuesday-btn-clear-all').style.display = 'none';
    } else {
        for (let i = 0; i < tuesdaySchedulesArray.length; i++) {
            tuesdaySchedules +=
                `
                        <li class="w-full p-2 flex justify-between items-center capitalize border border-slate-500 rounded-md bg-slate-700">
                            ${tuesdaySchedulesArray[i]}
                            <span class="flex gap-2">
                                <button class="tuesday-btn-edit w-10 py-1 bg-amber-500 rounded-md hover:bg-amber-600">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="tuesday-btn-delete w-10 py-1 bg-rose-500 rounded-md hover:bg-rose-600">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </span>
                        </li>
                        `
        };
        document.querySelector('.tuesday-schedule-content').innerHTML = `${tuesdaySchedules}`;
    };
    tuesdayActivateBtnEdit();
    tuesdayActivateBtnDelete();
    tuesdayActivateBtnClearAll();
};

// activate tuesday btn edit activated
function tuesdayActivateBtnEdit() {
    const tuesdayBtnEdit = document.querySelectorAll('.tuesday-btn-edit');

    tuesdayBtnEdit.forEach((edit, index) => {
        edit.addEventListener('click', () => {
            let tuesdayScheduleItem = edit.parentNode.previousSibling.textContent;
            tuesdayFormInput.focus();

            tuesdayEditSchedule(tuesdayScheduleItem, index);
        });
    });
};

function tuesdayEditSchedule(tuesdayScheduleItem, index) {
    tuesdayFormInput.value = tuesdayScheduleItem.trim();
    tuesdayFormInput.select();
    tuesdayUpdatedScheduleIndex = index;
};

function tuesdayUpdateSchedule() {
    if (tuesdayUpdatedScheduleIndex !== -1) {
        tuesdaySchedulesArray[tuesdayUpdatedScheduleIndex] = tuesdayFormInput.value;
        tuesdayUpdatedScheduleIndex = -1;

        tuesdaySaveUpdatedScheduleIndex();
    };
};

function tuesdaySaveUpdatedScheduleIndex() {
    localStorage.setItem('tuesday-schedules', JSON.stringify(tuesdaySchedulesArray));
    location.reload();
};

// activate tuesday btn delete activated
function tuesdayActivateBtnDelete() {
    const tuesdayBtnDelete = document.querySelectorAll('.tuesday-btn-delete');

    tuesdayBtnDelete.forEach((del, i) => {
        del.addEventListener('click', () => {
            tuesdayDeleteScheduleItem(i);
        });
    });
};

function tuesdayDeleteScheduleItem(i) {
    tuesdaySchedulesArray.splice(i, 1);
    localStorage.setItem('tuesday-schedules', JSON.stringify(tuesdaySchedulesArray));
    location.reload();
};

// activate tuesday btn clear all activated
function tuesdayActivateBtnClearAll() {
    const tuesdayBtnClearAll = document.querySelector('.tuesday-btn-clear-all');
    tuesdayBtnClearAll.addEventListener('click', () => {
        localStorage.removeItem('tuesday-schedules', JSON.stringify(tuesdaySchedulesArray));
        location.reload();
    });
};

// ==================== wednesday ==================== //

// create local storage to save data input
const wednesdaySchedulesArray = localStorage.getItem('wednesday-schedules') ? JSON.parse(localStorage.getItem('wednesday-schedules')) : [];

const wednesdayFormInput = document.querySelector('.wednesday-form-input');
const wednesdayBtnCreate = document.querySelector('.wednesday-btn-create');

let wednesdayUpdatedScheduleIndex = -1;

wednesdayBtnCreate.addEventListener('click', (e) => {
    let wednesdayFormInput = wednesdayBtnCreate.previousElementSibling;

    if (wednesdayFormInput.value.trim() == '') {
        let alert = document.querySelector('.alert');

        function showAlert() {
            alert.style.display = 'block';
            setTimeout(function () {
                alert.style.display = 'none';
            }, 3000);
        };
        showAlert();

        e.preventDefault();
    } else if (wednesdayUpdatedScheduleIndex !== -1) {
        wednesdayUpdateSchedule();
    } else {
        createWednesdayScheduleInput(wednesdayFormInput);
    };

    wednesdayFormInput.value = '';
});

// create wednesday schedule input executed
function createWednesdayScheduleInput(wednesdayFormInput) {
    wednesdaySchedulesArray.push(wednesdayFormInput.value);
    localStorage.setItem('wednesday-schedules', JSON.stringify(wednesdaySchedulesArray));
    location.reload();
};

// display monday total schedule executed
function displayWednesdayTotalSchedule() {
    let wednesdayTotalSchedule = wednesdaySchedulesArray.length;
    document.querySelector('.wednesday-total-schedule').innerHTML = `${wednesdayTotalSchedule}`;
};

// display wednesday schedule content executed
function displayWednesdaySheduleContent() {
    let wednesdaySchedules = '';

    if (wednesdaySchedulesArray.length === 0) {
        wednesdaySchedules +=
            `
                    <div class="wednesday-schedule-notif text-center italic">
                        <i class="fa-solid fa-clipboard-list text-5xl text-slate-500"></i>
                        <br>
                        <small>Belum ada jadwal di hari ini</small>
                    </div>
                    `
        document.querySelector('.wednesday-schedule-content').innerHTML = `${wednesdaySchedules}`;

        document.querySelector('.wednesday-btn-clear-all').style.display = 'none';
    } else {
        for (let i = 0; i < wednesdaySchedulesArray.length; i++) {
            wednesdaySchedules +=
                `
                        <li class="w-full p-2 flex justify-between items-center capitalize border border-slate-500 rounded-md bg-slate-700">
                            ${wednesdaySchedulesArray[i]}
                            <span class="flex gap-2">
                                <button class="wednesday-btn-edit w-10 py-1 bg-amber-500 rounded-md hover:bg-amber-600">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="wednesday-btn-delete w-10 py-1 bg-rose-500 rounded-md hover:bg-rose-600">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </span>
                        </li>
                        `
        };
        document.querySelector('.wednesday-schedule-content').innerHTML = `${wednesdaySchedules}`;
    };
    wednesdayActivateBtnEdit();
    wednesdayActivateBtnDelete();
    wednesdayActivateBtnClearAll();
};

// activate wednesday btn edit activated
function wednesdayActivateBtnEdit() {
    const wednesdayBtnEdit = document.querySelectorAll('.wednesday-btn-edit');

    wednesdayBtnEdit.forEach((edit, index) => {
        edit.addEventListener('click', () => {
            let wednesdayScheduleItem = edit.parentNode.previousSibling.textContent;
            wednesdayFormInput.focus();

            wednesdayEditSchedule(wednesdayScheduleItem, index);
        });
    });
};

function wednesdayEditSchedule(wednesdayScheduleItem, index) {
    wednesdayFormInput.value = wednesdayScheduleItem.trim();
    wednesdayFormInput.select();
    wednesdayUpdatedScheduleIndex = index;
};

function wednesdayUpdateSchedule() {
    if (wednesdayUpdatedScheduleIndex !== -1) {
        wednesdaySchedulesArray[wednesdayUpdatedScheduleIndex] = wednesdayFormInput.value;
        wednesdayUpdatedScheduleIndex = -1;

        wednesdaySaveUpdatedScheduleIndex();
    };
};

function wednesdaySaveUpdatedScheduleIndex() {
    localStorage.setItem('wednesday-schedules', JSON.stringify(wednesdaySchedulesArray));
    location.reload();
};

// activate wednesday btn delete activated
function wednesdayActivateBtnDelete() {
    const wednesdayBtnDelete = document.querySelectorAll('.wednesday-btn-delete');

    wednesdayBtnDelete.forEach((del, i) => {
        del.addEventListener('click', () => {
            wednesdayDeleteScheduleItem(i);
        });
    });
};

function wednesdayDeleteScheduleItem(i) {
    wednesdaySchedulesArray.splice(i, 1);
    localStorage.setItem('wednesday-schedules', JSON.stringify(wednesdaySchedulesArray));
    location.reload();
};

// activate wednesday btn clear all activated
function wednesdayActivateBtnClearAll() {
    const wednesdayBtnClearAll = document.querySelector('.wednesday-btn-clear-all');
    wednesdayBtnClearAll.addEventListener('click', () => {
        localStorage.removeItem('wednesday-schedules', JSON.stringify(wednesdaySchedulesArray));
        location.reload();
    });
};

// ==================== thursday ==================== //

// create local storage to save data input
const thursdaySchedulesArray = localStorage.getItem('thursday-schedules') ? JSON.parse(localStorage.getItem('thursday-schedules')) : [];

const thursdayFormInput = document.querySelector('.thursday-form-input');
const thursdayBtnCreate = document.querySelector('.thursday-btn-create');

let thursdayUpdatedScheduleIndex = -1;

thursdayBtnCreate.addEventListener('click', (e) => {
    let thursdayFormInput = thursdayBtnCreate.previousElementSibling;

    if (thursdayFormInput.value.trim() == '') {
        let alert = document.querySelector('.alert');

        function showAlert() {
            alert.style.display = 'block';
            setTimeout(function () {
                alert.style.display = 'none';
            }, 3000);
        };
        showAlert();

        e.preventDefault();
    } else if (thursdayUpdatedScheduleIndex !== -1) {
        thursdayUpdateSchedule();
    } else {
        createThursdayScheduleInput(thursdayFormInput);
    };

    thursdayFormInput.value = '';
});

// create thursday schedule input executed
function createThursdayScheduleInput(thursdayFormInput) {
    thursdaySchedulesArray.push(thursdayFormInput.value);
    localStorage.setItem('thursday-schedules', JSON.stringify(thursdaySchedulesArray));
    location.reload();
};

// display monday total schedule executed
function displayThursdayTotalSchedule() {
    let thursdayTotalSchedule = thursdaySchedulesArray.length;
    document.querySelector('.thursday-total-schedule').innerHTML = `${thursdayTotalSchedule}`;
};

// display thursday schedule content executed
function displayThursdaySheduleContent() {
    let thursdaySchedules = '';

    if (thursdaySchedulesArray.length === 0) {
        thursdaySchedules +=
            `
                    <div class="thursday-schedule-notif text-center italic">
                        <i class="fa-solid fa-clipboard-list text-5xl text-slate-500"></i>
                        <br>
                        <small>Belum ada jadwal di hari ini</small>
                    </div>
                    `
        document.querySelector('.thursday-schedule-content').innerHTML = `${thursdaySchedules}`;

        document.querySelector('.thursday-btn-clear-all').style.display = 'none';
    } else {
        for (let i = 0; i < thursdaySchedulesArray.length; i++) {
            thursdaySchedules +=
                `
                        <li class="w-full p-2 flex justify-between items-center capitalize border border-slate-500 rounded-md bg-slate-700">
                            ${thursdaySchedulesArray[i]}
                            <span class="flex gap-2">
                                <button class="thursday-btn-edit w-10 py-1 bg-amber-500 rounded-md hover:bg-amber-600">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="thursday-btn-delete w-10 py-1 bg-rose-500 rounded-md hover:bg-rose-600">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </span>
                        </li>
                        `
        };
        document.querySelector('.thursday-schedule-content').innerHTML = `${thursdaySchedules}`;
    };
    thursdayActivateBtnEdit();
    thursdayActivateBtnDelete();
    thursdayActivateBtnClearAll();
};

// activate thursday btn edit activated
function thursdayActivateBtnEdit() {
    const thursdayBtnEdit = document.querySelectorAll('.thursday-btn-edit');

    thursdayBtnEdit.forEach((edit, index) => {
        edit.addEventListener('click', () => {
            let thursdayScheduleItem = edit.parentNode.previousSibling.textContent;
            thursdayFormInput.focus();

            thursdayEditSchedule(thursdayScheduleItem, index);
        });
    });
};

function thursdayEditSchedule(thursdayScheduleItem, index) {
    thursdayFormInput.value = thursdayScheduleItem.trim();
    thursdayFormInput.select();
    thursdayUpdatedScheduleIndex = index;
};

function thursdayUpdateSchedule() {
    if (thursdayUpdatedScheduleIndex !== -1) {
        thursdaySchedulesArray[thursdayUpdatedScheduleIndex] = thursdayFormInput.value;
        thursdayUpdatedScheduleIndex = -1;

        thursdaySaveUpdatedScheduleIndex();
    };
};

function thursdaySaveUpdatedScheduleIndex() {
    localStorage.setItem('thursday-schedules', JSON.stringify(thursdaySchedulesArray));
    location.reload();
};

// activate thursday btn delete activated
function thursdayActivateBtnDelete() {
    const thursdayBtnDelete = document.querySelectorAll('.thursday-btn-delete');

    thursdayBtnDelete.forEach((del, i) => {
        del.addEventListener('click', () => {
            thursdayDeleteScheduleItem(i);
        });
    });
};

function thursdayDeleteScheduleItem(i) {
    thursdaySchedulesArray.splice(i, 1);
    localStorage.setItem('thursday-schedules', JSON.stringify(thursdaySchedulesArray));
    location.reload();
};

// activate thursday btn clear all activated
function thursdayActivateBtnClearAll() {
    const thursdayBtnClearAll = document.querySelector('.thursday-btn-clear-all');
    thursdayBtnClearAll.addEventListener('click', () => {
        localStorage.removeItem('thursday-schedules', JSON.stringify(thursdaySchedulesArray));
        location.reload();
    });
};

// ==================== friday ==================== //

// create local storage to save data input
const fridaySchedulesArray = localStorage.getItem('friday-schedules') ? JSON.parse(localStorage.getItem('friday-schedules')) : [];

const fridayFormInput = document.querySelector('.friday-form-input');
const fridayBtnCreate = document.querySelector('.friday-btn-create');

let fridayUpdatedScheduleIndex = -1;

fridayBtnCreate.addEventListener('click', (e) => {
    let fridayFormInput = fridayBtnCreate.previousElementSibling;

    if (fridayFormInput.value.trim() == '') {
        let alert = document.querySelector('.alert');

        function showAlert() {
            alert.style.display = 'block';
            setTimeout(function () {
                alert.style.display = 'none';
            }, 3000);
        };
        showAlert();

        e.preventDefault();
    } else if (fridayUpdatedScheduleIndex !== -1) {
        fridayUpdateSchedule();
    } else {
        createFridayScheduleInput(fridayFormInput);
    };

    fridayFormInput.value = '';
});

// create friday schedule input executed
function createFridayScheduleInput(fridayFormInput) {
    fridaySchedulesArray.push(fridayFormInput.value);
    localStorage.setItem('friday-schedules', JSON.stringify(fridaySchedulesArray));
    location.reload();
};

// display monday total schedule executed
function displayFridayTotalSchedule() {
    let fridayTotalSchedule = fridaySchedulesArray.length;
    document.querySelector('.friday-total-schedule').innerHTML = `${fridayTotalSchedule}`;
};

// display friday schedule content executed
function displayFridaySheduleContent() {
    let fridaySchedules = '';

    if (fridaySchedulesArray.length === 0) {
        fridaySchedules +=
            `
                    <div class="friday-schedule-notif text-center italic">
                        <i class="fa-solid fa-clipboard-list text-5xl text-slate-500"></i>
                        <br>
                        <small>Belum ada jadwal di hari ini</small>
                    </div>
                    `
        document.querySelector('.friday-schedule-content').innerHTML = `${fridaySchedules}`;

        document.querySelector('.friday-btn-clear-all').style.display = 'none';
    } else {
        for (let i = 0; i < fridaySchedulesArray.length; i++) {
            fridaySchedules +=
                `
                        <li class="w-full p-2 flex justify-between items-center capitalize border border-slate-500 rounded-md bg-slate-700">
                            ${fridaySchedulesArray[i]}
                            <span class="flex gap-2">
                                <button class="friday-btn-edit w-10 py-1 bg-amber-500 rounded-md hover:bg-amber-600">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="friday-btn-delete w-10 py-1 bg-rose-500 rounded-md hover:bg-rose-600">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </span>
                        </li>
                        `
        };
        document.querySelector('.friday-schedule-content').innerHTML = `${fridaySchedules}`;
    };
    fridayActivateBtnEdit();
    fridayActivateBtnDelete();
    fridayActivateBtnClearAll();
};

// activate friday btn edit activated
function fridayActivateBtnEdit() {
    const fridayBtnEdit = document.querySelectorAll('.friday-btn-edit');

    fridayBtnEdit.forEach((edit, index) => {
        edit.addEventListener('click', () => {
            let fridayScheduleItem = edit.parentNode.previousSibling.textContent;
            fridayFormInput.focus();

            fridayEditSchedule(fridayScheduleItem, index);
        });
    });
};

function fridayEditSchedule(fridayScheduleItem, index) {
    fridayFormInput.value = fridayScheduleItem.trim();
    fridayFormInput.select();
    fridayUpdatedScheduleIndex = index;
};

function fridayUpdateSchedule() {
    if (fridayUpdatedScheduleIndex !== -1) {
        fridaySchedulesArray[fridayUpdatedScheduleIndex] = fridayFormInput.value;
        fridayUpdatedScheduleIndex = -1;

        fridaySaveUpdatedScheduleIndex();
    };
};

function fridaySaveUpdatedScheduleIndex() {
    localStorage.setItem('friday-schedules', JSON.stringify(fridaySchedulesArray));
    location.reload();
};

// activate friday btn delete activated
function fridayActivateBtnDelete() {
    const fridayBtnDelete = document.querySelectorAll('.friday-btn-delete');

    fridayBtnDelete.forEach((del, i) => {
        del.addEventListener('click', () => {
            fridayDeleteScheduleItem(i);
        });
    });
};

function fridayDeleteScheduleItem(i) {
    fridaySchedulesArray.splice(i, 1);
    localStorage.setItem('friday-schedules', JSON.stringify(fridaySchedulesArray));
    location.reload();
};

// activate friday btn clear all activated
function fridayActivateBtnClearAll() {
    const fridayBtnClearAll = document.querySelector('.friday-btn-clear-all');
    fridayBtnClearAll.addEventListener('click', () => {
        localStorage.removeItem('friday-schedules', JSON.stringify(fridaySchedulesArray));
        location.reload();
    });
};

// ==================== saturday ==================== //

// create local storage to save data input
const saturdaySchedulesArray = localStorage.getItem('saturday-schedules') ? JSON.parse(localStorage.getItem('saturday-schedules')) : [];

const saturdayFormInput = document.querySelector('.saturday-form-input');
const saturdayBtnCreate = document.querySelector('.saturday-btn-create');

let saturdayUpdatedScheduleIndex = -1;

saturdayBtnCreate.addEventListener('click', (e) => {
    let saturdayFormInput = saturdayBtnCreate.previousElementSibling;

    if (saturdayFormInput.value.trim() == '') {
        let alert = document.querySelector('.alert');

        function showAlert() {
            alert.style.display = 'block';
            setTimeout(function () {
                alert.style.display = 'none';
            }, 3000);
        };
        showAlert();

        e.preventDefault();
    } else if (saturdayUpdatedScheduleIndex !== -1) {
        saturdayUpdateSchedule();
    } else {
        createSaturdayScheduleInput(saturdayFormInput);
    };

    saturdayFormInput.value = '';
});

// create saturday schedule input executed
function createSaturdayScheduleInput(saturdayFormInput) {
    saturdaySchedulesArray.push(saturdayFormInput.value);
    localStorage.setItem('saturday-schedules', JSON.stringify(saturdaySchedulesArray));
    location.reload();
};

// display monday total schedule executed
function displaySaturdayTotalSchedule() {
    let saturdayTotalSchedule = saturdaySchedulesArray.length;
    document.querySelector('.saturday-total-schedule').innerHTML = `${saturdayTotalSchedule}`;
};

// display saturday schedule content executed
function displaySaturdaySheduleContent() {
    let saturdaySchedules = '';

    if (saturdaySchedulesArray.length === 0) {
        saturdaySchedules +=
            `
                    <div class="saturday-schedule-notif text-center italic">
                        <i class="fa-solid fa-clipboard-list text-5xl text-slate-500"></i>
                        <br>
                        <small>Belum ada jadwal di hari ini</small>
                    </div>
                    `
        document.querySelector('.saturday-schedule-content').innerHTML = `${saturdaySchedules}`;

        document.querySelector('.saturday-btn-clear-all').style.display = 'none';
    } else {
        for (let i = 0; i < saturdaySchedulesArray.length; i++) {
            saturdaySchedules +=
                `
                        <li class="w-full p-2 flex justify-between items-center capitalize border border-slate-500 rounded-md bg-slate-700">
                            ${saturdaySchedulesArray[i]}
                            <span class="flex gap-2">
                                <button class="saturday-btn-edit w-10 py-1 bg-amber-500 rounded-md hover:bg-amber-600">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="saturday-btn-delete w-10 py-1 bg-rose-500 rounded-md hover:bg-rose-600">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </span>
                        </li>
                        `
        };
        document.querySelector('.saturday-schedule-content').innerHTML = `${saturdaySchedules}`;
    };
    saturdayActivateBtnEdit();
    saturdayActivateBtnDelete();
    saturdayActivateBtnClearAll();
};

// activate saturday btn edit activated
function saturdayActivateBtnEdit() {
    const saturdayBtnEdit = document.querySelectorAll('.saturday-btn-edit');

    saturdayBtnEdit.forEach((edit, index) => {
        edit.addEventListener('click', () => {
            let saturdayScheduleItem = edit.parentNode.previousSibling.textContent;
            saturdayFormInput.focus();

            saturdayEditSchedule(saturdayScheduleItem, index);
        });
    });
};

function saturdayEditSchedule(saturdayScheduleItem, index) {
    saturdayFormInput.value = saturdayScheduleItem.trim();
    saturdayFormInput.select();
    saturdayUpdatedScheduleIndex = index;
};

function saturdayUpdateSchedule() {
    if (saturdayUpdatedScheduleIndex !== -1) {
        saturdaySchedulesArray[saturdayUpdatedScheduleIndex] = saturdayFormInput.value;
        saturdayUpdatedScheduleIndex = -1;

        saturdaySaveUpdatedScheduleIndex();
    };
};

function saturdaySaveUpdatedScheduleIndex() {
    localStorage.setItem('saturday-schedules', JSON.stringify(saturdaySchedulesArray));
    location.reload();
};

// activate saturday btn delete activated
function saturdayActivateBtnDelete() {
    const saturdayBtnDelete = document.querySelectorAll('.saturday-btn-delete');

    saturdayBtnDelete.forEach((del, i) => {
        del.addEventListener('click', () => {
            saturdayDeleteScheduleItem(i);
        });
    });
};

function saturdayDeleteScheduleItem(i) {
    saturdaySchedulesArray.splice(i, 1);
    localStorage.setItem('saturday-schedules', JSON.stringify(saturdaySchedulesArray));
    location.reload();
};

// activate saturday btn clear all activated
function saturdayActivateBtnClearAll() {
    const saturdayBtnClearAll = document.querySelector('.saturday-btn-clear-all');
    saturdayBtnClearAll.addEventListener('click', () => {
        localStorage.removeItem('saturday-schedules', JSON.stringify(saturdaySchedulesArray));
        location.reload();
    });
};