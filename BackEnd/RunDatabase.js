
const oracledb = require("oracledb");


exports.accessDatabase = async function(query) {
    let cnt;
    let result;

    try {

        const tmp = '{ "user": "KEEGAN.SEPIOL", "password": "AcPRpRiqALdU5vFky6IGPmfy", "connectionString" : "oracle.cise.ufl.edu:1521/orcl" }';
        cnt = await oracledb.getConnection(JSON.parse(tmp));
        result = await cnt.execute(query, [], {outFormat: oracledb.OUT_FORMAT_OBJECT});
    }
    catch (exception) {
        console.log(exception);
    }

    if (cnt) {
        try {
            await cnt.close();
        } catch (err) {
            console.error(err);
        }
    }
    return (result)? {results: result.rows} : {};
};

exports.run = async function(tableName, columnName, condition = "") {
    let query = `SELECT ${columnName} FROM ${tableName}`;
    query += (condition !== "")? ` WHERE ${condition}` : '';

    return exports.accessDatabase(query);

};

exports.randomVal = function (){
    let result = {value: 5};
    return result;
};