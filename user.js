let app = new Vue({
    el: '#app',
    data: {
      ref: firebase.database().ref("todoList"),
      runIdRef: firebase.database().ref("runId"),
      DATA: {},
      RUN_ID: 0,
      ob_data: {},
      key_s: [],
      len_car: 0,
      car:[],
      cost:[],
      sort_car: "",
      sort_cost: 0,
      sort_gas: "",
    },
    methods: {
        getDataFromFirebase() {
            this.ref.orderByChild("id").on("value", (snapshot) => {
                if (snapshot.exists()) {
                    this.fetch(snapshot.val());
                } else {
                    console.log("No data available");
                    this.DATA = "";
                }
            });
            this.runIdRef.on("value", (snapshot) => {
                const data = snapshot.val();
                this.RUN_ID = data;
                console.log(this.RUN_ID);
            });
        },
        fetch(data) {
            this.DATA = data;
            console.log(this.DATA);
            this.getData();
        },
        getData() {
            this.ob_data = this.DATA["list004"].data;
            this.key_s = Object.keys(this.ob_data);
            this.len_car = this.key_s.length;
        
            console.log(this.ob_data);
            console.log(this.key_s);
            console.log(this.len_car);

            this.key_s.forEach(key => {
                this.car.push(this.ob_data[key].car);
                this.cost.push(this.ob_data[key].cost);
            });
            this.car = Array.from(new Set(this.car));
            this.cost = Array.from(new Set(this.cost));
        }
    },
  })

window.onload = app.getDataFromFirebase();