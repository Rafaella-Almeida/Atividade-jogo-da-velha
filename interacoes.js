const quadrado = window.document.querySelectorAll(".quadrado");
let checarTurno = true;

const JogadorX = "X";
const JogadorO = "O";
const CombinacoesQuadrados = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

document.addEventListener("click", (event)=>{
    if(event.target.matches(".quadrado")){
        jogar(event.target.id);

    }
});

function jogar(id){
   const quadrado = document.getElementById(id);
   turno = checarTurno ? JogadorX : JogadorO;
   quadrado.textContent = turno;
   quadrado.classList.add(turno);
   
   checarVencedor(turno);
}

function checarVencedor(turno){
  const vencedor = CombinacoesQuadrados.some((comb)=>{
      return comb.every((index)=>{
        return quadrado[index].classList.contains(turno);
      })
  });

  if (vencedor) {
    encerrarJogo(turno);
  } else if (checarEmpate()) {
    encerrarJogo();
  }  else {
    checarTurno = !checarTurno;
  }
}

function checarEmpate(){
    let x = 0;
    let o = 0;
    for (index in quadrado) {

          if (!isNaN(index)){
            
        if (quadrado[index].classList.contains(JogadorX)) {
            x++;
          }

          if (quadrado[index].classList.contains(JogadorO)) {
            o++;
          }
      }
  }
  return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null){
  const telaEscura = document.getElementById("tela-escura");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  let mensagem = null;

  telaEscura.style.display = "block";
  telaEscura.appendChild(h2);
  telaEscura.appendChild(h3);

    if (vencedor){
      h2.innerHTML = `O jogador "<span>${vencedor}</span>" venceu!`;
    } else {
      h2.innerHTML = "Partida emptada";

    }

    let contadorReiniciar = 5;

    setInterval(()=>{
      h3.style.fontSize= "18px";
      h3.style.color= "red";
      h3.innerHTML = `Reiniciando o jogo em ${contadorReiniciar--}s`
    },1000)

    setTimeout(()=>{
      location.reload()
    }, 6000)
}
  
