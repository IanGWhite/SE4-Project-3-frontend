<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AwardServices from "../services/awardServices"; // hypothetical service for managing award data
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();
const award = ref({
  organization: "",
  title: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const message = ref("");

const saveAward = () => {
  AwardServices.create(award.value)
    .then(() => {
      message.value = "Award saved successfully";
      router.push({ name: "awardList" }); // hypothetical route name for award list
    })
    .catch((e) => {
      message.value = e.response.data.message || "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "awardList" }); // hypothetical route for cancel action
};
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="text-center">
          Award
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form @submit.prevent="saveAward">
            <v-text-field
              v-model="award.organization"
              label="Organization Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="award.title"
              label="Award Title"
              required
            ></v-text-field>

            <div class="row">
              <v-text-field
                v-model="award.monthStart"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="award.monthEnd"
                label="End Month"
                required
              ></v-text-field>
            </div>

            <v-textarea
              v-model="award.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="primary" @click="saveAward">Save</v-btn>
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
