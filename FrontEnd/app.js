
let ABR, CBL, FV, GC, TBS, TupleButton;
const baseURL = window.location.origin;

//Labels to use
const monthsOfTheYear = ['January','February','March','April','May','June','July','August','September','October','November','December'];

//Set Chart.js Default configs
Chart.defaults.color = 'rgb(255,255,255)';
Chart.defaults.font.family = 'Coolvetica';
Chart.defaults.font.weight = 'normal';
Chart.defaults.plugins.title.font.size = 24;



async function getJSON(query){
    const res = await fetch(baseURL + '/database/', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({rq: query})
    });
    return await res.json();
}

document.addEventListener("DOMContentLoaded", (event) =>{

    TupleButton = document.getElementById("tuplecount");

    if (TupleButton) {
        TupleButton.onclick = (event) => {
            if (event.button === 0) {
                getJSON("SELECT_COUNT(*)_AS_tupCount_FROM_\"KEEGAN.SEPIOL\".\"CRIMEDATA\"").then(function (jsonData) {
                    window.alert("Tuple Count is equal to: " + jsonData.results[0].TUPCOUNT);
                })
            }

        };
    }


    ABR = document.getElementById("ABRChart");

    if(ABR){
        let policeStation = '1';
        const windowQuery = new URLSearchParams(window.location.search);

        if (windowQuery.has('ArrestsByRace_Input')){
            policeStation = windowQuery.get('ArrestsByRace_Input').replace('Station', '');

            //Making sure the input matches the value
            document.getElementById('ArrestsByRace_Input').value = windowQuery.get('ArrestsByRace_Input');
        }

        let bData = [];
        let wData = [];
        let aData = [];
        let lData = [];

        for (let i = 0; i < 12; i++){
            bData[i] = 0;
            wData[i] = 0;
            aData[i] = 0;
            lData[i] = 0;
        }

        const data = {
            datasets: [{
                label: 'Black',
                data: bData,
                backgroundColor: 'rgb(50,120,205)',
                borderColor: 'rgb(50,120,205)'
            }, {
                label: 'White',
                data:  wData,
                backgroundColor: 'rgb(255,225,25)',
                borderColor: 'rgb(255,225,25)'

            }, {
                label: 'Asian',
                data:  aData,
                backgroundColor: 'rgb(35,205,75)',
                borderColor: 'rgb(35,205,75)'

            }, {
                label: 'Latino',
                data: lData,
                backgroundColor: 'rgb(255,95,95)',
                borderColor: 'rgb(255,95,95)'
            }],
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'category',
                        labels: monthsOfTheYear,

                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Arrests',

                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        font: {
                            size: 24,

                        },
                        text: `Arrests by Police Station ${policeStation}`

                    }
                }

            },
        };
        let abrChart = new Chart(ABR, config);

        getJSON("SELECT_EXTRACT(MONTH_FROM_DateReported)_AS_\"Month\",_Area as_\"Police Station\",_VictimDescent_as_\"Ethnicity\",_COUNT(*)_AS_\"Total Arrests\"_FROM_\"KEEGAN.SEPIOL\".\"CRIMEDATA\"_WHERE_VictimDescent_!=_'0'_GROUP_BY_EXTRACT(MONTH_FROM_DateReported),_Area,_VictimDescent_ORDER_BY_EXTRACT(MONTH_FROM_DateReported)_ASC,_Area_ASC,_VictimDescent_ASC").then(function (jsonData) {
            for (let i = 0; i < jsonData.results.length; i++){

                switch (jsonData.results[i].Ethnicity) {
                    case "A":
                    case "J":
                    case "C":
                    case "F":
                    case "D":
                    case "K":
                    case "L":
                    case "V":
                    case "Z":
                        if (policeStation == jsonData.results[i]["Police Station"]) {
                            if (typeof aData[jsonData.results[i].Month - 1] == "object"){
                                aData[jsonData.results[i].Month - 1].y += jsonData.results[i]["Total Arrests"];
                            }
                            else {
                                aData[jsonData.results[i].Month - 1] = {x: jsonData.results[i].Month, y: jsonData.results[i]["Total Arrests"]};
                            }
                        }
                        break;
                    case "B" :
                        if (policeStation == jsonData.results[i]["Police Station"]) {
                            bData[jsonData.results[i].Month - 1] = {x: jsonData.results[i].Month, y: jsonData.results[i]["Total Arrests"]};
                        }
                        break;
                    case "W":
                        if (policeStation == jsonData.results[i]["Police Station"]) {
                            wData[jsonData.results[i].Month - 1] ={x: jsonData.results[i].Month, y: jsonData.results[i]["Total Arrests"]};
                        }
                        break;
                    case "H":
                        if (policeStation == jsonData.results[i]["Police Station"]) {
                            lData[jsonData.results[i].Month - 1] = {x: jsonData.results[i].Month, y: jsonData.results[i]["Total Arrests"]};
                        }

                        break;
                    default:
                        //TODO: Add Pacific Islander


                }
            }
            abrChart.update();
        });
    }


    //Below is temp code!!!
    CBL = document.getElementById("CBLChart");

    if(CBL){
        const labels = ['January','February','March','April','May','June','July'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        };
        new Chart(CBL, config);
    }

    FV = document.getElementById("FVChart");

    if(FV){



        const labels = ['January','February','March','April','May','June','July'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        };
        new Chart(FV, config);
    }



    GC = document.getElementById("GCChart");

    if(GC){
        const labels = ['January','February','March','April','May','June','July'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        };
        new Chart(GC, config);
    }

    TBS = document.getElementById("TBSChart");

    if(TBS){
        const labels = ['Spring','Summer','Fall','Winter'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Thefts by Season',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)'
                ],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        };
        new Chart(TBS, config);
    }
});

