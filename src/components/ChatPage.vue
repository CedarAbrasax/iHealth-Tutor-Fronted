<template>
<!-- 模态窗口 -->
<div v-if="showModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeModal">&times;</span>
    <div v-for="(message, index) in selectedSession.messages" :key="`modal-message-${index}`" :class="message.isBot ? 'bot-message' : 'user-message'">
      <!-- Message content here -->
      <div>{{ message.text }}</div>
    </div>
  </div>
</div>

<div class="page-container">
  <div class="history-container">
      <!-- 用户信息区域 -->
      <a href="/PersonalPage" style="text-decoration: none; color: inherit;">
        <div class="user-info">
        <img src="https://i.postimg.cc/MTzyn1vs/user-avatar.jpg" alt="User Avatar" class="user-avatar" />
        <div class="user-name">LSY</div>
      </div>
      </a>
    <div class="start-new-chat">
      <button @click="startNewChat" class="start-new-chat-button">新建聊天</button>
    </div>

    <div class="history-header">
      <img src="https://i.postimg.cc/gJR31zy0/image.png" alt="Logo" class="history-logo">
    <div>历史记录</div>
  </div>

     <div v-for="(session, index) in history" :key="`session-${index}`" class="session">
        <div @click="toggleSession(index)" class="session-title">{{ session.title }}</div> <!-- 添加点击事件 -->
        <div v-if="activeSessionIndex === index" class="session-messages"> <!-- 仅在活动会话索引匹配时显示 -->
          <div v-for="(message, msgIndex) in session.messages" :key="`message-${msgIndex}`" :class="message.isBot ? 'bot-message' : 'user-message'">
            <img :src="message.isBot ? 'https://i.postimg.cc/bYTm9wPD/Logo.png' : 'https://i.postimg.cc/MTzyn1vs/user-avatar.jpg'" alt="Avatar" class="avatar" />
            <div>{{ message.text }}</div>
            
          </div>
        </div>
      </div>
    

    <div class="clear-history">
      <button @click="clearHistory">清空聊天记录</button>
    </div>
  </div>
  <div class="chat-container"> 
  <div class="chat-messages">
<div v-for="(message, index) in messages" :key="index" 
     :class="[message.isBot ? 'bot-message' : 'user-message', message.additionalClass]">
     <div v-if="message.type === 'hospital'" v-html="message.content" class="hospital-message"></div>
  <img v-if="message.showAvatar" :src="message.isBot ? 'https://i.postimg.cc/bYTm9wPD/Logo.png' : 'https://i.postimg.cc/MTzyn1vs/user-avatar.jpg'" alt="Avatar" class="avatar" />
  <span v-if="message.isBot && isTyping" class="typing-indicator">loading...</span>
  <div v-if="!message.references" v-html="message.text">

    </div>
    <div v-if="message.showFeedback" class="feedback-container">
  <!-- 提示文字 -->
  <div class="feedback-prompt">您觉得这次推荐的结果有帮助吗？</div>
  
  <!-- 反馈图标 -->
  <div class="feedback-icons">
    <img @click="thumbUp(index)" src="https://i.postimg.cc/pr9GPQbc/image.png" alt="Thumb Up" class="thumb-icon" />
    <img @click="thumbDown(index)" src="https://i.postimg.cc/qvHbdCmQ/1.png" alt="Thumb Down" class="thumb-icon" />
  </div>
  
  <!-- 根据反馈显示的消息 -->
  <div v-if="feedback[index] !== undefined" class="feedback-response">
    <div v-if="feedback[index] === 'positive'">感谢您的反馈！</div>
    <div v-if="feedback[index] === 'negative'">抱歉，我们将持续改进推荐结果。</div>
  </div>

    <div @click="showMoreResults = !showMoreResults" class="expand-more">
      展开更多推荐结果
      <span v-if="showMoreResults">&#9650;</span> <!-- 当下拉展开时显示向上箭头 -->
      <span v-else>&#9660;</span> <!-- 默认显示向下箭头 -->
    </div>
  
  <!-- 下拉内容 -->
  <div v-if="showMoreResults" class="more-results">
    <!-- 这里填入您想展示的内容，如额外的推荐信息等 -->
    <div class="moreResults">推荐结果1</div>
    <div class="moreResults">推荐结果2</div>
    <!-- 更多结果... -->
  </div>
  
