--Query 1: Find monthly arrests by police station, grouped by ethnicity
SELECT EXTRACT(MONTH FROM DateReported) AS "Month",
Area as "Police Station",
VictimDescent as "Ethnicity",
COUNT(*) AS "Total Arrests"
FROM CrimeData
WHERE VictimDescent != '0'
GROUP BY EXTRACT(MONTH FROM DateReported), Area, VictimDescent
ORDER BY EXTRACT(MONTH FROM DateReported) ASC, Area ASC, VictimDescent ASC;

--Query 2: Find relative percent change of petty theft by monthly quarter (every 3 months) in 2020 
SELECT CONCAT('Q', FLOOR((EXTRACT(MONTH FROM DateReported) - 1) / 3) + 1) AS Quarter,
COUNT(*) AS "Total Petty Theft",
(COUNT(*) - LAG(COUNT(*), 1)
OVER (ORDER BY CONCAT('Q', FLOOR((EXTRACT(MONTH FROM DateReported) - 1) / 3) + 1))) / NULLIF(LAG(COUNT(*), 1)
OVER (ORDER BY CONCAT('Q', FLOOR((EXTRACT(MONTH FROM DateReported) - 1) / 3) + 1)), 0) * 100 AS "Percent Change"
FROM CrimeData
WHERE CrimeDescription = 'SHOPLIFTING - PETTY THEFT ($950 & UNDER)' 
OR CrimeDescription = 'PETTY THEFT - AUTO REPAIR' 
OR CrimeDescription = 'THEFT FROM MOTOR VEHICLE - PETTY ($950 & UNDER)' 
OR CrimeDescription = 'THEFT PLAIN - PETTY ($950 & UNDER)'
OR CrimeDescription = 'THEFT, COIN MACHINE - PETTY ($950 & UNDER)'  
OR CrimeDescription = 'TILL TAP - PETTY ($950 & UNDER)'
OR CrimeDescription = 'EMBEZZLEMENT, PETTY THEFT ($950 & UNDER)'
OR CrimeDescription = 'DISHONEST EMPLOYEE - PETTY THEFT'
OR CrimeDescription = 'BUNCO, PETTY THEFT'
AND EXTRACT(YEAR FROM DateReported) = 2020
GROUP BY CONCAT('Q', FLOOR((EXTRACT(MONTH FROM DateReported) - 1) / 3) + 1)
ORDER BY CONCAT('Q', FLOOR((EXTRACT(MONTH FROM DateReported) - 1) / 3) + 1);

--Query 3: Find the amount of firarms used by month from 2020-2022
SELECT 
  TO_CHAR(DateReported, 'YYYY-MM') AS "Month",
  SUM(CASE WHEN ((WeaponDescription = 'HAND GUN' OR WeaponDescription = 'ANTIQUE FIREARM' 
  OR WeaponDescription = 'ASSAULT WEAPON/UZI/AK47/ETC' OR WeaponDescription = 'AUTOMATIC WEAPON/SUB-MACHINE GUN' 
  OR WeaponDescription = 'M1-1 SEMIAUTOMATIC ASSULT RIFLE' OR WeaponDescription = 'M-14 SEMIAUTOMATIC ASSAULT RIFLE' 
  OR WeaponDescription = 'MAC-10 SEMIAUTOMATIC ASSAULT WEAPON' OR WeaponDescription = 'MAC-11 SEMIAUTOMATIC ASSAULT WEAPON' 
  OR WeaponDescription = 'OTHER FIREARM' OR WeaponDescription = 'RELIC FIREARM' OR WeaponDescription = 'REVOLVER' 
  OR WeaponDescription = 'RIFLE' OR WeaponDescription = 'SEMI-AUTOMATIC PISTOL' OR WeaponDescription = 'SEMI-AUTOMATIC RIFLE' 
  OR WeaponDescription = 'SHOTGUN' OR WeaponDescription = 'STARTER PISTOL/REVOLVER' OR WeaponDescription = 'UNKNOWN FIREARM' 
  OR WeaponDescription = 'UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE' OR WeaponDescription = 'UZI SEMIAUTOMATIC ASSAULT RIFLE')
  AND (EXTRACT(YEAR FROM DateReported) = 2020)) THEN 1 ELSE 0 END) AS "2020",
  SUM(CASE WHEN ((WeaponDescription = 'HAND GUN' OR WeaponDescription = 'ANTIQUE FIREARM' 
  OR WeaponDescription = 'ASSAULT WEAPON/UZI/AK47/ETC' OR WeaponDescription = 'AUTOMATIC WEAPON/SUB-MACHINE GUN' 
  OR WeaponDescription = 'M1-1 SEMIAUTOMATIC ASSULT RIFLE' OR WeaponDescription = 'M-14 SEMIAUTOMATIC ASSAULT RIFLE' 
  OR WeaponDescription = 'MAC-10 SEMIAUTOMATIC ASSAULT WEAPON' OR WeaponDescription = 'MAC-11 SEMIAUTOMATIC ASSAULT WEAPON' 
  OR WeaponDescription = 'OTHER FIREARM' OR WeaponDescription = 'RELIC FIREARM' OR WeaponDescription = 'REVOLVER' 
  OR WeaponDescription = 'RIFLE' OR WeaponDescription = 'SEMI-AUTOMATIC PISTOL' OR WeaponDescription = 'SEMI-AUTOMATIC RIFLE' 
  OR WeaponDescription = 'SHOTGUN' OR WeaponDescription = 'STARTER PISTOL/REVOLVER' OR WeaponDescription = 'UNKNOWN FIREARM' 
  OR WeaponDescription = 'UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE' OR WeaponDescription = 'UZI SEMIAUTOMATIC ASSAULT RIFLE')
  AND (EXTRACT(YEAR FROM DateReported) = 2021)) THEN 1 ELSE 0 END) AS "2021",
  SUM(CASE WHEN ((WeaponDescription = 'HAND GUN' OR WeaponDescription = 'ANTIQUE FIREARM' 
  OR WeaponDescription = 'ASSAULT WEAPON/UZI/AK47/ETC' OR WeaponDescription = 'AUTOMATIC WEAPON/SUB-MACHINE GUN' 
  OR WeaponDescription = 'M1-1 SEMIAUTOMATIC ASSULT RIFLE' OR WeaponDescription = 'M-14 SEMIAUTOMATIC ASSAULT RIFLE' 
  OR WeaponDescription = 'MAC-10 SEMIAUTOMATIC ASSAULT WEAPON' OR WeaponDescription = 'MAC-11 SEMIAUTOMATIC ASSAULT WEAPON' 
  OR WeaponDescription = 'OTHER FIREARM' OR WeaponDescription = 'RELIC FIREARM' OR WeaponDescription = 'REVOLVER' 
  OR WeaponDescription = 'RIFLE' OR WeaponDescription = 'SEMI-AUTOMATIC PISTOL' OR WeaponDescription = 'SEMI-AUTOMATIC RIFLE' 
  OR WeaponDescription = 'SHOTGUN' OR WeaponDescription = 'STARTER PISTOL/REVOLVER' OR WeaponDescription = 'UNKNOWN FIREARM' 
  OR WeaponDescription = 'UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE' OR WeaponDescription = 'UZI SEMIAUTOMATIC ASSAULT RIFLE') 
  AND (EXTRACT(YEAR FROM DateReported) = 2022)) THEN 1 ELSE 0 END) AS "2022"
