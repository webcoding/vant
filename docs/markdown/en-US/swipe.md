## Swipe

### Install
``` javascript
import { Swipe, SwipeItem } from 'vant';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
```

### Usage

#### Basic Usage
Use `autoplay` prop to set autoplay interval

```html
<van-swipe :autoplay="3000">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>
```

#### Image Lazyload
Use [Lazyload](#/zh-CN/component/lazyload) component to lazyload image

```html
<van-swipe>
  <van-swipe-item v-for="(image, index) in images" :key="index">
    <img v-lazy="image" />
  </van-swipe-item>
</van-swipe>
```

```javascript
export default {
  data() {
    return {
      images: [
        'https://img.yzcdn.cn/1.jpg',
        'https://img.yzcdn.cn/2.jpg'
      ]
    }
  }
}
```

### API

| Attribute | Description | Type | Default | Accepted Values |
|-----------|-----------|-----------|-------------|-------------|
| autoplay | Autoplay interval (ms) | `Number` | - | - |
| duration | Animation duration (ms) | `Number` | `500` | - |
| showIndicators | Whether to show indocators | `Boolean` | `true` | - |
| initialSwipe | Index of initial swipe, start from 0 | `Number` | `0` | - |

### Event

| Event | Description | Attribute |
|-----------|-----------|-----------|
| change | Triggered when current swipe change | index: index of current swipe |
