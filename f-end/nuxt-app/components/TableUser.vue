<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>ຊື່ຜູ້ໃຊ້</th>
          <th>ອິເມລ</th>
          <th>ເຄື່ອງມື</th>
        </tr>
      </thead>
      <tbody>
        <!-- สถานะการโหลด -->
        <tr v-if="isLoading">
          <td colspan="4">ກໍາລັງໂຫລດຂໍ້ມູນ...</td>
        </tr>
        <!-- ข้อมูลผู้ใช้ -->
        <tr v-else v-for="(item, index) in users" :key="index">
          <th>{{ index + 1 }}</th>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>
            <div class="flex gap-2">
              <NuxtLink :to="`/update/${item.id}`" class="btn btn-success">ແກ້ໄຂ</NuxtLink>
              <NuxtLink :to="`/change/${item.id}`" class="btn btn-secondary">ປ່ຽນລະຫັດຜ່ານ</NuxtLink>
              <button class="btn btn-error" @click="confirmDelete(Number(item.id))">ລົບ</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { userType } from '../types/user';
import Swal from 'sweetalert2';

const deleteUser = async (id : number)=> {
  try{
    const response = await axios.delete(`${import.meta.env.VITE_API}/${id}`)
    if(response.status === 200 ) {
      props.fetchUsers()
    }
  } catch (err) {
    console.log("ເກີດຂໍ້ມູນຜິດຜ່ານໃນການລົບຜູ້ໃຊ້",err);
  }
}
const confirmDelete = (id: number) => {
  Swal.fire({
    title: 'ເຈົ້າໜັ້ນໃຈຫຼືບໍ່?',
    text: "ເຈົ້າຈະບໍ່ສາມາດຍ້ອນກັບໄດ້!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ຢືນຢັນ',
    cancelButtonText: 'ຍົກເລີກ'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(id);
    }
  });
};

const props = defineProps<{
  users: userType[];
  isLoading: boolean;
  fetchUsers: Function;
}>();
</script>

<style scoped>
</style>
