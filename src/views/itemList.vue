<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();
const contactInfo = ref({
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  email: ""
});
const personalLinks = ref([{ type: "", link: "" }]);
const skills = ref([{skill :""}]);
const interests = ref([{interest: ""}]);

const addPersonalLink = () => personalLinks.value.push({ type: "", link: "" }); // this will be the code to add to the database
const addEducation = () => router.push({ name: 'addEducation' });
const editEducation = () => router.push({ name: 'EditEducation' });
const addExperience = () => router.push({ name: 'AddExperience' });
const editExperience = () => router.push({ name: 'EditExperience' });
const addProject = () => router.push({ name: 'AddProject' });
const editProject = () => router.push({ name: 'EditProject' });
const addSkill = () => skills.value.push({ skill: ""}); // this will be the code to add to the database
const addInterest = () => interests.value.push({ interest: ""}); // this will be the code to add to the database
const addAward = () => router.push({ name: 'AddAward' });
const editAward = () => router.push({ name: 'EditAward' });
const saveData = () => {
  //saves all data to database
};
</script>

<template>
  <v-container>

    <!-- Contact Info Section -->
    <v-card class="mb-6">
      <v-card-title>Contact Info</v-card-title>
      <v-card-text>
        <v-text-field v-model="contactInfo.firstName" label="First Name" />
        <v-text-field v-model="contactInfo.lastName" label="Last Name" />
        <v-text-field v-model="contactInfo.city" label="City" />
        <v-text-field v-model="contactInfo.state" label="State" />
        <v-text-field v-model="contactInfo.email" label="E-mail" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" @click="saveData">Save</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Personal Links Section -->
    <v-card class="mb-6">
      <v-card-title>Personal Links</v-card-title>
      <v-card-text>
        <v-row v-for="(link, index) in personalLinks" :key="index">
          <v-col cols="5">
            <v-text-field v-model="link.type" label="Type (GitHub, Social)" />
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="link.link" label="Link" />
          </v-col>
          <v-col cols="2">
            <v-btn icon @click="personalLinks.splice(index, 1)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn color="blue" text @click="addPersonalLink">+ Add Link</v-btn>
      </v-card-text>
    </v-card>

    <v-card class="mb-6">
      <v-card-title>Education</v-card-title>
      <v-card-text>
        <v-row >
          <v-col cols="10">
            <v-card-text> Education</v-card-text>
          </v-col>
          <v-col cols="2">
            <v-btn icon @click="section.items.splice(i, 1)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="editEducation">
              <v-icon>mdi-edit</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn color="blue" text @click="addEducation">+ Add</v-btn>
      </v-card-text>
    </v-card>

    <v-card class="mb-6">
    <v-card-title>Experience</v-card-title>
    <v-card-text>
      <v-row >
        <v-col cols="10">
          <v-card-text> Experience</v-card-text>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="section.items.splice(i, 1)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="editExperience">
            <v-icon>mdi-edit</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn color="blue" text @click="addExperience">+ Add</v-btn>
    </v-card-text>
  </v-card>

  <v-card class="mb-6">
    <v-card-title>Project</v-card-title>
    <v-card-text>
      <v-row >
        <v-col cols="10">
          <v-card-text> Project</v-card-text>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="section.items.splice(i, 1)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="editProject">
            <v-icon>mdi-edit</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn color="blue" text @click="addProject">+ Add</v-btn>
    </v-card-text>
  </v-card>

  <v-card class="mb-6">
    <v-card-title>Skills</v-card-title>
    <v-card-text>
      <v-row v-for="(link, index) in skills" :key="index">
        <v-col cols="10">
          <v-text-field v-model="link.type" label="Skill" />
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="skills.splice(index, 1)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn color="blue" text @click="addSkill">+ Add Skill</v-btn>
    </v-card-text>
  </v-card>

  <v-card class="mb-6">
    <v-card-title>Interests</v-card-title>
    <v-card-text>
      <v-row v-for="(link, index) in interests" :key="index">
        <v-col cols="10">
          <v-text-field v-model="link.type" label="Interests" />
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="interests.splice(index, 1)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn color="blue" text @click="addInterest">+ Add Interest</v-btn>
    </v-card-text>
  </v-card>


  <v-card class="mb-6">
    <v-card-title>Award</v-card-title>
    <v-card-text>
      <v-row >
        <v-col cols="10">
          <v-card-text> Award</v-card-text>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="section.items.splice(i, 1)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="editAward">
            <v-icon>mdi-edit</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn color="blue" text @click="addAward">+ Add</v-btn>
    </v-card-text>
  </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}
</style>
