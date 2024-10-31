<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Initialize router and state variables
const router = useRouter();
const newComment = ref('');
const comments = ref([]);

// Method to add a new comment
const addComment = () => {
  if (newComment.value.trim() !== '') {
    comments.value.push(newComment.value);
    newComment.value = '';
  }
};
</script>

<template>
  <v-container>
    <!-- Toolbar with Title -->
    <v-toolbar>
      <v-toolbar-title class="text-center">
        Resume Name
      </v-toolbar-title>
    </v-toolbar>

    <!-- Resume Box -->
    <v-card class="mt-5">
      <v-card-text class="resume-box d-flex align-center justify-center">
        Resume
      </v-card-text>
    </v-card>

    <!-- Comment Input Section -->
    <v-row class="mt-5" justify="center">
      <v-col cols="12" md="8">
        <v-textarea
          v-model="newComment"
          label="Comment"
          outlined
          placeholder="Write your comment here..."
        ></v-textarea>
      </v-col>
    </v-row>

    <!-- Add Comment Button -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-btn @click="addComment" color="primary" outlined>
          Add Comment
        </v-btn>
      </v-col>
    </v-row>

    <!-- Displaying Comments Section -->
    <v-row class="mt-5" justify="center">
      <v-col cols="12" md="8">
        <div v-for="(comment, index) in comments" :key="index" class="mb-3">
          <v-card>
            <v-card-text>
              {{ comment }}
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.resume-box {
  background-color: #a76c42;
  color: white;
  height: 400px;
  font-size: 24px;
  text-align: center;
}
</style>
