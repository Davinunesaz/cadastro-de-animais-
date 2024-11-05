// Função para carregar animais do localStorage
function loadAnimals() {
    const animals = JSON.parse(localStorage.getItem("animals")) || [];
    const tbody = document.querySelector("#animalTable tbody");
    tbody.innerHTML = "";

    animals.forEach((animal, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${animal.nome}</td>
            <td>${animal.especie}</td>
            <td>${animal.idade}</td>
            <td>
                <button class="edit" onclick="editAnimal(${index})">Editar</button>
                <button class="delete" onclick="deleteAnimal(${index})">Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para salvar um novo animal ou atualizar um existente
function saveAnimal(event) {
    event.preventDefault();
    const id = document.getElementById("animalId").value;
    const nome = document.getElementById("nome").value;
    const especie = document.getElementById("especie").value;
    const idade = document.getElementById("idade").value;

    let animals = JSON.parse(localStorage.getItem("animals")) || [];

    if (id === "") {
        // Adiciona um novo animal
        animals.push({ nome, especie, idade });
    } else {
        // Atualiza animal existente
        animals[id] = { nome, especie, idade };
    }

    localStorage.setItem("animals", JSON.stringify(animals));
    document.getElementById("animalForm").reset();
    loadAnimals();
}

// Função para editar um animal existente
function editAnimal(index) {
    const animals = JSON.parse(localStorage.getItem("animals"));
    const animal = animals[index];

    document.getElementById("animalId").value = index;
    document.getElementById("nome").value = animal.nome;
    document.getElementById("especie").value = animal.especie;
    document.getElementById("idade").value = animal.idade;
}

// Função para deletar um animal
function deleteAnimal(index) {
    let animals = JSON.parse(localStorage.getItem("animals"));
    animals.splice(index, 1);
    localStorage.setItem("animals", JSON.stringify(animals));
    loadAnimals();
}

// Carregar animais ao iniciar a página
document.getElementById("animalForm").addEventListener("submit", saveAnimal);
loadAnimals();
    