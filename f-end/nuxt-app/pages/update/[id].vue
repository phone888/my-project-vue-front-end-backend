<template>
    <div class="text-xl">
        <h1>ໜ້າຂໍ້ມູນຜູ້ໃຊ້  : {{ user.username }}</h1>
        <div>
            <form @submit.prevent="updateUser">
                <div class="flex flex-col gap-3">
                    <input type="username" placeholder="Username" class="input input-bordered input-primary w-full max-w-xs" v-model="user.username" required />
                    <input type="email" placeholder="Email" class="input input-bordered input-primary w-full max-w-xs" v-model="user.email" required />
                </div>
                <button class="btn btn-success my-2">ຢືນຢັນ</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRoute, useRouter  } from 'vue-router'; // นำเข้า useRout

const route = useRoute(); // ใช้ useRoute เพื่อเข้าถึงพารามิเตอร์ในเส้นทาง
const user = ref({
    id : 0,
    username : "",
    email : ""
})

const router = useRouter(); // ประกาศตัวแปร router
const showUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/${route.params.id}`);

        if(response.status === 200) {
            user.value = response.data
        }        
    } catch (err: any) {
        console.log("error:", err);
        alert(err.message)
    }
}

const updateUser = async () => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API}/${route.params.id}`,
        {
            username: user.value.username,
            email: user.value.email
        })
        if (response.status === 200) {
            alert(response.data)
            router.push('/')
        }
    } catch (err) {
        console.log("error:", err)
        }
}

onMounted(() => showUser())

</script>

<style scoped>

</style>