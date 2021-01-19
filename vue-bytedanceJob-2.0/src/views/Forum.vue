<template>
  <div class="forum">
      <!-- type='flex' justify="center" -->
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" :span="4" class="forum-col1">
          <div class="grid-content bg-purple-light">
            <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4f86c0f8a524b7e9fc4830546a0f0ab~tplv-k3u1fbpfcp-watermark.image" width="280px" height="280px">
            <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a0055d3bb064952ba3f6e1295168b8c~tplv-k3u1fbpfcp-watermark.image" width="280px" height="280px">
          </div>
        </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" :span="16" class="forum-col2">
          <div class="grid-content bg-purple">
              <ul class="forumlist">
                  <li v-for="(item) in data"  :key="item.index" >
                        <router-link to="#" class="contextTitle">
                            <i class="el-icon-star-off" style="color:red"></i><a>{{item.title}}</a>
                        </router-link>
                      <div class="context">
                          {{item.context}}
                      </div>
                  </li>
              </ul>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
const renderer = new marked.Renderer()
marked.setOptions({
    renderer:renderer, //渲染的方式
    gfm:true,  //启动类似github样式的makdown
    pedantic:false,//容错
    sanitize:false,//原始输入 忽略html标签
    tables:true,    //是否允许输出github表格 gfm 为true时
    breaks:false,  //是否支持换行符 gfm 为true时
    smartLists:true,    //自动渲染我们的列表样式
    highlight:function(code){ //代码高亮
      return hljs.highlightAuto(code).value    
    }
})

export default {
  name: "forum",
  data() {
    return {
        data:[
                {title:'50元加入小密圈 胖哥带你学一年',context:'50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。'},
                {title:'React实战视频教程-技术胖Blog开发(更新04集)',context:'50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。'},
                {title:'React服务端渲染框架Next.js入门(共12集)',context:'50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。'},
                {title:'React Hooks 免费视频教程(共11集)',context:'50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。 原来我博客只是录制免费视频，然后求30元的打赏。 每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。 直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。'},
            ]
    };
  },
  computed:{
    compiledMarkdown : function () {return marked (this.data)
  }
  },
  watch: {
  },
  created() {},
  mounted() {
  },
  destroyed() {
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.forum {
  margin-top:20px;
  color:#515253
}
.el-col {
    border-radius: 4px;
  }
.bg-purple-dark {
    background: #99a9bf;
  }
.bg-purple {
    background: #d3dce6;
  }
.bg-purple-light {
    background: #e5e9f2;
  }
.grid-content {
    background: rgb(207, 204, 204);
    border-radius: 4px;
    min-height: 36px;
}
.forum-col1{
    width:300px;
}
.forum-col2{
    width:900px;
    background: rgb(238, 234, 234);
    .forumlist{
        padding:10px 10px;
        background: rgb(238, 234, 234);
    }
    .context{
        background: rgb(238, 234, 234);
        margin-bottom:20px;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
        // word-break: break-all;
        // line-clamp: 3;
        display: -webkit-box;    
        -webkit-box-orient: vertical;    
        -webkit-line-clamp: 3;    
        overflow: hidden;
        margin-bottom: 1rem;
        padding-top:0.5rem;
    }
    .contextTitle{
        font-size: 1.5rem;
    }
}
</style>
