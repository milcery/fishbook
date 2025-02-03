# FishBook

命令行看小说

## 安装
```
npm install -g fishbook
```

- `fishbook bookshelf`
- `fishbook add`
- `fishbook chapter`
- `fishbook read`
- `fishbook setting`

## 导入本地小说

```
fishbook add /path/filename.txt
```

- 支持绝对路径, 相对路径
- 仅支持utf-8, gbk格式的txt文件


## 书架
```
fishbook bookshelf       // 选择小说后阅读
fishbook bookshelf -d    // 选择小说后删除本地
```

## 选择章节
```
fishbook chapter          // 第一页
fishbook chapter 2        // 页数
fishbook chapter end      // 最后一页

fishbook chapter -s 章节名 // 搜索目录
```

## 阅读

```
fishbook read
```

- 默认最后一次添加/下载/阅读的小说
- 上下键翻页
- 按p键听书，再次按下停止，支持MacOs, Window 10


## 设置

```
fishbook setting
```

- 阅读时是否单行 (默认为true)
- 阅读时显示字数 (设置字数后，单行将为false)
- 阅读时文字颜色 (16进制颜色, 可输入空)
- 阅读时自动翻页 (默认不翻页, 设置为0不翻页)


## License
[MIT](http://www.opensource.org/licenses/MIT)
