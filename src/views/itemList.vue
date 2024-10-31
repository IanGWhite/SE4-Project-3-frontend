<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const contactInfo = ref({
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  email: ""
});
const personalLinks = ref([{ type: "", link: "" }]);
const professionalSummary = ref("");
const education = ref([{ school: "" }]);
const experience = ref([{ work: "" }]);
const projects = ref([{ project: "" }]);
const skills = ref([""]);
const interests = ref([""]);
const awards = ref([{ award: "" }]);

const addPersonalLink = () => personalLinks.value.push({ type: "", link: "" });
const addEducation = () => education.value.push({ school: "" });
const addExperience = () => experience.value.push({ work: "" });
const addProject = () => projects.value.push({ project: "" });
const addSkill = () => skills.value.push("");
const addInterest = () => interests.value.push("");
const addAward = () => awards.value.push({ award: "" });

const saveData = () => {
  console.log("Save data:", {
    contactInfo: contactInfo.value,
    personalLinks: personalLinks.value,
    professionalSummary: professionalSummary.value,
    education: education.value,
    experience: experience.value,
    projects: projects.value,
    skills: skills.value,
    interests: interests.value,
    awards: awards.value
  });
};
</script>

<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Header goes here</v-toolbar-title>
    </v-toolbar>

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
        <v-btn color="primary" @click="saveData">Save</v-btn>
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
        <v-btn color="primary" text @click="addPersonalLink">+ Add Link</v-btn>
      </v-card-text>
    </v-card>

    <!-- Professional Summary Section -->
    <v-card class="mb-6">
      <v-card-title>Professional Summary</v-card-title>
      <v-card-text>
        <v-textarea v-model="professionalSummary" label="Professional Summary" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveData">Save</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Other Sections: Education, Experience, Projects, Skills, Interests, Awards -->
    <v-card v-for="(section, index) in [
      { title: 'Education', items: education, addFunc: addEducation, label: 'School' },
      { title: 'Experience', items: experience, addFunc: addExperience, label: 'Work' },
      { title: 'Projects', items: projects, addFunc: addProject, label: 'Project' },
      { title: 'Skills', items: skills, addFunc: addSkill, label: 'Skill' },
      { title: 'Interests', items: interests, addFunc: addInterest, label: 'Interest' },
      { title: 'Awards', items: awards, addFunc: addAward, label: 'Award' }
    ]" :key="index" class="mb-6">
      <v-card-title>{{ section.title }}</v-card-title>
      <v-card-text>
        <v-row v-for="(item, i) in section.items" :key="i">
          <v-col cols="10">
            <v-text-field v-model="item[section.label.toLowerCase()]" :label="section.label" />
          </v-col>
          <v-col cols="2">
            <v-btn icon @click="section.items.splice(i, 1)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn color="primary" text @click="section.addFunc">+ Add {{ section.label }}</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveData">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}
</style>
