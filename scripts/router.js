// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
const getBody = document.querySelector('body');
const headerTitle = document.querySelector('header h1');

router.setState = function(s) {
  /*
    Will need to add a state for: main page, the entry pages, and the setting page.
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   */
  
  if(s.page == 'homePage'){    
    history.pushState(s,'','/');
    getBody.className = '';
    headerTitle.textContent = 'Journal Entries'; 
  }
  else if(s.page == 'entry'){
    history.pushState(s,s.page+s.id,"#"+s.page+s.id);
    getBody.className = 'single-entry';
    headerTitle.textContent = 'Entry ' + s.id;

    getBody.removeChild(document.getElementsByTagName('entry-page')[0]);
    let getSingleEntry = document.getElementById(s.id);
    let createEntryPage = document.createElement('entry-page');
    
    createEntryPage.entry = getSingleEntry.entry;
    getBody.appendChild(createEntryPage);
  }
  else if(s.page == 'settingsPage'){
    getBody.className = 'settings';
    headerTitle.textContent = 'Settings';
    history.pushState(s, "Settings", "#Settings");
  }

  window.onpopstate = function(e) {
    if(headerTitle.textContent == "Journal Entries")
      document.body.className = "";
    else 
      document.body.className = e.getClassName;
  }
}
