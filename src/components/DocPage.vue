<template>

  <div class="doctor-profile" v-if="filteredDoctor">
    <h1>{{ filteredDoctor.name }}</h1>
    <div class="info">
      <p class="title"><strong>职称：</strong><span class="job-title">{{ filteredDoctor.title }}</span></p>
      <div class="hospital-info">
      <div class="hospital-name-and-icon">
      <p class="hosiptal-name"><strong>医院：</strong><span class="hospital-title">{{ filteredDoctor.hospital }}</span></p>
      <img src="https://i.postimg.cc/MZ570dP7/image.png" class="address-icon" @mouseover="showAddressPopup = true" @mouseleave="showAddressPopup = false"/>
    </div>

      <div class="address-popup" v-if="showAddressPopup">
        <p>医院地址: {{ filteredDoctor.address }}</p>
      </div>
      </div>
      <p><strong>专业：</strong>{{ filteredDoctor.specialty }}</p>
      <p><strong>专长：</strong>{{ filteredDoctor.expertise }}</p>
      <p><strong>简介：</strong>{{ filteredDoctor.bio }}</p>
      <p><strong>科研发表：</strong>{{ filteredDoctor.publications }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctorName: '',
      doctors: [{
        name: '董家鸿',
        title: '主任医师',
        hospital: '北京清华长庚医院',
        specialty: '肝胆胰外科',
        expertise: '肝硬化、肝癌',
        address:'北京市昌平区立汤路168号院',
        bio: '医学博士，清华大学教授，中国工程院院士，清华大学临床医学院院长，北京清华长庚医院院长，清华大学精准医学研究院院长，中国医师协会常务副会长。董家鸿教授是国际著名肝胆外科专家和肝脏移植专家，在国际上首次提出“精准外科”新理念，创立了精准肝胆外科范式。这一理念已被广泛应用于胰腺外科、神经外科、脊柱外科、整形外科、介入治疗科等诸多临床专科领域，促进了当代外科理念和范式的革新。',
        publications: '以第一作者或通讯作者发表SCI论文160余篇，主持制订15部行业指南。主编出版专著6部。主持国家科技支撑计划等项目20余项；以第一完成人获国家科技进步二等奖1项和省部级一等奖3项，以合作完成人获国家科技进步一等奖1项。'
      },
      {
        name: '王黎明',
        title: '主任医师',
        hospital: '中国医学科学院肿瘤医院',
        specialty: '肝胆外科',
        expertise: '肝癌、胆管癌、胆囊癌',
        address:'北京市朝阳区潘家园南里17号',
        bio: '2001年中南大学湘雅医学院临床医学本科毕业，北京协和医学院肿瘤外科学博士，美国UCLA-Ronald Reagan医院访问学者。在中国医学科学院肿瘤医院腹部外科/肝胆外科历任住院医师、主治医师、副主任医师，2021年9月聘任为肝胆外科主任医师。',
        publications: '以第一/通讯作者在SCI期刊发表研究论文18篇。教育部科技评价与评审信息库专家，北京市科委专家库专家，北京市医保基金监管工作专家库专家。'
      },],
       showAddressPopup: false,
       
    };
  },
  
computed: {
    filteredDoctor() {
      return this.doctors.find(doctor => doctor.name === this.doctorName) || null;
    }
  },

  mounted() {
    this.doctorName = this.$parent.selectedDoctorName;
  },
  
}
</script>

<style>
.background {
  background-image: url("https://i.postimg.cc/kMTYqJ7r/Doc-Rec-bkg.png");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  padding: 20px 0; 
  overflow: hidden;
  height:20%;
  z-index:-1;
}
.doctor-profile {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: lightblue;
}

.info p {
  margin: 10px 0;
}

.job-title {
  background-color: orange;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
}

.hospital-title{
  background-color: darkgrey;
  color: darkslategrey;
  font:bolder;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
}

.position{
    width:20px;
    height:20px;
}

.hospital-info {
  position: relative; 
}

.address-popup {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  z-index: 999;
  background-color: lightgreen;
  color: teal;
}
.hospital-name-and-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

.address-icon {
  cursor: pointer;
  margin-left: 10px; 
  width: 30px; 
  height: 30px; 
}

</style>
