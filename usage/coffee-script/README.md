coffee-script
=============

nodejs 编译 [coffee-script](http://coffee-script.org/)

##安装（如果不想全局安装可以去掉 -g 选项）

    sudo npm install -g coffee-script

##用法

安装之后, 你应该可以运行 <tt>coffee</tt> 命令以执行脚本, 编译 <tt>.coffee</tt> 文件到 <tt>.js</tt> 文件, 和提供一个交互式的 REPL.<tt>coffee</tt> 命令有下列参数:

<table>
  <tbody>
    <tr>
      <td><code>-c, --compile</code></td>
      <td>
        编译一个 <tt>.coffee</tt> 脚本到一个同名的 <tt>.js</tt> 文件.
      </td>
    </tr>
    <tr>
      <td><code>-m, --map</code></td>
      <td>
        随 JavaScript 文件一起生成 source maps. 并且在 JavaScript 里加上 <tt>sourceMappingURL</tt> 指令.
      </td>
    </tr>
    <tr>
      <td width="25%"><code>-i, --interactive</code></td>
      <td>
        启动一个交互式的 CoffeeScript 会话用来尝试一些代码片段.
        等同于执行 <tt>coffee</tt> 而不加参数.
      </td>
    </tr>
    <tr>
      <td><code>-o, --output [DIR]</code></td>
      <td>
        将所有编译后的 JavaScript 文件写到指定文件夹.
        与 <tt>--compile</tt> 或 <tt>--watch</tt> 搭配使用.
      </td>
    </tr>
    <tr>
      <td><code>-j, --join [FILE]</code></td>
      <td>
        编译之前, 按参数传入顺序连接所有脚本到一起, 编译后写到指定的文件.
        对于编译大型项目有用.
      </td>
    </tr>
    <tr>
      <td><code>-w, --watch</code></td>
      <td>
        监视文件改变, 任何文件更新时重新执行命令.
      </td>
    </tr>
    <tr>
      <td><code>-p, --print</code></td>
      <td>
        JavaScript 直接打印到 <b>stdout</b> 而不是写到一个文件.
      </td>
    </tr>
    <tr>
      <td><code>-s, --stdio</code></td>
      <td>
        将 CoffeeScript 传递到 STDIN 后从 STDOUT 获取 JavaScript.
        对其他语言写的进程有好处. 比如:<br>
        <tt>cat src/cake.coffee | coffee -sc</tt>
      </td>
    </tr>
    <tr>
      <td><code>-l, --literate</code></td>
      <td>
        将代码作为 Literate CoffeeScript 解析.
        只会在从 <b>stdio</b> 直接传入代码或者处理某些没有后缀的文件名需要写明这点.
      </td>
    </tr>
    <tr>
      <td><code>-e, --eval</code></td>
      <td>
        直接从命令行编译和打印一小段 CoffeeScript. 比如:<br>
        <tt>coffee -e "console.log num for num in [10..1]"</tt>
      </td>
    </tr>
    <tr>
      <td><code>-b, --bare</code></td>
      <td>
        编译到 JavaScript 时去掉<a href="#lexical-scope">顶层函数的包裹</a>.
      </td>
    </tr>
    <tr>
      <td><code>-t, --tokens</code></td>
      <td>
        不对 CoffeeScript 进行解析, 仅仅进行 lex, 打印出 token stream:
        <tt>[IDENTIFIER square] [ASSIGN =] [PARAM_START (]</tt> ...
      </td>
    </tr>
    <tr>
      <td><code>-n, --nodes</code></td>
      <td>
        不对 CoffeeScript 进行编译, 仅仅 lex 和解析, 打印 parse tree:
<pre class="no_bar">Expressions
  Assign
    Value "square"
    Code "x"
      Op *
        Value "x"
        Value "x"
</pre>
      </td>
    </tr>
    <tr>
      <td><code>--nodejs</code></td>
      <td>
        <tt>node</tt> 命令有一些实用的参数, 比如<br>
        <tt>--debug</tt>, <tt>--debug-brk</tt>, <tt>--max-stack-size</tt>,
        和 <tt>--expose-gc</tt>. 用这个参数直接把参数转发到 Node.js.
        重复使用 <tt>--nodejs</tt> 来传递多个参数.
      </td>
    </tr>
  </tbody>
</table>
