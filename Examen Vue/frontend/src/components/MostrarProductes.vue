<script setup>
import { ref, onMounted } from 'vue'; 
import axios from 'axios'; 

const productes = ref([]); 

const carregarproductes = async () => {
    const resposta = await axios.get(`http://localhost:3000/api/productes/`);
    productes.value = resposta.data;
};

const Eliminarproducte = async(idproducte) =>{
    if (!confirm(`Està segur que vols eliminar a este producte?`)) {
        return;
    }
        await axios.delete(`http://localhost:3000/api/productes/${idproducte}`);
        
        productes.value = productes.value.filter(producte => producte.id !== idproducte);
        alert(`Producte eliminat correctament.`);

}

onMounted(() => {
    carregarproductes();
});

    
</script>

<template>
    <div v-if="productes.length === 0">
      <h2>Llista de Productes</h2>
        <p>No hay productos disponibles</p>
    </div>
    <div v-else>
        <h2>Llista de Productes</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantitat</th>
              <th>Preu</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producte in productes" :key="producte.id">
              <td>{{ producte.nom }}</td>
              <td>{{ producte.quantitat }}</td>
              <td>{{ producte.preu }}</td>
              <td>{{ producte.descripcio }}</td>
    
              <td>
                <button @click="Eliminarproducte(producte.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>

</template>