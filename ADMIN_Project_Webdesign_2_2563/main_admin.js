var ref = firebase.database().ref("todoList");
var runIdRef = firebase.database().ref("runId");

let TODO_HEAD_CONTAINER = document.getElementById("todo-head-container");
let TODO_HEAD_TEXT = document.getElementById("todo-head-text");
let TODO_HEAD_INPUT = document.getElementById("todo-head-input");
let CLEAR_TODO_HEAD_BTN = document.getElementById("clear-todo-head-btn");
let NOW_TODO_HEAD = "";

// Part 2
let TODO_LIST_CONTAINER = document.getElementById("todo-list-container")
    // let TODO_ITEM_INPUT = document.getElementById("todo-item-input")
let TODO_LIST_CONTAINER2 = document.getElementById("todo-list-container2")

let IMG_LINK_INPUT = document.getElementById("img-link-input")

let CAR_IMG_INPUT = document.getElementById("car-img-input");
let CAR_DATA_INPUT = document.getElementById("car-data-input");
let CAR_COST_INPUT = document.getElementById("car-cost-input");
let CAR_GAS_INPUT = document.getElementById("car-gas-input");

let NOW_ITEM = "";

const LIST_NAME = "list";
const ITEM_NAME = "l";
const ITEM_NAME2 = "c";

let DATA;
let RUN_ID;

function getData() {
    ref.orderByChild("id").on("value", (snapshot) => {
        if (snapshot.exists()) {
            fetch(snapshot.val());
        } else {
            console.log("No data available");
            DATA = "";
            setDisplayCondition();
        }
    });
    runIdRef.on("value", (snapshot) => {
        const data = snapshot.val();
        RUN_ID = data;
    });
}

function syncData(data) {
    DATA = data;
}

function fetch(data) {
    DATA = data;
    if (NOW_TODO_HEAD === "") setNOW_TODO_HEAD("")
    reloadContent();
}

function setNOW_TODO_HEAD(current) {
    if (DATA === null || !DATA) {
        NOW_TODO_HEAD = "";
    }
    for (let i in DATA) {
        if (current === "") {
            NOW_TODO_HEAD = i;
            break;
        }
        if (current < i) {
            NOW_TODO_HEAD = i;
            break;
        } else {
            NOW_TODO_HEAD = i;
        }
    }
}

function objectSize(object) {
    let count = 0;
    for (let i in object) {
        count++;
    }
    return count;
}

function numberFormat(number) {
    var str = "" + number;
    var pad = "000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
}

function reloadContent() {
    setDisplayCondition();
    renderTodoList(DATA);
    renderTodoListItem(DATA[NOW_TODO_HEAD])

    console.log("NOW_ITEM", NOW_ITEM)

    if (DATA[NOW_TODO_HEAD].title == "Slider") {
        renderTodoItemChange(DATA[NOW_TODO_HEAD].link[NOW_ITEM])
        console.table(DATA[NOW_TODO_HEAD].link[NOW_ITEM])
    }

    if (DATA[NOW_TODO_HEAD].title == "CarData") {
        renderTodoItemChange(DATA[NOW_TODO_HEAD].data[NOW_ITEM])
        console.table(DATA[NOW_TODO_HEAD].data[NOW_ITEM])
    }
}

function setDisplayCondition() {
    if (!DATA || objectSize(DATA) === 0) {
        CLEAR_TODO_HEAD_BTN.style.opacity = "0";
        TODO_HEAD_TEXT.innerHTML = "";
    } else {
        CLEAR_TODO_HEAD_BTN.style.opacity = "1";
    }
}

function renderTodoList(todoListHead) {
    TODO_HEAD_CONTAINER.innerHTML = "";
    for (let i in todoListHead) {
        TODO_HEAD_CONTAINER.appendChild(
            createTodoListHead({ key: i, text: todoListHead[i].title })
        );
    }
}

