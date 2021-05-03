let app = new Vue({
    el: '#app',
    data: {
      ref: firebase.database().ref("todoList"),
      runIdRef: firebase.database().ref("runId"),
      DATA: {},
      RUN_ID: 0,
      pro_data:{},
      pro_link:[],
      len_pro_link: 0,
      ob_data: {},
      ob_link:[],
      len_ob_link: 0,
      key_s: [],
      len_car: 0,
      len_car2: 0,
      car:[],
      cost:[],
      car2:[],
      cost2:[],
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
            });
        },
        fetch(data) {
            this.DATA = data;
            this.getData();
        },
        getData() {
            this.ob_data = this.DATA["list004"].data;
            this.pro_data = this.DATA["list003"].link;
            this.key_s = Object.keys(this.ob_data);
            this.len_car = this.key_s.length;
            this.len_car2 = this.len_car-1;
        
            this.key_s.forEach(key => {
                this.car2.push(this.ob_data[key].car);
                this.cost2.push(this.ob_data[key].cost);
                this.ob_link.push(this.ob_data[key].img);
            });
            Object.keys(this.pro_data).forEach(key => {
                this.pro_link.push(this.pro_data[key].link);
            });
            this.car = Array.from(new Set(this.car2));
            this.cost = Array.from(new Set(this.cost2));
            this.len_pro_link = this.pro_link.length-1;
            this.len_ob_link = this.ob_link.length-1;
        }
    },
  })

window.onload = app.getDataFromFirebase();
var mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }