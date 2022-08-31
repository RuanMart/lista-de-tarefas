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
    li.setAttribute('data-text', textInput);
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
    const liTarefas = Array.from(tarefas.querySelectorAll('li')); // seleciona todos os li's

    const listaDeTarefas = liTarefas.map((tarefa, index) => ({
      tarefa: tarefa.innerText.replace('Apagar', '').trim(),
      index: index,
    }));

    const tarefasJSON = JSON.stringify(listaDeTarefas); // transforma o array em JSON
    localStorage.setItem('tarefas', tarefasJSON); // adiciona o JSON no localStorage
  }

  function removerTarefa(liItem) {
    const tarefaParaRemover = liItem.dataset.text;

    const storageTarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(storageTarefas);

    const listaDeTarefasFiltrada = listaDeTarefas.filter(tarefa => tarefa.tarefa !== tarefaParaRemover);

    const tarefasJSON = JSON.stringify(listaDeTarefasFiltrada);
    localStorage.setItem('tarefas', tarefasJSON);
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
      removerTarefa(el.parentElement);
    }
  });
}
listaDeTarefas();