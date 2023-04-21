
create table CrimeData
(
    DrNo integer primary key,
    DateReported DATE,
    DateOcured DATE,
    TimeOcured integer,
    Area integer,
    AreaName varchar (50) not null,
    ReportedDistrictNumber integer,
    PartOneOrTwo integer,
    CrimeCode integer,
    CrimeDescription varchar (300) not null,
    MoCodes varchar (100) not null,
    VictimAge integer,
    VictimSex varchar(1) not null,
    VictimDescent varchar (1) not null,
    PremisCd integer,
    PremisDescription varchar (300) not null,
    WeaponUsed integer,
    WeaponDescription varchar (300),
    Status varchar (5) not null,
    StatusDescription varchar (50) not null,
    CrimeCodeOne integer,
    CrimeCodeTwo integer,
    CrimeCodeThree integer,
    CrimeCodeFour integer,
    CrimeLocation varchar (50) not null,
    CrossStreet varchar (50) not null,
    Latitude numeric(7,4),
    Longitude numeric(7,4)
        
/*
    constraint PC_Info unique (DrNo, Area, AreaName),
    constraint VD_Info unique (DrNo, VictimAge, VictimSex, VictimDescent),
    constraint PD_Info unique (DrNo, PremisCD, PremisDescription, CrimeLocation, CrossStreet),
    constraint WT_Info unique (DrNo, WeaponUsed, WeaponDescription),
    constraint CDTP_Info unique (DrNo, Area, CrimeCode, CrimeCodeTwo, CrimeCodeThree, CrimeCodeFour),
    constraint CDTV_Info unique (DrNo, VictimAge, VictimSex, VictimDescent, CrimeCode, CrimeCodeTwo, CrimeCodeThree, CrimeCodeFour)
    TimeOfDay varchar (25) not null,
    CrimeDate date not null,
    Crime_Code integer,
    Crime_DistrictName varchar (50) not null,
    Crime_AreaCode integer,
    Crime_Premis_CD varchar(50) not null,
    Crime_WeaponCode varchar(25) not null,
    primary key (DrNo),
    foreign key (Crime_Code) references PoliceCode(Code),
    foreign key (Crime_DistrictName) references PopulationData(DistrictName),
    foreign key (Crime_AreaCode) references PoliceStation(AreaCode),
    foreign key (Crime_Premis_CD) references PremiseData(Premis_CD),
    foreign key (Crime_WeaponCode) references WeaponTable(WeaponCode)
    */
);

/*
create table PoliceCode
(
    PC_DrNo integer primary key,
    PC_PoliceCode integer,
    PC_PoliceDescription varchar (50) not null,
    constraint PC_PoliceInfo foreign key (PC_DrNo, PC_PoliceCode, PC_PoliceDescription) references CrimeData (DrNo, Area, AreaName)
);

create table VictimData
(
    VD_DrNo integer primary key,
    VD_Age integer,
    VD_Sex varchar (1) not null,
    VD_Ethnicity varchar (1) not null,
    constraint VD_VictimInfo foreign key (VD_DrNo, VD_Age, Vd_Sex, VD_Ethnicity) references CrimeData (DrNo, VictimAge, VictimSex, VictimDescent)
);
*/
/* There is no population information, idk where this table came from
create table PopulationData
(
    PD_DrNo integer primary key,
    PD_DistrictName varchar (50) not null,
    PD_Population integer not null,
    constraint PD_PopulationInfo foreign key (PD_DrNo, DisctrictName, Population)
);
*/

