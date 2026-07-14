let arr=['rocket','astronaut','alien','planet','star','comet','satellite','telescope','ufo','moon','meteorite','jetpack','rocket','astronaut','alien','planet','star','comet','satellite','telescope','ufo','moon','meteorite','jetpack','jackpot'];
let emoji=['🚀','🧑‍🚀','👽','🪐','⭐','☄️','🛰️','🔭','🛸','🌙','🪨','🎒','🚀','🧑‍🚀','👽','🪐','⭐','☄️','🛰️','🔭','🛸','🌙','🪨','🎒','🎁'];
let opened=[];
let f=0;
function shuffel()
{
    for(let i=arr.length-1;i>=0;i--)
    {
        let j=Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
        [emoji[i],emoji[j]]=[emoji[j],emoji[i]];
    }
    return [arr,emoji];
}
let [shuffeled,shuffeled_emoji]=shuffel(arr);
let container=document.getElementById("container");
container.innerHTML="";
function back(card)
{
    card.innerHTML=`<img src="image/space.jpg">`;
    f=0;
}
function front(card,i)
{
    card=container.children[i];
    card.innerHTML=`${shuffeled_emoji[i]}`;
    f=1;
    
}

function setup()
{
    for(let i=0;i<shuffeled.length;i++)
    {
        let card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML=`<img src="image/space.jpg">`;
        f=0;
        container.appendChild(card);
        card.addEventListener('click',()=>
        {
            if(f===0)
            {
                front(card,i);
                opened.push(shuffeled[i]);
                if(opened.length>=3)
                opened.splice(0,1);
                console.log(opened);
                match(card);
            }
            else{
                back(card);
            }
        });
    }
}
function match(card)
{
    if(opened[0]==opened[1] || opened[0]=='jackpot')
    back(card);
}   
setup();
