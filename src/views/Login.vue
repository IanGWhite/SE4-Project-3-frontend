<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "../components/MenuBar.vue";

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
  <v-app>
    <v-container>
      <v-container class="text-center mt-5 d-flex flex-column align-center">
        <!-- Vertical stack of buttons with spacing -->
         <v-spacer></v-spacer>
        <v-btn color="lightBlue" class="button-spacing" @click="login">Login</v-btn>
        <v-btn color="darkBlue" class="button-spacing" @click="createAccount">Create Account</v-btn>
      </v-container>
    </v-container>
  </v-app>
</template>

<style scoped>

.app-background {
  background-color: "lightBrown"; /* Replace with your desired color */
  min-height: 100vh; /* Ensures it covers the full viewport */
}


.v-toolbar {
  padding: 16px;
}

.v-container {
  background-color: "lightBrown";
}

.v-btn {
  width: 150px;
  font-size: 16px;
  border-radius: 20px;
}
.button-spacing {
  margin: 0 20px; /* Adjust margin as needed */
  margin-bottom: 15px;
}
</style>
