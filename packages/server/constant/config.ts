export const DEFAULT_TEMPLATE = `
<h3>新增楼盘如下：</h3>
<ol>
<% _.forEach(newData, function(item) { %>
<li>
  <div>名称：<a href="<%- item.url %>"><%- item.name %></a></span>
  <div>区域：<%- item.region %></span>
  <div>开始时间：<%- item.startTimeStr %></span>
  <div>结束时间：<%- item.endTimeStr %></span>
  <div>总套数：<%- item.total %></span>
  <div>企业名称：<%- item.enterpriseName %></span>
  <div>开放楼栋：<%- item.building %></span>
  <div>登记状态：<%- item.state %></span>
</li>
<% }); %>
</ol>
<h3>所有在登记楼盘：</h3>
<ol>
<% _.forEach(data, function(item) { %>
<li>
  <div>名称：<a href="<%- item.url %>"><%- item.name %></a></span>
  <div>区域：<%- item.region %></span>
  <div>开始时间：<%- item.startTimeStr %></span>
  <div>结束时间：<%- item.endTimeStr %></span>
  <div>总套数：<%- item.total %></span>
  <div>企业名称：<%- item.enterpriseName %></span>
  <div>开放楼栋：<%- item.building %></span>
  <div>登记状态：<%- item.state %></span>
</li>
<% }); %>
</ol>
`;

export const DEFAULT_VALUE = {
  html: DEFAULT_TEMPLATE,
  crontab: '*/60 * * * *',
  style: '',
};
