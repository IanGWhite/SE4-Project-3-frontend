<template>
  <v-app-bar color="darkBlue" dark flat>
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <img src="../assets/logo.png" alt="Logo" class="logo mr-2" />
        <h1 class="title">Resume Machine</h1>
      </div>
      
      <div class="menu-buttons">
        <v-btn color="lightBlue" class="mx-2" @click="goToResume()">Resume</v-btn>
        <v-btn color="lightBlue" class="mx-2" @click="goToInfo()">Info</v-btn>
        <!--<v-avatar color="brown" size="40px" class="mx-2" @click="toggleDrawer"></v-avatar>-->
      </div>
    </v-container>

    
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

const goToResume = () => router.push({ name: 'ResumeListStudents' });
const goToInfo = () => router.push({ name: 'ItemList' });

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

.drawer-btn {
  width: 100%;
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: black;
}
.user-drawer {
  height: auto; /* Allows the drawer to take up as much vertical space as needed */
  max-height: 100vh; /* Ensure it doesn't extend beyond the viewport */
  top: 0; /* Start drawer from the top, independent of the navbar height */
  position: fixed; /* Keep it fixed relative to the viewport */
  z-index: 1000; /* Ensures it’s above other components when open */
}

</style>