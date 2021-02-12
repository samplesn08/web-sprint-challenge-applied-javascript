import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  
  //card
  const card = document.createElement('div');
  card.classList.add('card');
  //headline
  const headline = document.createElement('div');
  headline.classList.add('headline');
  headline.textContent = article.headline;
  card.appendChild(headline);
  //author
  const author = document.createElement('div');
  author.classList.add('author');
  card.appendChild(author);
  //imgContainer
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  author.appendChild(imgContainer);
  //img
  const img = document.createElement('img');
  img.setAttribute('src', article.authorPhoto);
  imgContainer.appendChild(img);
  //name
  const name = document.createElement('span');
  name.textContent = `By ${article.authorName}`;
  author.appendChild(name);

  //event listener
  card.addEventListener('click', () => {
    console.log(article.headline);
  })
  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const endPoint = 'https://lambda-times-api.herokuapp.com/articles';
  axios.get(endPoint)
    .then(res => {
      const container = document.querySelector(selector);
      const objOfArrays = res.data.articles;
      for(const topic in objOfArrays){
        let x = objOfArrays[topic];
        x.forEach(article => {
          container.appendChild(Card(article))
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
}

export { Card, cardAppender }