function renderTodoItemChange(todoItem) {
    TODO_LIST_CONTAINER2.innerHTML = ""
        // console.log(todoItem, "todoItem")

    const div = document.createElement("DIV");
    const label = document.createElement("H2");

    if (DATA[NOW_TODO_HEAD].title == 'Slider' && NOW_ITEM != '') {
        label.innerHTML = "แก้ไขข้อมูลรูปโฆษณา"
        const text_link_div = document.createElement("DIV")
        const text_link_old = document.createElement("LABEL")
        text_link_old.innerHTML = "ที่อยู่รูปใหม่: "
        const form_link_new = document.createElement("INPUT")
        form_link_new.setAttribute("id", "img-link-new-input")
        form_link_new.setAttribute("class", "text-input")
        form_link_new.setAttribute("type", "text")
        form_link_new.setAttribute("placeholder", "รูปใหม่")

        const zonebutton = document.createElement("DIV")
        zonebutton.classList.add("zonebutton")
        const removebutton = document.createElement("DIV")
        removebutton.innerHTML = "ลบข้อมูล"
        removebutton.classList.add("removebutton")
        removebutton.setAttribute("onclick", `removebutton()`)
        const changebutton = document.createElement("DIV")
        changebutton.innerHTML = "แก้ไขข้อมูล"
        changebutton.classList.add("changebutton")
        changebutton.setAttribute("onclick", `changebutton()`)

        zonebutton.appendChild(removebutton)
        zonebutton.appendChild(changebutton)

        text_link_div.appendChild(text_link_old)
        text_link_div.appendChild(form_link_new)
        text_link_div.appendChild(zonebutton)
        div.appendChild(label)
        div.appendChild(text_link_div)
    } else if (DATA[NOW_TODO_HEAD].title == 'CarData' && NOW_ITEM != '') {
        label.innerHTML = "แก้ไขข้อมูลรถ"
        const text_data_div = document.createElement("DIV")
        const breakline = document.createElement("BR")

        const text = document.createElement("P")
        text.innerHTML = "รูปภาพรถใหม่: "
        const car_new = document.createElement("input")
        car_new.setAttribute("id", "car-img-new-input")
        car_new.setAttribute("class", "text-input")
        car_new.setAttribute("type", "text")
        car_new.setAttribute("placeholder", "รูปใหม่")
        text_data_div.appendChild(text)
        text_data_div.appendChild(car_new)
        text_data_div.appendChild(breakline)

        const text2 = document.createElement("P")
        text2.innerHTML = "หมวดทะเบียนรถใหม่: "
        const car_new2 = document.createElement("input")
        car_new2.setAttribute("id", "car-data-new-input")
        car_new2.setAttribute("class", "text-input")
        car_new2.setAttribute("type", "text")
        car_new2.setAttribute("placeholder", "หมวดทะเบียนรถใหม่")
        text_data_div.appendChild(text2)
        text_data_div.appendChild(car_new2)
        text_data_div.appendChild(breakline)

        const text3 = document.createElement("P")
        text3.innerHTML = "ราคาเช่าใหม่: "
        const car_new3 = document.createElement("input")
        car_new3.setAttribute("id", "car-cost-new-input")
        car_new3.setAttribute("class", "text-input")
        car_new3.setAttribute("type", "number")
        car_new3.setAttribute("placeholder", "ราคาเช่าใหม่")
        text_data_div.appendChild(text3)
        text_data_div.appendChild(car_new3)
        text_data_div.appendChild(breakline)

        const text4 = document.createElement("P")
        text4.innerHTML = "ประเภทแก๊ส: "
        const car_new4 = document.createElement("select")
        car_new4.setAttribute("id", "car-gas-new-input")
        car_new4.setAttribute("class", "text-input")
        const op = document.createElement("option")
        op.innerHTML = "เลือกประเภทแก๊ส"
        op.setAttribute("value", "")
        const op1 = document.createElement("option")
        op1.innerHTML = "LPG"
        op1.setAttribute("value", "LPG")
        const op2 = document.createElement("option")
        op2.innerHTML = "NGV"
        op2.setAttribute("value", "NGV")
        const op3 = document.createElement("option")
        op3.innerHTML = "LPG/NGV"
        op3.setAttribute("value", "LPG/NGV")
        car_new4.appendChild(op)
        car_new4.appendChild(op1)
        car_new4.appendChild(op2)
        car_new4.appendChild(op3)
        text_data_div.appendChild(text4)
        text_data_div.appendChild(car_new4)

        const zonebutton = document.createElement("DIV")
        zonebutton.classList.add("zonebutton")
        const removebutton = document.createElement("DIV")
        removebutton.innerHTML = "ลบข้อมูล"
        removebutton.classList.add("removebutton")
        removebutton.setAttribute("onclick", `removebutton()`)
        const changebutton = document.createElement("DIV")
        changebutton.innerHTML = "แก้ไขข้อมูล"
        changebutton.classList.add("changebutton")
        changebutton.setAttribute("onclick", `changebutton()`)

        zonebutton.appendChild(removebutton)
        zonebutton.appendChild(changebutton)

        div.appendChild(label)
        div.appendChild(text_data_div)
        div.appendChild(zonebutton)
    }



    TODO_LIST_CONTAINER2.appendChild(div)
}

