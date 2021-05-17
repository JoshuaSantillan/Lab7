// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const settingsPage = document.querySelector('header img');
const homePage = document.querySelector('header h1');
let entryEle = 0;

// Make sure you register your service worker here too
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = ++entryEle;
        newPost.addEventListener('click', () =>{
            // call function in router.js to change current state of a single Entry
            setState({page:'entry', id: newPost.id});
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});

homePage.addEventListener('click', () => {
  setState({page: 'homePage'});
});

settingsPage.addEventListener('click', () => {
  setState({page: 'settingsPage'});
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register("./sw.js").then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
