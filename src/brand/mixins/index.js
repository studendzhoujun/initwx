/*
 * @Author: zhouJun 
 * @Date: 2018-03-19 18:46:01 
 * @Last Modified by: zhouJun
 * @Last Modified time: 2019-05-30 18:41:03
 */

const page = weex.requireModule('PageManagerModule')
const modal = weex.requireModule('modal')
import {http,isLive,getParams,isUat} from '../utils/index.js'
import store from '../stores/index.js'

export default {
    data(){
        return {
          defalutBg:require('../img/defaut_bg.png'),
          placeholderImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAAXNSR0IArs4c6QAADL1JREFUeAHtnHtsVuUdx+mN2paxdkgttIUOhGkQGdtYvYzLRlwdzOGSEf/AEWHMsLiLTpaQSMaIYZjddMRtiiLrAos6nDo1MDcXIpMaorjMMdGI65XepEi7Unvf59f1lPO+Pc/lvOe8b9vknOTJ8zy/+/M9z3lu57zvpEnRFSEQIRAhECEQIRAhECEQITAOEUhLNKbq6urr0tLSlg8ODn4OG3MpTyMvoJ6RqE23HvYaqd83e/bs3W66n3JLS0tRV1dXBTFVYG8uutNJhdTzNHZ6kW1FpgWZM6QjGRkZh0tLS9/U6ChZvgDGaVZtbe1tWPse5QVKqyEyaOxSQP67H5N1dXULBwYGdqGzijh9tVHj5x1i2TZr1qyD5IMauRiWtXOCvpygf0/AS2IsJLmSnp6+hUb93MYNsWUS5wPk3yKl2+j4lQHc45mZmV8rLi6us9G1CoJeuxRw30g1uMMNOG7TEIaDKTU1Nc8R5x3JAlfiwPZn+/r6qriRV9vEZQT4zJkzV2D0WdIUG4MhyjTTW+6k9x61sclYux+5G21kg8qARXF/f/9fmpubLzPZytQJYCiD3vsUeYFOTnjD49LfKD7BI/QaOrU8Ru3U+4Xv98LegK0OMW6m564xyWNTJq1K0jGGnlPEeZ44O3t7e7MpT8HGHNJi+Ougf8Zgr5Cb+lvkVg233VNcOwazUvgGWo96arqIOHiX6m1MRq+4yCkptra2fqSzs1PGw4/qHBLjwzwN3yXv0ck5PNq+DtlHADDHoXnl3Kg12P2TF09oyiECw+k42K5SdNGrkV02FuBKDBcuXNhApgUX/iHi22wLrtgtKys7gPwWKesuevxdOr4SYAbxTwNcqU5ZeASxiWBkzTpW1zctHG+zkBklwtr3N7SvfhQjlrBCVlixpIs1JcDcGeOEgfNj9IyXLppLbam+vl42N6b1eDUd4EQikdG+QdIzJl0mvOUqGSXAGF6qUnLRn3eVU16kE1zPU6adR2jHP4MEhn2jPj5kN+t5KQFGushTw0VkgD/mqo5Fca6F0/9YyOhE3tMxh3nKOJQAc+dk36692KPLfn0sr4+ZnNOO/5pkdHw6kY2+DFWelxJguv2lnhouIs7PuqpjUTSuz4mxK2BgNvrKOJQbDe68kucEzJbRahPBbvDKnp6eH6N3JUk7Zjq2yWVT8DMmqBdctJiiTYzIWG9YYowPV2z0dXEYQfRy6ofGEiaHndKL6JT40UN2vkwe6H8q0aNCn/6SIq4cIsLyxt29iuQX3CH30jNYAhmXi2HFmgw7SQc4KyurmsCttqdeDaQX6w7HvVTGFS3pAM+YMaOViUa2qTaTxbgCJ4xglAADiPHUHuCsJiwOQ/aRCjix+gQ9+gon4eNAkEYwhBgnMHxYxaiKw1JfGYdukmvDqXJ9JwExPsry5H0pmy4C7UbmHbccx4znAMlN8lXGphw3mnQuMQno+Ni30f9AZUPZgzFs3ETQQONaWeV4mB6odxGjdALtxXY6VytgYNJGG31lHEqA8WsEmOAXG+JLKpshqt7kAICMJ4I6G7TRqI8PZRw6gF/TORYePajCJJNMPmO6zVmIbG4Svmijjb4yDiXA3JXDFlGtll2ahVxSRGbOnFlDnPI2Q3kB0MLGxsYypYCZ8WWzyKSjKhklwMz6otShUhQ6wWewS3uIPFsnl2TefpN9YrzbJOPF5y31DdCv9uK5aG+B1QlXPaaoBJie0U36RYy0RwVwlxHI0/QS4+mbh3pgEuPwrzDSqzNEjHewYtmok4nnsUVfCG1fPD2+Dka/JCmXMkqAxVBubq588NEab9Sj/iUOc97iReFO3jIsokG65d+IOnL5IxVFAZk+BWuIzDlFAw0UkJUXNtKYrPYS3wsAvUbVGRjucon/GjrMbuRfRa9YafT/jFP03kqdjHGZRFCraYB8F5GhMxTH+xCdBnQ6yFUAybAi5xTaGOihG2mEtidhIxtQjmPP9DiPhElcctR6nnSBJLHIdx+XYUvb6ZBxrh4m2fKSkpJ/OASvXNs4R4Hgb8fxw049hXkvh/ofl15q8knPnEuML5LmmGRD4Pdw49dz458w2bK6W7zY3IPBrw7fdZPN0Pj422kDrjiksaezs7OvRUd6ctIu7J/jplfYgCtBWAEsghh8BpAXUXyMJNveZF+H8LnTj5OioqIWdK5DZxNAKBf/fmy6ZKXN9wPuPG76ERddW7QaIuItyCTB0mc9j+NyePJm1/huLN6Gpt7EjdwBUA9pZIwsYrqElcCN5HKe/EVSGWVf7ZXeis4R8sPkz/F2pdHoOE7Al8M43aGqBM34l08QAnIB4FitIOJtYUeWOmeZNE5jS7nsidezrWM+gy8wL+3u7p5OjDKheV68BuvhtK+VTUwrcXzoKRQRIwQiBCIEIgQiBCIEIgSSjoBymSYfjHDgcT8RrCS5jyPl5KoqJydnS2FhYVPQCNmGr8fGd0jxv3dohrY1yOexDQ0Ni1l2yVeicmY9n5TPck0+A8hhCaZsO3ybqx2hp1iv34sp1XnLJOWaFXD3EMytCk9z+LJcDmrKMZ7wro718y34qVT4KMX2nwFpAb/1eFshM4pMTNnYvQvGRjZD80YJDBOQU7H80BfQEeWbD+WOU7lVJoCvGDwtwrgcZyZ00XPlByd7dMrEkMGb61U6GTePeJYD7pvo7SIpwXXrBC3ThtU6G0qAUZqqUxQexuUg+2aTXDyfxmdBe5xk9IGs6fcXQ+Y5Vv0CN0O2tCkB1mkTT9lpp+yV6wD2kh9Fo0GPcVA9axRDQ6D3Sg9bohHxxeImX0VDn0XJ5hsGX7YNwm+zrd6mk1GOwTolNw+gChjr5Ce2K2ikcrB3dHiMV9Hzv4+8QwqcY++nGFGeL7gdEOMr1F8inSaGTk7HOil3UfYVEOcZ7cwNJ7GnfV0VGGAJntiup1fuoHiP1FUXPW0mYFQiH3QGH3GBzWXYlBMz09UCKGuZ9V82CYbJDzxEOMFwJ7cCsizpPC9ATQeIA+RBvwaKsY+9TTEE70ov4K5MNbgSSmgAC4Ck/U1NTYVebaSnyVi1wosXkPZ5kz43fy/g/ssklwx+aAAPB1fEeevvADpmCJDHGP4Pw24Ab4Dn46vEZJdxttIkkyx+2AAPfU4FoD9wApYfCwKCDA1+3ko76tqcZdkntQIw6b1dTEavm+SSxQ8d4OFAd7JaKJcyIOyz6WWJNBDwtJ/Xik18n0JOO9Mn4ttWJxDABO750RuNkt9WPM6kt53yTV7BoNtPCvoG2OZd4Ade/lNFCwQwQd4OSGcVwcpLxh8peNKz7gsKMKsSYw/G/5gCHGgdzOTRRE/dTCP+oAJSQX+DU7IdDCNyWpfwxQ3K5UaZ9Feyjf63SciS385y70le2z+A7wEbnUAAiwOAOshQIJPYOhuHyMhHhV8n9TIZGtGxtKkTk/MO45mHzoCbx1NTTtyyY93tpqvKQYeIIbtTp079NoDVq5y46fSAe7gpJ920iVamM1kfcIUCcEFBgYxzGwBZ2yPhv8zjFWhYGA83g3bU2cYRCsDijF75V7KtOO/3cg79JCdPMjS4x66YDYmX3nijEf97kydP3m4bV+Ax2O0IkH/CxmIvNDmTHQGPibCdraqsRz3Bd9vwU+ZRNdrD51GGpV1+7Kpkacd52nECm9Zf/IQKsATGp0+ybFMt3eJj1w4p8cLxdYBrY9KJJ8fUuQmdDEuHYogprIQ2RKQwZrerNndFUc5X0FNCntAA0zuNAPM4F6cESYWTCQ0wG51aRbtGyNyEUuYF44nbiELIhQkNMOC9Ch7Gzwb4NqIiZNyszU1ogJm85C8SqkytZZjYys0IfUI3+RX+hAZ4qAHp6c+bGgq4l7Odlw9pUt7elDuMA2NkrRxHt66y6JefGshnVqZrAyAf4xzh5ra2NqtvLUwGbfhj8tjYBGYrww9fOjktuxf5By10ylk3P93R0TGIzvvIdzJ8yO/kZKjRL6hHG29H948MU/L/lsr1/FgDrAxsdHvUFHaQv6ZnXsMQcKta6iIHOXlypkuifJHhs4TuSvwKhsqTtUBDBA4Sj86+MUYf0oPYwm4gf9LebGiSa3WWlAAT7Ls6RfhtbIvP6WRMPO6P1ofo28iIHPH00ZNvIV9LahBaiq4mnR8dwHcTqIxNXpe8RLwTvrF3eSk7NH6Z+Sg2XnfqHvkRQPPVK5E/SG+eg92bSPuxWUMeKE6PuBySgLvdqXjl2lmciWAGBypL6EWTHWWC7eNH0Cf4HVmtQwuSYzuLV0fXksd/sNIIUFX48zv5jAqHj2Hy2GzMw0c+J2J52MwZJeSTgI2OvLy8qmnTpsmH2NEVIRAhECEQIRAhECEQIRAhMLEQ+B+suuTSqWLGCAAAAABJRU5ErkJggg==',
          imgtime: 1,
        }
    },
    methods: {
        productdetails(){
            const url=this.item.scheme
            // const url =`http://item.m.gome.com.cn/product-${item.pid}-${item.sid}.html`
            page.jump(url)
        },
        getPicH(url, ispadding) {
            if (!url) {
                return false
            }
            var a = url.substring(url.indexOf('_'), url.lastIndexOf('.')).split('_'), temp = []
            a.map((item,idx)=>{
                if (parseInt(item)>0) {
                    temp.push(parseInt(item))
                }
            })

            var _width = (!!ispadding ? 722 : 750)

            return {
                width: _width + 'px',
                // width: (temp[0] || 750) + 'px',
                height: ((_width/temp[temp.length-2])*(temp[temp.length-1] || 200)) + 'px'
            }
        },
        // 针对优惠券的宽高
        imgWH(url, column, onlyH, isPadding) {
            if (!url) {
                return false
            }
            var a = url.substring(url.indexOf('_'), url.lastIndexOf('.')).split('_'), temp = []
            a.map((item,idx)=>{
                if (parseInt(item)>0) {
                    temp.push(parseInt(item))
                }
            })

            if (temp.length>=2) {
                var _w = (isPadding ? 750-20 : 750)/column,
                    _h = 250, 
                    _truthH = (_w/temp[temp.length-2])*(temp[temp.length-1] || 200)

                if (column==1) {
                    // 750*78   750*160   750*224   750*265    750*440
                    _h = _truthH >= 440 ? 440 : _truthH >= 265 ? 265 : _truthH >= 224 ? 224 : _truthH >= 160 ? 160 : 78
                } else if (column==2) {
                    // 750*160   750*200   750*390
                    _h = _truthH >= 390 ? 390 : _truthH >= 200 ? 200 : 160
                } else {
                    // 750*200   750*250   750*300   750*390
                    _h = _truthH >= 390 ? 390 : _truthH >= 300 ? 300 : _truthH >= 250 ? 250 : 200
                }

                return {
                    width: (!onlyH ? _w : 750) + 'px',
                    height: _h + 'px'
                }
            } else {
                return {
                    width: (!onlyH ? 250 : 750) + 'px',
                    height: 250 + 'px'
                }
            }
        },
        // 滑块风控
        showDx(par,tpl,row,column,reqId){
            let _this=this
            let appId = '9aadbe40d1283be5e561f4f35f1edee9';  
            // let apiServer = '//captcha.gome.com.cn';  
            // let constIDServer = '//security.gome.com.cn/udid/c1';
            // let constID_js = '//js.gomein.net.cn/security/js/dx-slider/const-id.js';  
            // let ua_js = '//js.gomein.net.cn/security/js/dx-slider/greenseer.js';
            let apiServer = 'http://10.58.166.118:9091';
            let constIDServer = 'http://10.58.218.72:80/udid/c1' ;
  	        let constID_js = 'http://10.58.166.118:7776/dx-captcha/libs/const-id.js'  ;
   	        let ua_js = 'http://10.58.166.118:7776/dx-captcha/libs/greenseer.js';
            let myCaptcha  = _dx.Captcha(document.getElementById('captcha'), {
                appId: appId, 
                apiServer: apiServer, 
                constIDServer: constIDServer, 
                constID_js: constID_js, 
                ua_js: ua_js, 
                style: 'popup',
                isSaaS:false, 
                width: 300,  
                customLanguage: {
                    pass_by_server: '无感验证成功',
                },
                success:function(token){
                    console.log(token)
                    setTimeout(function () {
                        myCaptcha.hide()
                    }, 1500)
                    setTimeout(function () {
                        _this.onStartReceive(par, tpl, row, column, reqId,token)
                    }, 1700)
                    console.log('==successDX==')
                }
            })
            myCaptcha.show()
            return
        },
        // 点击领取按钮
        onStartReceive(par, tpl, row, column, reqId,token) {
            if (!par) return
            
            var _this = this
            var HTTP=isUat()?'http':'https'

            // _this.codeUrl = ''
            // _this.couponParam = par
            // _this.show = true
            // _this.testShow = true
            // return;
            
            http({
                url:`${HTTP}://prom.mobile.${isUat()?'atguat':'gome'}.com.cn/wap/promotion/takeUpAllCoupon.jsp`,
                // type:isLive()?'json':'jsonp',
                type: weex.config.env.platform=='Web' ? 'jsonp' : 'json',
                // type: 'jsonp',
                // body: `body=${JSON.stringify({couponParam: encodeURIComponent(par), authCode: code})}`,
                body: weex.config.env.platform=='Web' ?
                    `body=${JSON.stringify({couponParam: encodeURIComponent(par), reqId: reqId,token:token})}` : 
                    {couponParam: encodeURIComponent(par), reqId: reqId,token:token},
                // headers: weex.config.env.platform=='Web' ? {} : {'Content-Type':'application/json'},
                method:weex.config.env.platform=='Web' ? 'GET' : 'POST',
            }).then((data)=>{
                var data1=''
                // 接口返回数据类型在web和客户端不一样需处理
                if(typeof data.data =='string'){
                    data1=JSON.parse(data.data)
                }else{
                    data1=data.data
                }

                if (data1.isLogin=='N') { // "Y"=登录，“N”=未登录
                    // if (!!$g && $g.login) {
                    //     $g.login()
                    // } else {
                    //     weex.requireModule('PageManagerModule').jump(`${HTTP}://login.m.${isUat()?'atguat':'gome'}.com.cn/login.html`)
                    // }
                    weex.requireModule('PageManagerModule').jump(`${HTTP}://login.m.${isUat()?'atguat':'gome'}.com.cn/login.html`)
                    return
                }

                // 0、领取成功 1、已领取 2、领取失败 3、已领光 4、图形验证码（静态页面使用） 5、活动结束 6-滑块
                // fetchState 0 未开始 1 开始去领 2 已结束 3 已领光 4 去使用
                if (data1.isReceive && data1.isReceive==4 && data1.captchaImgUrl) {
                    _this.codeUrl = data1.captchaImgUrl + '&t=' + (++_this.imgtime)
                    _this.couponParam = par
                    _this.show = true
                    _this.testShow = true
                    _this.tpl = tpl
                    _this.row = row
                    _this.column = column
                } else if (data1.isReceive && data1.isReceive==6 ) {

                    let reqId=data1.reqId
                    _this.showDx(par,tpl,row,column,reqId)

                } else if (data1.isReceive && data1.isReceive==0) {
                    this.show = false
                    modal.toast({
                        message: data1.msgContent
                    })
                    // refresh slower...
                    // store.dispatch('initIndex')
                    _this.codeUrl = ''
                } else {
                    // store.dispatch('updateCoupon')
                    modal.toast({
                        message: data1.msgContent || data1.failReason
                    })
                }

                // again
                if (data1.isAgain && data1.isAgain=='N') {

                    var temp = (data1.isReceive=='0' || data1.isReceive=='1') ? '4' : data1.isReceive=='3' ? '3' : data1.isReceive=='5' ? '2' : null
                    if (!!tpl && temp) {
                        if (tpl=='tagCouponTemplet') {
                            _this.moreCouponList[row][column].fetchState = temp
                        } else {
                            _this.data[tpl].couponList[row].fetchState = temp
                        }
                    }
                }

            }).catch((err)=>{
                modal.toast({
                    message: '发生异常：' + JSON.stringify(err)
                })
            })
        },
        // 弹层验证码输入领取
        receiveCoupon(couponid, code) {
            this.onStartReceive(couponid, code)
        },
        // 劵的状态图
        couponState(state) {
            // fetchState 0 未开始 1 开始去领 2 已结束 3 已领光 4 去使用
            var imgurl = ''
            if (state==0) {
                imgurl = 'coupon0.png'
            } else if (state==2) {
                imgurl = 'coupon4.png'
            } else if (state==3) {
                imgurl = 'coupon3.png'
            } else if (state==4) {
                imgurl = 'coupon2.png' //  coupon1 已领取
            }
            return imgurl ? require('../img/' + imgurl) : '' // '/img/' + imgurl : '' //require('../img/coupon1.png')
        },
        // 状态点击
        couponStateUse (couponListData) {
            
            if (couponListData.fetchState==4) {
                var HTTP=isUat()?'http':'https'
                var url = ""
                if (couponListData.couponType == '0' || couponListData.couponType == '1') {
                    // 红蓝券
                    if (couponListData.promsUrl) {
                        url = couponListData.promsUrl
                    } else {
                        var coupondesc = `coupondesc=${encodeURIComponent(couponListData.couponComments)}`
                        if (weex.config.env.platform=='Web') {
                            url = `${HTTP}://m.${isUat()?'atguat':'gome'}.com.cn/category.html?couponId=${couponListData.blueRule}&${coupondesc}`
                        } else {
                            url = `${HTTP}://m.${isUat()?'atguat':'gome'}.com.cn/coupons_center_list-${couponListData.blueRule}-0-1.html?${coupondesc}`
                        }
                    }
                } else if (couponListData.couponType == '3') {
                    // 店铺券
                    if (couponListData.merchantId) {
                        url = `${HTTP}://m.${isUat()?'atguat':'gome'}.com.cn/shop-${couponListData.merchantId}.html`
                    } else if (couponListData.promsUrl) {
                        url = couponListData.promsUrl
                    }
                } else if (couponListData.promsUrl) {
                    url = couponListData.promsUrl
                }
                if (!!url)
                    weex.requireModule('PageManagerModule').jump(url)
            }
        },
    }
}