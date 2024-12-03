<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils.js";
import studentServices from "../services/studentServices.js";
import resumeService from "../services/resumeService.js";


import MenuBar from "../components/MenuBar.vue";

const router = useRouter();
const user = ref({});
const students = ref([
  {
    name: "Student 1",
    id: 1,
    resumes: ["Resume 1"],
  },
]);

onMounted(() => {
  user.value = Utils.getStore('user');
  fetchStudents();
  //fetchResumes();
})

const fetchStudents = () => {
  studentServices.getAllStudents()
  .then((response) => {
    students.value = response.data.map((student) => ({
        name: student.fName + " " + student.lName,
        id: student.id
      }));
      console.log("Fetched students:", students.value);
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
    });
    fetchResumes();
};

const fetchResumes = () => {
  for(let i=0; i<students.value.length; i++)
{
  console.log("STUDENTS " + students.value[i].id)
  resumeService.getAllResumes(students.value[i].id)
  .then((response) => {
    students.value = response.data.map((resume) => ({
        resumes: resume.value,
      }));
      console.log("Fetched students:", students[i].value.resumes);
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
    });
}
  
};


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

const addComment = (resume) => {
  console.log("add comment:", resume);
};
</script>

<template>
  <v-container>
<v-table class="students-table" >
  <v-card class="mt-3">
    <template v-for="(student, index) in students" :key="index">
      <v-card-title>{{student.name}}</v-card-title>
      <v-divider></v-divider>
      <td>
      <v-card flat >
        <div v-for="(resume, idx) in student.resumes" :key="idx" class="mb-2">
          <v-btn
            color="primary"
            @click="viewResume(resume)"
            class="mr-2"
          >
            {{ resume }}
          </v-btn>

          
          <v-btn
            color="primary"
            @click="addComment(resume)"
            class="comment-btn"
            icon="mdi-comment"
          >
            
          </v-btn>
        </div>
        
      </v-card>
      
    </td>
    </template>
  </v-card>
</v-table>

  </v-container>
</template>

<style scoped>
.container {
  background-color: #f5e4d7;
}

.mb-2
{
  padding-left: 10px;
}

.students-table
{
  border: 1px;
  /* border-style:solid; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: "lightBrown";
}

.comment-btn
{
  margin-left: 15px;
}

</style>
