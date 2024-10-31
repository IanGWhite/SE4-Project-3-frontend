<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "../components/MenuBar.vue";

import TutorialServices from "../services/tutorialServices";
import Utils from "../config/utils.js";

const user = ref({
  fName: "John",
  lName: "Doe",
});

const router = useRouter();

const login = () => {
  console.log("Login clicked");
  // Logic for login action, e.g., router.push('/login')
};

const createAccount = () => {
  console.log("Create Account clicked");
  // Logic for create account action, e.g., router.push('/create-account')
};
</script>

<template>
  <div>
    <v-container>
      <v-container class="text-center mt-5">
        <v-row justify="center" class="mt-5">
      <v-col cols="auto">
        <v-btn color="light-blue" @click="login">Login</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="createAccount">Create Account</v-btn>
      </v-col>
    </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<style scoped>
.v-toolbar {
  padding: 16px;
}

.v-container {
  background-color: #f1e3d1;
}

.v-btn {
  width: 150px;
  font-size: 16px;
  border-radius: 20px;
}
.button-spacing {
  margin: 0 10px; /* Adjust margin as needed */
}
</style>
