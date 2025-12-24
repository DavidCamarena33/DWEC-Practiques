    <script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    
    const form = ref({
        email: '',
        password: ''
    });
        
    const comprobarLogin = async () => {
        const resposta = await axios.post('http://localhost:3000/api/login', form.value);

        if (resposta.status === 200) {
            alert("Login verificat");
            
            form.value = {
                email: '',
                password: ''
            };  
        }
    };
</script>

<template>
    <h2>Login</h2>
    <form @submit.prevent="comprobarLogin">
      
        <label for="email">Email:</label>
        <input type="email" v-model="form.email" required><br><br>

        <label for="password">Contraseña:</label>
        <input type="password" v-model="form.password" required><br><br>


      
      <button type="submit">Login</button>
      
      <p>{{ missatge }}</p>
    </form>


</template>
