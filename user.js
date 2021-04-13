var ref = firebase.database().ref("todoList");
var runIdRef = firebase.database().ref("runId");

let DATA;
let RUN_ID;

function getData() {
    ref.orderByChild("id").on("value", (snapshot) => {
        if (snapshot.exists()) {
            fetch(snapshot.val());
        } else {
            console.log("No data available");
            DATA = "";
        }
    });
    runIdRef.on("value", (snapshot) => {
        const data = snapshot.val();
        RUN_ID = data;
        console.log(RUN_ID);
    });
}

function fetch(data) {
    DATA = data;
    console.log(DATA);
}

window.onload = getData();