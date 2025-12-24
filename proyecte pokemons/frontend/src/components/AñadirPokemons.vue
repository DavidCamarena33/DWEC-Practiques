    <script setup>
    import { ref } from 'vue';
    // 1. Importa la instancia de Axios configurada
    import axios from 'axios';
    
    // 2. Simplificación: Un único objeto reactivo para el formulario
    const form = ref({
        nombre: '',
        tipo: '',
        region: ''
    });
    
    const missatge = ref('');
    
    const enviarpokemon = async () => {
        missatge.value = ''; 
            // 3. Usa 'api' y solo la ruta del endpoint '/tasques'
        const resposta = await axios.post('http://localhost:3000/pokemons', form.value);

        if (resposta.status === 201) {
            alert("Pokemon creat correctament");
            
            // 4. Simplificación: Netejar el formulario reasignando el objeto
            form.value = {
                nombre: '',
                tipo: '',
                region: ''
            };  
        }
    };
</script>

<template>
    <h2>Afegir Nou Pokemon</h2>
    <form @submit.prevent="enviarpokemon">
      
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="form.nombre" required><br><br>

        <label for="tipo">Tipo:</label>
        <input type="text" v-model="form.tipo" required><br><br>

        <label for="region">Region:</label>
        <select v-model="form.region" required>
          <option value="kanto">Kanto</option>
          <option value="galar">Galar</option>
          <option value="kalos">Kalos</option>
          <option value="paldea">Paldea</option>
        </select><br><br>

        <label for="imagen">Imagen:</label>
        <input type="text" v-model="form.imagen"><br><br>
      
      <button type="submit">Guardar Pokemon</button>
      
      <p>{{ missatge }}</p>
    </form>


</template>
