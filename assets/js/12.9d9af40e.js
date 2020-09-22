(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{193:function(t,a,s){t.exports=s.p+"assets/img/cfg_weixin.b288200e.jpg"},216:function(t,a,s){"use strict";s.r(a);var n=s(6),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"对接微信"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#对接微信"}},[t._v("#")]),t._v(" 对接微信")]),t._v(" "),n("p",[t._v("本章节从获取微信token，获取微信信息等几方面来说明系统如何和微信做对接。")]),t._v(" "),n("h2",{attrs:{id:"基础配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基础配置"}},[t._v("#")]),t._v(" 基础配置")]),t._v(" "),n("p",[t._v("目前系统针对微信对接在参数管理中提供了如下的参数配置，后期如果有需要可以自行添加")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("- 微信商户id:   \t        weixin.app.id\n- 微信密钥:     \t        weixin.app.secret\n- 微信获取token的地址:\t    weixin.access.token.url\n- 微信获取ticket的地址:   weixin.js.api.ticket.url\n- 微信token:\t            weixin.access.token\n- 微信ticket:\t        weixin.js.api.ticket\n")])])]),n("ul",[n("li",[t._v("上面参数中前四个需要事先配置好，具体参数代表的意思不再赘述，不明白的请自行查阅微信官方文档或者google。其中前四项需要根据自己的实际情况配置，后两项参数的值由定时任务定时调用微信接口去获取。")]),t._v(" "),n("li",[t._v("本系统提供了一个定时任务：UpdateWeixinTokenJob 来定时获取微信token和ticket，获取成功后会存放到参数表中。")]),t._v(" "),n("li",[t._v('另外建议微信相关配置参数的key值都以"weixin"开头，这样可以复用后台管理中参数管理的分组功能；如下图所示，微信相关配置都在公众号配置组下：\n'),n("img",{attrs:{src:s(193),alt:"参数分组功能"}})])]),t._v(" "),n("h3",{attrs:{id:"定时任务获取微信token和ticket"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#定时任务获取微信token和ticket"}},[t._v("#")]),t._v(" 定时任务获取微信token和ticket")]),t._v(" "),n("ul",[n("li",[t._v("微信token和ticket是针对微信相关操作的基础。大部分微信相关操作都需要用到这两个值。")]),t._v(" "),n("li",[t._v("系统默认提供了定时任务：UpdateWeixinTokenJob 来每隔一个小时获取一次上面两个值并存在参数配置表(t_sys_cfg)中")])]),t._v(" "),n("h2",{attrs:{id:"获取用户信息"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#获取用户信息"}},[t._v("#")]),t._v(" 获取用户信息")]),t._v(" "),n("p",[t._v("linjiashop-mobile项目提供了用户登录后获取微信用户基本信息（微信昵称、头像、openid）的功能\nsrc/view/user/user.js中当用户成功获取基本信息后，会紧接着获取微信相关信息。\n部分代码示例：")]),t._v(" "),n("div",{staticClass:"language-javascript extra-class"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    userApi"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getUserInfo")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("location"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("href\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'localhost'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" url"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'127.0.0.1'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'开发环境不获取openid'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" userAgent "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("navigator"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("userAgent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("toLowerCase")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//使用微信访问本系统的时候获取微信用户基本信息，否则不获取")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("userAgent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'micromessenger'")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("processOpenid")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$router"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("path"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'login'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("query"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("redirect"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'user'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ul",[n("li",[t._v("后台具体获取逻辑可以从上述代码进行调试跟进，继而查看和调整。")])]),t._v(" "),n("h2",{attrs:{id:"微信支付"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#微信支付"}},[t._v("#")]),t._v(" 微信支付")]),t._v(" "),n("p",[t._v("linjiashop-mobile集成了微信支付来支付订单金额。支持微信支付通过以下步骤实现。")]),t._v(" "),n("h3",{attrs:{id:"参数配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参数配置"}},[t._v("#")]),t._v(" 参数配置")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("配置微信支付相关参数：在配置文件linjiashop-mobile-api/src/main/resource/application-dev(prod).properties：")]),t._v(" "),n("div",{staticClass:"language-properties extra-class"},[n("pre",{pre:!0,attrs:{class:"language-properties"}},[n("code",[n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("wx.app-id")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("服务商的APPID")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("wx.app-secret")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("APPID对应的接口密码")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("wx.mch-id")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("商户号")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("wx.mch-key")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("API密钥")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 支付结果通知地址")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("wx.notify-url")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("http://linjiashop.microapp.store/prodp-api/pay/wx/notify")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#商户证书文件路径")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("wx.key-path")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("/data/linjiashop...")]),t._v("\n")])])])])]),t._v(" "),n("h3",{attrs:{id:"maven依赖"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#maven依赖"}},[t._v("#")]),t._v(" maven依赖")]),t._v(" "),n("ul",[n("li",[t._v("本系统使用了weixin-java-pay封装的微信的java sdk，因此需要在maven以来中加入改项目，另外小程序和h5用的同一个后台，因此同时也加入了小程序的java sdk：weixin-java-miniapp（小程序暂未对接）"),n("div",{staticClass:"language-xml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-xml"}},[n("code",[t._v(" "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("dependency")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("groupId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("com.github.binarywang"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("groupId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("artifactId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("weixin-java-pay"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("artifactId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("version")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("3.3.0"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("version")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("dependency")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("d3.ependency")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("groupId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("com.github.binarywang"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("groupId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("artifactId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("weixin-java-miniapp"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("artifactId")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("version")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("3."),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("version")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("dependency")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])]),t._v(" "),n("li",[t._v("后台的微信支付相关对接代码参阅：WeixinPayService")])]),t._v(" "),n("h3",{attrs:{id:"前端提交微信支付"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前端提交微信支付"}},[t._v("#")]),t._v(" 前端提交微信支付")]),t._v(" "),n("p",[t._v("前端支付相关代码：")]),t._v(" "),n("ul",[n("li",[t._v("提交支付：linjiashop-mobile/src/view/order/payment/index.vue")]),t._v(" "),n("li",[t._v("支付结果界面：linjiashop-mobile/src/view/order/payment/callback/index.vue")])]),t._v(" "),n("h3",{attrs:{id:"支付结果通知"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#支付结果通知"}},[t._v("#")]),t._v(" 支付结果通知")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("前端发起微信支付提交之后，微信会通过配置的通知地址将支付结果主动送过来，本项目默认的的微信通知地址应配置为：http://域名/prod-api/pay/wx/notify；可根据实际情况自行调整")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[t._v("    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n     * 微信支付回调\n     * @return\n     */")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@RequestMapping")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"wx/notify"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("method "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RequestMethod")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("POST"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("wxNotify")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v("  msg "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" weixinPayService"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("resultNotify")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Rets")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("success")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("msg"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])]),t._v(" "),n("h2",{attrs:{id:"微信模板消息（未开发）"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#微信模板消息（未开发）"}},[t._v("#")]),t._v(" 微信模板消息（未开发）")])])}),[],!1,null,null,null);a.default=e.exports}}]);