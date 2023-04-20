
let ABR, CBL, FV, GC, TBS
const baseURL = window.location.origin;

//Labels to use
const monthsOfTheYear = ['January','February','March','April','May','June','July','August','September','October','November','December'];

//Set Chart.js Default configs
Chart.defaults.color = 'rgb(255,255,255)';
Chart.defaults.font.family = 'Coolvetica';
Chart.defaults.font.weight = 'normal';
Chart.defaults.plugins.title.font.size = 24;



async function getJSON(query){
    const res = await fetch(baseURL + '/database/' + query);
    return await res.json();
}

document.addEventListener("DOMContentLoaded", (event) =>{

    ABR = document.getElementById("ABRChart");

    if(ABR){
        let policeStation = '1';
        const windowQuery = new URLSearchParams(window.location.search);

        if (windowQuery.has('ArrestsByRace_Input')){
            policeStation = windowQuery.get('ArrestsByRace_Input').replace('Station', '');

            //Making sure the input matches the value
            document.getElementById('ArrestsByRace_Input').value = windowQuery.get('ArrestsByRace_Input');
        }

        getJSON("SELECT_*_FROM_CRIMEDATA").then(function (jsonData) {
            let bData = [];
            let wData = [];
            let aData = [];
            let lData = [];


            for (let i = 0; i < jsonData.results.length; i++){
                bData[i] = {x: jsonData.results[i].DRNO, y: i};
                aData[i] = {x: i, y: i*2};
                wData[i] = {x: i, y: i*3};
                lData[i] = {x: i, y: i*4};
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
                    label: 'Latine',
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
            new Chart(ABR, config);
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
        new Chart(TBS, config);
    }


});

