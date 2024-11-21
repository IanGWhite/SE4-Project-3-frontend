<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import linkServices from "../services/linkServices";
import skillServices from "../services/skillServices.js";
import contactServices from "../services/contactServices.js";
import educationServices from "../services/educationServices";
import experienceServices from "../services/experienceServices";
import Utils from "../config/utils.js";

const router = useRouter();
const user = ref({});
const contactInfo = ref({
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  email: ""
});



const personalLinks = ref([{ type: "", link: "" }]);
const experiences = ref([{ name: ""}]);
const educations = ref([{name: ""}]);
const skills = ref([{description :""}]);
const interests = ref([{interest: ""}]);

const addPersonalLink = () => personalLinks.value.push({ type: "", link: "" }); 
const addEducation = () => router.push({ name: 'addEducation' });
const editEducation = () => router.push({ name: 'EditEducation' });
const addExperience = () => router.push({ name: 'AddExperience' });
const editExperience = () => router.push({ name: 'EditExperience' });
const addProject = () => router.push({ name: 'AddProject' });
const editProject = () => router.push({ name: 'EditProject' });
const addSkill = () => skills.value.push({ description: ""}); 
const addInterest = () => interests.value.push({ interest: ""}); // this will be the code to add to the database
const addAward = () => router.push({ name: 'AddAward' });
const editAward = () => router.push({ name: 'EditAward' });

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

const deleteLink = (index) => {
  const linkToDelete = personalLinks.value[index];
  if (linkToDelete.id) {
    linkServices.deleteLink(user.value.studentId, linkToDelete.id) // Delete link from backend
      .then(() => {
        personalLinks.value.splice(index, 1);
        console.log("Link deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting link:", error);
      });
  } else {
    personalLinks.value.splice(index, 1); // Remove locally if not saved to backend
  }
};

const saveSkill = (index) => {
  const skill = skills.value[index];
  if (skill.id) {
    // Update an existing skill
    skillServices.updateSkill(user.value.studentId, skill.id, skill)
      .then(() => {
        console.log("Skill updated successfully:", skill);
      })
      .catch((error) => {
        console.error("Error updating skill:", error.response?.data?.message || error.message);
      });
  } else {
    // Create a new skill
    skillServices.createSkill(user.value.studentId, skill)
      .then((response) => {
        skills.value[index].id = response.data.id; // Update the ID assigned by the backend
        console.log("Skill added successfully:", skills.value[index]);
      })
      .catch((error) => {
        console.error("Error saving skill:", error.response?.data?.message || error.message);
      });
  }
};

const deleteSkill = (index) => {
  const skillToDelete = skills.value[index];
  
  if (skillToDelete.id) {
    // Delete from backend if it has an ID
    skillServices.deleteSkill(user.value.studentId, skillToDelete.id)
      .then(() => {
        skills.value.splice(index, 1); // Remove from local array
        console.log("Skill deleted successfully:", skillToDelete);
      })
      .catch((error) => {
        console.error("Error deleting skill:", error.response?.data?.message || error.message);
      });
  } else {
    // If no ID, just remove locally
    skills.value.splice(index, 1);
  }
};


const saveContactInfo = () => {
 const contact = contactInfo.value;
  if (contact.id) {
    // Update an existing contact
    contactServices.updateContact(user.value.studentId, contact.id, contact)
      .then(() => {
        console.log("contact updated successfully:", contact);
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  } else {
    contactServices.createContact(user.value.studentId, contact)
      .then((response) => {
        contactInfo.value.id = response.data.id; // Update the ID if backend assigns it
        console.log("Added:", contactInfo.value);
    })
      .catch((e) => {
        message.value =  "An error occurred";
    });
  }
};

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  fetchLinks();
  fetchSkills();
  fetchContact();
  fetchEducation();
  fetchExperiences();
})

// Fetch links from the database
const fetchLinks = () => {
  linkServices.getAllLinks(user.value.studentId)
    .then((response) => {
      personalLinks.value = response.data; // Assuming the backend returns an array of links
      console.log("Fetched links:", personalLinks.value);
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
    });
};


const fetchSkills = () => {
  skillServices.getAllSkills(user.value.studentId)
    .then((response) => {
      skills.value = response.data; // Assuming the backend returns an array of skills
      console.log("Fetched skills:", skills.value);
    })
    .catch((error) => {
      console.error("Error fetching skills:", error);
const fetchContact = () => {
  contactServices.getAllContacts(user.value.studentId)
    .then((response) => {
      if (response.data && response.data.length > 0) {
        contactInfo.value = response.data[0]; // Assuming only one contact entry per user
      } else {
        console.log("No contact info found.");
      }
      console.log("Fetched Contact Info:", contactInfo.value);
    })
    .catch((error) => {
      console.error("Error fetching contact info:", error);
    });
};

const fetchExperiences = () => {
  experienceServices.getAllExperiences(user.value.studentId)
    .then((response) => {
      experiences.value = response.data; // Assuming the backend returns an array of links
      console.log("Fetched Experiences:", experiences.value);
    })
    .catch((error) => {
      console.error("Error fetching Experiences:", error);
    });
};

const fetchEducation = () => {
  educationServices.getAllEducations(user.value.studentId)
    .then((response) => {
      educations.value = response.data; // Assuming the backend returns an array of links
      console.log("Fetched Educations:", educations.value);
    })
    .catch((error) => {
      console.error("Error fetching Educations:", error);
    });
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
        <v-btn color="blue" text @click="saveContactInfo">Save</v-btn>
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
        <v-btn icon @click="deleteLink(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="savePersonalLink(index)">
          Save
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="blue" text @click="addPersonalLink">+ Add Link</v-btn>
  </v-card-text>
</v-card>


<v-card class="mb-6">
  <v-card-title>Education</v-card-title>
  <v-card-text>
    <v-row v-for="(education, index) in educations" :key="index">
      <v-col cols="5">
        <v-card-text> {{ education.name }}</v-card-text>
      </v-col>
      <v-col cols="2">
        <v-btn icon @click="deleteEducation(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="editEducation(index)">
          Edit
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="blue" text @click="addEducation">+ Add Education</v-btn>
  </v-card-text>
</v-card>

<v-card class="mb-6">
  <v-card-title>Experience</v-card-title>
  <v-card-text>
    <v-row v-for="(experience, index) in experiences" :key="index">
      <v-col cols="5">
        <v-card-text> {{ experience.name }}</v-card-text>
      </v-col>
      <v-col cols="2">
        <v-btn icon @click="deleteExperience(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="editExperience(index)">
          Edit
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="blue" text @click="addExperience">+ Add Experience</v-btn>
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
   <v-row v-for="(skill, index) in skills" :key="index">
     <v-col cols="10">
      <v-text-field v-model="skill.description" label="Skill" />
     </v-col>
     <v-col cols="2">
       <v-btn icon @click="deleteSkill(index)">
         <v-icon>mdi-delete</v-icon>
       </v-btn>
       <v-btn icon @click="saveSkill(index)">
          Save
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
