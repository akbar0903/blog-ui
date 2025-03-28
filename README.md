# react+heroui个人作品集

## 1.tailwindcss知识点复习
1. `inset-0`:
inset是top,right.bottom.left的缩写。
`inset-0` 相当于 `top:0;right:0;bottom:0;left:0;`
2. `flex-col`:
flex-col是flex-direction:column的缩写。colom是垂直方向。
3. `flex-row`:
flex-row是flex-direction:row的缩写。row是水平方向，css默认就是水平方向。
4. `animate-blink`:
animate-blink是用于实现闪烁效果的动画类。

## 2.提交规范
- **feat：**新功能（Feature）
- **fix：**修复 bug（Bug fix）
- **docs：**文档更改（Documentation）
- **style：**代码样式调整（Formatting, whitespace changes）
- **refactor：**重构（代码优化，不新增功能也不修 bug）
- **perf：**性能优化（Performance improvements）
- **test：**添加或修改测试（Tests）
- **build：**构建系统或外部依赖更改（Build system）
- **ci：CI**配置或脚本更改（Continuous Integration）
- **chore：**杂项（不修改 src 或 test 的更改）
- **revert：**回滚之前的提交（Revert）

## 2.路由守卫（高阶组件）


## 3.react-markdown获取文件名
```js
const fileNameMatch = code.match(/^\/\/\s*File:\s*(.+?)\s*$|^#\s*File:\s*(.+?)\s*$/m)
```
**可以匹配**：
- `// File: example.js`
- `//File: example.js`
- `// File: example.js`
- `# File: example.py`
- `#File: example.py`
- `# File: example.py`
## 4.react-markdown高亮代码块中的某个行
```java
// File:Example.java
public class Example {
  public static void main(String[], args) {
    // 下面是正确的输出示例
    System.out.println("Hello World"); // highlight-success

    // 下面是错误的输出示例，没有写System.out
    println("Hello World"); // highlight-error
  }
}
```
**可以匹配**：
- `// highlight-error`
- `//highlight-error`
- `# highlight-success`
- `#highlight-success`