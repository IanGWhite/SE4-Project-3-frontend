<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const goToResume = () => {
  router.push({ name: 'resume' });
};

const goToInfo = () => {
  router.push({ name: 'info' });
};

const goToAdmin = () => {
  router.push({ name: 'admin' });
};
</script>

<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-icon left>mdi-clipboard-text</v-icon>
        Resume Machine
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="goToResume" color="secondary" outlined>
        Resume
      </v-btn>
      <v-btn @click="goToInfo" color="secondary" outlined>
        Info
      </v-btn>

      <v-avatar size="40" color="brown">
        <v-icon dark>mdi-account</v-icon>
      </v-avatar>
    </v-app-bar>

    <!-- Main Content -->
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-btn @click="goToInfo" color="light-blue" class="mb-5">
          Info
        </v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn @click="goToResume" color="light-blue" class="mb-5">
          Resume
        </v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn @click="goToAdmin" color="primary" class="mb-5">
          Admin
        </v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.fill-height {
  background-color: #f5e7d0;
  min-height: 100vh;
}
.v-btn {
  width: 150px;
}
</style>