</div>


    <!-- 特殊消息条目用于显示参考资料 -->
    <div v-if="message.references" class="references-container">
      <ul>
        <li v-for="reference in message.references" :key="reference.url">
          <a :href="reference.url" target="_blank">{{ reference.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</div>




<!-- 根据是否已开始对话来显示或隐藏提示信息 -->
<div class="tips-container" v-if="!hasStartedConversation">
  <div class="prompt-text">尝试输入：</div>
  <div class="suggestions">
    <div class="suggestion-box" @click="fillInput('推荐肝病医生')">推荐肝病医生</div>
    <div class="suggestion-box" @click="fillInput('推荐三甲医院')">推荐三甲医院</div>
    <div class="suggestion-box" @click="fillInput('高血糖该吃什么药')">高血糖该吃什么药</div>
    <div class="suggestion-box" @click="fillInput('胸闷气短怎么办')">胸闷气短怎么办</div>
  </div>
</div>
    
    <div class="chat-input">
  <input v-model="userMessage" @keydown.enter="sendMessage" placeholder="请输入..." />
  <button @click="sendMessage" class="send-button">发送</button> 
</div>
</div>
</div>
</template>

<script>


export default {
  
  data() {
    return {
      userMessage: "",
      messages: [],
      history:[],
      currentSession:[],
      activeSessionIndex: null, // 用于跟踪当前活跃的历史会话索引
      showModal: false,
      selectedSession: null,
      references: [], // 存储从API获取的参考资料
      hasStartedConversation: false, // 跟踪对话状态
       showMoreResults: false, // 用于控制下拉内容显示的属性
      feedback:{},
      isTyping:false,
      hospitals: [
      {
        name: '北京大学第一医院',
        label1: '综合医院',
        label2: '公立',
        label3: '三甲',
        description: '北京大学第一医院(简称“北大医院”)位于北京老皇城内，是距离中南海最近的医院，是一所融医疗、教学、科研、预防为一体的大型综合性三级甲等医院。',
        address: '北京市西城区西什库大街8号',
        contact: '010-83572211'
      },
      // 其他医院数据...
    ],
    };
  },

  
  computed: {
  showSuggestions() {
    return this.userMessage.trim().length === 0;
  }
},

  created() {
  this.messages = [];
  this.history=[];
},


  methods: {
    //点击浮动框填写到输入框中
    fillInput(suggestion) {
    this.userMessage = suggestion;
  },

     getClass(message) {
    if (message.type === 'bot') {
      return 'bot-message';
    } else if (message.type === 'user') {
      return 'user-message';
    } else if (message.type === 'reference') {
      return 'reference-message';
    }
  },
    
    async fetchReferences(userMessage) {
    const apiKey = '您的BingAPI密钥'; // 替换为您的Bing API密钥
    const bingApiUrl = 'https://api.bing.microsoft.com/v7.0/search';
    try {
      const response = await fetch(`${bingApiUrl}?q=${encodeURIComponent(userMessage)}`, {
        headers: { 'Ocp-Apim-Subscription-Key': apiKey }
      });
      if (!response.ok) {
        throw new Error('Bing API请求失败');
      }
      const data = await response.json();
      this.references = data.webPages.value.map(page => ({ title: page.name, url: page.url }));
    } catch (error) {
      console.error("获取参考资料失败", error);
      this.references = [];
    }
  },

    clearHistory() {
      this.history = [];
    },
    
    async typeWriterEffect(answer){
      this.isTyping=true;//输入中
    this.messages.push({text:"",isBot:true,showAvatar: true});
    for(const char of answer){
      const randomNum= Math.floor(Math.random() * (300 - 200 + 1)) + 200;
      this.messages[this.messages.length-1].text+=char;
      await new Promise((resolve)=>setTimeout(resolve,randomNum));
    }
    this.isTyping=false;//打字效果完成
    //console.log("typeWriterEffect completed:", this.messages);
    //this.messages.push({text:"",isBot:true});
  },

  startNewChat() {
    console.log("startNewChat called");
    if (this.currentSession.length > 0) {
      const sessionWithTitle = {
        title: this.currentSession.find(msg => !msg.isBot)?.text || '无标题', // 查找第一个用户消息作为标题
        messages: this.currentSession,
      };
      this.history.push(sessionWithTitle);
      this.currentSession = [];
    }
    this.messages = []; // 清空当前聊天记录
    this.hasStartedConversation = false;
  },

    async sendMessage() {
      // 确保用户输入非空
    if (this.userMessage.trim()) {
      // 发送消息的逻辑...

      // 标记为已开始对话,使浮动提示框消失
      this.hasStartedConversation = true;
    }
    

    const userMessage = this.userMessage.trim();
    if (userMessage) {
      this.messages.push({ text: userMessage, isBot: false, type:'user',showAvatar: true });
      this.currentSession.push({ text: userMessage, isBot: false,type:'user',showAvatar: true  });
      this.userMessage = "";

      try {
        const response = await this.sendUserMessageToAPI(userMessage);
        const answer = response.generated_text;
        await this.typeWriterEffect(answer);
        this.currentSession.push({ text: answer, isBot: true, type:'bot',showAvatar: true  });
        //this.messages.push({ text: answer, isBot: true,showAvatar: true });

        
         if (userMessage === "推荐北京大学第一医院") {
      const hospitalInfo = this.hospitals.find(hospital => hospital.name === "北京大学第一医院");
      if (hospitalInfo) {
        // 创建格式化的医院信息名片
       const hospitalCardText = [
          `医院名称: ${hospitalInfo.name}`,
          `地址: ${hospitalInfo.address}`,
          `联系方式: ${hospitalInfo.contact}`,
          `简介: ${hospitalInfo.description}`
        ].join('\n'); // 使用换行符连接各部分信息

      //   const hospitalCardText = `
      //     <div class="hospital-card">
      //       <div class="hospital-name">${hospitalInfo.name}</div>
      //       <div class="hospital-info">
      //       <div><span class="hospital-info-title">地址：</span><span class="hospital-info-content">${hospitalInfo.address}</span></div>
      //       <div><span class="hospital-info-title">联系方式：</span><span class="hospital-info-content">${hospitalInfo.contact}</span></div>
      //       <div><span class="hospital-info-title">简介：</span><span class="hospital-info-content">${hospitalInfo.description}</span></div>
      //       </div>
      //   </div>
      // `;


        // 将格式化的字符串作为bot的消息发送
        this.messages.push({  text: hospitalCardText, isBot: true,showAvatar: false, showFeedback: true });
        }
    } else {
      // 处理其他用户消息...
    }
  
         if (userMessage === "展示资料") {
        // 用户输入“展示资料”时，添加一个包含参考资料的特殊消息
        this.references = [
          { title: "示例文章1", url: "https://example.com/article1" },
          { title: "示例文章2", url: "https://example.com/article2" },
          { title: "示例文章3", url: "https://example.com/article3" },
        ];
        this.messages.push({ isBot: true, references: this.references });
      }

      } catch (error) {
        console.error("API请求失败", error);
      }
    }
  },

    async sendUserMessageToAPI(userMessage) {
      const apiUrl='http://127.0.0.1:4523/m1/3419333-0-a9a39bec/models/microsoft/DialoGPT-small';
      //const apiUrl='https://api-inference.huggingface.co/models/microsoft/DialoGPT-small';
      const apiKey = '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';
      
      //await new Promise(resolve => setTimeout(resolve, 3000)); 
      const response=await fetch(apiUrl,{
      method:'POST',
      headers: { Authorization: `Bearer ${apiKey}` ,
       'Content-Type': 'application/json'},
      body:JSON.stringify({message:userMessage}),
      });
      if(!response.ok){
      throw new Error('API请求失败');
      }
      //await new Promise(resolve => setTimeout(resolve, 3000));
      const data=await response.json();
      return data;
    },

    toggleSession(index) {
    this.selectedSession = this.history[index];
    this.showModal = true;
  },
    closeModal() {
    this.showModal = false;
  },

  
   thumbUp(index) {
    this.feedback[index] = 'positive'; // Vue 3的响应式更新
  },
  thumbDown(index) {
    this.feedback[index] = 'negative'; // Vue 3的响应式更新
  },
  }
  
  
};

</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction:row;
  height:100vh;
}

.start-new-chat{
  padding:15px 10px;
  text-align: center;
  
}

.history-container {
  flex:0 0 130px;
  overflow:auto;
  background-color: rgba(0,31,63,0.5);
  height: 100vh; 
  overflow-y:auto;
  position:relative;
  margin:0;
  padding-bottom:0;
}

.history-container::-webkit-scrollbar {
  width: 10px;
}

.history-container::-webkit-scrollbar-thumb {
  background-color: darkgrey; 
  border-radius: 10px; 
}


.history-container::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1); 
  border-radius: 10px; 
}