FROM CrimeData
WHERE DateReported BETWEEN '01-JAN-2020' AND '31-DEC-2022'
GROUP BY TO_CHAR(DateReported, 'YYYY-MM')
ORDER BY TO_CHAR(DateReported, 'YYYY-MM')ASC;

--Query 4: Find female victims by age group per week in 2020.
SELECT 
  TO_CHAR(DateOcured, 'WW') AS "Week",
  SUM(CASE WHEN VictimSex = 'F' THEN 1 ELSE 0 END) AS "Total Females",
  (CASE 
    WHEN VictimAge BETWEEN 0 AND 26 THEN 'Gen Z'
    WHEN VictimAge BETWEEN 27 AND 42 THEN 'Millennial'
    WHEN VictimAge BETWEEN 43 AND 58 THEN 'Gen X'
    WHEN VictimAge BETWEEN 59 AND 68 THEN 'Boomers II'
    ELSE 'Boomers I' 
  END) As "Generation"
FROM CrimeData
WHERE DateOcured BETWEEN '01-JAN-2020' AND '31-DEC-2020'
  AND VictimAge BETWEEN 0 AND 100
GROUP BY TO_CHAR(DateOcured, 'WW'), 
  (CASE 
    WHEN VictimAge BETWEEN 0 AND 26 THEN 'Gen Z'
    WHEN VictimAge BETWEEN 27 AND 42 THEN 'Millennial'
    WHEN VictimAge BETWEEN 43 AND 58 THEN 'Gen X'
    WHEN VictimAge BETWEEN 59 AND 68 THEN 'Boomers II'
    ELSE 'Boomers I' 
  END)
ORDER BY TO_CHAR(DateOcured, 'WW') ASC, SUM((CASE WHEN VictimSex = 'F' THEN 1 ELSE 0 END)) DESC;

--Query 5
SELECT PremisDescription as "Premis Description", 
    (CASE 
         WHEN TimeOcured BETWEEN 500 AND 1159 THEN 'Morning' 
         WHEN TimeOcured BETWEEN 1200 AND 1659 THEN 'Afternoon' 
         WHEN TimeOcured BETWEEN 1700 AND 2059 THEN 'Evening' 
         ELSE 'Night' 
    END) AS "Time Of Day",
    COUNT(PremisDescription) AS "Number of Crimes"
FROM CrimeData
WHERE PremisDescription != '0' AND PremisDescription != ' '
GROUP BY PremisDescription,
    (CASE 
         WHEN TimeOcured BETWEEN 500 AND 1159 THEN 'Morning' 
         WHEN TimeOcured BETWEEN 1200 AND 1659 THEN 'Afternoon' 
         WHEN TimeOcured BETWEEN 1700 AND 2059 THEN 'Evening' 
         ELSE 'Night' 
    END)
ORDER BY PremisDescription ASC, 
    (CASE 
         WHEN TimeOcured BETWEEN 500 AND 1159 THEN 'Morning' 
         WHEN TimeOcured BETWEEN 1200 AND 1659 THEN 'Afternoon' 
         WHEN TimeOcured BETWEEN 1700 AND 2059 THEN 'Evening' 
         ELSE 'Night' 
    END) ASC;