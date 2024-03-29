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
    <title>6幢 -- 璟庭里 -- 合肥市房产市场信息平台</title>

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
        <div class="dh"><p>我的位置：<a href="/spf/">商品房备案</a>&nbsp;&gt;&nbsp;<a href="#">璟庭里</a>&nbsp;&gt;&nbsp;6幢</p></div>
        <div class="content_zixun"><span>栋号：6幢</span><span>预售许可证号码：20230184</span><span>建筑结构：钢筋混凝土结构</span></div>
        <div class="content_xiaos">
            <ul>
                <li>
                    <span><i style="color:#00ff00;">■</i>可售</span>
                    <span><i style="color:#0001fe;">■</i>已签约</span>

                    <span><i style="color:#fd0002;">■</i>备案</span>
                    <span><i style="color:#006500;">■</i>已办产权</span>
                    <span><i style="color:#febbff;">■</i>抵押可售</span>
                    <span><i style="color:#ffa500;">■</i>摇号销售</span>
                    <span><i style="color:#38a4ff;">■</i>现房销售</span>
                    <span><i style="color:#bbf588;">■</i>摇号冻结</span>
                </li>
                <li>
                    <span><i style="color: #bebebe;">■</i>已限制</span>
                    <span><i style="color: #cc6600;">■</i>限制销售</span>
                    <span><i style="color: #33cc99;">■</i>自建房</span>
                    <span><i style="color: #01fffe;">■</i>拆迁安置</span>
                    <span><i style="color: #d0208f;">■</i>抵押不可售</span>
                    <span style="width: 150px;"><i style="color: #0571a0;">■</i>配套、物管、社区用房</span>
                    <span style="width: 150px;"><i style="color: #EEB422">■</i>附条件销售</span>

                </li>
            </ul>
        </div>
        <!--楼栋信息-->
        <div style="width:1000px; margin-bottom:20px; ">
            <div class="bei2_t5">
                <ul style="width:350px;">
                    <!--此处的值可以修改实际的需要-->
                    <table border="0" cellpadding="0" cellspacing="1" title="点击查看房屋详细信息">

                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)"></td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">1</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">2</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">3</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">4</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：16</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805948',1)">1601</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805949',1)">1602</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805950',1)">1603</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805951',1)">1604</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：15</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805944',1)">1501</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805945',1)">1502</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805946',1)">1503</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805947',1)">1504</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：14</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805940',1)">1401</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805941',1)">1402</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805942',1)">1403</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805943',1)">1404</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：13</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805936',1)">1301</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805937',1)">1302</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805938',1)">1303</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805939',1)">1304</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：12</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805932',1)">1201</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805933',1)">1202</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805934',1)">1203</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805935',1)">1204</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：11</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805928',1)">1101</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805929',1)">1102</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805930',1)">1103</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805931',1)">1104</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：10</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805924',1)">1001</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805925',1)">1002</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805926',1)">1003</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805927',1)">1004</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：9</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805920',1)">901</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805921',1)">902</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805922',1)">903</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805923',1)">904</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：8</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805916',1)">801</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805917',1)">802</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805918',1)">803</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805919',1)">804</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：7</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805912',1)">701</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805913',1)">702</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805914',1)">703</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805915',1)">704</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：6</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805908',1)">601</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805909',1)">602</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805910',1)">603</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805911',1)">604</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：5</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805904',1)">501</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805905',1)">502</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805906',1)">503</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805907',1)">504</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：4</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805900',1)">401</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805901',1)">402</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805902',1)">403</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805903',1)">404</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：3</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805896',1)">301</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805897',1)">302</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805898',1)">303</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805899',1)">304</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：2</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805892',1)">201</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805893',1)">202</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805894',1)">203</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#00ff00;text-wrap:none;text-align:center;color:#fff" onclick="s('6805895',1)">204</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：1</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#0571a0;text-wrap:none;text-align:center;color:#fff" onclick="s('6805891',1)">架空1</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#fff" onclick="s('0',1)">-</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#fff" onclick="s('0',1)">-</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#fff" onclick="s('0',1)">-</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：-1</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#0571a0;text-wrap:none;text-align:center;color:#fff" onclick="s('6805888',1)">梯2</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#0571a0;text-wrap:none;text-align:center;color:#fff" onclick="s('6805889',1)">通道3</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#0571a0;text-wrap:none;text-align:center;color:#fff" onclick="s('6805890',1)">通道4</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#fff" onclick="s('0',1)">-</td>
                            </tr>
                            <tr>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#333" onclick="s('0',1)">层：-2</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#0571a0;text-wrap:none;text-align:center;color:#fff" onclick="s('6805885',1)">梯1</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#0571a0;text-wrap:none;text-align:center;color:#fff" onclick="s('6805886',1)">通道1</td>
                                    <td class="cursor" style="width:70px; height:20px; background-color:#0571a0;text-wrap:none;text-align:center;color:#fff" onclick="s('6805887',1)">通道2</td>
                                    <td class="" style="width:70px; height:20px; background-color:SandyBrown;text-wrap:none;text-align:center;color:#fff" onclick="s('0',1)">-</td>
                            </tr>
                    </table>
                </ul>
            </div>
        </div>
        <!--详细信息-->
        <div class="content_xiangx">
            <div class="content_xiangx_bt"><p>幢号：6幢 许可证详细信息</p></div>
            <ul>
                <li><p>许可证号：<span>20230184</span></p><p>地上层数：<span>16层</span>&nbsp;&nbsp;地下层数：<span>2层</span></p></li>
                <li class="rbg_1"><p>土地使用权证：<span>皖（2023）合肥市不动产权第1000180号</span></p><p>套数：<span>60套</span></p></li>
                <li><p>规划许可证：<span>建字第340111202300127</span></p><p>预售许可面积：<span>7141.24 ㎡</span></p></li>
                <li class="rbg_1"><p>建筑结构：<span>钢筋混凝土结构</span></p><p>网上销售总面积：<span>7141.24 ㎡</span></p></li>
                <li><p>用途：<span>住宅</span></p><p>销售电话：<span>0551-65251111</span></p></li>
                <li class="rbg_1"><p>设计单位：<span title=""></span></p><p>代理销售企业：<span></span></p></li>
                <li><p>竣工日期：<span>2025/5/30</span></p><p>交付日期：<span>2025/8/31</span></p></li>
            </ul>
        </div>
    </div>

    <div id="divhouse" style="display:none">
        <ul>
            <li class="kuangli1">房间号：</li>
            <li class="kuangli2" id="lbPartNO"></li>

            <li class="kuangli1" id="quotepic">拟售单价：</li>
            <li class="kuangli2" id="lbQuotepic"></li>
            <li class="kuangli1">建筑面积：</li>
            <li class="kuangli2" id="lbBuildArea"></li>
            <li class="kuangli1">套内面积：</li>
            <li class="kuangli2" id="lbInsideArea"></li>
            <li class="kuangli1">分摊面积：</li>
            <li class="kuangli2" id="lbJoinArea"></li>
            <li class="kuangli1">建筑结构：</li>
            <li class="kuangli2" id="lbStructure"></li>
            <li class="kuangli1">房屋用途：</li>
            <li class="kuangli2" id="lbHouseUsefulness"></li>
            <li class="kuangli1">销售状态：</li>
            <li class="kuangli2" id="lbSellFlag"></li>
            <li class="kuangli3">坐落地址：</li>
            <li class="kuangli4" id="lbLocation"></li>
        </ul>
    </div>
