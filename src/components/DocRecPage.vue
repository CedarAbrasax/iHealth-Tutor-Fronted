<template>
  <div class="container">
    <div class="background">
       <div class="search-container">
    <input
      class="search-input"
      type="text"
      placeholder="Search..."
      v-model="searchQuery"
    />
  </div>
     
    </div>
     <div class="category-selector">
      <button
        :class="{ 'selected-category': selectedCategory === 'doctors' }"
        @click="selectCategory('doctors')"
      >
        推荐医生
      </button>
      <button
        :class="{ 'selected-category': selectedCategory === 'hospitals' }"
        @click="selectCategory('hospitals')"
      >
        推荐医院
      </button>
    </div>
    <div class="categories">
      <div class="category-content">
        <div v-if="selectedCategory === 'doctors'" class="content-scrollable">
          <ul class="doctor-list">
            <li class="doctor-item" v-for="doctor in doctors" :key="doctor.name">
             <h3 class="doctor-name" @click="selectDoctor(doctor.name)">{{ doctor.name }}</h3>
             <!-- <h3 class="doctor-name" @click="navigateTo('/DocPage')">{{ doctor.name }}</h3> -->
             <!-- <h3 class="doctor-name" @click="navigateToDoctor(doctor.name)">{{ doctor.name }}</h3> -->
              <p class="doctor-info">{{ doctor.specialty }}</p>
              <p class="doctor-info">{{ doctor.expertise }}</p>
              <p class="doctor-info">{{ doctor.hospital }}</p>
            </li>
          </ul>
        </div>
        <div v-if="selectedCategory === 'hospitals'" class="content-scrollable">
          <ul class="hospital-list">
            <li class="hospital-item" v-for="hospital in hospitals" :key="hospital.name">
              <h3 class="hospital-name" @click="navigateToHospital(hospital)">{{ hospital.name }}</h3>

              <div class="hospital-tags">
                <span class="hospital-tag">
                  {{hospital.label1}}
                </span>
                <span class="hospital-tag">
                  {{hospital.label2}}
                </span>
                <span class="hospital-tag">
                  {{hospital.label3}}
                </span>
              </div>
              <p class="hospital-description">{{ hospital.description }}</p>
              <div class="hospital-details">
                <p class="hospital-address">{{ hospital.address }}</p>
                <p class="hospital-contact">{{ hospital.contact }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: 'doctors',
      searchQuery: "",
      doctors: [
        {
          name: '董家鸿',
          specialty: '肝胆胰外科',
          expertise: '肝硬化、肝癌',
          hospital: '北京清华长庚医院',
        },
        {
        name: '王黎明',
        specialty: '肝胆外科',
        expertise: '肝癌、胆管癌、胆囊癌',
        hospital: '中国医学科学院肿瘤医院',
        },
        {
        name: '吴健雄',
        specialty: '肝胆外科',
        expertise: '肝癌、乳腺癌',
        hospital: '中国医学科学院肿瘤医院'
      },
        {
        name: '赵建军',
        specialty: '肝胆外科',
        expertise: '肝癌',
        hospital: '中国医学科学院肿瘤医院'
       },
        {
        name: '蔡建强',
        specialty: '肝胆外科',
        expertise: '肝癌、结直肠癌',
        hospital: '中国医学科学院肿瘤医院',
        },
        {
        name: '王维虎',
        specialty: '放疗科',
        expertise: '肝癌、胃癌',
        hospital: '北京大学肿瘤医院',
        },
      ],
      hospitals: [
        {
          name: '北京大学第一医院',
          label1:'综合医院',
          label2:'公立',
          label3:'三甲',
          description: '北京大学第一医院(简称“北大医院”位于北京老皇城内，是距离中南海最近的医院，是一所融医疗、教学、科研、预防为体的大型综合性三级甲等医院，是中央保健基地医院。北大医院创建于1915年，是我国最是创办的国立医院，也是国内首批建立的临床医学院之一。北大医院前身为民国教育部批准北京医科专门学校设立附属诊..',
          address: '北大医院:北京市西城区西什库大街8号;北大妇产:北京市西安门大街1号',
          contact: '010-83572211(北大医院总机),010-66551056(院)010-83228989(男科中)'
        },
        {
          name: '上海交通大学医学院附属瑞金医院',
          label1:'综合医院',
          label2:'公立',
          label3:'三甲',
          description: '瑞金医院建于1907年，原名广蒸医院，是一所集医疗，教学、科研为一体的三级甲等综合性医院，有着百年的深厚底蕴。医院占地面积12万平方米，建筑面积30万平方米，绿化面积4万平方米，核定床位1693张(实际开放2100余张)，全院职工3776其由医师996全人宣级利技人品396人',
          address: '上海市黄浦区瑞金二路197号',
          contact: '021-63846590'
        },
      ],
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    selectDoctor(doctorName) {
      this.$parent.selectedDoctorName = doctorName;
      this.$router.push('/DocPage');
      console.log(this.$parent.selectedDoctorName);
    },
    navigateTo(page) {
      // 确保传递正确的路径字符串
      this.$router.push(page);
      console.log('跳转到：', page);
      console.log(this.$parent.selectedDoctorName);
    },
    // navigateToDoctor(doctorName) {
    //   console.log(doctorName);
    // this.$router.push({ name: 'doctor', params: { doctorName: doctorName } });
    //  console.log(doctorName);
  },
   


  
};
</script>

