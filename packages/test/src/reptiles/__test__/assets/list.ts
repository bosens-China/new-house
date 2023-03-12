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
    <title>摇号公示 -- 合肥市房产市场信息平台</title>

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



<style>
    .content_a {
        position: fixed;
        right: 0;
        bottom: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc((100% - 1000px) / 2);
    }

    .content_aa {
        position: fixed;
        left: 0;
        bottom: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc((100% - 1000px) / 2);
    }

    .content_b {
        margin-top: 15px;
        color: #4371c6;
        font-size: 16px;
        font-weight: bold;
    }

    .image_image {
        width: 120px;
        padding: 10px;
        border: 2px solid #4371c6;
        border-radius: 30px;
    }

    .floadAd {
        position: absolute;
        z-index: 999900;
        display: none;
    }

        .floadAd .item {
            display: block;
        }

            .floadAd .item img {
                vertical-align: bottom;
            }
    /* a img 的组合浏览器默认下边会有几个像素的空白，这里可以消除空白*/
</style>
<link href="/spf/Content/css/Wave.css" rel="stylesheet" />
<script src="/spf/Scripts/Wave.js?v=1.1"></script>
<!--浮动-->
<div id="floadAD" class="floadAd">
    <a class="close" href="javascript:void();" style="color: red">×关闭</a>
    <a class="item" href="/spf/Notes/fxts.html" title="商品房交易风险提示" target="_blank">
        <img src="/spf/Content/images/lQDPDhtJkK7cxI_Mj80B9LDdwVdjIIYENwJJM86EADwA_500_143.jpg" style="width:300px" />
    </a>
</div>

<div id="floadAD1" class="floadAd">
    <a class="close" href="javascript:void();" style="color: red">×关闭</a>
    <a class="item" href="/spf/Scheme/Talent/List" title="人才登记公示" target="_blank">
        <img src="/spf/Content/images/lQDPDhtJkK7cxI_Mj80B9LDdwVdjIIYENwJJM86EADwA_500_143.jpg" style="width:300px" />
    </a>
</div>
<div class="content mt20">
    <div class="content_nav1">
        <div class="dh">
            <p>我的位置：摇号公示 >></p>
        </div>
        <div class="nav_1">
            <form method="post">
                <div class="nav_right" style="width:998px;">
                    <div class="right_dh" style="padding-left: 1%">
                        <p>
                            项目名称：
                            <input type="text" name="xmmc" title="备案名/推广名" style="width: 150px; height: 28px" />
                        </p>
                        <p>
                            区域：
                            <select id="Select1" style="width: 150px; height: 28px" name="qy">
                                <option selected="selected" value="">-请选择-</option>
                                <option>蜀山区</option>
                                <option>庐阳区</option>
                                <option>包河区</option>
                                <option>瑶海区</option>
                                <option>高新区</option>
                                <option>经济区</option>
                                <option>新站区</option>
                                <option>政务区</option>
                                <option>滨湖区</option>
                            </select>
                        </p>
                        <p>
                            登记状态：
                            <select id="Select2" style="width: 150px; height: 28px" name="djzt">
                                <option selected="selected" value="">-请选择-</option>
                                <option>正在登记</option>
                                <option>暂未开始</option>
                                <option>登记结束</option>
                            </select>

                        </p>
                        <button type="submit" class="btn_search">查询</button>
                    </div>
                    <div class="right_table">
                        <table border="0" cellpadding="1" cellspacing="0" rules="all" width="100%" align="center" class="tab_con01">
                            <tbody>
                                <tr class="table_bg">
                                    <th style="width: 15%">项目名称</th>
                                    <th style="width: 10%">楼幢</th>
                                    <th style="width: 20%">企业名称</th>
                                    <th style="width: 8%">区域</th>
                                    <th style="width: 15%">登记起止时间</th>
                                    <th style="width: 10%">供应总套数</th>
                                    <th style="width: 10%">登记状态</th>
                                </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303016</span>
                                                            <a href="/spf/detail/viewscheme/809" style="color: blue;" target="_blank">璟庭里</a>

                                                </td>
                                                <td style="text-align: left">
6幢
                                                </td>
                                                <td style="text-align: left">
合肥鸣科房地产有限责任公司
                                                </td>
                                                <td>
滨湖区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/11 16:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/15 16:00:00</div>
                                                </td>
                                                <td>60</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/809" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303013</span>
                                                            <a href="/spf/detail/viewscheme/806" style="color: blue;" target="_blank">玫瑰绅城花园</a>

                                                </td>
                                                <td style="text-align: left">
北区6幢
                                                </td>
                                                <td style="text-align: left">
上海城开集团合肥置业有限公司
                                                </td>
                                                <td>
