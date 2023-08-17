
const botao = document.querySelector("#botao");

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
    let date = document.querySelector("#date").value;
    let valueCurrency = document.querySelector("#value").value;
    let value = convertCurrencyToDouble(valueCurrency);
    let categoria = document.querySelector("#categoria");
    let categoriaName = categoria.options[categoria.selectedIndex].text

    console.log("VALORESSS")
    console.log(JSON.stringify({
        description: desc,
        date: date,
        value: value,
        categoriaName: categoriaName
    }))
    $.ajax({
        url: "http://localhost:8080/api/contas",
        method: "POST",
        data: JSON.stringify({
            description: desc,
            date: date,
            value: value,
            categoriaName: categoriaName
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            showMessage("Conta adicionada com sucesso.", false)
            document.querySelector("#desc").value = "";
            document.querySelector("#date").value = "";
            document.querySelector("#value").value = null;
            categoria.selectedIndex = 0;
        },
        error: function (error){
            if(error.responseJSON != undefined){
                showMessage(error.responseJSON.message, true);
            }else{
                showMessage("Erro de comunicação com o servidor.", true);
            }
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

function convertCurrencyToDouble(value){
    let output = value;
    output = output.replace("R$", "").replace(" ", "").replace(".", "");
    output = output.replace(",", ".")
    return Number(output);
}


botao.addEventListener("click", saveOnDatabase)