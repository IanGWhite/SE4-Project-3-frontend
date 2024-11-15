<script setup>
import { ref } from "vue";
import MenuBar from "../components/MenuBar.vue";
import jsPDF from 'jspdf';
import Utils from "../config/utils.js";

const resumeName = ref("");
const personalLinks = ref([{ type: "", link: "" }]);
const professionalSummary = ref("");
const sections = ref({
  personalLink: [{ name: "link 1", checked: false }],
  education: [{ name: "School 1", checked: false }],
  experience: [{ name: "Company 1", checked: false }],
  projects: [{ name: "Project 1", checked: false }],
  skills: [{ name: "Skill 1", checked: false }],
  interests: [{ name: "Interest 1", checked: false }],
  awards: [{ name: "Award 1", checked: false }],
});


const addSectionItem = (sectionKey) => {
  sections.value[sectionKey].push({ name: "", checked: false });
};

const saveResume = () => {
  console.log("Resume saved:", {
    resumeName,
    personalLinks,
    professionalSummary,
    sections
  });
  generateResume1();
};

const generateResume1 = () => {
  var doc = new jsPDF();
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2

  doc.text('Hello world!', 10, 10)
  doc.text(resumeName.value, 10, 10, {});
  doc.setFontSize(12);
  var splitSummary = doc.splitTextToSize(professionalSummary.value, pageWidth-10);
  doc.text(splitSummary, pageCenter, 40, {align: "center"})
  //doc.text(professionalSummary.value, pageWidth/2, 40, {align: "center"});
  doc.output('dataurlnewwindow');
};
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          Resume Name
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="resumeName"
            label="Resume Name"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
      </v-card>

       <!-- Professional Summary Section -->
       <v-card class="mt-3">
        <v-card-title>Professional Summary</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="professionalSummary"
            label="Professional Summary"
            outlined
            dense
          ></v-textarea>
        </v-card-text>
      </v-card>

      <!-- Sections with Checkboxes -->
      <template v-for="(sectionItems, sectionKey) in sections" :key="sectionKey">
        <v-card class="mt-3">
          <v-card-title>{{ sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) }}</v-card-title>
          <v-card-text>
            <div v-for="(item, idx) in sectionItems" :key="idx">
              <v-row>
                <v-checkbox v-model="item.checked"></v-checkbox>
                <v-text-field
                  v-model="item.name"
                  :label="sectionKey.slice(0, -1).charAt(0).toUpperCase() + sectionKey.slice(1, -1) + ' Name'"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </template>

      <!-- Create Button -->
      <v-btn class="mt-4" color="primary" @click="saveResume">Create</v-btn>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  background-color: #f5e4d7;
}
</style>
