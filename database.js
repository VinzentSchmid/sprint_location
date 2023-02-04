const connection = require('./config')

function getAllLocations() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations;';
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getLocationByID(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function addLocation(location) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO locations (street, housenumber, postalcode, city, country) VALUES (?,?,?,?,?);"
        connection.query(query, [location.street, location.housenumber, location.postalcode, location.city, location.country],function (err, result) {
            if (err) {
                reject(err);
                console.log("NO record inserted")
            } else{
                resolve(result);
                console.log("1 record inserted")
            }
        })
    });

}

function removeLocation(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM locations WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function updateLocation(location) {
    // return new Promise((resolve, reject) => {
    //     const query =
    // })
}
function search(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getAllWaterEntries() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations RIGHT JOIN waterentries ON waterentries.locations_id = locations.id;';
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}


function getWaterEntryByID(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM locations RIGHT JOIN waterentries ON waterentries.id = ? AND waterentries.locations_id = locations.id';
        connection.query(query, [id],(error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function addWaterEntry(liquid) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO waterentries (ml, type, amount) VALUES (?, ?, 1)';
        connection.query(query, [liquid.ml, liquid.type],(error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
function removeWaterEntry(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM waterentries WHERE id = ?';
        connection.query(query, [id],(error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function updateWaterEntry(liquid) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE waterentries SET ml = ?, type = ? WHERE id = ?';
        connection.query(query, [liquid.ml, liquid.type, liquid.id],(error,
                                                                     results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
function mapLocationToWaterEntry(entryID, locationID) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE waterentries SET locations_id = ? WHERE id = ?';
        connection.query(query, [Number(locationID), Number(entryID)],(error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
module.exports = {
    getAllLocations,
    search,

    getLocationByID(id){
        return getLocationByID(id)
    },
    removeLocation(id){
        return removeLocation(id)
    },
    addLocation(location){
        if(!location.id){
            return addLocation(location);
        } else {
            return updateLocation(location);
        }
    },
    getAllWaterEntries,
    getWaterEntryByID(id){
        return getWaterEntryByID(id)
    },
    removeWaterEntry(id){
        return removeWaterEntry(id)
    },
    addWaterEntry(waterEntry){
        if(!waterEntry.id){
            return addWaterEntry(waterEntry);
        } else {
            return updateWaterEntry(waterEntry);
        }
    },
    mapLocationToWaterEntry(entryID, locationID){
        return mapLocationToWaterEntry(entryID, locationID);
    }
}