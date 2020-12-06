let novoRotulo = document.getElementById('myInput');
let lista_afazeres = [];

carregar_lista();

function novaAtividade() {
    let marcado = false;
    let rotulo = novoRotulo.value;

    if (rotulo.trim() === "") {
        alert("você precisa inserir algo como tarefa.");
        return;
    } 
    
    criarElementoLista(rotulo, marcado);
    lista_afazeres.push({rotulo, marcado});
    salva_localstorage();
    novoRotulo.value = "";
}


function salva_localstorage() {
    localStorage.setItem('lista_afazeres', JSON.stringify(lista_afazeres));
}

function atualizaLocalstorage(){
    let listaAfazeresDois = [];
    let ulChildren = document.getElementById('mostra_lista').children;
    for (let i = 0; i < ulChildren.length; i++) {
        let rotulo = ulChildren[i].textContent;
        let marcado = ulChildren[i].firstChild.checked; 
        listaAfazeresDois.push({rotulo, marcado});
    }
    lista_afazeres = listaAfazeresDois;
    salva_localstorage()
}

function criarElementoLista(rotulo, marcado) {
    let li = document.createElement('li'); 
    li.textContent = rotulo;

    let check = document.createElement('input');
    check.type = 'checkbox';
    if (marcado) {
        check.checked = marcado;
        li.style.textDecoration = 'line-through';
    }
    check.onchange = troca_bool;
    
    let apaga = document.createElement('img');
    apaga.src = 'close.png'
    apaga.onclick = function(){
        if (confirm('Deseja excluir essa tarefa?')){
            li.remove();
            atualizaLocalstorage();
        }
    };
    
    li.prepend(apaga);
    li.prepend(check);

    function troca_bool(){
        if(check.checked === true){
            li.style.textDecoration = 'line-through';
        }
        else{
            li.style.textDecoration = 'none';
        }
        atualizaLocalstorage();
    }

    
    mostra_lista.appendChild(li);
    
}


function carregar_lista() {
    let lista = JSON.parse(localStorage.getItem('lista_afazeres'));
    if (lista) {
        lista_afazeres = lista;
        for (let i = 0; i < lista_afazeres.length; i++) {
            criarElementoLista(lista_afazeres[i].rotulo, lista_afazeres[i].marcado);
        }
    }
}
