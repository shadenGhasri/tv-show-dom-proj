const div = document.createElement("div")
div.classList.add("container")
const search = document.querySelector(".search")
const main = document.querySelector("main")


const getData = async function(){
  const response = await axios("https://api.tvmaze.com/shows/82/episodes");
  const episodes = response.data;
  for(let episode of episodes){
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    const card = document.createElement("div")
    card.classList.add("card");

    
    
    const details = document.createElement("details")
    const summaryEL = document.createElement("summary")
    const p = document.createElement("p")
    const pName = document.createElement("p")
    const pNumber = document.createElement("p")
    pNumber.textContent =   `S0${episode.season}E0${episode.number}`
    pNumber.style.textAlign ="center"

    pName.textContent = episode.name
    pName.style.textAlign ="center"
    pName.style.fontWeight = "bold"
    summaryEL.textContent = "summary"
    p.textContent = episode.summary.replaceAll("<p>", "").replaceAll("</p>", "");
    const aPlay = document.createElement("a")
    aPlay.href = episode.url
    const aTime = document.createElement("a")

    const iconPlay = document.createElement("i")
    const iconTime = document.createElement("i")
    iconPlay.classList.add("fa-solid","fa-play")
    iconTime.classList.add("fa-solid","fa-clock")
    aPlay.append(iconPlay)
    aTime.append(iconTime)
    
    details.append(summaryEL,p)
    figure.append(img,figcaption)
    figcaption.append(pName,pNumber,details,aPlay,aTime)
    
    card.append(figure)
    div.append(card)
    main.append(div)
    img.src = episode.image.medium;

  }

    const searchFunc = (Value)=>{
      const cards = document.querySelectorAll(".card")
      console.log(cards)
      for(let card of cards){
        if (!card.textContent.toLowerCase().includes(Value)) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      }
    }

    search.addEventListener("keyup",(e)=>{
      const searchValue = e.target.value.toLowerCase();
      searchFunc(searchValue)
    });

    
     
  


    const select = document.querySelector("select")
    for(let episode of episodes){
      const option = document.createElement("option")
      option.textContent =    `${episode.name} S0${episode.season}E0${episode.number}`
      
      select.append(option)
    }

    select.addEventListener("change",(e)=>{
      
      const selected = e.target.value.toLowerCase();

      searchFunc(selected)

    })

  
  












}
getData();