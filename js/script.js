var menu = document.querySelector('.menu');

var pos = {};

var ls = window.localStorage;

render();

//取消浏览器
document.oncontextmenu = function(e) {

    e.preventDefault();

}

//点击右键,显示
document.onmousedown = function(e) {

    pos = {

        x: e.clientX,

        y: e.clientY

    }

    //获取按键的值 鼠标button 0,1,2
    if (e.button === 2) {

        //显示菜单
        menu.style.display = 'block';

        //让菜单的位置=鼠标的位置
        menu.style.left = pos.x + 'px';

        menu.style.top = pos.y + 'px';

    }

}

//点击菜单
menu.onclick = function(e) {

    var tar = e.target;

    if (tar.tagName === 'LI') {

        if (tar.innerHTML === '添加') {

            add(); //添加

        } else {

            remove(); //删除

        }

    }

}


//动态添加一个盒子
function add() {

    var tag = document.createElement('div');

    tag.className = 'tag';

    document.body.insertBefore(tag, document.body.firstChild);

    tag.id = new Date() * 1; //id

    menu.style.display = 'none';

    tag.style.cssText = `left:${pos.x}px; top:${pos.y}px; background:rgb(${getColor()},${getColor()},${getColor()})`;

    tag.setAttribute('contenteditable', 'true'); //输入值

    tag.oninput = function() {

        var info = {

            id: tag.id,

            txt: tag.innerHTML,

            x: pos.x,

            y: pos.y,

            color: tag.style.backgroundColor

        }

        //本地存储
        saveData(info);
    }

}
//删除
function remove() {

    //从本地删除
    ls.removeItem("tagInfo");

    var tags = document.querySelectorAll('.tag');

    tags.forEach(function(item) {

        document.body.removeChild(item);

    });

    menu.style.display = 'none';

}

//本地存储
function saveData(info) {

    //判断有没有存
    var temp = ls.hasOwnProperty('tagInfo') ? JSON.parse(ls.getItem('tagInfo')) : {};

    //存setItem(key,val)
    temp[info.id] = info;

    ls.setItem('tagInfo', JSON.stringify(temp));

}

//随机背景颜色
function getColor() {

    return Math.floor(Math.random() * 256);

}

//渲染数据
function render() {

    //获取本地存储的数据,渲染
    if (ls.getItem('tagInfo')) {

        var data = JSON.parse(ls.getItem('tagInfo'));

        var html = '';

        for (var k in data) {

            var tag = document.createElement('div');

            tag.className = 'tag';

            tag.id = k;

            tag.innerHTML = data[k].txt;

            tag.style.cssText = `left:${data[k].x}px;top:${data[k].y}px;

            background:${data[k].color};`

            document.body.insertBefore(tag, document.body.firstChild);

        }

    }

}