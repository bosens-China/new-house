export default `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Expires" content="0" />
    <title>摇号明细 -- 合肥市房产市场信息平台</title>

    <link href="/spf/Content/css/css.css" rel="stylesheet" type="text/css" />
    <script src="/spf/Content/js/method.js"></script>
    <script type="text/javascript" src="/spf/Content/js/jquery-3.5.0.min.js?v=1.2"></script>
    <script type="text/javascript" src="/spf/Content/js/jquery.iDialog.js?v=1.2" dialog-theme="default"></script>
    <script type="text/javascript" src="/spf/Content/js/Jquery.Query.js?v=1.2"></script>
    <script type="text/javascript" src="/spf/Content/js/search.js?v=1.2"></script>
    <style>
        /*top*/
        .site-nav-bd {
            width: 998px;
            margin: 0 auto 2px;
            height: 30px;
            border-color: #d5d5d5;
            border-style: solid;
            border-width: 0px 1px 1px 1px;
            background: #f5f5f5;
        }

            .site-nav-bd ul {
                float: right;
            }

                .site-nav-bd ul li {
                    float: left;
                    line-height: 30px;
                    height: 30px;
                    padding-right: 20px;
                }

                    .site-nav-bd ul li a {
                        font-size: 13px;
                        color: #444;
                        font-family: 微软雅黑;
                    }

                .site-nav-bd ul .site-nav-on {
                    display: block;
                }
    </style>





</head>
<body>

    <!--top-->
    <div class="site-nav-bd">
        <ul>


                <li><a href="https://sso.ahzwfw.gov.cn/uccp-user/resources/register/register?appCode=d98074c883b04ade9a115ce5c1707e5f&source=&callback=https://www.hfzfzlw.com/spf/homefund&serviceUrl=">注册</a></li>
                <li><a href="https://sso.ahzwfw.gov.cn/uccp-server/login?appCode=d98074c883b04ade9a115ce5c1707e5f&service=https://www.hfzfzlw.com/spf/homefund">登录</a></li>
        </ul>
    </div>
    <!--top 开始-->
    <div class="top">
        <div class="nav_top">
            <div class="logo" title="合肥市住房保障和房产管理局"></div>
            <div class="so_suo" style="display: none">
                <input type="text" name="word" class="search-ipt" placeholder="请输入关键字"><button type="submit" class="search-btn"></button>
            </div>
        </div>
        <div class="nav_dh" id="menu">
            <ul>
                <li><a href="/spf/Scheme" title="摇号公示">摇号公示</a></li>
                <li><a href="/spf/index" title="商品房备案">商品房备案</a></li>
                <li><a href="/spf/Permit" title="入网楼幢">入网楼幢</a></li>
                <li><a href="/spf/Bank" title="监管楼幢">监管楼幢</a></li>
                <li><a href="/spf/Project" title="入网项目">入网项目</a></li>
                <li><a href="/spf/Company/3" title="入网开发企业">开发企业</a></li>
                <li><a href="/spf/Company/4" title="入网经纪机构">经纪机构</a></li>
                <li id="ws_fw"><a href="/spf/WebService/ys_jg" title="网上服务">网上服务</a></li>
                <li><a href="/spf/Contract" title="商品房合同查询">商品房合同查询</a></li>
                <li><a href="/spf/Homefund" title="维修资金">维修资金查询</a></li>
                <li><a href="/spf/PreSaleSupervise" title="房屋交易资金监管">资金监管</a></li>
            </ul>
        </div>
    </div>

    <!--top 结束-->





<div class="content mt20">
    <div class="content_nav1">
        <div class="dh">
            <p>
                我的位置：<a href="#">摇号公示</a>&nbsp;&gt;&nbsp;<a href="#">
璟庭里
                </a>
            </p>
        </div>
        <div class="nav_2_dh" style="margin-top:10px"><h3>基本信息</h3></div>
        <div class="info">
            <dl class="lbox">
                        <dd><strong>开发公司：</strong>合肥鸣科房地产有限责任公司</dd>
                        <dd><strong>所在区域：</strong>滨湖区 </dd>
                        <dd><strong>供应住房总数：</strong>60套</dd>
                        <dd><strong>刚需供应数：</strong>18套</dd>
                        <dd><strong>项目名称：</strong>璟庭里 </dd>
                        <dd><strong>联系电话：</strong>0551-65251111 15155178827 </dd>
                        <dd><strong>售楼部地址：</strong>合肥市滨湖新区贵州路与杭州路交口向西100米远大璟庭里城市会客厅</dd>



            </dl>


                    <dl class="lbox" style="text-align: center;">
                        <img src="/spf/Content/images/float_bottom.jpg" style="width: 150px;" />
                        <br />
                        <lable>微信扫一扫开始登记</lable>
                    </dl>

        </div>


        <div class="nav_2">
            <div class="nav_2_dh"><h3>楼幢汇总</h3></div>
            <div class="nav_2_2">
                <table id="ContentPlaceHolder1_dlBuildingList" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>

<tr>                                <td>
                                    <div class="beihui mgb11" style="height:80px;" title="详细信息点击进入">
                                                <a href="/spf/details/PSVDMr9ACoW4xu7vUyP2yLpcnn-z4sv_sBDiKYZEuxmDOhPkAQZ332XB33kYe9HEjTeR3E5F37v7DjHjzayzeYru8Q1h5QnX-c43WafZgB4lhj1bzRFcHtfyooYKQaKsz8mkn7CD-IM6ySj7EnuY94Y6cpqU_FsHKIVHWcutR80=" target="_blank">
                                                    <ul>
                                                        <li><span>预售许可证号：20230184,楼幢：6幢</span></li>
                                                    </ul>
                                                </a>


                                    </div>
                                </td>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


    <!--底部-->
    <div class="bottom">
        <div class="bottom_1">
            <div class="bottom_1_1"></div>
            <div class="bottom_1_2">
                <p>主办单位：合肥市房地产信息管理中心 技术支持：安徽三实软件科技有限公司</p>
                <p>网络经营许可证 皖ICP备2020019676号   <img src="data:image/png;base64,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" alt="logo" style="height:17px; padding-right:5px;"/>皖公网安备 34010302001992号</p>
                <p>
                    <script>
                        var _hmt = _hmt || [];
                        (function () {
                            var hm = document.createElement("script");
                            hm.src = "//hm.baidu.com/hm.js?9420486f163c1359cfa75ea597f464e4";
                            var s = document.getElementsByTagName("script")[0];
                            s.parentNode.insertBefore(hm, s);
                        })();
                    </script>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
<script type="text/javascript">
    //获取div下面所有的a标签（返回节点对象）
    var myNav = document.getElementById("menu").getElementsByTagName("a");
    var myLi = document.getElementById("menu").getElementsByTagName("li");
    //获取当前窗口的url
    var myURL = document.location.href;
    //循环div下面所有的链接，
    for (var i = 1; i < myNav.length; i++) {
        //获取每一个a标签的herf属性
        var links = myNav[i].getAttribute("href");
        var myURL = document.location.href;
        //查看div下的链接是否包含当前窗口，如果存在，则给其添加样式
        if (myURL.indexOf(links) != -1) {
            //myNav[i].className = "nav_selected";
            myLi[i].className = "nav_selected";
            // myNav[0].className="";
        }
    }

    var secondRoot = "/spf";
</script>
`;
