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

const font = "times";
const generateResume1 = () => {
  var doc = new jsPDF();
  //console.log(doc.getFontList());
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2
  var currentY = 15;

  doc.setFontSize(20);
  doc.setFont(font, "bold");
  doc.text('First last', pageCenter, currentY, {align: "center"}); currentY += 5;
  doc.setFont(font, "normal");
  AddContactInfo(doc, currentY, pageCenter);
  currentY += 15;

  //summary header
  currentY = AddHeader(doc, currentY, "SUMMARY");
  //summary paragraph
  doc.setFontSize(11);
  doc.setFont(font, "normal");
  var splitSummary = doc.splitTextToSize(professionalSummary.value, pageWidth-20);
  doc.text(splitSummary, pageCenter, currentY, {align: "center"});
  currentY += doc.getTextDimensions(splitSummary).h;
  currentY += 10;
  
  //education header
  currentY = AddHeader(doc, currentY, "EDUCATION");
  currentY = AddEducationInfo(doc, currentY);
  currentY =  AddAwardInfo(doc, currentY);
  
  currentY = AddExperienceInfo(doc, currentY);
  
  //doc.text(professionalSummary.value, pageWidth/2, 40, {align: "center"});
  doc.output('dataurlnewwindow');
};

const AddContactInfo = (doc, currentY, pageCenter) => {
  doc.setFontSize(10);
  var contactString = "";
  contactString += "Oklahoma City | ";
  contactString += "(555) 555-5555 | ";
  contactString += "ike.theagle@oc.edu";
  //if(sections.personalLink.checked.value)
  if(sections.value.personalLink[0].checked)
{
  //contactString += personalLinks.type;
  contactString += " | ";
  contactString += personalLinks.link;
}
  doc.text(contactString, pageCenter, currentY, {align: "center"});
}

const AddEducationInfo = (doc, currentY) => {
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2
  var lineHeight = 5;
  doc.setFontSize(11);
  
  for(let i=0; i<sections.value.education.length; i++)
  {
    var edu = sections.value.education[i];
    if(edu.checked)
    {
      // get school name and city and state
      var tempConcat = "Oklahoma Christian University, Oklahoma City, OK"
      doc.text(tempConcat, 10, currentY);
      doc.text("Aug, 2021 - July 2025", pageWidth-10, currentY, {align:"right"});
      currentY += lineHeight;
      doc.setFont(font, "italic");
      doc.text("Bachelor of Arts /Bachelor of Science in XX /B.B.A in XX", 10, currentY); currentY += lineHeight;
      doc.text("GPA: ", 10, currentY); 
      doc.text("3.4", 20, currentY); currentY += lineHeight;
      doc.setFont(font, "normal");
      doc.text("Coursework: Here is a project I did bla bla bla.", 10, currentY); currentY+=lineHeight;
    }
  }
  return currentY;
}

const AddAwardInfo = (doc, currentY) => {
  var pageWidth = doc.internal.pageSize.getWidth(); 
  for(let i=0; i<sections.value.awards.length; i++)
  {
    var award = sections.value.awards[i];
    if(award.checked)
    {
      doc.setFont(font, "italic");
      doc.text("Awards: ", 10, currentY);
      doc.setFont(font, "normal");
      doc.text("award title", 24, currentY);
      doc.text("Feb, 2023 - July 2023", pageWidth-10, currentY, {align:"right"});
      currentY += 5;
      doc.text("this is where the award description goes", 10, currentY); currentY += 5;
      

    }
  }
  return currentY;
}

const AddExperienceInfo = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "PROFESSIONAL EXPERIENCE");
  doc.setFontSize(11);
  doc.setFont(font, "bold");
  var workName = "Oklahoma Christian University";
  workName += ",";
  var temp = doc.text(workName, 10, currentY);
  console.clear();
  
  doc.setFont(font, "normal");
  doc.text("Oklahoma City, OK", 10+(doc.getTextDimensions(workName).w * 1.1), currentY);
  //console.log(doc.getTextDimensions(temp.text));

}

const AddHeader = (doc, currentY, title) => {
  doc.setFontSize(15);
  doc.setFont(font, "bold");
  doc.text(title, 10, currentY, {});
  currentY += 5;
  doc.line(9, currentY, 200, currentY);
  currentY += 5;
  doc.setFont(font, "normal");
  return currentY;
}
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
