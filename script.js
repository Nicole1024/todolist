document.querySelector('#adicionar').addEventListener('click', insereTarefa);
        document.querySelector('#gravar').addEventListener('click', gravar);
        document.querySelector('#recuperar').addEventListener('click', recuperar);
        document.querySelector('#limpar').addEventListener('click', limpar);

        let toDoList = [];
        let tarefasconcluidas = [];

        function mostra() {
            let valor = "";
            for (let i = 0; i < toDoList.length; i++) {
                valor += `
        <input type="checkbox" id="tarefa${i}" onchange="marcarConcluida(${i}, this.checked)">
        <label for="tarefa${i}"> Nome da tarefa: ${toDoList[i].tarefa} <br> Quantidade: ${toDoList[i].quantidade} <br> Data de início: ${toDoList[i].ddi} <br> Data de fim: ${toDoList[i].ddf}</label><br>`;
            }
            document.querySelector("#lista").innerHTML = valor;

            // mostra tarefas concluídas com botão para reabrir
            let concl = "";
            for (let i = 0; i < tarefasconcluidas.length; i++) {
                concl += `
        <div class="concl">
        <strong>${tarefasconcluidas[i].tarefa}</strong> — Quantidade: ${tarefasconcluidas[i].quantidade} — Início: ${tarefasconcluidas[i].ddi} — Fim: ${tarefasconcluidas[i].ddf}
        <button type="button" class="botao" onclick="reabrirTarefa(${i})">Reabrir</button>
        </div>`;
            }
            document.querySelector("#concluidas").innerHTML = concl || "<em id='sem-tarefas'>Sem tarefas concluídas</em>";
        }

        // Inclui e exclui terefas no array toDoList
        function insereTarefa() {
            const tarefaVal = document.querySelector("#tarefa").value.trim();
            if (!tarefaVal) return; // não adiciona tarefa vazia
            toDoList.push({
                tarefa: tarefaVal,
                quantidade: document.querySelector("#quantidade").value,
                ddi: document.querySelector("#ddi").value,
                ddf: document.querySelector("#ddf").value
            });
            
            document.querySelector("#tarefa").value = "";
            document.querySelector("#quantidade").value = "";
            document.querySelector("#ddi").value = "";
            document.querySelector("#ddf").value = "";
            mostra();
        }

        function excluirTarefa(num) {
            toDoList.splice(num, 1);
            mostra();
        }

        // marca como concluída: remove de toDoList e adiciona em tarefasconcluidas
        function marcarConcluida(index, checked) {
            if (!checked) return; // se desmarcou no meio do fluxo não faz nada (checkbox só aparece na lista)
            const item = toDoList[index];
            if (!item) return;
            tarefasconcluidas.push(item);
            // remover item do toDoList (index válido)
            toDoList.splice(index, 1);
            mostra();
        }

        // reabrir tarefa concluída (volta para toDoList)
        function reabrirTarefa(index) {
            const item = tarefasconcluidas[index];
            if (!item) return;
            toDoList.push(item);
            tarefasconcluidas.splice(index, 1);
            mostra();
        }

        //Operações no localstorage (salva ambas listas)
        function gravar() {
            const estado = { toDoList, tarefasconcluidas };
            localStorage.setItem("listas", JSON.stringify(estado));
            
        }
        function recuperar() {
            const lista = localStorage.getItem("listas");
            if (lista) {
                const estado = JSON.parse(lista);
                toDoList = estado.toDoList || [];
                tarefasconcluidas = estado.tarefasconcluidas || [];
            } else {
                toDoList = [];
                tarefasconcluidas = [];
            }
            mostra();
        }
        function limpar() {
            localStorage.removeItem('listas');
            toDoList = [];
            tarefasconcluidas = [];
            mostra();
        }
