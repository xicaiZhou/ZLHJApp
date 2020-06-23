<template>
  <div v-wechat-title='title'>
      <div class="listItem" v-for="(item,index) in manualList" :key="index">
        <van-cell :title="item.name" is-link  @click="toDetail(item)"/>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      title:'',
      manualList:[
        {
          name:'操作手册1',
          url:''
        },
        {
          name:'操作手册2',
          url:''
        },
        {
          name:'操作手册3',
          url:''
        },
        {
          name:'操作手册4',
          url:''
        },
        {
          name:'操作手册5',
          url:''
        },
        {
          name:'操作手册6',
          url:''
        }
      ]
    }
  },
  created(){
    this.title = '操作手册列表'
  },
  mounted(){

  },
  methods:{
    onCancel() {
      this.show = false;
      Toast('cancel');
    },
    toDetail(data){
      // console.log(data)
      this.$router.push({path:'/pdf',query:{data:data}})
    },
    toPdf(){
      this.$router.push({path:'/pdf'})
    }
  }
}
</script>

<style scoped>

</style>
