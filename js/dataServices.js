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
        var db = firebase.firestore();
        db.collection("time_sheets").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });        
    }
}