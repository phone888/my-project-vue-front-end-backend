<template>
    <div class="text-xl">
        <h1>ໜ້າເພີ່ມຜູ້ໃຊ້</h1>
        <div>
            <form @submit.prevent="addUser">
                <div class="flex flex-col gap-3">
                    <input type="username" placeholder="Username" class="input input-bordered input-primary w-full max-w-xs" required v-model="add_user.username" />
                    <input type="email" placeholder="Email" class="input input-bordered input-primary w-full max-w-xs" required v-model="add_user.email" />
                    <input type="password" placeholder="Password" class="input input-bordered input-primary w-full max-w-xs" required v-model="add_user.password" />
                    <input type="confirm_password" placeholder="Confirm_password" class="input input-bordered input-primary w-full max-w-xs" required v-model="add_user.confirm_password" />
                </div>
                <button class="btn btn-success my-2">ເພີ່ມຜູ້ໃຊ້</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { addType } from '../types/user';
import axios from 'axios';

const add_user = ref<addType>({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
});

const addUser = async()=>{
    if(add_user.value.password.length> 0 && add_user.value.password === add_user.value.confirm_password) {
        try{
            const response = await axios.post('http://localhost:4000/api/users/', {
            ...add_user.value
        });
        if(response.status === 200) {
        alert(response.data)
        navigateTo('/')
        }
        } catch (err) {
            console.error("Error adding user:", err);
            alert("ເກີດຂໍ້ມູນຜິດຜ່ານໃນການເພີ່ມຜູ້ໃຊ້");
        }
     } else {
        alert("ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ")
    }
}
</script>

<style scoped>

</style>