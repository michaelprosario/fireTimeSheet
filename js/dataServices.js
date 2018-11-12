var FireStoreDataServices = function(){
    this.saveTimeSheet = function( objTimeSheet ) {
        var db = firebase.firestore();
        db.collection("time_sheets").add(objTimeSheet).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    this.getTimeSheets = function(){
        
        return new Promise(function(resolve,reject) {
            var db = firebase.firestore();

            var items = [];
            db.collection("time_sheets").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var rowData = doc.data();
                    var timeSheetRow = {
                        id: doc.id,
                        startDate : rowData.startDate,
                        endDate : rowData.endDate,
                    };

                    items.push(timeSheetRow);
                });

                resolve(items);

            });
        });     
    }
}