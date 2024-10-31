<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProjectServices from "../services/projectServices"; // hypothetical service for managing project data
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();
const project = ref({
  name: "",
  city: "",
  state: "",
  monthStart: "",
  monthEnd: "",
  position: "",
  description: ""
});
const message = ref("");

const saveProject = () => {
  ProjectServices.create(project.value)
    .then(() => {
      message.value = "Project saved successfully";
      router.push({ name: "projectList" }); // hypothetical route name for project list
    })
    .catch((e) => {
      message.value = e.response.data.message || "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "projectList" }); // hypothetical route for cancel action
};
</script>

<template>
  <v-app>
    <menu-bar/>
    <v-container>
      <v-card>
        <v-card-title class="text-center">
          Project
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form @submit.prevent="saveProject">
            <v-text-field
              v-model="project.name"
              label="Name"
              required
            ></v-text-field>

            <div class="row">
              <v-text-field
                v-model="project.city"
                label="City"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="project.state"
                label="State"
                required
              ></v-text-field>
            </div>

            <div class="row">
              <v-text-field
                v-model="project.monthStart"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="project.monthEnd"
                label="End Month"
                required
              ></v-text-field>
            </div>

            <v-text-field
              v-model="project.position"
              label="Position"
              required
            ></v-text-field>

            <v-textarea
              v-model="project.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="primary" @click="saveProject">Save</v-btn>
              <v-btn color="error" @click="cancel">Cancel</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  width: 300px;
  padding: 20px;
  text-align: center;
  background-color: #f5e4d7;
}
.row {
  display: flex;
  justify-content: space-between;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
