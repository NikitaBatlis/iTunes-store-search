# iTunes Search with React & Express.

A React app that makes HTTP requests to the iTunes store API and to an Express API.

Type in a search and add items to your favourites list.

Deployed here: https://nikitabatlis-itunes-search.herokuapp.com/

## Installation

After download, unzip folder and the structure should looik like this:

```
backend/
  README.md
  package.json
  package-lock.json
  favourites.json
  app.js
  frontend/
    README.md
    package.json
    package-lock.json
    public/
      index.html
      favicon.ico
      manifest.json
    src/
      App.css
      App.js
      App.test.js
      index.css
      index.js
      servicWorker.js
      setupTest.js
      components/
        Search.js
        SearchResults.js
        Favourites.js   
  ```
## Deployment

```
cd backend
npm install
npm start

cd frontend
npm install
npm start

```