<style scoped>
.container {
  position: relative;
  height:100vh;
  
  margin: 0;
  padding: 0;
}

.background {
  background-image: url("https://i.postimg.cc/kMTYqJ7r/Doc-Rec-bkg.png");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  padding: 20px 0; /* 调整顶部内边距 */
  overflow: hidden;
  height:20%;
  z-index:-1;
}

.search-container {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 10px 20px; /* 调整左右内边距，增加左边距 */
  margin: 10px 3px; /* 调整上下和左右的间距 */
  width: 90%; /* 调整宽度，使其不会溢出容器 */
  
}

.search-input {
  width: 100%; /* 让输入框占满容器宽度 */
  border: none;
  background: none;
  font-size: 16px;
  outline: none;
}


.category-selector {
  text-align: center;
  padding: 10px 0;
  display: flex;
  justify-content: space-between; /* 将按钮平均分布 */
}

.category-selector button {
  flex: 1; /* 填充可用空间 */
  margin: 0;
  padding: 10px 0; /* 上下内边距 */
  border: none;
  background-color: rgba(0, 191, 255, 0.5); /* 浅蓝色填充 */
  color: white; /* 文字颜色 */
  outline: none;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
}

.category-selector button.selected-category {
  background-color: #0073e6; /* 选中时的深蓝色填充 */
}

.categories {
  margin-top: 0px;
}

.category-content {
  padding: 20px;
  background-color: #ffffff; /* 右侧背景色 */
  overflow-y: auto; /* 右侧内容超出时显示滚动条 */
}

.content-scrollable {
  height: calc(100vh - 180px); /* 调整高度以避免滚动条，180px 为示例顶部高度 */
  overflow-y: scroll;
}

@media (max-width: 768px) {
  .background {
    padding-top: 0; /* 移动端取消顶部内边距 */
  }

  .categories {
    flex-direction: column;
  }

  .doctor-info {
    font-size: 14px; /* 移动端适应的字体大小 */
    white-space: normal; /* 移动端允许文本换行 */
  }
}

/* 推荐医生内容列表样式 */
.doctor-list {
  list-style: none;
  padding: 0;
}

.doctor-item {
  display: flex; /* 启用Flexbox布局 */
  align-items: center; /* 垂直居中对齐各个子项 */
  justify-content: flex-start; /* 从头开始排列子项 */
  border-bottom: 1px solid #eaeaea; /* 每条内容下方的分割线 */
  margin-bottom: 5px; /* 每条内容间的间隔 */
  padding: 0px 0; /* 内填充，增加一些垂直空间 */
}

.doctor-name {
  margin-right: 15px; /* 名字和专业信息之间的空间 */
  white-space: nowrap; /* 防止名字换行 */
  flex-shrink: 0; /* 防止名字在空间不足时缩小 */
}

.doctor-info {
  display: inline-block; 
  padding: 5px 10px; 
  border-radius: 15px; 
  max-width: 100%; /* 确保内容不会溢出 */
  box-sizing: border-box; /* 边框和内边距包含在宽度内 */
  overflow: hidden; /* 防止内容溢出 */
  text-overflow: ellipsis; /* 文本溢出显示省略号 */
  white-space: nowrap; /* 防止文本换行 */
}
.doctor-info:nth-child(2) {
  background-color: orange;
  max-width:96px;
}

.doctor-info:nth-child(3) {
  background-color: lightgray; 
  
}
.doctor-info:last-child {
  margin-right: 0; /* 最后一个信息不需要右边距 */
  flex-grow: 1; 
  text-align: right; /* 右对齐文本 */
  
}
.doctor-info:first-child {
  background-color: wheat;
}

 .hospital-list {
    list-style: none;
    padding: 0;
  }

  .hospital-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
  }

  .hospital-name {
    color: darkgreen;
    display: inline-block;
  }

  .hospital-tags {
    display: inline-block;
    margin-left: 10px;
  }

  .hospital-tag {
    display: inline-block;
    background-color: orange;
    padding: 2px 10px;
    border-radius: 20px;
    margin-right: 5px;
  }

  .hospital-description {
    margin-top: 5px;
    font-size: small;
  }

  .hospital-details {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  .hospital-address, .hospital-contact {
    margin: 5px 0;
    background-color: lightgray;
    border-radius: 10px;
    color:darkslategray;
  }
</style>
