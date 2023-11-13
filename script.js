// Consulta CEP

const registros = [];

function consultarCEP() {
    const cepInput = document.getElementById('cep');
    const cidadeInput = document.getElementById('cidade');
    const bairroInput = document.getElementById('bairro');
    const estadoInput = document.getElementById('estado');

    const cep = cepInput.value;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                registros.push(data);
                exibirRegistros();
                
                cidadeInput.value = data.localidade;
                bairroInput.value = data.bairro;
                estadoInput.value = data.uf;

                cepInput.value = ''; // Limpar o campo de CEP
            } else {
                alert('CEP não encontrado');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Ocorreu um erro ao consultar o CEP.');
        });
}

function exibirRegistros() {
    const registrosList = document.getElementById('registros');
    registrosList.innerHTML = '';

    registros.forEach(registro => {
        const li = document.createElement('li');
        li.textContent = `CEP: ${registro.cep} | Cidade: ${registro.localidade}, Bairro: ${registro.bairro}, Estado: ${registro.uf}`;
        registrosList.appendChild(li);
    });
}

function gerarRegistro() {
    const texto = registros.map(registro => `CEP: ${registro.cep} | Cidade: ${registro.localidade}, Bairro: ${registro.bairro}, Estado: ${registro.uf}`).join('\n');
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'historico-de-consulta-CEP.txt';
    a.click();

    URL.revokeObjectURL(url);
}

// Ordenação com QuickSort


function quicksort(array) {
  if (array.length <= 1) {
      return array;
  }
  const pivot = array[array.length - 1];
  const head = [];
  const tail = [];
  for (const el of array.slice(0, array.length - 1)) {
      el < pivot ? head.push(el) : tail.push(el);
  }
  return [...quicksort(head), pivot, ...quicksort(tail)];
}

function sortNumbers() {
  const inputElement = document.getElementById('numbers');
  const outputElement = document.getElementById('output');

  const inputNumbers = inputElement.value
      .split(',')
      .map(num => parseInt(num.trim()));

  const sortedNumbers = quicksort(inputNumbers);

  outputElement.textContent = 'Números Ordenados: ' + sortedNumbers.join(', ');
}