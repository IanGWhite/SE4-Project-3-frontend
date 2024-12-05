<script setup>
import { ref } from "vue";
import MenuBar from "../components/MenuBar.vue";

const students = ref([
  {
    name: "Student 1",
    resumes: ["Resume 1"],
  },
  {
    name: "Student 2",
    resumes: ["Resume 1", "Resume 2"],
  },
]);

const viewStudent = (student) => {
  console.log("View student:", student);
};

const editStudent = (student) => {
  console.log("Edit student:", student);
};

const deleteStudent = (student) => {
  console.log("Delete student:", student);
};

const viewResume = (resume) => {
  console.log("View resume:", resume);
};
</script>

<template>
  <v-container>
    <v-card class="mt-3">
      <v-card-title>Students</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-accordion>
          <template v-for="(student, index) in students" :key="index">
            <v-accordion-item>
              <template #header>
                <div class="d-flex align-center">
                  <div>{{ student.name }}</div>
                  <div class="ml-auto d-flex">
                  </div>
                </div>
              </template>

              <v-card flat class="pt-2">
                <div v-for="(resume, idx) in student.resumes" :key="idx" class="mb-2">
                  <v-btn
                    color="primary"
                    @click="viewResume(resume)"
                    class="mr-2"
                  >
                    {{ resume }}
                  </v-btn>
                </div>
              </v-card>
            </v-accordion-item>
          </template>
        </v-accordion>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.container {
  background-color: #f5e4d7;
}
</style> 
