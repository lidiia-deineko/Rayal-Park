//выпадающее(jQuery)
$('.header-btn_media').on('click', function(){
    $('.menu').addClass('active');
    $('.header-btn_close').addClass('active-close-btn');
})

$('.header-btn_close').on('click', function(){
    $('.menu').removeClass('active');
    $('.header-btn_close').removeClass('active-close-btn');
})

let reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
let btnSubscrabe = document.querySelector('.subscribe__btn');
let inp = document.querySelector('.subscribe__inp');
let message = document.querySelector('.subscribe__message');
let modalSubscrube = document.querySelector('.subscribe__modal');
let modalSubscrubeCloseAll = document.querySelectorAll('.close-modal');

//JS
//модальное окно для book-in
let localData = new Date().toLocaleDateString();
let checkInDate = document.querySelector('.book-now__check-in');
let checkOutDate = document.querySelector('.book-now__check-out');

//функция для получения текущей даты (check in по умолчанию)
function getCheckInDate(){
    let date = new Date();
    let localYear = date.getFullYear();
    let localMonth = Number(date.getMonth()+1);
    let localDay = Number(date.getDate());

    if(localMonth.lenght = 1){
        localMonth = '0'+ localMonth
    }
    if(localDay.lenght = 1){
        localDay = '0'+ localDay
    }

    let newLocalDate = localYear + '-'+ localMonth + '-' + localDay;

    return newLocalDate;
}

//функция для получения текущей даты + 1 день (check out)
function getCheckOutDate(){
    let date = new Date();
    let localYear = date.getFullYear();
    let localMonth = Number(date.getMonth()+1);
    let localDay = Number(date.getDate()+1);

    if(localMonth.lenght = 1){
        localMonth = '0'+ localMonth
    }
    if(localDay.lenght = 1){
        localDay = '0'+ localDay
    }

    let newLocalDate = localYear + '-'+ localMonth + '-' + localDay;

    return newLocalDate;
}
 
checkInDate.value = getCheckInDate()
checkInDate.min = checkInDate.value
checkOutDate.min = getCheckOutDate()
checkOutDate.value = getCheckOutDate()
checkInDate.addEventListener('input', updateCheckOutDate);

//функция для обновления даты выезда после выбора check in
function updateCheckOutDate(e){
    let updateValue = e.target.value; 
    checkOutDate.value = updateValue;
    checkOutDate.min = updateValue; 
}

//закрытие модального окна по команде Find room и запись объекта c параметрами пользователя
let btnSearchRoom = document.querySelector('.search-room');
let amountAdults = document.querySelector('.book-now__amount_adults');
let amountKids = document.querySelector('.book-now__amount_kids');

let objBookIn = {
    checkIn: '',
    checkOut: '',
    adults: 0,
    kids: 0
}

btnSearchRoom.addEventListener('click', searchRoom)

function searchRoom(){
    objBookIn.checkIn = checkInDate.value;
    objBookIn.checkOut = checkOutDate.value;
    objBookIn.adults = amountAdults.value;
    objBookIn.kids = amountKids.value;
    modalBookNow.style.display = 'none';
    console.log(objBookIn)
}

//открытие модальных окон Book in

let modalBookNow = document.querySelector('.book-now');
let btnsBookNow = document.querySelectorAll('.btn-book-now');

btnsBookNow.forEach(function(btnBookNow){
    btnBookNow.addEventListener('click', function(){
        modalBookNow.style.display = 'block';
    })
})

modalSubscrubeCloseAll.forEach(function(btnClose){
    btnClose.addEventListener('click', function(){
        modalSubscrube.style.display = 'none';
        modalBookNow.style.display = 'none';
        window.location.reload();
    })
})

//read more
let btnsContentMore = document.querySelectorAll('.btn-more');
let btnsContentsLess = document.querySelectorAll('.btn-less');
let textsHidden = document.querySelectorAll('.text-hidden');

btnsContentMore.forEach(function(btnContentMore, index){
    btnContentMore.addEventListener('click', function(){
        textsHidden[index].style.display = 'block';
        btnsContentsLess[index].style.display = 'block';
        btnContentMore.style.display = 'none';
    })
})

//read less
btnsContentsLess.forEach(function(btnContentLess, index){
    btnContentLess.addEventListener('click', function(){
        textsHidden[index].style.display = 'none';
        btnsContentMore[index].style.display = 'block';
        btnContentLess.style.display = 'none';
    })
})

//проверка валидации и открытие модального окна
btnSubscrabe.onclick = function(e){
    e.preventDefault();
    if(!validate(reg, inp.value)){
        notValid(message, 'Input is not correct!');
        inp.style.border = '1px solid #B22222'
    }else{
        valid(message, '')
        modalSubscrube.style.display = 'block';
    }
}

//закрытие модальных окон
modalSubscrubeCloseAll.forEach(function(btnClose){
    btnClose.addEventListener('click', function(e){
        modalSubscrube.style.display = 'none';
        modalBookNow.style.display = 'none';
        window.location.reload();
    })
})

//запрет ввода пробела как первого символа
document.querySelector('.subscribe__inp').oninput = function(e){
    e.preventDefault();
    if(inp.value[0] === ' '){
        inp.value = ''
    }
}

function validate(regEx, inp){
    return regEx.test(inp)
}

function notValid(el, message){
    el.innerHTML = message;
}

function valid(el, message){
    el.innerHTML = message;
    inp.value = ' '
}





