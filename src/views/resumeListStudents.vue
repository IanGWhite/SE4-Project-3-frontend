<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import resumeService from "../services/resumeService";
import Utils from "../config/utils.js";

const resumes = ref([]);
const user = ref({});
const router = useRouter();

const fetchResumes = () => {
  resumeService.getAllResumes(user.value.studentId)
    .then((response) => {
      resumes.value = response.data; // Assuming the backend returns an array of resumes
      console.log("Fetched resumes:", resumes.value);
    })
    .catch((error) => {
      console.error("Error fetching resumes:", error);
    });
};

const addNewResume = () => {
  console.log("Add a new resume");
  router.push({ name: 'CreateResume' });
};

const editResume = (myResume) => router.push({ name: 'EditResume', params: { id: myResume.id } });

const deleteResume =  (resumeId) => {
  if (confirm("Are you sure you want to delete this resume?")) {
      console.log(resumeId);
      resumeService.deleteResume(user.value.studentId, resumeId).then( () => {
        console.log("Resume deleted:", resumeId);
        fetchResumes();
      })
    .catch ((error) => {
      console.error("Error deleting resume:", error);
    })
  }
};


onMounted(() => {
  user.value = Utils.getStore('user');
  console.log(user.value);
  fetchResumes();
});
</script>

<template>
  <v-container>
    <v-card class="mt-3">
      <v-card-title>Resumes</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-accordion>
          <template v-if="resumes.length > 0">
            <template v-for="(resume, index) in resumes" :key="index">
              <v-card flat class="pt-2">
                <v-row align="center">
                  <v-col cols="8">
                    <span class="resume-name">{{ resume.name }}</span>
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <v-btn icon color="blue" @click="downloadResume(resume)">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                    <v-btn icon color="blue" @click="editResume(resume)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="blue" @click="deleteResume(resume.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider v-if="index < resumes.length - 1"></v-divider>
            </template>
          </template>
          <template v-else>
            <p>No resumes available. Add a new one!</p>
          </template>
        </v-accordion>
      </v-card-text>
      <v-card-actions class="text-right mt-5">
        <v-btn
          class="add-resume-button"
          color="blue"
          @click="addNewResume"
        >
          <v-icon class="add-icon">mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<style scoped>
.resume-name {
  font-size: 1.25rem;
  font-weight: bold;
}
.add-resume-button {
  width: 150px; /* Longer button */
  height: 56px; /* Maintain height */
  border-radius: 8px; /* Rounded corners */
  display: flex; /* Center content */
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 30px; /* Ensure icon size remains prominent */
}

</style> 