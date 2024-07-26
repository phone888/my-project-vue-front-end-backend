<template>
    <div>
      <div class="flex justify-center gap-2 items-center ">
        <h1> ໜ້າສະແດງຜູ້ໃຊ້</h1>
        <NuxtLink to="/add" class="btn btn-secondary">ເພີ່ມຜູ້ໃຊ້</NuxtLink>
      </div>
  
      <div class="mx-auto xl:mx-80">
        <TableUser :users="users" :isLoading="isLoading" :fetchUsers="fetchUsers" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import type { userType } from '../types/user';
  
  const users = ref<userType[]>([]);
  const isLoading = ref<boolean>(false);
  
  const fetchUsers = async () => {
    try {
      isLoading.value = true;  // แก้ไขเป็น true เมื่อเริ่มการโหลด
      const response = await axios.get('http://localhost:4000/api/users');
  
      if (response.status === 200) {
        users.value = response.data;
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false; // แก้ไขเป็น false เมื่อการโหลดเสร็จสิ้น
    }
  };
  
  onMounted(() => {
    fetchUsers();
  });
  </script>
  
  <style scoped>
  </style>
  