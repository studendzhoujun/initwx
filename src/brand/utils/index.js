/*
 * @Author: zhouJun 
 * @Date: 2017-10-13 11:16:32 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2019-05-28 16:20:59
 */

const stream = weex.requireModule('stream')
const loading = weex.requireModule('LoadingModule')
const modal = weex.requireModule('modal')

function extend(source, options) {
    for (let i in options) {
        if (options.hasOwnProperty(i)){
            source[i] = options[i];
        }
    }
    return source;
}

export function http (options) {
    
    if(options.isLoading){
       loading.showLoading()        
    }
    if(options.method=='POST'){
        options.body = JSON.stringify(options.body)
        if (options.cors == 'Y') {
            options.withCredentials = true
            options.headers={"Content-Type":"application/x-www-form-urlencoded"}
            console.log('weex.config.env.platform==='+weex.config.env.platform)
            if(weex.config.env.platform == 'Web'){
                options.body='body='+JSON.stringify(options.data)
            } else {
                options.body=options.data
            }
        }
        // options.isPostBody = true
        //     var temp = ''
        //     for(var key in options.body){
        //         temp += key + '=' + options.body[key] + '&'
        // 　　}
        //     temp = temp.substring(0, temp.length-1)
        //     options.body = temp;
    }
    options=extend({
        method:'GET',
        url:'',
        // withCredentials: true,
        type:'json',
        // headers:{"Content-Type":"application/json"},
        // headers:{"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"},
        body:''
    },options)
    // modal.toast({
    //     message: JSON.stringify(options),
    //     duration: 10
    // })
    return new Promise(function(resolve, reject) {
        stream.fetch(options,function(res) {
            if(res.ok){
                if(options.isLoading){
                    loading.hideLoading()
                }
                resolve(res)     
            }else{         
                if(options.isLoading){
                    loading.hideLoading()
                }
                reject(res)
            }
        })
    })
}
export function isLive(){
    
    let url=''
    typeof window === 'object'?url=window.location.href:url=weex.config.bundleUrl

    if(url.match(/gome\.com\.cn|atguat\.com\.cn/)){
       return true
    }else{
       return false
    }
}
export function isUat(){
    let url=''
    typeof window === 'object'?url=window.location.href:url=weex.config.bundleUrl

    if(url.match(/gome\.com\.cn/)){
       return false
    }else{
       return true
    }
}
export function getParams(s,k){
    let reg = new RegExp(`[?|&]${k}=([^&]+)`)
    let res = s.match(reg)
    return res && res[1]
}