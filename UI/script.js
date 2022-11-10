function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
 }


window.onload = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    fetch("https://387dd204-8a25-4f27-ab51-f9fc3674461c.mock.pstmn.io/api?packs=CAH+Base+Set", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            let newId = '';
            let rndWhite = getRandomInt(data.white.length);        
            let whiteCardId = [];

            for (var i = 1; i <=10; i++){
                rndWhite = getRandomInt(data.white.length);
                while (whiteCardId.includes(rndWhite)) {
                    rndWhite = getRandomInt(data.white.length);
                }
                whiteCardId[i] = rndWhite

                newId =  i;
                
                // Create a clone of element with id ddl_1:
                let clone = document.querySelector('#card-black').cloneNode( true );

                // Change the id attribute of the newly created element:
                let cardId = "card-white-" + newId 
                clone.setAttribute( 'id', cardId);

                // Append the newly created element on element p 
                document.querySelector('#white-cards').appendChild( clone );

                document.querySelector(`#${cardId}`).classList.remove('black');
                document.querySelector(`#${cardId}`).classList.add('white', 'shadow');
                let rotation = generateRandomInteger (-1,1);
                document.querySelector(`#${cardId}`).style.transform = "rotate(" + rotation + "deg)";
                

                document.querySelector(`#${cardId} p`).innerText = data.white[rndWhite];
                

            }
            
            let rndBlack = getRandomInt(data.black.length);
            let blackText = data.black[rndBlack].text;
            const words = blackText.split('_');

            document
                .querySelector('#card-black')
                .querySelector('.card')
                .querySelector('p').innerText = words[0];

            for (var i=1; i <= words.length - 1; i++){
                
                let card = document
                    .querySelector('#card-black')
                    .querySelector('.card');
                
                let clone = card 
                    .querySelector('.card-text')
                    .cloneNode( true );
                
                card.appendChild(clone);

                var x = card.querySelectorAll(".card-text"); 
                x[i].innerText = "";
                x[i].classList.add('filling');


                clone = card 
                    .querySelector('.card-text')
                    .cloneNode( true );
                
                card.appendChild(clone);
               
                
                var x = card.querySelectorAll(".card-text"); 
                x[i+1].innerText = words[i];

            }
            
            
        }
    )

    
    
        
  };

  const onClick = (event) => {
    if (event.target.nodeName === 'DIV') {
        console.log(event.target.id);
        id = event.target.id
        
        if (id){
            let whiteCardText = document
                .querySelector("#" + id)
                .querySelector('.card')
                .querySelector('p').innerText;

            var x = document
                .querySelector('#card-black')
                .querySelector('.card')
                .querySelectorAll(".card-text");
            
            x.forEach(element => {
                if (element.classList.contains('filling')){
                    element.innerText = whiteCardText;
                }
            });
                

            console.log(whiteCardText);
        }
    }
  }
  window.addEventListener('click', onClick);

  

