const slider = document.querySelector("#SRange");
const datalen = document.querySelector("[datalength]");
const passworddis = document.querySelector("#display");
const copy = document.querySelector("#copy");
const cpymsg = document.querySelector("[data-cpy]");
const upper = document.querySelector("#uppercase");
const lower = document.querySelector("#Lowercase");
const IncluNum = document.querySelector("#number");
const symbol = document.querySelector("#Symbol");
const stren = document.querySelector("#strength");
const genrate = document.querySelector("#genrate-button");
const allcheakbox = document.querySelectorAll("input[type=checkbox]")
const symbols = '!@#$%^&*()_-[]{}""<>/?.';

let password = "";
let datalenght = 10;
let defaultpassword = "";
let checkCount = 0;
heldelSlider();


function heldelSlider() {
    slider.value = datalenght;
    datalen.innerText = datalenght;
}

function getRandom(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function getupper() {
    let str = String.fromCharCode(getRandom(65, 91));
    return str;
}

function getLower() {
    return String.fromCharCode(getRandom(97, 123));

}
function getnum() {
    return (getRandom(0, 9));
}

function getSymbol() {
    const randnum = getRandom(0, symbols.length);
    return symbols.charAt(randnum);

}


function howmany_checked() {
    checkCount = 0;
    allcheakbox.forEach((checkbox) => {
        if (checkbox.checked) {

            checkCount++;

        }
    })
}
allcheakbox.forEach((checkbox) => {
    checkbox.addEventListener('change', howmany_checked);

})


//<---------copu button----------->
async function cpymessage() {
    try {
        await navigator.clipboard.writeText(password);
        cpymsg.innerText = "Copied";
    }
    catch (e) {
        cpymsg.innerText = "Copy failed";
    }

    cpymsg.classList.add("active");
    setTimeout(() => {
        cpymsg.classList.remove("active");
    }, 2000);
}


copy.addEventListener('click', (e) = () => {

    if (password.length > 0) {

        cpymessage();


    }

});
//-----------------shuffel function--------------->


function shuffel(password){
    let passwordArray = password.split('');
    for(let i = 0;i<passwordArray.length;i++){
        let sec = getRandom(0,i);
        let temp = password.charAt(i);
        passwordArray[i] = passwordArray[sec];
        passwordArray[sec] = temp;
    }
    return passwordArray.join('');
}

//<----------------/copu button------------------->


slider.addEventListener("input", (e) = () => {
    datalenght = slider.value;
    heldelSlider();
});

genrate.addEventListener('click', () => {
    password = ""
    if (datalenght < checkCount) {
        datalenght = checkCount;
        heldelSlider();
    }
    // password grarate//


    //remove old password

    //genrating password

    let funarr = [];
    if (upper.checked) {
        funarr.push(getupper);

    }

    if (lower.checked) {
        funarr.push(getLower)
    }

    if (IncluNum.checked) {
        funarr.push(getnum)
    }

    if (symbol.checked) {
        funarr.push(getSymbol)
    }


    for (let i = 0; i < funarr.length; i++) {
        password += funarr[i]();
    }

    for (let j = checkCount; j < datalenght; j++) {
        password += funarr[getRandom(0, checkCount)]();
    }

password = shuffel(password);

    passworddis.value = password ;

});