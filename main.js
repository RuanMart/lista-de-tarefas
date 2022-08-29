function listaDeTarefas() {
  const inputTarefa = document.querySelector('.input-tarefa');
  const buttonTarefa = document.querySelector('.btn-tarefa');
  const tarefas = document.querySelector('.tarefas');

  // função para criar a ListaDeTarefas
  function criaLi() {
    const li = document.createElement('li');
    return li;
  }

  // função para criar a Tarefa
  function criaTarefa(textInput) {
    const li = criaLi();
    li.innerText = textInput; // adiciona o texto digitado no input
    tarefas.appendChild(li); // adiciona a tarefa na lista
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
  }
  
  function limpaInput() {
    inputTarefa.value = ''; // adiciona o texto digitado no input
    inputTarefa.focus(); // adiciona o foco no input
  }

  function criaBotaoApagar(li) {
    li.innerText += ' '; // adiciona um espaço em branco
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'; // adiciona o texto Apagar no botão
    botaoApagar.setAttribute('class', 'apagar'); // adiciona a classe apagar no botão
    botaoApagar.setAttribute('title', 'Apagar esta tarefa'); // adiciona o title no botão
    li.appendChild(botaoApagar); // adiciona o botão ao lado da tarefa
  }

  // função para salvar as tarefas
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li'); // seleciona todos os li's
    const listaDeTarefas = []; // cria um array vazio

    for (let tarefa of liTarefas) { // percorre todos os li'se adiciona no array
      let tarefaTexto = tarefa.innerText; // pega o texto do listaDeTarefas atual e adiciona na variável
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // remove o Apagar e espaços em branco
      listaDeTarefas.push(tarefaTexto); // adiciona o texto no array
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // transforma o array em JSON
    localStorage.setItem('tarefas', tarefasJSON); // adiciona o JSON no localStorage
}

  // função para adicionar a tarefa ao clicar no botão
  inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) { // verifica se a tecla pressionada é o enter
      if (!inputTarefa.value) return; // verifica se o input está vazio
      criaTarefa(inputTarefa.value); // adiciona a tarefa
    }
  });

  buttonTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  });

  document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) { // verifica se o elemento clicado tem a classe apagar
      el.parentElement.remove(); // remove o elemento pai do elemento clicado
      salvarTarefas();
    }
  });
}
listaDeTarefas();