</div>
<script type="text/javascript">
    //function s(id) {
    //    //房屋ID数字转换再进行rsa加密
    //    var n = nscaler(id);j(n);
    //};

    //function n(id) {
    //    $.ajax({
    //        url: "~/details/house/" + id,
    //        type: "Get",
    //        dataType: "json",
    //        error: function (r, t) { var e = r.responseText ? r.responseText : t; alert(e); },
    //        success: function (result) {
    //            if (result.state) {
    //                $("#lbPartNO").html(result.data.lbPartNO);
    //                $("#lbHouseType").html(result.data.lbHouseType);
    //                $("#lbBuildArea").html(result.data.lbBuildArea);
    //                $("#lbJoinArea").html(result.data.lbJoinArea);
    //                $("#lbInsideArea").html(result.data.lbInsideArea);
    //                $("#lbStructure").html(result.data.lbStructure);
    //                $("#lbHouseUsefulness").html(result.data.lbHouseUsefulness);
    //                $("#lbSellFlag").html(result.data.lbSellFlag);
    //                $("#lbLocation").html(result.data.lbLocation);
    //                $("#lbQuotepic").html(result.data.iPrice);
    //                var sellflag = result.data.sellflag;
    //                var isshow = false;
    //                if (sellflag == 0 || sellflag == 3 || sellflag == 11 || sellflag == 13) {
    //                    isshow = true;
    //                    $("#quotepic").show();
    //                    $("#lbQuotepic").show();
    //                }
    //                else {
    //                    $("#quotepic").hide();
    //                    $("#lbQuotepic").hide();
    //                }
    //                showinfo(id, isshow);
    //            }

    //        },
    //        timeout: 1000
    //    });
    //};
    //function j(id) {
    //    var rid = 0;
    //    $.ajax({
    //        url: "~/details/getrsa/" + id,
    //        type: "Get",
    //        dataType: "json",
    //        error: function (r, t) { var e = r.responseText ? r.responseText : t; alert(e); },
    //        success: function (result) {
    //            if (result.state) {
    //                rid = result.id;
    //                n(rid);
    //            }
    //        },
    //        timeout: 1000
    //    });
    //    return rid;
    //};

    function showinfo(houseid, isshow) {
        var height = 325;
        if (!isshow) {
            height = 305;
        }
        if (houseid != "0") {
            var index;
            var txt;
            var interval = setInterval(function () {
                index = $("#lbPartNO").html();
                if (index.length > 0) {
                    clearInterval(interval);
                    txt = $("#divhouse").html();
                    $.dialog({
                        title: "房屋信息",
                        id: houseid,
                        content: txt,
                        lock: true,
                        width: 500,
                        fixed: true,
                        height: height
                    });
                }
            }, 100);
        }
    };
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
</script>
`;
