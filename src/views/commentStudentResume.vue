<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../config/utils.js";
import MenuBar from "../components/MenuBar.vue";
import commentServices from "../services/commentServices.js";

const route = useRoute();
const router = useRouter();
const user = Utils.getStore("user");
const resumeId = route.params.resumeId; // This should be dynamically set, e.g., via route params
const studentId = route.params.studentId;
const pdfUrl = "path/to/resume.pdf"; // URL for the PDF

const comments = ref([]);
const newComment = ref(" ");

const loadComments = () => {
  

  commentServices.getAllComments(studentId, resumeId)
  .then((response) => {
      comments.value = response.data;
      console.log("retrived comments ", comments.value);
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      currentComment.value = "";
      //create a comment
    });
};

const addComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      summary: newComment.value,
      // user: user.fName + " " + user.lName,
      date: new Date().toLocaleString()
    };

    commentServices.createComment(studentId, resumeId, comment)
    .then(() => {
      comments.value.unshift(comment);
      newComment.value = "";
    })
    .catch((error) => {
      console.error("Error adding comment:", error);
    });
    
    // ResumeService.addComment(resumeId, comment)
    //   .then(() => {
    //     comments.value.unshift(comment); // Add new comment at the top
    //     newComment.value = "";
    //   })
    //   .catch((error) => {
    //     console.error("Error adding comment:", error);
    //   });
  }
};

onMounted(() => {
  loadComments();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Resume Name</v-toolbar-title>
      </v-toolbar>
      <br />
      
      <!-- PDF Viewer -->
      <v-card class="my-4">
        <iframe :src="pdfUrl" width="100%" height="600px" style="border: none;"></iframe>
      </v-card>

      <!-- Add Comment -->
      <v-card class="my-4" outlined>
        <v-card-title>Comment</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newComment"
            label="Add a comment"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" @click="addComment">Submit</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Display Comments -->
      <v-card class="my-4" outlined>
        <v-card-title>Comments</v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="comments.length === 0">No comments available</v-card-text>
        <v-card-text v-for="(comment, index) in comments" :key="index" class="my-2">
          <v-card outlined class="p-2">
            <!-- <p><strong>{{ comment.user }}</strong> {{ comment.createdAt }}</p> -->
            <p> {{ comment.summary }}</p>

          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
iframe {
  border-radius: 8px;
}
</style>
