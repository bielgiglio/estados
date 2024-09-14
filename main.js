document.addEventListener('DOMContentLoaded', () => {
    const selectEstados = document.getElementById('estados');
    const ulCidades = document.getElementById('cidades');

    const fetchJson = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro na requisição');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return null;
        }
    };

    const carregarEstados = async () => {
        const estados = await fetchJson('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        if (estados) {
            estados.forEach(({ id, nome }) => {
                const option = new Option(nome, id);
                selectEstados.add(option);
            });
        }
    };

    const exibirCidades = async (estadoId) => {
        const cidades = await fetchJson(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
        ulCidades.innerHTML = ''; 
        if (cidades) {
            cidades.forEach(({ nome }) => {
                const li = document.createElement('li');
                li.textContent = nome;
                ulCidades.appendChild(li);
            });
        }
    };

    selectEstados.addEventListener('change', (event) => {
        const estadoId = event.target.value;
        if (estadoId) {
            exibirCidades(estadoId);
        } else {
            ulCidades.innerHTML = ''; 
        }
    });

    carregarEstados();
});

