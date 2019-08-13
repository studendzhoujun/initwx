/*
 * @Author: zhouJun 
 * @Date: 2018-03-12 11:48:51 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2018-09-13 16:38:01
 */
<template>
    <div class="box">
       <text v-if="timerover" class="timer" :style="objstyle">距结束 {{count}}</text>
    </div>
</template>
<style scoped>
.timer{
  font-size:24px;
  color:#5B6066;
}
</style>
<script>
import CountDown from './countDown.js'
export default {
    data () {
      return {
        count:'',
        timerover:true
      }
    },
    props:{
        currentTime:{
            type:String,
            default:+new Date()
        },
        expiresTime:{
            type:String
        },
        format:{
            type:Object,
            default:{
              hours: '{hh}:',
              minutes: '{mm}:',
              seconds: '{ss}'
          }
        },
        timeEnd:{
            type:Function
        },
        objstyle:{
            type:Object,
            default:{
                color:'#5B6066'
            }
        }
    },
    created(){
       let self =this
       let count = new CountDown()
       let serverTime=Date.parse(this.$store.state.serverTime.replace(/-/g,'/'))
       count.init({
           currentTime:serverTime,
           interval:3000,
           obj:self,
           callback:function(){

           }
       })
       count.create('count',{
          targetId:'count',
          expires:self.expiresTime,
          format:self.format,
          formatIgnore:false,
          timeout:function(){
            self.$emit('timeEnd')
            self.timerover=false
          }
        })
    },
    computed:{
       
    },
    mounted(){
    },
    methods:{
    }
  }
</script>