<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import logoutUser from "../services/authServices";
import Utils from "../config/utils.js";
import AuthServices from "../services/authServices";

const router = useRouter();
const drawer = ref(false); 

const isAuthenticated = () => AuthServices.isLoggedIn();
const checkAuthAndExecute = (callback) => {
  if (isAuthenticated()) {
    callback();
  } else {
    alert('You must be logged in to access this page.');
    router.push({ name: 'LoginPage' }); // Redirect to the login page.
  }
};

const goToResume = () => checkAuthAndExecute(() => router.push({ name: 'ResumeListStudents' }));
const goToInfo = () => router.push({ name: 'StudentInfo' });

const logout = async (response) => {
  let token = {
    credential: response.credential,
  };
  await AuthServices.logoutUser(token)
    .then(() => {
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const navigateTo = (routeName) => {
  router.push({ name: routeName });
  drawer.value = false; //Close drawer after navigation
};
</script>

<template>
  <v-app-bar color="darkBlue" dark flat>
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <img src="../assets/logo.png" alt="Logo" class="logo mr-2" />
        <h1 class="title">Resume Machine</h1>
      </div>
      
      <div class="menu-buttons">
        <v-btn color="lightBlue" class="mx-2" @click="goToResume">Resume</v-btn>
        <v-btn color="lightBlue" class="mx-2" @click="goToInfo">Info</v-btn>

        <!-- <v-avatar color="brown" size="40px" class="mx-2" @click="toggleDrawer"></v-avatar> -->
      </div>
    </v-container>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="$menu" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item>
        <v-list-item-content style="width: auto; overflow: visible;">
          <v-btn  class="drop-btn" @click="navigateTo('StudentHome')">Student Home</v-btn>
          <v-btn   class="drop-btn" @click="navigateTo('TeacherHome')">Teacher Home</v-btn>
          <v-btn  class="drop-btn" @click="logout">Sign Out</v-btn>
        </v-list-item-content>
      </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu-buttons .v-btn {
  /* border-radius: 12px; */
  color: black;
  height: 100%;
  margin: 0;
  border:none;
}


.drop-btn
{
  border-radius: 0;
  box-sizing: border-box;
  margin: 0;
  border:none;
  display: block;
}
.v-list {
  padding: 0; /* Remove unnecessary padding from list */
}

.v-list-item-content {
  overflow: visible;
}

</style>

