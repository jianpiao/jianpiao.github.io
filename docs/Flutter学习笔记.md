# Flutter学习笔记

## Flutter初识

Flutter作为跨平台UI框架，它主要解决的是界面的跨平台。在Flutter中，一切的显示都是Widget，Widget是控件的基础。

Widget在开发过程中中可以分为有状态和无状态两种，在Flutter中每一个页面都是一帧。无状态就是保持在那一帧，而对于有状态的Widget，当数据更新时，其实是构建了新的Widget，因为Widget是不可变的，只是State实现了数据的跨帧保存与恢复。

## Tabbar的实现1

使用MaterialApp主题的的地步tabbar实现的，地步tabbar使用`new Material`包裹，但是问题是最底部会有一条线，暂时还没有研究出来该如何去掉底部的线。

使用`TabBarView`好处是可以左右滑动，该组件已经封装好的对应的滑动效果。

```dart
/**
 * APP的主入口文件
 */

import 'package:flutter/material.dart';

import '../home/Home.dart';
import '../menu/menu.dart';
import '../favorite/favorite.dart';
import '../mine/mine.dart';

//主界面
class Layout extends StatefulWidget {
  @override
  LayoutState createState() => new LayoutState();
}

class LayoutState extends State<Layout> with SingleTickerProviderStateMixin {
  TabController controller;
  final List<Widget> pages = <Widget>[
    new Home(),
    new Menu(),
    new Favorite(),
    new Mine(),
  ];
  final List<Widget> myTabs = <Widget>[
    new Tab(
      text: "首页",
      icon: new Icon(Icons.home),
    ),
    new Tab(
      text: "食谱",
      icon: new Icon(Icons.games),
    ),
    new Tab(
      text: "关注",
      icon: new Icon(Icons.favorite),
    ),
    new Tab(
      text: "我的",
      icon: new Icon(Icons.face),
    ),
  ];

  @override
  void initState() {
    super.initState();
    controller = new TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      home: new Scaffold(
        body: new TabBarView(
          controller: controller,
          children: pages,
        ),
        bottomNavigationBar: new Material(
          color: Colors.white,
          child: new TabBar(
              controller: controller,
              labelColor: Color.fromRGBO(255, 75, 54, 1),
              unselectedLabelColor: Colors.black26,
              tabs: myTabs),
        ),
      ),
    );
  }
}

```

## Tabbar的实现2

底部tabbar使用`BottomNavigationBar`实现，效果更加美观~

相对不好的一点是不可以左右滑动，只能通过底部点击进行切换。

首先，**[bottomNavigationBar](https://docs.flutter.io/flutter/material/BottomNavigationBar-class.html)** 是属于 **[Scaffold](https://docs.flutter.io/flutter/material/Scaffold-class.html)** 中的一个位于底部的控件。通常和 **[BottomNavigationBarItem](https://docs.flutter.io/flutter/widgets/BottomNavigationBarItem-class.html)** 配合使用

```dart
/**
 * APP的主入口文件
 */

import 'package:flutter/material.dart';

import '../home/Home.dart';
import '../menu/menu.dart';
import '../favorite/favorite.dart';
import '../mine/mine.dart';

//主界面
class Layout extends StatefulWidget {
  @override
  LayoutState createState() => new LayoutState();
}

class LayoutState extends State<Layout> with SingleTickerProviderStateMixin {
  TabController controller;
  final List<Widget> pages = <Widget>[
    new Home(),
    new Menu(),
    new Favorite(),
    new Mine(),
  ];
  final List<BottomNavigationBarItem> tabs = <BottomNavigationBarItem>[
    BottomNavigationBarItem(icon: Icon(Icons.home), title: Text('首页')),
    BottomNavigationBarItem(icon: Icon(Icons.games), title: Text('食谱')),
    BottomNavigationBarItem(icon: Icon(Icons.favorite), title: Text('关注')),
    BottomNavigationBarItem(icon: Icon(Icons.face), title: Text('我的')),
  ];
  Color fontColor = Color.fromRGBO(255, 75, 54, 1);
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    controller = new TabController(length: pages.length, vsync: this);
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  void _onSelectedIndex(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        items: tabs,
        currentIndex: _selectedIndex,
        onTap: _onSelectedIndex,
        fixedColor: fontColor,
      ),
      body: TabBarView(
        controller: controller,
        children: pages,
      ),
    );
  }
}

```

**BottomNavigationBar构造方法**配置如下：

```dart
BottomNavigationBar({
    Key key,
    @required this.items,  
    this.onTap,
    this.currentIndex = 0,
    BottomNavigationBarType type,
    this.fixedColor,
    this.iconSize = 24.0,
  })
```

| 属性         | 值类型                            | 说明                                                         |
| ------------ | --------------------------------- | ------------------------------------------------------------ |
| items        | BottomNavigationBarItem类型的List | 底部导航栏的显示项                                           |
| onTap        | ValueChanged < int >              | 点击导航栏子项时的回调                                       |
| currentIndex | int                               | 当前显示项的下标                                             |
| type         | BottomNavigationBarType           | 底部导航栏的类型，有fixed和shifting两个类型，显示效果不一样  |
| fixedColor   | Color                             | 底部导航栏type为fixed时导航栏的颜色，如果为空的话默认使用ThemeData.primaryColor |
| iconSize     | double                            | BottomNavigationBarItem icon的大小                           |

**BottomNavigationBar**中属性比较简单，下面我们来看一下**BottomNavigationBarItem**

`BottomNavigationBarItem`配置如下：

```dart
 const BottomNavigationBarItem({
    @required this.icon,
    this.title,
    Widget activeIcon,
    this.backgroundColor,
  })
```

| 属性            | 值类型 | 说明                                          |
| --------------- | ------ | --------------------------------------------- |
| icon            | Widget | 要显示的图标控件，一般都是Iocn                |
| title           | Widget | 要显示的标题控件，一般都是Text                |
| activeIcon      | Widget | 选中时要显示的icon，一般也是Icon              |
| backgroundColor | Color  | BottomNavigationBarType为shifting时的背景颜色 |