.page-box{
  background-color:rgba(0,31,63,0.5);
}
.chat-container {
  display: flex;
  flex-grow:1;
  flex-direction: column;
  height: 100vh;
  flex-grow: 1; /* 让聊天容器占据剩余空间 */
}

.chat-messages {
  flex-grow: 1;
  overflow-y: scroll;
  padding: 10px;
}

.bot-message {
  background-color: rgba(224,224,224,0.8);
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
  text-align: left;
  white-space: pre-wrap;
}

.user-message {
  background-color: rgba(226,247,254,0.8);
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
  text-align: right;
  white-space: pre-wrap;
}

/* 在 .bot-message 之后添加新的样式 */
.bot-message.hospital-card-message {
   background-color: #fff !important;
  padding: 20px !important;
  border-radius: 8px;
  /* 其他需要覆盖的样式 */
}


.chat-input {
  display: flex; /* 对齐输入框和按钮 */
  padding: 10px;
  background-color: rgba(224,224,224,1);
  border-top: 1px solid #ccc;
  margin-left: 0; 
}

input {
  flex-grow: 1; /* 输入框占据多余空间 */
  margin-right: 10px; 
  border: none;
  outline: none;
  padding: 10px;
}
#border-btn { 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.start-new-chat-button {
  border: 0;
  border-radius: 10px;
  background: rgb(37, 202, 194);
  text-transform: uppercase;
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  outline: none;
  position: relative;
  transition: border-radius 3s;
  -webkit-transition: border-radius 3s; 
}

