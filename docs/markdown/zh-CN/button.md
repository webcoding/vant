## Button 按钮

### 使用指南
``` javascript
import { Button } from 'vant';

Vue.component(Button.name, Button);
```

### 代码演示

#### 按钮类型

支持`default`、`primary`、`danger`三种类型，默认为`default`

```html
<van-button type="default">Default</van-button>
<van-button type="primary">Primary</van-button>
<van-button type="danger">Danger</van-button>
```

#### 按钮尺寸

支持`large`、`normal`、`small`、`mini`四种尺寸，默认为`normal`

```html 
<van-button size="large">Large</van-button>
<van-button size="normal">Normal</van-button>
<van-button size="small">Small</van-button>
<van-button size="mini">Mini</van-button>
```

#### 禁用状态

通过`disabled`属性来禁用按钮，此时按钮不可点击

```html
<van-button disabled>Diabled</van-button>
```

#### 加载状态

```html 
<van-button loading></van-button>
<van-button loading type="primary"></van-button>
```

#### 自定义按钮标签

按钮标签默认为`button`，可以使用`tag`属性来修改按钮标签

```html 
<van-button tag="a" href="https://www.youzan.com" target="_blank">
  按钮
</van-button>
```

#### 页面底部操作按钮

```html 
<van-button type="primary" bottom-action>按钮</van-button>

<van-row>
  <van-col span="12">
    <van-button bottom-action>按钮</van-button>
  </van-col>
  <van-col span="12">
    <van-button type="primary" bottom-action>按钮</van-button>
  </van-col>
</van-row>
```

### API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|-----------|-----------|-----------|-------------|-------------|
| type | 按钮类型 | `String` | `default` | `primary` `danger` |
| size | 按钮尺寸 | `String` | `normal` | `large` `small` `mini` |
| tag | 按钮标签 | `String` | `button` | 任意`HTML`标签 |
| nativeType | 按钮类型（原生） | `String` | `''` | - |
| diabled | 是否禁用 | `Boolean` |  `false` | - |
| loading | 是否显示为加载状态 | `Boolean` |  `false` | - |
| block | 是否为块级元素 | `Boolean` |   `false` | - |
| bottomAction | 是否为底部行动按钮 | `Boolean` | `false` | - |
