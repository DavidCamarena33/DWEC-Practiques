<script setup>
import { ref, onMounted } from 'vue'; 
import axios from 'axios'; 

const pokemons = ref([]); 

const mostrarformulari = ref(false); 
const formeditar = ref({ 
    id: null, 
    titol: '',
    descripcio: '',
    data_limit: '', 
    estat: '',
});

const carregarPokemons = async () => {

        const resposta = await axios.get(`http://localhost:3000/pokemons`);
        pokemons.value = resposta.data;

};

const Eliminarpokemon = async(idpokemon) =>{
    if (!confirm(`Està segur que vols eliminar a este pokemon?`)) {
        return;
    }
        await axios.delete(`http://localhost:3000/pokemons/${idpokemon}`);
        
        pokemons.value = pokemons.value.filter(pokemon => pokemon.id !== idpokemon);
        alert(`Pokemon ${idpokemon} eliminat correctament.`);

}


const iniciarEdicio = (pokemon) => {
    formeditar.value = {
        id: pokemon.id, 
        nombre: pokemon.nombre,
        tipo: pokemon.tipo,
        region: pokemon.region,
    };
    // 2. Muestra el modal
    mostrarformulari.value = true;
};

const cancelarEdicio = () => {
    // Oculta el formulario de edición
    mostrarformulari.value = false;
};

const guardarCanvis = async () => {
    const idpokemon = formeditar.value.id; 
        // Petición PUT
        await axios.put(`http://localhost:3000/pokemons/${idpokemon}`, formeditar.value);
        alert("Pokemon modificat correctament.");
        // Ocultar el formulario
        mostrarformulari.value = false;
        // Recargar la lista para mostrar los datos actualizados
        await carregarPokemons();      
};

// === CICLE DE VIDA ===
onMounted(() => {
    carregarPokemons();
});

    
</script>

<template>
    <div :hidden="!mostrarformulari">
            <h3>Editar Pokemon</h3>
            
            <form @submit.prevent="guardarCanvis">
                
                    <label for="nombre">Nom:</label>
                    <input type="text" id="nombre" v-model="formeditar.nombre" required><br>
                
                    <label for="tipo">Tipo:</label>
                    <input type="text" id="tipo" v-model="formeditar.tipo" required><br>
    
                    <label for="region">Region:</label>
                    <select v-model="formeditar.region" required>
                    <option value="kanto">Kanto</option>
                    <option value="galar">Galar</option>
                    <option value="kalos">Kalos</option>
                    <option value="paldea">Paldea</option>
                    </select><br><br>
                
                    <button type="submit">Guardar Canvis</button>
                    <button type="button" @click="cancelarEdicio">Cancel·lar</button>
            </form>
    </div>
    <h2>Llista de Pokemons</h2>

    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Tipo</th>
          <th>Region</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pokemon in pokemons" :key="pokemon.id">
          <td>{{ pokemon.nombre }}</td>
          <td>{{ pokemon.tipo }}</td>
          <td><span>{{ pokemon.region }}</span></td>
          <td>
            <img 
              :src="'http://localhost:3000' + pokemon.imagen" 
              :alt="`Imagen de ${pokemon.nombre}`" 
              style="width: 50px;"
/>
          </td>
          
          <td>
            <button @click="iniciarEdicio(pokemon)">Actualitzar</button>
            <button @click="Eliminarpokemon(pokemon.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

</template>