.start-new-chat-button:hover {
   border-bottom-right-radius: 50px;
   border-top-left-radius: 50px;
   border-bottom-left-radius: 10px;
   border-top-right-radius: 10px;
}

.send-button{
  padding: 10px 20px;
  background-color: lightseagreen; 
  color: white;
  border:0; 
  border-radius: 5px; 
  cursor: pointer; 
  outline: none;
}

.send-button:hover {
  background-color: rgb(36, 216, 207); /* 鼠标悬停时改变按钮的背景颜色 */
}

.avatar {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 50%;
}

.bot-avatar {
  float: left;
}

.user-avatar {
  float: right;
}

/* 在小屏幕上调整布局 */
@media screen and (max-width: 768px) {
  .bot-message,
  .user-message {
    padding: 5px; /* 减小内边距 */
    margin: 3px 0; /* 减小外边距 */
  }

  .chat-input {
    padding: 5px;
  }

  input {
    padding: 5px;
  }

  /* 为小屏幕调整头像大小 */
  .avatar {
    width: 20px;
    height: 20px;
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 31, 63, 0.5);
}

.user-avatar {
  width: 30px; /* 调整为所需大小 */
  height: 30px; /* 保持头像为圆形 */
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  color: white;
  font-size: 16px;
}

.clear-history {
  position: absolute;
  bottom: 0;
  width:100%;
  background-color: rgba(0,31,63,0.5);
  padding: 15px 0;
  text-align: center;
  margin:0;
}

.clear-history button {
  padding: 5px 10px;
  background-color: transparent;
  color: white;
  border: 2px solid lightseagreen;
  border-radius: 5px;
  cursor: pointer;
}

.clear-history button:hover {
  background-color: lightseagreen;
}

.session-title {
  font-size: 14px; 
  cursor: pointer; /* 将鼠标悬停时的样式设置为指针 */
  text-align: center;
  color:white;
  padding-left:12px;
  background-color: rgb(114, 128, 143);
}

.session-messages {
  margin-left: 10px; 
}
/* 模态窗口样式 */
.modal {
  display: block; 
  position: fixed; 
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4); 
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.references-container {
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1); /* 加深的底色 */
  border-radius: 5px;
}

.references-container ul {
  list-style: none;
  padding: 0;
}

.references-container li {
  margin-bottom: 5px;
}

.references-container a {
  color: #007bff;
  text-decoration: none;
}

.references-container a:hover {
  text-decoration: underline;
}

