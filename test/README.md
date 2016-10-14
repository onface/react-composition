# test

<div id="mocha"></div>

<script src="/doc/vendor/expect.js/0.2.0/expect.js"></script>
<script src="/doc/vendor/mocha/3.0.2/mocha.js" ></script>

<script>mocha.setup('bdd')</script>
<!--
markrun
{
    "m_lastRunThisScript": false
}
-->
````js
// 在此处使用 markrun 导出模块到全局变量，供 test/**.js 使用
window.Boot = require('react-composition')
````

<script src="./test.demo.js" ></script>

<script>
  mocha.checkLeaks();
   mocha.globals(['LiveReload']);
  mocha.run();
</script>

<link rel="stylesheet" href="/doc/vendor/mocha/3.0.2/mocha.css">