function changebutton() {

    const r = confirm("Continue!")
    console.log(r)
    if (r == false) {
        alert("Cancel!")
        return
    }

    if (DATA[NOW_TODO_HEAD].title == "Slider") {
        let link = document.getElementById("img-link-new-input").value

        if (link === '') {
            link = DATA[NOW_TODO_HEAD].link[NOW_ITEM].link
        }

        ref.child(NOW_TODO_HEAD + /link/ + NOW_ITEM).update({
            "link": link,
        })
    }

    if (DATA[NOW_TODO_HEAD].title == "CarData") {
        let car = document.getElementById("car-data-new-input").value
        let cost = document.getElementById("car-cost-new-input").value
        let gas = document.getElementById("car-gas-new-input").value
        let img = document.getElementById("car-img-new-input").value

        if (car === '') {
            car = DATA[NOW_TODO_HEAD].data[NOW_ITEM].car
        }
        if (cost === '') {
            cost = DATA[NOW_TODO_HEAD].data[NOW_ITEM].cost
        }
        if (gas === '') {
            gas = DATA[NOW_TODO_HEAD].data[NOW_ITEM].gas
        }
        if (img === '') {
            img = DATA[NOW_TODO_HEAD].data[NOW_ITEM].img
        }

        ref.child(NOW_TODO_HEAD + /data/ + NOW_ITEM).update({
            "car": car,
            "cost": cost,
            "gas": gas,
            "img": img,
        })
    }
    reloadContent()
}

function removebutton() {
    const r = confirm("Continue!")
    console.log(r)
    if (r == false) {
        alert("Cancel!")
        return
    }

    if (DATA[NOW_TODO_HEAD].title == "Slider") {
        ref.child(NOW_TODO_HEAD + /link/ + NOW_ITEM).set(null)
    }

    if (DATA[NOW_TODO_HEAD].title == "CarData") {
        ref.child(NOW_TODO_HEAD + /data/ + NOW_ITEM).set(null)
    }

    reloadContent()
}

function createTodoListHead({ key, text }) {
    const div = document.createElement("DIV");
    const span = document.createElement("SPAN");
    span.innerHTML = text;
    div.classList.add("todo-head");
    if (key === NOW_TODO_HEAD) {
        TODO_HEAD_TEXT.innerHTML = text;
        div.classList.add("active");
    }
    div.setAttribute("onclick", `selectTodoList("${key}")`);
    div.appendChild(span);
    return div;
}

function addTodoList() {
    if (TODO_HEAD_INPUT.value !== "") {
        ref.child(LIST_NAME + numberFormat(RUN_ID)).set({
            title: TODO_HEAD_INPUT.value,
            todoRunId: 0,
            todo: {},
        });

        runIdRef.set(RUN_ID + 1);

        setNOW_TODO_HEAD();
    }
    TODO_HEAD_INPUT.value = "";
    reloadContent();
}

function removeTodoList() {
    ref.child(NOW_TODO_HEAD).set(null);
    const current = NOW_TODO_HEAD;
    NOW_TODO_HEAD = "";
    setNOW_TODO_HEAD(current);
    setDisplayCondition();
    reloadContent();
}

function selectTodoList(key) {
    NOW_TODO_HEAD = key;
    if (DATA[NOW_TODO_HEAD].title == "CarData") {
        document.getElementsByClassName("add-input-set")[2].style.height = "50px"
        document.getElementsByClassName("add-input-set")[2].style.visibility = "visible"
        document.getElementsByClassName("add-input-set")[1].style.visibility = "hidden"
        document.getElementsByClassName("add-input-set")[1].style.height = "0px"
    }
    if (DATA[NOW_TODO_HEAD].title == "Slider") {
        document.getElementsByClassName("add-input-set")[1].style.height = "50px"
        document.getElementsByClassName("add-input-set")[1].style.visibility = "visible"
        document.getElementsByClassName("add-input-set")[2].style.visibility = "hidden"
        document.getElementsByClassName("add-input-set")[2].style.height = "0px"
    }
    NOW_ITEM = "";
    reloadContent();
}

function selectTodoItem(key) {
    NOW_ITEM = key;
    reloadContent();
}

// Part 2

let KEY = "";
let TEXT = "";
let ISCHECKED = false;

function renderTodoListItem(todoList) {
    TODO_LIST_CONTAINER.innerHTML = ""

    if (DATA[NOW_TODO_HEAD].title === "Slider") {
        if (todoList.link != null) {
            console.log("Have Item");
            for (let i in todoList.link) {
                console.table(todoList.link);
                KEY = i;
                TODO_LIST_CONTAINER.appendChild(createTodoListItem(KEY))
            }

        } else {
            console.log("Not Have Item")
        }
    }

    if (DATA[NOW_TODO_HEAD].title === "CarData") {
        if (todoList.data != null) {
            console.log("Have Item");
            for (let i in todoList.data) {
                console.table(todoList.data);
                KEY = i;
                TODO_LIST_CONTAINER.appendChild(createTodoListItem(KEY))
            }

        } else {
            console.log("Not Have Item")
        }
    }

}

