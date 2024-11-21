<script setup>

import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import linkServices from "../services/linkServices";
import MenuBar from "../components/MenuBar.vue";
import jsPDF from 'jspdf';
import Utils from "../config/utils.js";

const user = ref({});
const resumeName = ref("");
const personalLinks = ref([{ type: "", link: "" }]);
const professionalSummary = ref("");
const sections = ref({
  personalLink: [{ name: "link 1", checked: true }],
  education: [{ name: "School 1", checked: true }, { name: "School 2", checked: true }],
  experience: [{ name: "Company 1", checked: true }, { name: "Company 2", checked: true }],
  projects: [{ name: "Project 1", checked: true }],
  skills: [{ name: "Skill 1", checked: true }],
  interests: [{ name: "Interest 1", checked: true }],
  awards: [{ name: "Award 1", checked: true }, { name: "Award 2", checked: true }],
});


const addSectionItem = (sectionKey) => {
  sections.value[sectionKey].push({ name: "", checked: false });
};

onMounted(() => {
  user.value = Utils.getStore('user')
  //console.log(user.value)
  fetchLinks();
})

// Fetch links from the database
const fetchLinks = () => {
  linkServices.getAllLinks(user.value.studentId)
    .then((response) => {
      sections.value.personalLink = response.data.map((link) => ({
        name: link.link,
      })); // Assuming the backend returns an array of links
      console.log("Fetched links:", sections.value.personalLink);
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
    });
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
  var currentY = 25;

  doc.setFontSize(20);
  doc.setFont(font, "bold");
  doc.text('First last', pageCenter, currentY, {align: "center"}); currentY += 6;
  doc.setFont(font, "normal");
  AddContactInfo(doc, currentY, pageCenter);
  currentY += 15;
  currentY = AddSummary(doc, currentY);
  
  
  currentY += 10;
  
  //education header
  
  currentY = AddEducationInfo(doc, currentY);
  currentY =  AddAwardInfo(doc, currentY);
  currentY += 5;
  currentY = AddExperienceInfo(doc, currentY);
  
  currentY = AddSkills(doc, currentY);
  
  doc.output('dataurlnewwindow');
  //doc.save("Resume");
};

const AddContactInfo = (doc, currentY, pageCenter) => {
  doc.setFontSize(11);
  var contactString = "";
  contactString += "Oklahoma City | ";
  contactString += "(555) 555-5555 | ";
  contactString += "ike.theagle@oc.edu";
  //if(sections.personalLink.checked.value)
  for(let i=0; i<sections.value.personalLink.length; i++)
  {
    var link = sections.value.personalLink[i];
    if(link.checked)
    {
      contactString += " | ";
      contactString += link.value;
    }
  }
  doc.text(contactString, pageCenter, currentY, {align: "center"});
}

const AddSummary = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SUMMARY");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  doc.setFontSize(12);
  doc.setFont(font, "normal");
  var splitSummary = doc.splitTextToSize(professionalSummary.value, pageWidth-20);
  doc.text(splitSummary, 10, currentY, {align: "left"});
  currentY += doc.getTextDimensions(splitSummary).h;
  return currentY;
}

const AddEducationInfo = (doc, currentY) => {

  currentY = AddHeader(doc, currentY, "EDUCATION");
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
      doc.setFont(font, "bold");
  var workName = "Oklahoma Christian University";
  workName += ",";
  var temp = doc.text(workName, 10, currentY);
  
  doc.setFont(font, "normal");
  temp = "Oklahoma City, OK";
  doc.text(temp, 10+(doc.getTextDimensions(workName).w * 1.1), currentY);

      
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
      doc.text("this is where the award description goes", 15, currentY); currentY += 5;
      

    }
  }
  return currentY;
}

const AddExperienceInfo = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "PROFESSIONAL EXPERIENCE");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  for(let i=0; i<sections.value.experience.length; i++)
  {
  var exp = sections.value.experience[i];
    if(exp.checked)
  {
  doc.setFontSize(11);
  doc.setFont(font, "bold");
  var workName = "Oklahoma Christian University";
  workName += ",";
  var temp = doc.text(workName, 10, currentY);
  
  doc.setFont(font, "normal");
  temp = "Professor, "
  temp += "Oklahoma City, OK";
  doc.text(temp, 10+(doc.getTextDimensions(workName).w * 1.1), currentY);
  //console.log(doc.getTextDimensions(temp.text));
  temp = "start month, Year";
  temp += " - end month, Year";
  doc.text(temp, pageWidth-10, currentY, {align:"right"});
  currentY += 5;
  temp = "This is the description for the job. It wasn't really set up to make bullet points so hopefully it can adapt for new lines. \nHopefully this is a new line";
  var splitSummary = doc.splitTextToSize(temp, pageWidth-40);
  doc.text(splitSummary, 20, currentY, {align: "left"});
  currentY += doc.getTextDimensions(splitSummary).h;
}
}
  return currentY + 5;
}

const AddSkills = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SKILLS | INTERESTS");
  doc.setFont(font, "italic");
  doc.setFontSize(11);
  for(let i=0; i<sections.value.skills.length; i++)
  {
    var skill = sections.value.skills[i];
    if(skill.checked)
    {
      doc.setFont("Symbol");
      doc.setFontSize(20);
      doc.text('·', 15, currentY+1);
      doc.setFont(font, "italic");
      doc.setFontSize(11);
      doc.text("This is a skill i learned blabla", 20, currentY);
      currentY += 5;

    }
  }
  for(let i=0; i<sections.value.interests.length; i++)
  {
    var interest = sections.value.interests[i];
    if(interest.checked)
    {
      doc.setFont("Symbol");
      doc.setFontSize(20);
      doc.text('·', 15, currentY+1);
      doc.setFont(font, "italic");
      doc.setFontSize(11);
      doc.text("Here's an interest", 20, currentY);
      currentY += 5;

    }
  }
}

const AddHeader = (doc, currentY, title) => {
  doc.setFontSize(13);
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
