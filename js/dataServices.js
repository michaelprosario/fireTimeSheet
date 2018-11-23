var FireStoreDataServices = function () {
    this.saveTimeSheet = function (objTimeSheet) {
        return new Promise(function (resolve, reject) {
            var db = firebase.firestore();
            db.collection("time_sheets").add(objTimeSheet).then(function (docRef) {
                resolve(docRef.id);
            })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    reject(error);
                });
        });
    }

    this.addTimeEntry = function (objTimeEntry) {
        return new Promise(function (resolve, reject) {
            var db = firebase.firestore();
            db.collection("time_entries").add(objTimeEntry).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                resolve(docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                reject(error);
            });
        });
    }

    this.updateTimeEntry = function (objTimeEntry) {
        return new Promise(function (resolve, reject) {
            console.log("record to be saved");
            console.log(objTimeEntry);
            var db = firebase.firestore();
            db.collection("time_entries").doc(objTimeEntry.id).set(objTimeEntry).then(function (docRef) {
                resolve(objTimeEntry);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                reject(error);
            });
        });
    }
    

    this.getTimeEntry = function (recordID) {
        return new Promise(function (resolve, reject) {
            var db = firebase.firestore();

            db.collection("time_entries").doc(recordID).get().then(function (doc) {
                if (doc.exists) {

                    var rowData = doc.data();
                    var timeEntryRow = {
                        id: doc.id,
                        startTime: rowData.startTime,
                        endTime: rowData.endTime,
                        hours: rowData.hours,
                        project: rowData.project,
                        story: rowData.story,
                        task: rowData.task,
                        date: rowData.date,
                        notes: rowData.notes,
                        timeSheetId: rowData.timeSheetId
                    };

                    resolve(timeEntryRow);

                } else {
                    reject("Record not found");
                }
            }).catch(function (error) {
                reject("Error getting document:", error);
            });

        });
    }


    this.getTimeEntries = function () {
        return new Promise(function (resolve, reject) {
            var db = firebase.firestore();

            var items = [];
            db.collection("time_entries").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var rowData = doc.data();
                    var timeEntryRow = {
                        id: doc.id,
                        startTime: rowData.startTime,
                        endTime: rowData.endTime,
                        hours: rowData.hours,
                        project: rowData.project,
                        story: rowData.story,
                        task: rowData.task,
                        date: rowData.date,
                        notes: rowData.notes,
                        timeSheetId: rowData.timeSheetId
                    };

                    items.push(timeEntryRow);
                });

                resolve(items);

            });
        });
    }

    this.getTimeSheets = function () {

        return new Promise(function (resolve, reject) {
            var db = firebase.firestore();

            var items = [];
            db.collection("time_sheets").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var rowData = doc.data();
                    var timeSheetRow = {
                        id: doc.id,
                        startDate: rowData.startDate,
                        endDate: rowData.endDate,
                    };

                    items.push(timeSheetRow);
                });

                resolve(items);

            });
        });

    }
}