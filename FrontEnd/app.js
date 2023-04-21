
let ABR, CBL, FV, GC, TBS, TupleButton;
const baseURL = window.location.origin;

//Labels to use
const monthsOfTheYear = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const colorScheme = ['rgb(50,120,205)', 'rgb(255,225,25)', 'rgb(35,205,75)', 'rgb(255,95,95)', 'rgb(255,155,75)'];
const colorSchemeDark = ['rgb(10,80,165)', 'rgb(215,185,0)', 'rgb(0,165,35)', 'rgb(215,55,55)', 'rgb(215,115,35)'];


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
                backgroundColor: colorScheme[0],
                borderColor: colorScheme[0]
            }, {
                label: 'White',
                data:  wData,
                backgroundColor: colorScheme[1],
                borderColor: colorScheme[1]

            }, {
                label: 'Asian',
                data:  aData,
                backgroundColor: colorScheme[2],
                borderColor: colorScheme[2]

            }, {
                label: 'Latino',
                data: lData,
                backgroundColor: colorScheme[3],
                borderColor: colorScheme[3]
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

        let dayTime = 'Morning';
        const windowQuery = new URLSearchParams(window.location.search);

        if (windowQuery.has('CrimeByLocation_Input')){
            dayTime = windowQuery.get('CrimeByLocation_Input');
            //Making sure the input matches the value
            document.getElementById('CrimeByLocation_Input').value = windowQuery.get('CrimeByLocation_Input');

        }

        let top10Locations = [];
        let cblData = [];

        //const timeRanges = ['Morning', 'Afternoon', 'Evening', 'Night'];
        const data = {
            labels: top10Locations,
            datasets: [{
                label: 'Highest 10 Crimes by Location',
                data: cblData,
                backgroundColor: colorScheme,
                borderColor: colorScheme,
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false,
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: `Top 10 Locations by Crime Number`,
                        font: {
                            size: 24,
                        }
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Crimes',

                        }
                    },
                    x: {
                        title: {
                            display: false,
                            text: 'Time'
                        }
                    }

                }
            },
        };
        let cblChart = new Chart(CBL, config);

        getJSON("SELECT_PremisDescription_as_\"Premis_Description\",_(CASE_WHEN_TimeOcured_BETWEEN_500_AND_1159_THEN_\'Morning\'_WHEN_TimeOcured_BETWEEN_1200_AND_1659_THEN_\'Afternoon\'_WHEN_TimeOcured_BETWEEN_1700_AND_2059_THEN_\'Evening\'_ELSE_\'Night\'_END)_AS_\"Time_Of_Day\",_COUNT(PremisDescription)_AS_\"Number_of_Crimes\"_FROM_\"KEEGAN.SEPIOL\".\"CRIMEDATA\"_WHERE_PremisDescription_!=_\'0\'_AND_PremisDescription_!=_\'_\'_GROUP_BY_PremisDescription,_(CASE_WHEN_TimeOcured_BETWEEN_500_AND_1159_THEN_\'Morning\'_WHEN_TimeOcured_BETWEEN_1200_AND_1659_THEN_\'Afternoon\'_WHEN_TimeOcured_BETWEEN_1700_AND_2059_THEN_\'Evening\'_ELSE_\'Night\'_END)_ORDER_BY_\"Number_of_Crimes\"_DESC,_PremisDescription_ASC,_(CASE_WHEN_TimeOcured_BETWEEN_500_AND_1159_THEN_\'Morning\'_WHEN_TimeOcured_BETWEEN_1200_AND_1659_THEN_\'Afternoon\'_WHEN_TimeOcured_BETWEEN_1700_AND_2059_THEN_\'Evening\'_ELSE_\'Night\'_END)_ASC").then(function (jsonData) {
            for (let i = 0; i < jsonData.results.length; i++){
                if (dayTime == jsonData.results[i]["Time Of Day"]) {
                    if (cblData.length < 10){
                        cblData.push(jsonData.results[i]["Number of Crimes"]);
                        top10Locations.push(jsonData.results[i]["Premis Description"])
                    }
                }
            }
            cblChart.update();
        });
    }

    FV = document.getElementById("FVChart");

    if(FV){
        //Add Values to Select
        let dropdownFV = document.getElementById("FemaleVictims_FormDrop");
        let temp = document.createElement('option');
        temp.value = "Total Average";
        temp.innerHTML = "Total Average";
        dropdownFV.add(temp)

        for (let i = 1; i < 54; i++){
            let temp = document.createElement('option');
            temp.value = "Week "+ i;
            temp.innerHTML = "Week " + i;
            dropdownFV.add(temp)
        }

        //Chart
        let fvDataWeek = [];
        let fvDataMonth = [];
        let fvDataSeason = [];
        for (let i = 0; i < 5; i++){
            fvDataWeek[i] = 0;
            fvDataMonth[i] = 0;
            fvDataSeason[i] = 0;
        }

        let weekChoice = 'Total Average';
        const windowQuery = new URLSearchParams(window.location.search);

        if (windowQuery.has('FemaleVictims_FormDrop')){
            weekChoice = windowQuery.get('FemaleVictims_FormDrop').replace('Week', '');

            //Making sure the input matches the value
            document.getElementById('FemaleVictims_FormDrop').value = windowQuery.get('FemaleVictims_FormDrop');
        }

        const weekCheck = document.getElementById("PerWeek");
        const monthCheck = document.getElementById("PerMonth");
        const seasonCheck = document.getElementById("PerSeason");


        const labels = ['Gen Z (0-26)', 'Millennial (27-42)', 'Gen X (43-58)', 'Boomers II (59-68)', 'Boomers I (69+)'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Week',
                data: fvDataWeek,
                backgroundColor: [colorScheme[0]],
                borderColor: [colorScheme[0]],
                borderWidth: 1
            },
            {
                label: 'Month',
                data: fvDataMonth,
                backgroundColor: [colorScheme[3]],
                borderColor: [colorScheme[3]],
                borderWidth: 1
            },
            {
                label: 'Season',
                data: fvDataSeason,
                backgroundColor: [colorScheme[1]],
                borderColor: [colorScheme[1]],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: `Female Victims Per Time Period`,
                        font: {
                            size: 24,
                        }
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Victim Per Time'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Age'
                        }
                    }

                }
            },
        };

        function genToInt(genName){
            switch (genName) {
                case "Gen Z":
                    return 0;
                case "Millennial":
                    return 1;
                case "Gen X":
                    return 2;
                case "Boomers II":
                    return 3;
                case "Boomers I":
                    return 4;
            }
        }

        let fvChart = new Chart(FV, config);
        async function updateFVChart() {
            getJSON("SELECT_TO_CHAR(DateOcured,_\'WW\')_AS_\"Week\",_SUM(CASE_WHEN_VictimSex_=_\'F\'_THEN_1_ELSE_0_END)_AS_\"Total_Females\",_(CASE_WHEN_VictimAge_BETWEEN_0_AND_26_THEN_\'Gen_Z\'_WHEN_VictimAge_BETWEEN_27_AND_42_THEN_\'Millennial\'_WHEN_VictimAge_BETWEEN_43_AND_58_THEN_\'Gen_X\'_WHEN_VictimAge_BETWEEN_59_AND_68_THEN_\'Boomers_II\'_ELSE_\'Boomers_I\'_END)_As_\"Generation\"_FROM_\"KEEGAN.SEPIOL\".\"CRIMEDATA\"_WHERE_DateOcured_BETWEEN_\'01-JAN-2020\'_AND_\'31-DEC-2020\'_AND_VictimAge_BETWEEN_0_AND_100_GROUP_BY_TO_CHAR(DateOcured,_\'WW\'),_(CASE_WHEN_VictimAge_BETWEEN_0_AND_26_THEN_\'Gen_Z\'_WHEN_VictimAge_BETWEEN_27_AND_42_THEN_\'Millennial\'_WHEN_VictimAge_BETWEEN_43_AND_58_THEN_\'Gen_X\'_WHEN_VictimAge_BETWEEN_59_AND_68_THEN_\'Boomers_II\'_ELSE_\'Boomers_I\'_END)_ORDER_BY_TO_CHAR(DateOcured,_\'WW\')_ASC,_SUM((CASE_WHEN_VictimSex_=_\'F\'_THEN_1_ELSE_0_END))_DESC").then(function (jsonData) {
                //Default Functionality
                if (weekChoice == 'Total Average') {
                    for (let i = 0; i < jsonData.results.length; i++) {
                        let xVal = genToInt(jsonData.results[i].Generation);

                        fvDataWeek[xVal] += jsonData.results[i]["Total Females"];
                        fvDataMonth[xVal] += jsonData.results[i]["Total Females"];
                        fvDataSeason[xVal] += jsonData.results[i]["Total Females"];

                    }
                    for (let i = 0; i < 5; i++) {
                        fvDataWeek[i] /= 53;
                        fvDataMonth[i] /= 12;
                        fvDataSeason[i] /= 4;
                    }
                }
                //Week by week
                else {

                    let weekInt = parseInt(weekChoice);


                    let currMonth = Math.floor((weekInt - 1) / 4);
                    let currSeason = Math.floor((weekInt - 1) / 13);

                    for (let i = 0; i < jsonData.results.length; i++) {
                        let xVal = genToInt(jsonData.results[i].Generation);

                        if (jsonData.results[i].Week == weekInt) {
                            fvDataWeek[xVal] += jsonData.results[i]["Total Females"];
                        }

                        if (Math.floor((jsonData.results[i].Week - 1)/4) == currMonth) {
                            fvDataMonth[xVal] += jsonData.results[i]["Total Females"];
                        }
                        if (Math.floor((jsonData.results[i].Week - 1) /13) == currSeason) {
                            fvDataSeason[xVal] += jsonData.results[i]["Total Females"];
                        }

                    }
                    for (let i = 0; i < 5; i++) {
                        fvDataMonth[i] /= 4;
                        fvDataSeason[i] /= 13;
                    }
                }

                fvChart.update();
            });
        }
        updateFVChart();

        weekCheck.addEventListener('input', (event) => {
            fvChart.setDatasetVisibility(0, weekCheck.checked);
            fvChart.update();
        });

        monthCheck.addEventListener('input', (event) => {
            fvChart.setDatasetVisibility(1, monthCheck.checked);
            fvChart.update();
        });


        seasonCheck.addEventListener('input', (event) => {
            fvChart.setDatasetVisibility(2, seasonCheck.checked);
            fvChart.update();
        });
    }

    GC = document.getElementById("GCChart");

    if(GC){
        let numGC = [];
        let sliderGC = document.getElementById("GunCrime_Input");

        const data = {
            labels: monthsOfTheYear,
            datasets: [{
                label: 'Number of Gun Crimes',
                data: numGC,
                backgroundColor: colorScheme,
                borderColor: colorScheme,
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
        let gcChart = new Chart(GC, config);


        async function updateGCChart() {
            getJSON("SELECT_TO_CHAR(DateReported,_'YYYY-MM')_AS_\"Month\",_SUM(CASE_WHEN_((WeaponDescription_=_'HAND_GUN'_OR_WeaponDescription_=_'ANTIQUE_FIREARM'_OR_WeaponDescription_=_'ASSAULT_WEAPON/UZI/AK47/ETC'_OR_WeaponDescription_=_'AUTOMATIC_WEAPON/SUB-MACHINE_GUN'_OR_WeaponDescription_=_'M1-1_SEMIAUTOMATIC_ASSULT_RIFLE'_OR_WeaponDescription_=_'M-14_SEMIAUTOMATIC_ASSAULT_RIFLE'_OR_WeaponDescription_=_'MAC-10_SEMIAUTOMATIC_ASSAULT_WEAPON'_OR_WeaponDescription_=_'MAC-11_SEMIAUTOMATIC_ASSAULT_WEAPON'_OR_WeaponDescription_=_'OTHER_FIREARM'_OR_WeaponDescription_=_'RELIC_FIREARM'_OR_WeaponDescription_=_'REVOLVER'_OR_WeaponDescription_=_'RIFLE'_OR_WeaponDescription_=_'SEMI-AUTOMATIC_PISTOL'_OR_WeaponDescription_=_'SEMI-AUTOMATIC_RIFLE'_OR_WeaponDescription_=_'SHOTGUN'_OR_WeaponDescription_=_'STARTER_PISTOL/REVOLVER'_OR_WeaponDescription_=_'UNKNOWN_FIREARM'_OR_WeaponDescription_=_'UNK_TYPE_SEMIAUTOMATIC_ASSAULT_RIFLE'_OR_WeaponDescription_=_'UZI_SEMIAUTOMATIC_ASSAULT_RIFLE')_AND_(EXTRACT(YEAR_FROM_DateReported)_=_2020))_THEN_1_ELSE_0_END)_AS_\"2020\",_SUM(CASE_WHEN_((WeaponDescription_=_'HAND_GUN'_OR_WeaponDescription_=_'ANTIQUE_FIREARM'_OR_WeaponDescription_=_'ASSAULT_WEAPON/UZI/AK47/ETC'_OR_WeaponDescription_=_'AUTOMATIC_WEAPON/SUB-MACHINE_GUN'_OR_WeaponDescription_=_'M1-1_SEMIAUTOMATIC_ASSULT_RIFLE'_OR_WeaponDescription_=_'M-14_SEMIAUTOMATIC_ASSAULT_RIFLE'_OR_WeaponDescription_=_'MAC-10_SEMIAUTOMATIC_ASSAULT_WEAPON'_OR_WeaponDescription_=_'MAC-11_SEMIAUTOMATIC_ASSAULT_WEAPON'_OR_WeaponDescription_=_'OTHER_FIREARM'_OR_WeaponDescription_=_'RELIC_FIREARM'_OR_WeaponDescription_=_'REVOLVER'_OR_WeaponDescription_=_'RIFLE'_OR_WeaponDescription_=_'SEMI-AUTOMATIC_PISTOL'_OR_WeaponDescription_=_'SEMI-AUTOMATIC_RIFLE'_OR_WeaponDescription_=_'SHOTGUN'_OR_WeaponDescription_=_'STARTER_PISTOL/REVOLVER'_OR_WeaponDescription_=_'UNKNOWN_FIREARM'_OR_WeaponDescription_=_'UNK_TYPE_SEMIAUTOMATIC_ASSAULT_RIFLE'_OR_WeaponDescription_=_'UZI_SEMIAUTOMATIC_ASSAULT_RIFLE')_AND_(EXTRACT(YEAR_FROM_DateReported)_=_2021))_THEN_1_ELSE_0_END)_AS_\"2021\",_SUM(CASE_WHEN_((WeaponDescription_=_'HAND_GUN'_OR_WeaponDescription_=_'ANTIQUE_FIREARM'_OR_WeaponDescription_=_'ASSAULT_WEAPON/UZI/AK47/ETC'_OR_WeaponDescription_=_'AUTOMATIC_WEAPON/SUB-MACHINE_GUN'_OR_WeaponDescription_=_'M1-1_SEMIAUTOMATIC_ASSULT_RIFLE'_OR_WeaponDescription_=_'M-14_SEMIAUTOMATIC_ASSAULT_RIFLE'_OR_WeaponDescription_=_'MAC-10_SEMIAUTOMATIC_ASSAULT_WEAPON'_OR_WeaponDescription_=_'MAC-11_SEMIAUTOMATIC_ASSAULT_WEAPON'_OR_WeaponDescription_=_'OTHER_FIREARM'_OR_WeaponDescription_=_'RELIC_FIREARM'_OR_WeaponDescription_=_'REVOLVER'_OR_WeaponDescription_=_'RIFLE'_OR_WeaponDescription_=_'SEMI-AUTOMATIC_PISTOL'_OR_WeaponDescription_=_'SEMI-AUTOMATIC_RIFLE'_OR_WeaponDescription_=_'SHOTGUN'_OR_WeaponDescription_=_'STARTER_PISTOL/REVOLVER'_OR_WeaponDescription_=_'UNKNOWN_FIREARM'_OR_WeaponDescription_=_'UNK_TYPE_SEMIAUTOMATIC_ASSAULT_RIFLE'_OR_WeaponDescription_=_'UZI_SEMIAUTOMATIC_ASSAULT_RIFLE')_AND_(EXTRACT(YEAR_FROM_DateReported)_=_2022))_THEN_1_ELSE_0_END)_AS_\"2022\"_FROM_\"KEEGAN.SEPIOL\".\"CRIMEDATA\"_WHERE_DateReported_BETWEEN_'01-JAN-2020'_AND_'31-DEC-2022'_GROUP_BY_TO_CHAR(DateReported,_'YYYY-MM')_ORDER_BY_TO_CHAR(DateReported,_'YYYY-MM')ASC").then(function (jsonData) {
                //Lock in value just in case
                let sliderVal = sliderGC.value;
                for (let i = 0; i < jsonData.results.length; i++) {
                    let year = parseInt(jsonData.results[i].Month.slice(0, 4));
                    let mon = parseInt(jsonData.results[i].Month.slice(5));

                    if (year == sliderVal) {
                        numGC[mon - 1] = jsonData.results[i][year];
                    }
                }

                gcChart.update();
            });
        }
        updateGCChart();

        sliderGC.addEventListener("change", (event) =>{
            updateGCChart();
        })
    }

    TBS = document.getElementById("TBSChart");
    
    if(TBS){
    

        const changeYear = document.getElementById('TheftBySeason_Input');
        let tbsChangeData = [];
        let tbsTotalData = [];


        const labels = ['Spring','Summer','Fall','Winter'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Relative Change',
                yAxisID: 'y',
                data: tbsChangeData,
                backgroundColor: colorScheme,
                borderColor: colorScheme,
                borderWidth: 1

            }, {
                label: 'Total Petty Theft',
                yAxisID: 'y1',
                data: tbsTotalData,
                backgroundColor: colorSchemeDark,
                borderColor: colorSchemeDark,
                borderWidth: 1

            }]
        };
        
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Relative Change in Petty Theft in ${changeYear.value}`,
                        font: {
                            size: 24,
                        },
                        align: 'left'
                    },
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Percent'
                        },
                        ticks: {
                            stepSize: 5

                        },
                        max: 35,
                        min: -35
                    },
                    y1: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total'
                        },
                        position: 'right',
                        ticks: {
                            stepSize: 5000
                        },
                        max: 35000,
                        min: -35000
                    }

                }
            },
        };

        let tbsChart = new Chart(TBS, config);

        async function updateTBSChart() {
            let sliderVal = changeYear.value;
            getJSON(`SELECT_CONCAT(\'Q\',_FLOOR((EXTRACT(MONTH_FROM_DateReported)_-_1)_/_3)_+_1)_AS_\"Quarter\",_COUNT(*)_AS_\"Total_Petty_Theft\",_(COUNT(*)_-_LAG(COUNT(*),_1)_OVER_(ORDER_BY_CONCAT(\'Q\',_FLOOR((EXTRACT(MONTH_FROM_DateReported)_-_1)_/_3)_+_1)))_/_NULLIF(LAG(COUNT(*),_1)_OVER_(ORDER_BY_CONCAT(\'Q\',_FLOOR((EXTRACT(MONTH_FROM_DateReported)_-_1)_/_3)_+_1)),_0)_*_100_AS_\"Percent_Change\"_FROM_\"KEEGAN.SEPIOL\".\"CRIMEDATA\"_WHERE_CrimeDescription_=_\'SHOPLIFTING_-_PETTY_THEFT_($950_&_UNDER)\'_OR_CrimeDescription_=_\'PETTY_THEFT_-_AUTO_REPAIR\'_OR_CrimeDescription_=_\'THEFT_FROM_MOTOR_VEHICLE_-_PETTY_($950_&_UNDER)\'_OR_CrimeDescription_=_\'THEFT_PLAIN_-_PETTY_($950_&_UNDER)\'_OR_CrimeDescription_=_\'THEFT,_COIN_MACHINE_-_PETTY_($950_&_UNDER)\'_OR_CrimeDescription_=_\'TILL_TAP_-_PETTY_($950_&_UNDER)\'_OR_CrimeDescription_=_\'EMBEZZLEMENT,_PETTY_THEFT_($950_&_UNDER)\'_OR_CrimeDescription_=_\'DISHONEST_EMPLOYEE_-_PETTY_THEFT\'_OR_CrimeDescription_=_\'BUNCO,_PETTY_THEFT\'_AND_EXTRACT(YEAR_FROM_DateReported)_=_${sliderVal}_GROUP_BY_CONCAT(\'Q\',_FLOOR((EXTRACT(MONTH_FROM_DateReported)_-_1)_/_3)_+_1)_ORDER_BY_CONCAT(\'Q\',_FLOOR((EXTRACT(MONTH_FROM_DateReported)_-_1)_/_3)_+_1)`).then(function (jsonData) {
                tbsChangeData.length = 0;
                tbsTotalData.length = 0;
                for (let i = 0; i < jsonData.results.length; i++) {
                    let quarter = parseInt(jsonData.results[i].Quarter.slice(1));
                    tbsChangeData[quarter - 1] = {x: quarter - 1 ,y: jsonData.results[i]["Percent Change"]};
                    tbsTotalData[quarter - 1] = {x: quarter - 1, y: jsonData.results[i]["Total Petty Theft"]};
                }
                tbsChart.options.plugins.title.text = `Relative Change in Petty Theft in ${changeYear.value}`;
                document.getElementById("TBSTitle").innerHTML = "<u>Theft by Season <br> in " + changeYear.value;

                tbsChart.update();
            });
        }
        updateTBSChart();

        changeYear.addEventListener('change', (event) => {
            updateTBSChart();
        });

    }
});