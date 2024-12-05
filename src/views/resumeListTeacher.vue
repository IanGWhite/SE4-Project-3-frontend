<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Utils from "../config/utils.js";
import studentServices from "../services/studentServices.js";
import resumeService from "../services/resumeService.js";
import commentServices from "../services/commentServices.js";


import MenuBar from "../components/MenuBar.vue";
import { resolveBaseUrl } from "vite";

const router = useRouter();
const user = ref({});
const students = ref([
  {
    name: "Student 1",
    id: 1,
    resumes: ["Resume 1"],
  },
]);
const comments = ref([
  {
    summary: "bla bla comment",
    resumeId: 1,
    id: 1,
  }
]);

const currentComment = ref("here is a comment");
const currentCommentId = ref(1);

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
      console.error("Error fetching students:", error);
    });
    fetchResumes();
};

const fetchResumes = () => {
  for(let i=0; i<students.value.length; i++)
{
  console.log("STUDENTS " + students.value[i].id)
  resumeService.getAllResumes(students.value[i].id)
  .then((response) => {
    // students.value[i].resumes = response.data.map((resume) => ({
    //     resumes: resume,
    //   }));
    students.value[i].resumes = response.data;
      console.log("Fetched resumes:", students.value[i].resumes[0]);
    })
    .catch((error) => {
      console.error("Error fetching resumes:", error);
    });
}
fetchComments();
};

const fetchComments = () => {
  commentServices.getAllComments()
  .then((response) => {
    comments.value = response.data;
      console.log("Fetched comments:", comments.value);
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
    
};

const getCommentFromResume = (studentId, resumeId, id) => {
  commentServices.getCommentForResume(studentId, resumeId, id)
  .then((response) => {
      currentComment.value = response.data.summary;
      //currentCommentId.value = id;
      // currentComment = response.data.map((comm) => ({
      //   summary: comm.summary
      // }));
      console.log("id ", id);
      console.log("Fetched comment:", currentComment.value);
      //return response.data.value;
      
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      currentComment.value = "";
      //create a comment
    });
};

const saveComment = (studentId, resumeId, id, data) => {
  commentServices.updateComment(studentId, resumeId, id, data)
  .then(() => {
        console.log("comment updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  
};

const savePersonalLink = (index) => {
  const link = personalLinks.value[index];
  if (link.id) {
    // Update an existing link
    linkServices.updateLink(user.value.studentId, link.id, link)
      .then(() => {
        console.log("Link updated successfully:", link);
      })
      .catch((error) => {
        console.error("Error updating link:", error);
      });
  } else {
    linkServices.createLink(user.value.studentId, link) // Send only the specific link
      .then((response) => {
        personalLinks.value[index].id = response.data.id; // Update the ID if backend assigns it
        console.log("Added:", personalLinks.value[index]);
    })
      .catch((e) => {
        message.value =  "An error occurred";
    });
  }
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
            Resume {{ resume.id }}
          </v-btn>

          
          <v-btn
            color="primary"
            @click="getCommentFromResume(student.id, resume.id, idx+1)"
            class="comment-btn"
            icon="mdi-comment"
          >
          </v-btn>
          <div class="d-flex">
            <v-text-field class="comment-box" v-model="currentComment"/>
            <v-btn class="mr-2"
            @click="saveComment(student.id, resume.id, currentCommentId, currentComment)">
              save
            </v-btn>
          </div>
          
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

.comment-box
{
  width: 400px;
}

</style>