function createTodoListItem({ key }) {
    key = KEY;
    console.log("KEY", key)
    const todoList = document.createElement("DIV")
    const label = document.createElement("LABEL")
    const image = document.createElement("IMG")
    const label2 = document.createElement("LABEL")
    const label3 = document.createElement("LABEL")
    const label4 = document.createElement("LABEL")


    if (DATA[NOW_TODO_HEAD].title == "Slider") {

        // label.innerHTML = "ID: " + DATA[NOW_TODO_HEAD].link[key].id
        image.setAttribute("src", `${DATA[NOW_TODO_HEAD].link[key].link}`)
        image.classList.add("image-item")
            // todoList.appendChild(label)
        todoList.appendChild(image)

        todoList.setAttribute("onclick", `selectTodoItem("${key}")`)
        todoList.classList.add("list-item")

        if (NOW_ITEM == key) {
            todoList.classList.add("active")
        }
    } else if (DATA[NOW_TODO_HEAD].title == "CarData") {
        // label.innerHTML = "ID: " + DATA[NOW_TODO_HEAD].data[key].id
        image.setAttribute("src", `${DATA[NOW_TODO_HEAD].data[key].img}`)
        image.classList.add("image-item")
            // todoList.appendChild(label)
        todoList.appendChild(image)
        let newline = document.createElement("BR")
        todoList.appendChild(newline)

        label2.innerHTML = DATA[NOW_TODO_HEAD].data[key].car
        label2.classList.add("lableitem")
        todoList.appendChild(label2)

        label3.innerHTML = DATA[NOW_TODO_HEAD].data[key].cost + "-บาท"
        label3.classList.add("lableitem")
        todoList.appendChild(label3)

        label4.innerHTML = DATA[NOW_TODO_HEAD].data[key].gas
        label4.classList.add("lableitem")
        todoList.appendChild(label4)

        todoList.setAttribute("onclick", `selectTodoItem("${key}")`)
        todoList.classList.add("list-item")
        if (NOW_ITEM == key) {
            todoList.classList.add("active")
        }
    }


    return todoList
}


function addTodoListItem() {

    if (DATA[NOW_TODO_HEAD].title == "Slider") {
        if (IMG_LINK_INPUT.value === '') {
            return
        }
        const runTodoNumber = DATA[NOW_TODO_HEAD].todoRunId;
        console.log(runTodoNumber)
        ref.child(NOW_TODO_HEAD + /link/ + ITEM_NAME + numberFormat(DATA[NOW_TODO_HEAD].todoRunId)).set({
            "id": "l" + DATA[NOW_TODO_HEAD].todoRunId,
            "link": IMG_LINK_INPUT.value
        })
        ref.child(NOW_TODO_HEAD).update({
            "todoRunId": DATA[NOW_TODO_HEAD].todoRunId + 1,
        })
        IMG_LINK_INPUT.value = "";
        reloadContent()
    }

    if (DATA[NOW_TODO_HEAD].title == "CarData") {
        if (CAR_COST_INPUT.value === '' || CAR_DATA_INPUT.value === '') {
            return
        }
        const runTodoNumber = DATA[NOW_TODO_HEAD].todoRunId;
        console.log(runTodoNumber)

        ref.child(NOW_TODO_HEAD + /data/ + ITEM_NAME2 + numberFormat(DATA[NOW_TODO_HEAD].todoRunId)).set({
            "img": CAR_IMG_INPUT.value,
            "id": "c" + DATA[NOW_TODO_HEAD].todoRunId,
            "car": CAR_DATA_INPUT.value,
            "cost": CAR_COST_INPUT.value,
            "gas": CAR_GAS_INPUT.value
        })
        ref.child(NOW_TODO_HEAD).update({
            "todoRunId": DATA[NOW_TODO_HEAD].todoRunId + 1,
        })
        CAR_IMG_INPUT.value = "";
        CAR_DATA_INPUT.value = "";
        CAR_COST_INPUT.value = "";
        CAR_GAS_INPUT.value = "LPG";
        reloadContent()
    }

}

function checkItem(key) {
    console.log(DATA[NOW_TODO_HEAD].todo[key].isChecked)

    ref.child(NOW_TODO_HEAD + /todo/ + key).update({
        "isChecked": !DATA[NOW_TODO_HEAD].todo[key].isChecked,
    })

}

function removeTodoListItem(key) {

    ref.child(NOW_TODO_HEAD + /todo/ + key).update({
        "isValid": false,
    })

    reloadContent()
}


window.onload = getData();