/* Redunant table, already have Police Code
create table PoliceStation
(
    PS_DrNo integer primary key,
    PS_AreaCode integer,
    PS_AreaName varchar (50) not null,
    constraint PS_PoliceStationInfo foreign key (VD_DrNo, PS_AreaCode, PS_AreaName) references CrimeData (DrNo, AreaCode, AreaName)
);
*/
/*
create table PremisData
(
    PD_DrNo integer primary key,
    PD_CD integer,
    PD_PremisDescription varchar(300) not null,
    PD_CrimeLocation varchar (50) not null,
    PD_CrossStreet varchar (50) not null,
    constraint PD_PremisInfo foreign key (PD_DrNo, PD_CD, PD_PremisDescription, PD_CrimeLocation, PD_CrossStreet) 
    references CrimeData (DrNo, PremisCD, PremisDescription, CrimeLocation, CrossStreet)
);

create table WeaponTable 
(
    WT_DrNo integer primary key,
    WT_WeaponCode integer,
    WT_WeaponDescription varchar(300) not null,
    constraint WT_WeaponInfo foreign key (WT_DrNo, WT_WeaponCode, WT_WeaponDescription) references CrimeData (DrNo, WeaponUsed, WeaponDescription)
);

create table CrimeDataToPolice
(
    CDTP_DrNo integer primary key,
    CDTP_PoliceCode integer,
    CDTP_CrimeCode integer,
    CDTP_CrimeCodeTwo integer,
    CDTP_CrimeCodeThree integer,
    CDTP_CrimeCodeFour integer,
    constraint CDTP_CrimeDataToPoliceInfo foreign key (CDTP_DrNo, CDTP_PoliceCode, CDTP_CrimeCode, CDTP_CrimeCodeTwo, CDTP_CrimeCodeThree, CDTP_CrimeCodeFour) 
    references CrimeData(DrNo, Area, CrimeCode, CrimeCodeTwo, CrimeCodeThree, CrimeCodeFour)
);

create table CrimeDataToVictim
(
    CDTV_DrNo integer primary key,
    CDTV_VictimAge integer,
    CDTV_VictimSex varchar (1) not null,
    CDTV_VictimDescent varchar (1) not null,
    CDTV_CrimeCode integer,
    CDTV_CrimeCodeTwo integer,
    CDTV_CrimeCodeThree integer,
    CDTV_CrimeCodeFour integer,
    constraint CDTV_CrimeDataToVictim foreign key (CDTV_DrNo, CDTV_VictimAge, CDTV_VictimSex, CDTV_VictimDescent, CDTV_CrimeCode, CDTV_CrimeCodeTwo, CDTV_CrimeCodeThree, CDTV_CrimeCodeFour)
    references CrimeData (DrNo, VictimAge, VictimSex, VictimDescent, CrimeCode, CrimeCodeTwo, CrimeCodeThree, CrimeCodeFour)
);
*/
create table UserInfo
(
    UserID integer,
    Name varchar (25) not null,
    Password varchar (25) not null,
    Email varchar (50) not null,
    DateOfBirth DATE,
    primary key (UserID)
);


--grant all privileges to STRUNKS, NPEREZ3, CAMERON.ARRACHE;
GRANT SELECT,INSERT,UPDATE,DELETE ON UserInfo TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
GRANT SELECT,INSERT,UPDATE,DELETE ON CrimeData TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
/*
GRANT SELECT,INSERT,UPDATE,DELETE ON PoliceCode TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
GRANT SELECT,INSERT,UPDATE,DELETE ON VictimData TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
--GRANT SELECT,INSERT,UPDATE,DELETE ON PopulationData TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
--GRANT SELECT,INSERT,UPDATE,DELETE ON PoliceStation TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
GRANT SELECT,INSERT,UPDATE,DELETE ON PremiseData TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
GRANT SELECT,INSERT,UPDATE,DELETE ON WeaponTable TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
GRANT SELECT,INSERT,UPDATE,DELETE ON CrimeDataToPolice TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
GRANT SELECT,INSERT,UPDATE,DELETE ON CrimeDataToVictim TO STRUNKS, NPEREZ3, "CAMERON.ARRECHE";
*/
--grant all privileges on UserInfo, CrimeData, PoliceCode, VictimData, PopulationData, PoliceStation, PremiseData, WeaponTable, CrimeDataToPolice, CrimeDataToVictim to students;
