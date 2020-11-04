import './styles.css';
import api from "./components/apiService.js"
import template from "./template/templateList.hbs"
import {alert} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox'
import "../node_modules/basiclightbox/dist/basicLightbox.min.css";


let input = document.querySelector('input');
let ul = document.querySelector(".gallery")
let page = 1;
let a = 100;

const addCard = function () {
    api(input.value,page)
        .then((data) => {
            if (data.hits.length >= 1) {
                data.hits.forEach(el => {            
                    ul.insertAdjacentHTML("beforeend", template(el))           
        })
        } else {
            alert("Таких картин не найдено, введите другой запрос");
            ul.innerHTML = "";
            input.value = "";
            } 
        });    
    ul.innerHTML = "";   
}

const loadMore = function () {          
    api(input.value, page += 1)
    .then((data) => {
        data.hits.forEach(el => { 
            document.documentElement > a + 100 
            ul.insertAdjacentHTML("beforeend", template(el))
        })         
    })   
}

const scroll = function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;    
	if(clientHeight + scrollTop >= scrollHeight - 1) {
        loadMore();
        const fn = function () {
            window.scrollBy(0,600)
        }
        setTimeout(fn,75)
    }
}

const lightBox = function (e) {
    if (e.target.nodeName === "IMG") {
        const instance = basicLightbox.create(`
    <img src=${e.target.dataset["name"]}>
`)
        instance.show()
    }else {""} 
}

ul.addEventListener("click",lightBox)
input.addEventListener("change",addCard)
window.addEventListener('scroll',scroll);