包河区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/11 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/14 15:00:00</div>
                                                </td>
                                                <td>148</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/806" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303015</span>
                                                            <a href="/spf/detail/viewscheme/808" style="color: blue;" target="_blank">滨奥花园</a>

                                                </td>
                                                <td style="text-align: left">
G17幢,G23幢,XG2幢
                                                </td>
                                                <td style="text-align: left">
合肥招盛房地产开发有限公司
                                                </td>
                                                <td>
新站区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/10 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 15:00:00</div>
                                                </td>
                                                <td>166</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/808" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303007</span>
                                                            <a href="/spf/detail/viewscheme/800" style="color: blue;" target="_blank">璟园</a>

                                                </td>
                                                <td style="text-align: left">
1-G10幢
                                                </td>
                                                <td style="text-align: left">
合肥启盛房地产开发有限公司
                                                </td>
                                                <td>
经济区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/9 17:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 17:00:00</div>
                                                </td>
                                                <td>64</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/800" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303010</span>
                                                            <a href="/spf/detail/viewscheme/803" style="color: blue;" target="_blank">九璟湾</a>

                                                </td>
                                                <td style="text-align: left">
Y6幢,Y8幢,Y3幢,G15幢
                                                </td>
                                                <td style="text-align: left">
合肥鸣东房地产有限责任公司
                                                </td>
                                                <td>
瑶海区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/9 16:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 16:00:00</div>
                                                </td>
                                                <td>117</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/803" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303009</span>
                                                            <a href="/spf/detail/viewscheme/802" style="color: blue;" target="_blank">都汇时代中心</a>

                                                </td>
                                                <td style="text-align: left">
15幢
                                                </td>
                                                <td style="text-align: left">
安徽新华房地产有限公司
                                                </td>
                                                <td>
蜀山区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/9 16:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 16:00:00</div>
                                                </td>
                                                <td>60</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/802" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303012</span>
                                                            <a href="/spf/detail/viewscheme/805" style="color: blue;" target="_blank">时代星河小区</a>

                                                </td>
                                                <td style="text-align: left">
南区6幢,南区25幢
                                                </td>
                                                <td style="text-align: left">
安徽省高信房地产开发有限公司
                                                </td>
                                                <td>
高新区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/9 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 15:00:00</div>
                                                </td>
                                                <td>144</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/805" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303011</span>
                                                            <a href="/spf/detail/viewscheme/804" style="color: blue;" target="_blank">时代星河小区</a>

                                                </td>
                                                <td style="text-align: left">
南区18幢,北区7幢
                                                </td>
                                                <td style="text-align: left">
安徽省高信房地产开发有限公司
                                                </td>
                                                <td>
高新区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/9 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 15:00:00</div>
                                                </td>
                                                <td>50</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/804" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303008</span>
                                                            <a href="/spf/detail/viewscheme/801" style="color: blue;" target="_blank">星耀学苑</a>

                                                </td>
                                                <td style="text-align: left">
9幢,13幢
                                                </td>
                                                <td style="text-align: left">
安徽新华学府置业有限公司
                                                </td>
                                                <td>
蜀山区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/8 16:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 16:00:00</div>
                                                </td>
                                                <td>124</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/801" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2302029</span>
                                                            <a href="/spf/detail/viewscheme/789" style="color: blue;" target="_blank">璟和院</a>

                                                </td>
                                                <td style="text-align: left">
1幢,7幢,5幢
                                                </td>
                                                <td style="text-align: left">
中铁四局集团房地产开发有限公司
                                                </td>
                                                <td>
滨湖区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/8 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/13 15:00:00</div>
                                                </td>
                                                <td>76</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/789" target="_blank">
                                                                <div style="background-color: green; color: white;">正在登记</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2302018</span>
                                                            <a href="/spf/detail/viewscheme/778" style="color: blue;" target="_blank">登科花园</a>

                                                </td>
                                                <td style="text-align: left">
9幢
                                                </td>
                                                <td style="text-align: left">
合肥超创置业有限公司
                                                </td>
                                                <td>
新站区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/7 17:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/10 17:00:00</div>
                                                </td>
                                                <td>40</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/778" target="_blank">
                                                                <div style="background-color: orangered; color: white;">登记结束</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303005</span>
                                                            <a href="/spf/detail/viewscheme/798" style="color: blue;" target="_blank">朗拾里</a>

                                                </td>
                                                <td style="text-align: left">
G2幢
                                                </td>
                                                <td style="text-align: left">
合肥科辰地产有限公司
                                                </td>
                                                <td>