/* 参考资料消息的样式 */
.reference-message {
  background-color: rgba(0, 0, 255, 0.1); /* 可以设置为您喜欢的颜色 */
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
  text-align: left;
}

.references-container {
  background-color: rgba(0, 0, 0, 0.1); /* 与上面的.reference-message背景颜色不同 */
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}

.floating-tips {
  text-align: center;
  background-color: #f0f0f0; /* 浅灰色背景 */
  color: #333; /* 文字颜色 */
  padding: 10px 0; /* 上下填充 */
  border-radius: 5px; /* 圆角边框 */
  margin-bottom: 10px; /* 与输入框的间距 */
  font-style: italic; /* 斜体字 */
}

.chat-input {
  display: flex; /* 对齐输入框和按钮 */
  padding: 10px;
  background-color: rgba(224,224,224,1);
  border-top: 1px solid #ccc;
  position: relative; /* 相对定位 */
}

.tips-container {
  text-align: center;
  margin-bottom: 10px;
}

.prompt-text {
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px; /* 设置浮动框之间的间距 */
}

.suggestion-box {
  background-color: #f0f0f0; /* 浅灰色背景 */
  color: #333; /* 文字颜色 */
  padding: 10px 20px; /* 内填充 */
  border-radius: 5px; /* 圆角边框 */
  font-style: italic; /* 斜体字 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  flex: 1 1 calc(50% - 10px); /* 确保两个一行，减去间距 */
  text-align: center; /* 文本居中 */
  max-width: calc(50% - 10px); /* 最大宽度，保证两个一行 */
}

/* 适应不同屏幕大小 */
@media (max-width: 600px) {
  .suggestion-box {
    flex: 1 1 100%; /* 小屏幕上一个一行 */
    max-width: 100%;
  }
}

/* 医院信息名片的样式 */
.hospital-message {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);

}


.hospital-name {
  color: #333;
  font-weight: bold;
  font-size: 1.2em;
}

.hospital-info {
  margin-bottom: 10px;
  color: #666;
}

.hospital-info-title {
  font-weight: bold;
  color: #333;
}

.hospital-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}





.feedback-icons {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.thumb-up, .thumb-down {
  cursor: pointer;
  font-size: 24px;
  margin: 0 10px;
}

.thumb-up:hover, .thumb-down:hover {
  color: #007bff; /* 鼠标悬停时的颜色变化 */
}

.thumb-icon {
  cursor: pointer;
  width: 20px; /* 或根据需要调整尺寸 */
  height: auto; /* 保持图片的原始宽高比 */
  margin: 0 10px;
}

.thumb-icon:hover {
  /* 可以添加一些悬停效果，如稍微放大或改变透明度 */
  transform: scale(1.1);
}

.feedback-response {
  font-size: 0.8rem; /* 调整字体大小 */
  color: #999; /* 调整字体颜色 */
  margin-top: 10px; /* 如果需要，添加一些外边距 */
}


.feedback-container {
  text-align: center; /* 居中显示 */
  margin-top: 10px; /* 根据需要调整间距 */
}

.feedback-prompt {
  margin-bottom: 10px; /* 在提示文字和反馈图标之间添加间距 */
  font-size: 0.8rem; /* 调整字体大小 */
  color: #999; /* 调整字体颜色 */
  margin-top:15px;
}

.feedback-icons {
  margin-bottom: 10px; /* 在反馈图标和反馈信息之间添加间距 */
}

.history-header {
  padding: 5px 0; /* 根据实际情况调整填充 */
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中，如果你希望它们居中显示 */
  color: white;
  font-size: medium; /* 调整字体大小 */
}

.history-logo {
  width: 25px;
  height: 25px;
  margin-right: 10px; /* 根据需要调整logo与标题之间的间距 */
}
/* 闪烁关键帧动画 */
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.typing-indicator {
  font-size: 0.8em;
  margin-left: 5px;
  color: grey;
  animation: blink 1s linear infinite;
}

.expand-more {
  cursor: pointer;
  color:rgba(0,31,63,0.5);
  margin-top: 10px;
  display:flex;
  align-items: center;
}

.expand-more span{
  margin-left: 5px;
}
.more-results div {
  margin-top: 5px;
}

.moreResults{
  background-color: darkgrey;
  border-radius:10px;
  border:1px solid #ccc;
  padding:20px;
  color:white;
}

</style>
