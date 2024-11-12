<template>
  <v-app-bar color="darkBlue" dark flat>
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <img src="../assets/logo.png" alt="Logo" class="logo mr-2" />
        <h1 class="title">Resume Machine</h1>
      </div>
      
      <!--<div class="menu-buttons">
        <v-btn color="lightBlue" class="mx-2" @click="navigateTo('resume')">Resume</v-btn>
        <v-btn color="lightBlue" class="mx-2" @click="navigateTo('info')">Info</v-btn>
        <v-avatar color="brown" size="40px" class="mx-2" @click="toggleDrawer"></v-avatar>
      </div>-->
    </v-container>

    <!-- Right Drawer -->
    <!--<v-navigation-drawer
      v-model="drawer"
      right
      temporary
      width="250"
      color="darkBrown"
      class="drawer"
    >
      <v-list-item>
        <v-list-item-content>
          <v-btn  class="mx-2" @click="navigateTo('studentHome')">Student Home</v-btn>
          <v-btn   class="mx-2" @click="navigateTo('teacherHome')">Teacher Home</v-btn>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider></v-divider>
      
      <v-list-item>
        <v-btn  class="drawer-btn" @click="signOut">Sign Out</v-btn>
      </v-list-item>
    </v-navigation-drawer>-->
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
//import { useRouter } from "vue-router";

//const router = useRouter();
const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const navigateTo = (routeName) => {
  $router.push({ name: routeName });
  drawer.value = false; // Close drawer after navigation
};

const signOut = () => {
  // Sign out logic here
  console.log("Sign Out clicked");
  drawer.value = false; // Close drawer after sign out
};
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu-buttons .v-btn {
  border-radius: 12px;
  color: black;
}

.drawer .drawer-btn {
  width: 100%;
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: black;
}
</style>
