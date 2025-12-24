    <script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    
    const form = ref({
        nom: '',
        quantitat: '',
        preu:'',
        descripcio:''
    });
        
    const CrearProducte = async () => {
        const resposta = await axios.post('http://localhost:3000/api/productes', form.value);

        if (resposta.status === 201) {
            alert("Producte creat correctament");
            
        form.value = {
            nom: '',
            quantitat: '',
            preu:'',
            descripcio:''
        };  
        }
    };
</script>

<template>
    <h2>Crear Producte</h2>
    <form @submit.prevent="CrearProducte">
      
        <label for="nom">Nom:</label>
        <input type="text" v-model="form.nom" required><br><br>

        <label for="quantitat">Quantitat:</label>
        <input type="number" v-model.number="form.quantitat" required><br><br>

        <label for="preu">Preu:</label>
        <input type="number" v-model.number="form.preu" required><br><br>

        <label for="descripcio">Descripcio:</label>
        <input type="text" v-model="form.descripcio" required><br><br>
   
      <button type="submit">Crear Producte</button>
      
      <p>{{ missatge }}</p>
    </form>

</template>
