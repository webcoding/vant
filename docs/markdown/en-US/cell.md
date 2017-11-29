## Cell

### Install
``` javascript
import { Cell, CellGroup } from 'vant';

Vue.component(Cell.name, Cell);
Vue.component(CellGroup.name, CellGroup);
```

### Usage

#### Basic Usage

```html
<van-cell-group>
  <van-cell title="Cell title" value="Content"></van-cell>
  <van-cell title="Cell title" value="Content" label="Description"></van-cell>
</van-cell-group>
```

#### Value only

```html
<van-cell-group>
  <van-cell value="Content"></van-cell>
</van-cell-group>
```

#### Left Icon

```html
<van-cell-group>
  <van-cell title="Cell title" icon="location"></van-cell>
</van-cell-group>
```

#### Link

```html
<van-cell-group>
  <van-cell title="Cell title" is-link></van-cell>
  <van-cell title="Cell title" is-link value="Content"></van-cell>
</van-cell-group>
```

#### Advanced Usage

```html
<van-cell-group>
  <van-cell value="Content" icon="shop" is-link>
    <template slot="title">
      <span class="van-cell-text">Cell title</span>
      <van-tag type="danger">Tag</van-tag>
    </template>
  </van-cell>
  <van-cell title="Cell title" icon="location" is-link></van-cell>
  <van-cell title="Cell title">
    <template slot="right-icon">
      <van-icon name="search" class="van-cell__right-icon"></van-icon>
    </template>
  </van-cell>
</van-cell-group>
```

### API

| Attribute | Description | Type | Default | Accepted Values |
|-----------|-----------|-----------|-------------|-------------|
| icon | Left Icon | `String` | - | - |
| title | Title | `String` | - | - |
| value | Right text | `String` | - | - |
| label | Description below the title | `String` | - | - |
| url | Link | `String` | - | - |
| to | Target route of the link, same as to of `vue-router` | `String | Object` | - | - |
| replace | If true, the navigation will not leave a history record | `String` | `false` | - |
| isLink | Whether to show link icon | `Boolean` | `false` | - |
| required | Whether to show required mark | `Boolean` | `false` | - |

### Slot

| name | Description |
|-----------|-----------|
| - | Default slot |
| icon | Custom icon |
| title | Custom title |
| right-icon | Custom right icon |
