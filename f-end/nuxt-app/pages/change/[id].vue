<template>
    <div class="text-xl">
        <h1>ໜ້າປ່ຽນລະຫັດຜ່ານ  : </h1>
        <div>
            <form @submit.prevent="checkPassword">
                <div class="flex flex-col gap-3">
                    <input type="password" placeholder="Old password" class="input input-bordered input-primary w-full max-w-xs" v-model="change.oldPassword" required />
                    <input type="password" placeholder="New password" class="input input-bordered input-primary w-full max-w-xs" v-model="change.newPassword" required />
                    <input type="password" placeholder="New Password Confirm" class="input input-bordered input-primary w-full max-w-xs" v-model="change.newPasswordConfirm" required />
                </div>
                <button class="btn btn-success my-2">ຢືນຢັນ</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter  } from 'vue-router';
import type { passwordType } from '~/types/user';

const route = useRoute();
const router = useRouter(); // ประกาศตัวแปร router
const change = ref<passwordType>({
    oldPassword : "",
    newPassword : "",
    newPasswordConfirm : ""
})

const changePassword = async () => {
    try{
        const response = await axios.put(`${import.meta.env.VITE_API}/changePassword/${route.params.id}` , {
            password : change.value.oldPassword,
            newPassword : change.value.newPassword
        })
        if(response.status === 200) {
            alert(response.data)
            router.push('/') // ใช้ router.push แทน navigateTo
        }
    } catch (err : any) {
        console.log(err)
        if(err.response.data) {
            alert(err.response.data)
        }
    }
}
const checkPassword = async () => {
    if(change.value.newPassword.length > 0 && change.value.newPassword == change.value.newPasswordConfirm) {
        await changePassword()
    } else {
        alert("ລະຫັດຜ່ານບໍ່ຕົງກັນ")
    }
}

</script>

<style scoped>

</style>