/*
 * @Author: yhw.yinhongwei 
 * @Date: 2019-04-04 18:51:10 
 * @Last Modified by: yhw.yinhongwei
 * @Last Modified time: 2019-04-18 17:05:09
 */
<template>
  <!--弹层-->
  <div class="layer" @click="overlayStop">
      <div class="layer-content" :style="maskStyle">
          <div class="layer-title">
              <text class="fnt36">请输入验证码</text>
          </div>
          <div class="layer-ctn layout1">
              <input id maxlength="4" @input="codeChange" @blur="codeChange" autofocus="true" class="input" />
              <image class="btn-code" :src="codeUrl" @click="updateCodeUrl"></image>
          </div>
          <div class="layer-bottom">
              <div class="layer-cancel" @click="onClose"><text class="btn-text">取消</text></div>
              <div class="layer-ok" @click="onSubmit"><text class="btn-text" style="color:#ffffff">确定</text></div>
          </div>
      </div>
  </div>
</template>
<style scoped>
.layout1 {
    flex-direction: row;
    align-items: center;
    background-color: transparent;
}
.layer {
    width: 750px;
    background-color: rgba(0,0,0,.5);
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 9999;
}
.layer-content {
    background-color: #ffffff;
    border-radius: 15px;
    width: 500px;
    height: 300px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 300px;
    left: 125px;
}
.layer-title {
    margin-top: 20px;
}
.fnt36 {
    font-size: 36px;
}
.input {
    background-color: #ffffff;
    padding-left: 10px;
    border-width: 1px;
    height: 80px;
    font-size: 30px;
    border-radius: 10px;
    width: 300px;
    margin-top: 20px;
    margin-right: 20px;
    outline: none;
}
.btn-code {
    width: 130px;
    height: 80px;
}
.layer-ctn {
    margin-top: 27px;
}
.layer-bottom {
    flex-direction: row;
    align-items: flex-start;
    justify-content:space-between;
    height: 86px;
    border-top-color: #d2d2d2;
    border-top-width: 1px;
    margin-top: 25px;
}
.layer-ok, .layer-cancel {
    width: 250px;
    height: 85px;
    align-items: center;
    justify-content: center;
}
.layer-ok {
    background-color: #F20C59;
    border-bottom-right-radius: 15px;
}
.layer-cancel {
    background-color: #ffffff;
    border-right-color: #d2d2d2;
    border-right-width: 1px;
    border-bottom-left-radius: 15px;
}

.btn-text {
    text-overflow: ellipsis;
    font-size: 26px;
    color: #333333;
}
</style>
<script>
  import {http,isLive,getParams,isUat} from '../utils/index.js'
  const modal = weex.requireModule('modal')

  export default {
    props: {
        codeUrl: {
            type:String,
            default: ''
        },
        couponParam: {
            type:String,
            default: ''
        },
        tpl: {
            type:String,
            default: ''
        },
        row: {
            type:Number,
            default: 0
        },
        column: {
            type:Number,
            default: 0
        }
    },
    data() {
      return {
        txt: '',
        time: 1, 
      }
    },
    created() {
    },
    computed:{
    },
    methods: {
        // 关闭浮层
        onClose() {
            this.$parent.closeLayer()
        },
        // 防止透点
        overlayStop(e) {
            e.preventDefault()
            return false;
        },
        updateCodeUrl(e) {
            this.codeUrl = this.codeUrl + '&t=' + (++this.time)
        },
        // 验证码
        codeChange(e) {
            this.txt = e.value
        },
        onSubmit() {
            if (this.txt=='') {
                modal.toast({
                    message: '请输入验证码'
                })
                return
            }
            this.$parent.onStartReceive(this.couponParam, this.tpl, this.row, this.column, this.txt)
        }
    }
  }
</script>