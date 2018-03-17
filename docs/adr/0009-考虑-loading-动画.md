# 9. 考虑 loading 动画

日期: 2018-03-14

## 状态

列表：提议/通过/完成/已弃用/已取代

2018-03-14 提议

2018-03-17 完成

## 背景

在这里补充上下文...

## 决策

在这里补充上决策信息...

## 后果

在主工程中使用事件来自定义动画：

```typescript
host: {
  '(window:mooa.bootstrapping)': 'loadingStart($event)',
  '(window:mooa.mounting)': 'loadingEnd($event)'
}
```
