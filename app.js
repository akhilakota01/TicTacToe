let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn =document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let count=0;
let winner=0

let turnO=true;    //playerO,playerX

const winpatterns = [                    //all the possibilites to win the game,row,col,diago
     [0,1,2],
     [0,3,6],
     [0,4,8],
     [1,4,7],
     [2,5,8],
     [2,4,6],
     [3,4,5],
     [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO===true){           //player O
            box.innerText="O";
            box.style.color="black";
            turnO=false;
        }
        else{
            box.innerText="X";        //player X
            box.style.color="purple";
            turnO=true;
        }
        box.disabled=true;             //to make button work for only once

        checkWinner();
        count+=1;
        if(count==9)            //checking a condition where there is a draw...all 9 boxes are filled with no winner
        {
            if(winner==0)
            {
                   printGameOver();
            }

        }
    });
})



const checkWinner=()=>{
    for(let pattern of winpatterns)
    {   
        pos1Val=boxes[pattern[0]].innerText;
        pos2Val=boxes[pattern[1]].innerText;
        pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!==""   &&   pos2Val!==""  &&  pos3Val!=="")
        {
            if(pos1Val===pos2Val  &&  pos2Val===pos3Val)
            {
                winner=1;
                showWinner(pos1Val);         
            }
            
        }

    }
}


const showWinner=(winner_person)=>{
     msg.innerText=`Congratulations, Winner is player ${winner_person}`;
     msgContainer.classList.remove("hide");
     disableBoxes();               //after the winner is obtained the game should not be continued and the boxes buttons should not work

}

 const disableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
 }

 
newGameBtn.addEventListener("click",()=>{
    resetGame();
})

resetBtn.addEventListener("click",()=>{
    resetGame();
})


const resetGame=()=>{
    turnO=true 
    enableBoxes();        //all boxes should start working again
}

const enableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
        msgContainer.classList.add("hide");
        winner=0;
        count=0;
    }
 }



 const printGameOver = () => { // to print the draw condition
    msg.innerText = "It's a draw. GAME OVER!";
    msgContainer.classList.remove("hide");
};