包河区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/6 16:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/9 16:00:00</div>
                                                </td>
                                                <td>88</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/798" target="_blank">
                                                                <div style="background-color: orangered; color: white;">登记结束</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2302033</span>
                                                            <a href="/spf/detail/viewscheme/793" style="color: blue;" target="_blank">融耀星辰小区</a>

                                                </td>
                                                <td style="text-align: left">
11幢,9幢
                                                </td>
                                                <td style="text-align: left">
合肥通创置业有限公司
                                                </td>
                                                <td>
蜀山区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/6 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/9 15:00:00</div>
                                                </td>
                                                <td>108</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/793" target="_blank">
                                                                <div style="background-color: orangered; color: white;">登记结束</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303006</span>
                                                            <a href="/spf/detail/viewscheme/799" style="color: blue;" target="_blank"> 锦泓雅苑</a>

                                                </td>
                                                <td style="text-align: left">
5幢,9幢,10幢,7幢
                                                </td>
                                                <td style="text-align: left">
合肥锦滔房地产开发有限公司
                                                </td>
                                                <td>
经济区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/4 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/7 15:00:00</div>
                                                </td>
                                                <td>328</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/799" target="_blank">
                                                                <div style="background-color: orangered; color: white;">登记结束</div>
                                                            </a>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: left">
                                                            <span style="display:none">2303002</span>
                                                            <a href="/spf/detail/viewscheme/795" style="color: blue;" target="_blank">双湖湾</a>

                                                </td>
                                                <td style="text-align: left">
7幢
                                                </td>
                                                <td style="text-align: left">
合肥瀚融房地产开发有限公司
                                                </td>
                                                <td>
庐阳区
                                                </td>
                                                <td style="text-align: left">
                                                    <div style="width:100%; text-align: left">2023/3/4 15:00:00</div>
                                                    <div style="width: 100%;text-align: left">至&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023/3/7 15:00:00</div>
                                                </td>
                                                <td>60</td>
                                                <td>
                                                            <a href="/spf/detail/viewscheme/795" target="_blank">
                                                                <div style="background-color: orangered; color: white;">登记结束</div>
                                                            </a>


                                                </td>
                                            </tr>

                            </tbody>
                        </table>

                    </div>
<div class="green-black" ><a>共<em>656</em>条记录</a><a href="?p=1&xmmc=&qy=&djzt=">首页</a><a class="current">1</a><a href="?p=2&xmmc=&qy=&djzt=">2</a><a href="?p=3&xmmc=&qy=&djzt=">3</a><a href="?p=4&xmmc=&qy=&djzt=">4</a><a href="?p=5&xmmc=&qy=&djzt=">5</a><a href="?p=44&xmmc=&qy=&djzt=">尾页</a>
<a href="?p=1&xmmc=&qy=&djzt=">上一页</a> <a href="?p=2&xmmc=&qy=&djzt=">下一页</a></div>
                </div>
            </form>

        </div>
    </div>
    <div class="content_a">
        <img src="/spf/Content/images/float_bottom.jpg" alt="Alternate Text" class="image_image" />
        <div class="content_b">合肥住房小程序</div>
    </div>
    <div class="content_aa">
        <img src="/spf/Content/images/float_bottom.jpg" alt="Alternate Text" class="image_image" />
        <div class="content_b">合肥住房小程序</div>
    </div>
