
const botao = document.querySelector("#botao");
const date = document.querySelector("#date");

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}



function getCategorias() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categorias",
        success: function (data) {
            console.log(data);
        }
    });
}

function saveOnDatabase() {
    let desc = document.querySelector("#desc").value;
    let value = Number(document.querySelector("#value").value);
    let categoria = document.querySelector("#categoria");
    let categoriaName = categoria.options[categoria.selectedIndex].text

    console.log("VALORESSS")
    console.log(JSON.stringify({
        description: desc,
        value: value,
        categoriaName: categoriaName
    }))
    $.ajax({
        url: "http://localhost:8080/api/contas",
        method: "POST",
        data: JSON.stringify({
            description: desc,
            value: value,
            categoriaName: categoriaName
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            showMessage("Conta adicionada com sucesso.", false)
            document.querySelector("#desc").value = "";
            document.querySelector("#value").value = null;
            categoria.selectedIndex = 0;
        },
        error: function (error){
            showMessage(error.responseJSON.message, true);
        }
    });
}





var intervalID;
var timeout;
function showMessage(message, error) {
    try{
        clearInterval(intervalID);
        clearTimeout(timeout);
    }catch(error){}
    let messageContainer = document.querySelector("#messages");
    let progress = document.querySelector("#progressBar")
    let w = progress.style.width;
    messageContainer.style.display = "flex";
    progress.style.display = "flex";
    if (error) {
        messageContainer.style.backgroundColor = "#F08080";
        progress.style.backgroundColor = "red";
        messageContainer.style.color = "#800000";
        messageContainer.style.fontWeight = "bold";
    } else {
        messageContainer.style.backgroundColor = "green";
        progress.style.backgroundColor = "lime";
        messageContainer.style.color = "white";
        messageContainer.style.fontWeight = "bold";
    }
    messageContainer.textContent = message;

    let barWidth = 100;

    const animate = () => {
        barWidth--;
        progress.style.width = `${barWidth}%`;
    };

    intervalID = setInterval(() => {
        if (barWidth === 0) {
            clearInterval(intervalID);
        } else {
            animate();
        }
    }, 49); //this sets the speed of the animation
    timeout = setTimeout(function () {
        messageContainer.style.display = "none";
        progress.style.display = "none";
    }, 5000);
}


botao.addEventListener("click", saveOnDatabase)



date.addEventListener('input', (e) =>{
    e.value = dateFormat(e.value);
});
function dateFormat(el){
    value = el.value;       
    el.value = value.replace(/^([\d]{4})([\d]{2})([\d]{2})$/,"$1/$2/$3");        
}