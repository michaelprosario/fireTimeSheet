class FireStoreDataServices {
    saveTimeSheet(objTimeSheet) {
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

    addTimeEntry(objTimeEntry) {
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

    updateTimeEntry(objTimeEntry) {
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
    
    getTimeEntry(recordID) {
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

    getTimeEntries(recordId) {
        if(recordId == null){
            throw "recordId is required."
        }

        return new Promise(function (resolve, reject) {
            var db = firebase.firestore();

            var items = [];
            db.collection("time_entries").where("timeSheetId", "==", recordId).get().then((querySnapshot) => {
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

    getTimeSheets() {

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

    getEmptyTimeEntry() {
        return {
            startTime: '',
            endTime: '',
            hours: '',
            project: '',
            story: '',
            task: '',
            date: '',
            notes: '',
            errors: [],
            timeSheetId: currentTimeSheetId,
            id: ''
        }
    }
}