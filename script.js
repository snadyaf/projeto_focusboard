//lógica de login - Snádya 

function validarLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const emailCorreto = "teste@email.com";
  const senhaCorreta = "123456";

  if (email === emailCorreto && senha === senhaCorreta) {

    document.getElementById("login-screen").remove();

    const app = document.getElementById("app");

    app.classList.remove("hidden");
    app.style.display = "flex";

  } else {
    alert("Email ou senha inválidos.");
  }
} 

//lógica das opções - Snádya 

function navegarPara(secao) {

      document.querySelectorAll(".section").forEach(section => {
      section.classList.remove("active");
      section.hidden = true;
    }); 

      const destino = document.getElementById(`section-${secao}`);

        destino.hidden = false;
        destino.classList.add("active");
}

//lógica do pomodoro - Snádya

let tempo = 25 * 60;
let contagemTempo = null;
let modoAtual = "foco";

const tempos = {
    foco: 25 * 60,
    pausa: 5 * 60,
    pausaLonga: 15 * 60
};

function atualizarDisplay() {

    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    document.getElementById("timer-display").textContent = `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}

function iniciarPomodoro() {

    if (contagemTempo) return;

    contagemTempo = setInterval(() => {

        tempo--;

        atualizarDisplay();

        if (tempo <= 0) {

            clearInterval(contagemTempo);
            contagemTempo = null;

            tempo = 0;
            atualizarDisplay();
            
        }

    }, 1000);
}

function pausarPomodoro() {

    clearInterval(contagemTempo);
    contagemTempo = null;

}

function reiniciarPomodoro() {

    clearInterval(contagemTempo);
    contagemTempo = null;

    tempo = tempos[modoAtual];

    atualizarDisplay();

}

function selecionarModoPomodoro(modo) {

    modoAtual = modo;

    clearInterval(contagemTempo);
    contagemTempo = null;

    document.querySelectorAll(".mode-btn").forEach(botao => {
        botao.classList.remove("active");
    });

    document.querySelector(`[data-mode="${modo}"]`).classList.add("active");

    tempo = tempos[modo];

    atualizarDisplay();

    document.getElementById("timer-mode-label").textContent = modo === "foco"  ? "FOCO" : modo === "pausa" ? "PAUSA" : "PAUSA LONGA";
}

atualizarDisplay();

//lógica da barra de progresso - Junior

function atualizarProgresso() {
    // Todas as tarefas
    const totalTarefas = document.querySelectorAll('.card').length;

    // Apenas tarefas concluídas
    const tarefasConcluidas = document.querySelectorAll(
        '.card[data-status="concluido"]'
    ).length;

    // Evita divisão por zero
    const percentual = totalTarefas > 0
        ? Math.round((tarefasConcluidas / totalTarefas) * 100)
        : 0;

    // Atualiza barra
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = `${percentual}%`;

    // Atualiza texto
    document.getElementById('progress-label').textContent =
        `${percentual}%`;

    document.querySelector('.progress-hint').textContent =
        `${tarefasConcluidas} de ${totalTarefas} tarefas concluídas`;

    // Atualiza atributos de acessibilidade
    const progressBar = document.querySelector('.progress-bar');
    progressBar.setAttribute('aria-valuenow', percentual);
    progressBar.setAttribute(
        'aria-label',
        `${percentual}% das tarefas concluídas`
    );
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarProgresso();
});

function soltarTarefa(event, novoStatus) {
    event.preventDefault();

    const tarefaId = event.dataTransfer.getData("text");
    const card = document.querySelector(`[data-id="${tarefaId}"]`);

    if (card) {
        document.getElementById(`col-${novoStatus}`).appendChild(card);

        // Atualiza status
        card.dataset.status = novoStatus;

        atualizarProgresso();
    }
}

function atualizarContadores() {
    document.getElementById('count-afazer').textContent =
        document.querySelectorAll('.card[data-status="afazer"]').length;

    document.getElementById('count-fazendo').textContent =
        document.querySelectorAll('.card[data-status="fazendo"]').length;

    document.getElementById('count-concluido').textContent =
        document.querySelectorAll('.card[data-status="concluido"]').length;
}

atualizarContadores();
atualizarProgresso();

//lógica de adicionar tarefas - Sid

function abrirModalNovaTarefa(){
  const modal = document.getElementById('modal-tarefa');

  modal.classList.remove('hidden');
}

/* array para adicinar as tarefas */
const tarefas = []

//Salvando os valores de cada campo 
function salvarTarefa(){
  const titulo = document.getElementById('modal-tarefa-titulo').value
  const descricao = document.getElementById('modal-tarefa-desc').value
  const data = document.getElementById('modal-tarefa-data').value
  const status = document.getElementById('modal-tarefa-status').value
  const tag = document.getElementById('modal-tarefa-tag').value

  const tarefa = {
    titulo: titulo, 
    descricao: descricao, 
    data: data, 
    status: status, 
    tag: tag
  }

  tarefas.push(tarefa)
  renderizarTarefa(tarefa)


  // limpando os campos do modal depois de salvar
  document.getElementById('modal-tarefa-titulo').value = ''
  document.getElementById('modal-tarefa-desc').value = ''
  document.getElementById('modal-tarefa-data').value = ''
  document.getElementById('modal-tarefa-status').value = ''
  document.getElementById('modal-tarefa-tag').value = ''

  const modal = document.getElementById('modal-tarefa');
  modal.classList.add('hidden');
}

function renderizarTarefa(tarefa) {
  const novaDiv = document.createElement('div')
  novaDiv.innerHTML = `

  <article
  class="card"
  draggable="true"
  data-id="1"
  data-status="afazer"
  ondragstart="arrastarTarefa(event)"
  aria-label="Tarefa: Criar wireframes do projeto"
  >

  <div class="card-header">
  <span class="card-tag tag-design">${tarefa.tag}</span>
  <div class="card-actions">
  <button class="card-btn" onclick="editarTarefa(1)" aria-label="Editar tarefa">✎</button>
  <button class="card-btn card-btn-danger" onclick="removerTarefa(1)" aria-label="Remover tarefa">✕</button>
  </div>
  </div>

  <h3 class="card-title">${tarefa.titulo}</h3>
  <p class="card-desc">${tarefa.descricao}</p>
  <div class="card-footer">
  <span class="card-date">
  <span aria-hidden="true">📅</span>
  <time datetime="2026-06-05">${tarefa.data}</time>
  </span>
  </div>
  </article>
  `

  if(tarefa.status === 'afazer'){
    const afazer = document.getElementById('col-afazer')
    afazer.appendChild(novaDiv)
  }
  else if(tarefa.status === 'fazendo'){
    const fazendo = document.getElementById('col-fazendo')
    fazendo.appendChild(novaDiv)
  }
  else{
    const concluido = document.getElementById('col-concluido')
    concluido.appendChild(novaDiv)
  }
}

//lógica de troca de tema (claro/escuro/xp) - Miguel

function trocarTema(tema) {
    // Aplica o tema no elemento <html> — o CSS já reage via [data-theme="..."]
    document.documentElement.setAttribute("data-theme", tema);

    // Salva a preferência para lembrar na próxima visita
    localStorage.setItem("tema", tema);

    // Marca visualmente o botão ativo no seletor de tema
    document.querySelectorAll(".theme-btn").forEach(botao => {
        botao.classList.remove("active");
    });

    const botaoAtivo = document.querySelector(`.theme-btn[data-theme="${tema}"]`);
    if (botaoAtivo) botaoAtivo.classList.add("active");
}

// Alterna rapidamente entre claro e escuro (útil para um botão único)
function alternarTema() {
    const temaAtual = document.documentElement.getAttribute("data-theme") || "dark";
    const novoTema = temaAtual === "dark" ? "light" : "dark";
    trocarTema(novoTema);
}

// Aplica o tema salvo assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem("tema") || "dark";
    trocarTema(temaSalvo);
});