</div>
<script>
    //FloatAd("#floadAD");//调用

    //FloatAd_right("#floadAD1");//调用

    //漂浮窗口
    function FloatAd(selector) {
        var obj = $(selector);
        if (obj.find(".item").length == 0) return;//如果没有内容，不执行
        var windowHeight = $(window).height();//浏览器高度
        var windowWidth = $(window).width();//浏览器宽度
        var dirX = -1.5;//每次水平漂浮方向及距离(单位：px)，正数向右，负数向左，如果越大的话就会看起来越不流畅，但在某些需求下你可能会需要这种效果
        var dirY = -1;//每次垂直漂浮方向及距离(单位：px)，正数向下，负数向上，如果越大的话就会看起来越不流畅，但在某些需求下你可能会需要这种效果

        var delay = 30;//定期执行的时间间隔，单位毫秒
        obj.css({ left: windowWidth / 2 - obj.width() / 2 + "px", top: windowHeight / 2 - obj.height() / 2 + "px" });//把元素设置成在页面中间
        obj.show();//元素默认是隐藏的，避免上一句代码改变位置视觉突兀，改变位置后再显示出来
        var handler = setInterval(move, delay);//定期执行，返回一个值，这个值可以用来取消定期执行

        obj.hover(function () {//鼠标经过时暂停，离开时继续
            clearInterval(handler);//取消定期执行
        }, function () {
            handler = setInterval(move, delay);
        });

        obj.find(".close").click(function () {//绑定关闭按钮事件
            close();
        });
        $(window).resize(function () {//当改变窗口大小时，重新获取浏览器大小，以保证不会过界（飘出浏览器可视范围）或漂的范围小于新的大小
            windowHeight = $(window).height();//浏览器高度
            windowWidth = $(window).width() / 2;//浏览器宽度
        });
        function move() {//定期执行的函数，使元素移动
            var currentPos = obj.position();//获取当前位置，这是JQuery的函数，具体见：http://hemin.cn/jq/position.html
            var nextPosX = currentPos.left + dirX;//下一个水平位置
            var nextPosY = currentPos.top + dirY;//下一个垂直位置

            //if (nextPosX >= windowWidth - obj.width()) {//这一段是本站特有的需求，当漂浮到右边时关闭漂浮窗口，如不需要可删除
            //    close();
            //}

            if (nextPosX <= 0 || nextPosX >= windowWidth - obj.width()) {//如果达到左边，或者达到右边，则改变为相反方向
                dirX = dirX * -1;//改变方向
                nextPosX = currentPos.left + dirX;//为了不过界，重新获取下一个位置
            }
            if (nextPosY <= 0 || nextPosY >= windowHeight - obj.height() - 5) {//如果达到上边，或者达到下边，则改变为相反方向。
                dirY = dirY * -1;//改变方向
                nextPosY = currentPos.top + dirY;//为了不过界，重新获取下一个位置
            }
            obj.css({ left: nextPosX + "px", top: nextPosY + "px" });//移动到下一个位置
        }

        function close() {//停止漂浮，并销毁漂浮窗口
            clearInterval(handler);
            obj.remove();
        }
    }

    //漂浮窗口
    function FloatAd_right(selector) {
        var obj = $(selector);
        if (obj.find(".item").length == 0) return;//如果没有内容，不执行
        var windowHeight = $(window).height();//浏览器高度
        var windowWidth = $(window).width();//浏览器宽度
        var dirX = -2;//每次水平漂浮方向及距离(单位：px)，正数向右，负数向左，如果越大的话就会看起来越不流畅，但在某些需求下你可能会需要这种效果
        var dirY = -1.5;//每次垂直漂浮方向及距离(单位：px)，正数向下，负数向上，如果越大的话就会看起来越不流畅，但在某些需求下你可能会需要这种效果

        var delay = 30;//定期执行的时间间隔，单位毫秒
        //obj.css({ left: windowWidth /2 - obj.width() / 2 + "px", top: windowHeight / 2 - obj.height() / 2 + "px" });//把元素设置成在页面中间
        obj.show();//元素默认是隐藏的，避免上一句代码改变位置视觉突兀，改变位置后再显示出来
        var handler = setInterval(move, delay);//定期执行，返回一个值，这个值可以用来取消定期执行

        obj.hover(function () {//鼠标经过时暂停，离开时继续
            clearInterval(handler);//取消定期执行
        }, function () {
            handler = setInterval(move, delay);
        });

        obj.find(".close").click(function () {//绑定关闭按钮事件
            close();
        });
        $(window).resize(function () {//当改变窗口大小时，重新获取浏览器大小，以保证不会过界（飘出浏览器可视范围）或漂的范围小于新的大小
            windowHeight = $(window).height();//浏览器高度
            windowWidth = $(window).width() / 2;//浏览器宽度
        });
        function move() {//定期执行的函数，使元素移动
            var currentPos = obj.position();//获取当前位置，这是JQuery的函数，具体见：http://hemin.cn/jq/position.html
            var nextPosX = currentPos.left + dirX;//下一个水平位置
            var nextPosY = currentPos.top + dirY;//下一个垂直位置

            //if (nextPosX >= windowWidth - obj.width()) {//这一段是本站特有的需求，当漂浮到右边时关闭漂浮窗口，如不需要可删除
            //    close();
            //}

            if (nextPosX <= 0 || nextPosX >= windowWidth - obj.width()) {//如果达到左边，或者达到右边，则改变为相反方向
                dirX = dirX * -1;//改变方向
                nextPosX = currentPos.left + dirX;//为了不过界，重新获取下一个位置
            }
            if (nextPosY <= 0 || nextPosY >= windowHeight - obj.height() - 5) {//如果达到上边，或者达到下边，则改变为相反方向。
                dirY = dirY * -1;//改变方向
                nextPosY = currentPos.top + dirY;//为了不过界，重新获取下一个位置
            }
            obj.css({ left: nextPosX + "px", top: nextPosY + "px" });//移动到下一个位置
        }

        function close() {//停止漂浮，并销毁漂浮窗口
            clearInterval(handler);
            obj.remove();
        }
    }
</script>

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
</script>`;
