<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ExperienceServices from "../services/experienceServices"; // hypothetical service for managing experience data

const router = useRouter();
const experience = ref({
  organization: "",
  position: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const message = ref("");

const saveExperience = () => {
  ExperienceServices.create(experience.value)
    .then(() => {
      message.value = "Experience saved successfully";
      router.push({ name: "experienceList" }); // hypothetical route name for experience list
    })
    .catch((e) => {
      message.value = e.response.data.message || "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "experienceList" }); // hypothetical route for cancel action
};
</script>

<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title class="text-center">
          Experience
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form @submit.prevent="saveExperience">
            <v-text-field
              v-model="experience.organization"
              label="Organization Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="experience.position"
              label="Position Title"
              required
            ></v-text-field>

            <div class="row">
              <v-text-field
                v-model="experience.monthStart"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="experience.monthEnd"
                label="End Month"
                required
              ></v-text-field>
            </div>

            <v-textarea
              v-model="experience.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="primary" @click="saveExperience">Save</v-btn>
              <v-btn color="error" @click="cancel">Cancel</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
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
