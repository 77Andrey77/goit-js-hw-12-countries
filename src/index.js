import "./css/common.css";
import contentInfoTpl from './templates/contentInfo.hbs';
import contentListTpl from './templates/contentList.hbs';
import Api from './fetchCountries';

import debounce from "lodash.debounce";

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css' ;


// var debounce = require('lodash.debounce');
const cardContainerEl = document.querySelector('.js-card-container');
const searchInputEl = document.querySelector('.js-search-input');

 searchInputEl.value = '';

searchInputEl.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
    // e.preventDefault();
    // clearArticleContain();
    const searchQuery = searchInputEl.value;
    console.log(searchQuery);
    if (!searchQuery) return;

Api.fetchCountries(searchQuery).then(markupType).catch(console.error());
}

function markupType(value) {
    clearArticleContain();
    if (value.length > 10) {
        // clearArticleContain();
        messageError(info, 'Too many matches found. Please enter a more specific query!');
        return;
    }
    else if (value.length > 1 && value.length <= 10) {
        // clearArticleContain();
        renderCountryCard(contentListTpl, value);
    }
    else if (value.length === 1) {
        // clearArticleContain();
        renderCountryCard(contentInfoTpl, value[0]);
        return;
    } else {
        // clearArticleContain();
        messageError(info, 'I cannot find such a country');
    }
    
}

function renderCountryCard(templates, country) {
    const markup = templates(country);
    cardContainerEl.insertAdjacentHTML('beforeend', markup);
    }
    
function clearArticleContain() {
    cardContainerEl.innerHTML = '';
}

function messageError (typeInfo, textInfo) {
    typeInfo({
        text: `${textInfo}`,
        delay: 3000,
        // mouseReset: true,
        // sticker: false,
        // closer: true,
        // closerHover: false,
        
    })
}
