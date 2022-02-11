## 01_课程导学
- 视频链接 https://www.youtube.com/watch?v=vbXuHi1kMOo&list=PL5FIFxLsMtxTTxwZ3D86ymwUSZl7YR_Tr
- 技术栈
    - react 17 / react hook / ts / reactQuery / reactRouter / ReduxToolkit / css in js
        - 涉及到的知识
            - JSX / STATE / 事件处理
            - 状态提升 / 状态解耦 / 组件组合 
            - Refs转发
            - 高阶组件
            - Render Props
            - 错误边界
            - ...
            - React Hook. [React的Hook将会是React版本的重要侧倾功能] 
                - useState / useRef 自带Hook详解
                - 以及自定义Hook :异步操作 / 状态管理 / debounce / 路由 / 增删改查 等
            - TypeScript 4
            - Hook + Context / Redux Toolkit 管理客户端全局状态.
            - React Query 管理服务端全局状态.
            - 性能优化 / 性能监控 / 性能报告
            - 自动化测试 : 单元测试 / 集成测试 / e2e测试
            - CSS-in-JS / Grid / FlexBox
            - React Router 6
- 学习前提
    - ...我会

## 02_用 Create React App 初始化项目
- 使用命令 npx create-react-app app --template typescript
- 以及精确的讲解了每个文件是干嘛的
- yarn.lock可以精确的锁定具体的版本号.
- 在文件里使用到的图片 / 文件 / 字体 都是放在src里面,然后在代码里引入.而不是放在public文件夹里.

## 03_配置 eslint、 prettier 和 commitlint 规范工程
- "baseUrl": "./src" => 解决@符号的问题
- prettier => 团队统一格式化
- 增加了一些项目的配置 :
    - 包括提交前自动格式化
    - 以及eslint的相关配置
    - 以及git提交格式的规范
- 以上的项目配置,这里由于重点是学习react,这里选择略过,以后进行学习**

## 04_对比常见mock方案.安置JSON SERVER
- 在前端开发的前期,是没有接口可以使用的.
- 常见的Mock方案
    - 代码入侵.写死数据
        - 优点 : 无
        - 缺点 : 与真实server环境切换非常麻烦
    - 请求拦截 :
        - 代表 : Mock.js
        - 原理 : 是重写XMLHTTPRequest的一些属性
        - 优点 : 与前端代码分离 / 生成随机的数据
        - 缺点 : 数据都是动态生成的假数据,并不真实 / 只支持Ajax,不支持fetch
    - 接口管理工具
        - 代表 :rap / swagger / moco / yapi
        - 优点 : 配置功能强大 , 接口管理和Mock一体,后端修改接口,Mock也跟着改.
        - 缺点 : 配置复杂,依赖后端.一般作为大团队的基础建设而存在.
    - 本地node服务器.
        - 代表 : json-server => 这个是比较好用的. 应该是安装到开发环境
        - 优点 : 
            - 配置简单.
            - 增删改查是真实的
        - 缺点 : 
            - 无法随着后端API的修改而自动修改.

```
REST API => URI 代表 资源 / 对象, METHOD代表行为
- GET /tickets // 得到列表
- GET /ticket/12 // 获得详情
- POST /tickets // 增加数据
- PUT /ticket/12 // 全量替换
- PATCH /ticket/12 // 修改部分文档数据
- DELETE /ticket/12 // 删除
```
## 05_用JSX渲染开发列表
- 几种的区别 
    - decodeURI 是用来反编译全部的
    - decodeURIComponent是用来反编译后面的一部分参数的
- 路径分析
    - /screens ： 包含的都是页面级别的代码
- React并没有对文件首字母是否是大小写作出规定
- 写一个React是需要最先确定状态的.
- 这节课主要讲到了搜索组件的使用.
## 06_用状态提升分享组件状态，完成工程列表页面
- 状态提升 : 是将search-panel中的useState的相关代码提升到父组件当中.这样就可以将数据流动到同为子组件的list.tsx中.
    - 同时,可以通过父组件中的props将相关属性传递到search-panel.tsx文件中.
    - 然后由index的子组件之一,list来消费工程列表List的相关数据.
- ReactComponent文件中虽然没有使用到React,但是也要引入React.
- 所有的不是为了修改业务,而修改的代码的行为都是不好的.都是需要进行优化的.

```
// 如何设置环境变量
// 使用git执行 => NODE_ENV=我是一个环境变量 node test.js

// test.js
console.log(process.env.NODE_ENV); // 打印结果就是 我是一个环境变量
```
- 在react中配置两个文件夹.
    - 在执行 npm start 的审核后会加载 .env.develoment的变量
    - 在执行 npm build 之后,会执行.env的变量
    - 这样就做到了自动化切换的环境变量
```
// .env
REACT_APP_API_URL = http://online.com
```
```
// .env.development
REACT_APP_API_URL = http://127.0.0.1:3001
```
- 后端会传递尽量少的内容,来描述前端.
    - 这个就像是monmondb中的ref.而是直接返回了ref,并没有进行populate.
    - 描述 : 前端首先拿到name的相关数据,然后别的接口返回personId.之后又根据personId去匹配name的name.
- 如果直接是undefined.name. 这个时候,就会进行报错.
- /projects?name=&personId=123
    - name=会存在两种情况.一种是获得所有的情况,一种是认为是获得获得name=空的情况
        - 在json-server会认为是
- 使用qs解决问题
    - yarn add qs 解决query过多,写入过长的问题
- **这节课所讲到的提升分享组件状态.具体就是将子组件的状态提升到父组件当中,使得所有的子组件可以攻向父组件的状态**

## 07_学习自定义Hook 用useDebounce减少工程搜索请求频率
- 写代码比较重要的一个问题就是如何复用组件.如何让代码只写一次,可以在很多地方被使用.
    - 也就是著名的DRY原则
- Custom Hook是React中最新最优秀的组件代码复写方案.
- Hook不管是系统定义的还是自定义的,都是不可以在普通函数中运行的.只能在其他Hook中运行,或者是组件中运行.
    - 所以在写CustomHook中,一定要以use开头. => 这个Eslint也有规范性的要求
    - Custom最大的特征就是要使用到别的hook,如果不需要使用别的hook的话,那么一般就不必自定义hook.当函数就挺好.'

- 这个第二个return的函数,并不是组件即将卸载的时候执行.而是函数即将被卸载的时候执行.由于我理解的错误,导致了对这个函数的理解偏差.
- 同时useEffect并不能使用生命周期的思想去套.而是类似于.useEffect是一个全新的理解
```
// untils/index.ts
export const useDebounce = (value: any, delay: any) => {
    const [debounceValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => {
            return clearTimeout(timeout)
        }
    }, [value, delay]);
    return debounceValue;
}

```

```
// index.tsx
// 函数式组件每次重新render的时候,都会被重新更新.
const debouncedParam = useDebounce(param, 2000); // 当每次数据执行setXXX的时候，这个函数都会被重新赋值,上个函数也就会被更新.
//  console.log(debouncedParam); 每次数据更新,都会重新重新执行这个函数
console.log(debouncedParam);
useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
        if (response.ok) {
            setList(await response.json());
        }
    })
}, [debouncedParam]);
```
## 08_为什么我们需要TS 真实场景学习 TS 的必要性
- TS在静态时候,就会发现错误[这个就是强类型语言的好处].是为了类型约束
    - 使用Js,错误大多都是在runTime的时候发现的. 
- 在TS中是不允许引入undefined的,如果引入就会报错.
    - 但是在js中是可以的这样进行引入的
- d.ts是纯粹的说明书

## 09_将项目列表页面JS改造成TS，增强类型，减少Bug
- yarn add @types/qs -D => 安装在开发环境.
- 开发业务的时候d.ts基本会用不到的.d.ts就是给js文件打补丁的.
- 如果不给传入的参数 / 变量做类型定义的话,默认就是any
    - 过量使用any在ts中是有害的,如果写any的话,那么基本上就是在写js.
- @ts-ignore => 加在上面是忽略TS检查
- `()=>void` => 传入参数是这样进行表示的
- **写ts的时候要规范使用**

## 10_TS知识梳理、总结与提高
- TS是强类型的JS
- TS中的类型
    - number
    - string
    - array 一般指的是 所有元素类型相同
    - boolean 
    - 函数
        - 一种是JS函数上面直接声明参数和返回值
        - 直接声明想要的函数类型
    - any 表示任何值,被定义为any就意味着不做任何类型检查.
        - 取消了类型的保护和检查
    - void 绝大部分情况下,表示函数不返回任何值或者返回undefiend(因为函数不返回任何值的时候,返回的是undefined)
    - touple 和python的touple一致
        - useState就是一个典型的touple
    - null和undefined : null 和undefined在TS中既是一个值,又是一个类型
        - const u:undefined = undefined ;
        - const n:null = null ;
        - console.log(this.state);
    - unknow 可以表示任何值.当想用any的时候,使用unknown来代替.肩带来说,unknown就是一个严格版本的unknown
        - 可以使用unknown的特性,但是比any限制严格.
        - unknown可以赋值,但是不可以将为unknown类型的值赋给任何类型的值.也不能从unknown身上读取任何的方法   
    - never.用的比较少
    ```
    const func = ()=>{
        throw new Error()
    }
    ```
    - interface : 不是一种类型,应该被翻译为接口.创建一个我们自己的类型.
- 声明类型的时机
    - 理论上来说,我们声明任何变量的时候,都需要声明我类型.但是在很多时候,ts可以帮助我们进行自动推断,我们就不用声明了.
        - 声明 函数 / 组件 / hook 需要声明参数和返回值的类型

- d.ts文件 : d.ts文件可以让js文件维持自己JS文件的身份,而拥有TS的类型保护.
    - js文件 + d.ts文件 = ts文件
    - 一般我们写业务代码不会用到,但是点击类型跳转一般会跳转到d.ts文件.
- 同时也可以使用泛型来规范类型
## 11_学习泛型，用泛型增强useDebounce类型灵活性

```
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => {
            return clearTimeout(timeout)
        }
    }, [value, delay]);
    return debounceValue;
}
```
```
// 如果这样直接调用函数话,那么类型就会收到强制约束.这样使用泛型是非常好的
const debouncedParam = useDebounce(param, 2000); 
```

## 12_作业练习 用Hook+TS+TS泛型实现useArray
```
interface P{
    name:string,
    age:number,
}
    const persons1: P[] = [
        { name: '你好', age: 25 },
        { name: '世界', age: 27 }
    ]
```
```
// 这是上面的一种简写的方法
const persons: { name: string, age: number }[] = [
    { name: '你好', age: 25 },
    { name: '世界', age: 27 }
]
```
## 13_作业解答.用Hook + TS + TS泛型是新useArray

```
// 这个是使用泛型的典型的一个例子
export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
        value,
        setValue,
        add:(item:T)=>setValue([...value,item]),
        clear:()=>setValue([]),
        removeIndex:(index:number)=>{
            const copy = [...value];
            copy.splice(index,1);
            setValue(copy);
        }
    }
}
```
## 14_用React表单、TS的类型继承和鸭子类型实现登录表单
- 在TS中可以多传,但是不可以少传参数.
    - 在下面的具体体现就是,我们期望一个父接口.但是我们传了一个子接口.这样做是可以的.
```
interface Base {
    id: number
}
interface Advance extends Base {
    name: string
}
const test = (p: Base) => { }
const a: Advance = { id: 1, name: 'jack' };

test(a); // 这样做是可以的
```
- TS是一个鸭子(duck typing)类型.是面向接口编程,而不是面向对象边界.

```
// 其实上面的一行引入代码,不引入也是可以进行的
// import React from 'react';
export const LoginScreen = () => {
    const handleSubmit = (event: any) => {

    }
    return <form>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'usernameF'} />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'} />
        </div>
        <button type={'submit'}>登录</button>
    </form>
}

```

```
type typeFather<T> = [T];
type typeSon = typeFather<number>;
let a: typeSon= ['123']; // 这里就会报错,因为这里是一个赋值的关系.应该是number类型的123
```
- 这节课主要讲了
    - 使用json-server来模拟自定义API
    - 如何去写表单,获取表单的数据
    - 扩展了TS的知识点
- 执行的相关代码
    - `"json-server": "json-server __json__server__mock__/db.json --watch --port 3001 --middlewares __json__server__mock__/middleware.js"`

## 14_连接真实服务端 - 专属开发者⼯具介绍与安装
- 这个npm包的本质就是使用service-worker为原理,实现了分布式后端.
    - 本质上充当了web应用程序,浏览器和网络之间的代理服务器.
    - 以localStorage为数据库.
    - 可以实现请求的精准控制.
- 安装命令 `npx imooc-jira-tool`
    - npx imooc-jira-tool --registry=https://registry.npm.taobao.org
    - 这两种命令都是不可以直接安装的
        - 正确的办法是使用 yarn add jira-dev-tool
        - 然后在public中复制配置文件

## 15_来自讲师的重要提示
- 主要讲了一些提示,但是我没有遇到
## 16_JWT原理和provider实现
- jwt是一切以token为核心.
- 步骤是:
    - 把token存到localStorage中,然后每次请求中.在header中,都携带上token.然后服务端就可以辨认身份了.
- 这节课讲到了使用token的原理.以及编写了登录和注册.

## 17_用useContext存储全局用户信息
- 在React-Hook之前,管理全局变量使用的是类似于Redux.
    - 但是现在可以很方便的使用Context
- 主要使用的是
    - const AuthContext = React.createContext();
        -  return <AuthContext.Provider value={{ login, user }} children={children} />
    - const context = React.useContext(AuthContext); // 而在函数中使用跨组件主要使用的是React.useContext进行处理的.
        - 这个只能够是上面组件的子组件中引入context
            - const { user } = useAuth(); => 获得内容

## 18_使用useAuth切换登录和非登录状态
- 这节课主要讲的是添加了登录注册系统.其主要是两个组件.一个是登录,一个是非登录.然后登录和非登录的上级是一个变量.用来控制登录和非登录系统.
    - 类似于这种代码结构 : {isRegister ? <RegisterScreeen /> : <LoginScreen />}

## 19_用fetch抽象通用http请求方法
- 如何在登录状态.实现携带相关认证进行请求.
- 以下是代码
```
const apiUrl = process.env.REACT_APP_API_URL;
import qs from "qs";
import { logout } from './../auth-provider';

// 这个是解决报错的解决办法
interface Config extends RequestInit {
    token?: string,
    data?: object
};
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config) => {
    const config = {
        method: "GET",
        headers: {
            Authorazation: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig // 这个是会覆盖之前的值.比如说之前是GET.
    }
    if (config.method.toLocaleLowerCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || '');
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async resonse => {
        if (resonse.status === 401) { // 401表示 未登录的情况下,或者是token失效的情况下.
            // 所有的服务端都是返回200.真实的状态码包含在数据里,这样做是有些不符合restFul规范.
            // 执行到这里就要进行退出登录了.
            await logout();
            return Promise.reject({ message: '请重新登录' })
        } else {
            const data = await resonse.json();
            if (resonse.ok) { // 如果请求是成功的.
                return data;
            } else {
                return Promise.reject(data); // 手动抛出一个错误.
            }
        }
    })
}
// 当服务端返回401以及500的时候,fetch都不会抛出异常.fetch不会根据网络状态码抛出异常
// 只有在断网,网络请求失败的时候,才会抛出异常.但是这个概率是非常小的.
// 但是使用axios库的时候,当服务端返回401或者500的时候,是会捕捉到异常的.但是fetch是不可以捕捉到异常的.
```
## 20_用useHTTP管理JWT和登陆状态,保持登陆状态.
- 上文的http依然需要我们进行手动的传入比如说token,才可以去携带到参数里去. => 所以需要一个以这个为基础,可以自动携带类似token的方法.
- 如果函数要使用其他的hook的话,那么函数本身就必须是一个hook.
- 主要结合了token以及使用useHTTP封装了http请求

## 21_TS的联合类型 / Partial和Omit介绍
- 讲解TS操作符.Utility Types => 是一种充当工具的类型
    - Utility Types 是一种充当工具的类型.而Parameters就是Utility Types 中的一个
- 联合类型其实就是或者的意思.
- 类型别名
    - 这个有点像interface.都是在别的类型上组合成一个新的数据类型.
    - 类型别名和interface很多情况下,都是可以互换的.
- type和interce的区别是 
    - 联合类型,interface是无法实现的
    - 交叉类型也是无法实现的.
    - interface也没法实现 Utility Types 
```
// 联合类型
const myFavoriteNumber: string | number = 132;
console.log('查看相关数据');
console.log(myFavoriteNumber);
```
```
type favoriteNumber = string | number;
const roseFavorNumber: favoriteNumber = '56';

type Person = {
    name: string,
    age: number
}
const xiaoming: Partial<Person> = { age: 6 }; // 这样不加?,也是可以进行实现的.
const shenMiRen: Omit<Person, 'name'> = { age: 55 }; // 这样就实现了,只有age,而没有name的属性.
const shenMiRen1: Omit<Person, 'name' | 'age'> = { }; // 这样就可以把name和age进行删除.
```
- **TS以后再进行学习,现在还有很多需要进行学习的地方**

## 22_Ts中的UtilityTypes / Pick / Exclude / partial / Omit实现
```

// 泛型的基本使用
function identity<T>(arg: T): T {
    return arg
}
const numberOne = identity<number>(123);  // 这个是泛型的基本使用

// keyof的作用
type PersonKeys = keyof Person;
const PersonName: PersonKeys = 'name';
const PersonAge: PersonKeys = 'age';
// const PersonSex: PersonKeys = 'sex'; // 这里就会报错.因为keyOf是将对象所有的值给取出来.

// Partial的租用就是将所有的键都变为可选的状态.
// Prtial的实现.
type Partial<T> = {
    [P in keyof T]?: T[P]
    // keyof T就是一个联合类型
    // in在这里执行的就是一个遍历的动作.
    //之后就是?赋予一个可选的内容
}

// Omit的实现
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Omit又涉及到Pick
// Pick的作用是在对象里挑选几个键值,然后组成一个新的类型
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
type AnotherPerson = Pick<Person, 'name'>;
// extends的意思就是K必须要在T的集合键值里面的.就是必须是子集的意思.

// Exclude的实现.[exclude就是过滤的意思]
// exclude操作的是联合类型
type Age = Exclude<PersonKeys, 'name'>; // 现在这个age就是字符串类型

// Exclude的实现
// never就是什么都没有的意思
type Exclude<T, U> = T extends U ? never : T;

// Omit的实现.[这个现在还有点不懂]
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// TS约束的古越规范,出错的概率就越低.
```

## 23_安装与使用 antd 组件库
- antd
- emotion => 用JS的方式来写css
- 布局主要使用到flex以及grid
- 安装
    - 安装antd
    - 安装 yarn add @craco/craco
        - 以及 yarn add craco-less
- 以及ant的代码实现

## 24_为什么我们需要CSS-in-JS方案
- CSS-in-JS不指某一个具体的库,是指组织CSS代码的一种方式.代表库有style-components和emotion
- 传统CSS的缺陷
    - 没有模块化的概念.
    - 缺乏作用域
    - 隐式依赖,样式难以追踪
    - CSS选择器和HTML元素耦合
## 25_最受更欢迎的CSS-in-js方案-Emition的安装与使用
- 全局样式是只在App.css中编写
- 浏览器默认的像素是16px
    - 设置为font-size = 10px. => 那么就是10px. => 就比较容易去计算
- 安装命令 : yarn add @emotion/react @emotion/styled

```
// 一个简易的使用demo
import styled from '@emotion/styled'

<Background />

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed; // 决定了背景图片是否会随着我们页面的滑动而一起滑动
    background-position: left bottom , right bottom;
    background-size: calc(((100vw - 40rem)/2)-3.2rem),calc(((100vw - 40rem)/2)-3.2rem),cover;
    background-image: url(${left}),url(${right});
`;

```
## 26_用Grid和Flexbox布局优化项目列表页面
- 这节课主要讲了grid布局和flex布局
- flex和grid布局的区别
    - 一维布局是flex,二维布局是grid.
    - 从内容出发,可伸缩 =>使用grid => flex
    - 从布局出发 => 先规画网格.往网格里填充 => grid
## 27_使用Css-In-JS状态工程创建自定义组件-Row组件实现
- <HeaderItem as='div'>用户</HeaderItem> => 这样渲染的就是渲染的是一个div标签
- 使用emotion渲染非常像react的组件. => 类似于下面的.
    - 直接阅读官方文档比较好.这里只记录一个使用方式
```
import styled from "@emotion/styled";
import { OmitProps } from "antd/lib/transfer/ListBody";

export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBootom?: number
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom:${props => props.marginBootom + 'rem'};
> *{
    margin-top: 0 !important;
    margin-top: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`
```
```

import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
export const AuthenticateApp = () => {
    const { logout } = useAuth();
    return <div>
        {/* 这个代表的是目前的整个登录后的状态 */}
        {/* 如果是直接使用方法名的话,还可以这么写的 */}
        <Containter>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <h2>LOGO</h2>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Containter>
    </div>
}

const Containter = styled.header`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
height: 100vh;
`;
const Header = styled(Row)``;
const Main = styled.main``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const HeaderItem = styled.h3`margin-right:3rem`;
```

## 28_完善项目列表页面样式
- React中限制还是蛮大的.没法使用直接子元素之类的CSS标签.
    - 也没法使用:hover之类的伪元素以及伪类.
- 所以可以使用emotion的行内样式
```
// 找到的结局办法如下.emotion11版本和react11的处理办法
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
```
- 安装时间管理的package.是dayjs.
    - moment已经停止维护了
- 使用svg组件代替img标签,达到更好的自定义效果

## 29_清除前面课程留下的警告信息
- ts中的object指的是,而不是我们平常理解的object
```
let a: object;
a = { name: 'kack' };
a = () => { };
a = new RegExp('');
const b = { ...() => { } };
// 也可以对一个函数进行解构,这样解构是没有意义的.所以得到的值就是一个空对象.
// 所以TS引擎干脆就返回了一个空对象
```
- object: {[key:string]:unknown}.而这样就是表示的是要一个键值对,而不要其他的类型.
    - [key:string].就像es6中的引入key的方式是一样的.这里的key就如同一个变量.也可以用其他的字符串去代替.
- 不知道的类型不要写any,而去写unknow是更好的方式.
- **由于Jira版本问题,控制台会显示报错.但是不影响功能.由于网络问题,这个不做更新.**
    - 对后续版本产生影响,这里选择了安装 : yarn add jira-dev-tool@next
        - 以及需要安装reacy-query. [两个版本号是如下]
            - "react-query": "^3.34.11"
            -  "jira-dev-tool": "^1.6.59"
    - 之后修改相关的配置
## 30_给页面添加Loading和Error状态,增加页面友好性.
- 这节课主要讲了给页面添加loading和Error状态.

```
    <List dataSource={list} users={users} loading={isLoading}></List>
```

```
// 这个是TS重要的代码.可以允许使用解构赋值的方式去操作.
interface ListProps extends TableProps<Project> {
    users: User[]
};
<Table
    pagination={false}
    ...
    {
    ...props
    }
>
</Table >
```

## 31_用高级Hook-useAsync统一处理Loading和Error状态.
- 主要讲了前端层面的代码封装:封装完之后的project-list/index.tsx中是非常清爽的.

## 32_登陆注册页面Loading和Error状态处理.
- 因为SetState是一个异步操作.
    - 当同步和异步混用的时候,我们应该用的是try catch
- 记得熟悉下宏任务和微任务

## 33_用useAsync获取用户信息
- 主要讲了使用useAsync获取用户信息.
- 以及加载Loading的信息以及Error的信息


## 34_实现Error Boundaries,捕获边界错误
- 在前几节课讲的是异步请求[HTTP请求]发生错误的时候,是如何处理的.
- 现在讲的是在渲染阶段抛出的异常的处理.
- 报错代码信息只会在开发模式种显示,在生产环境中是不会进行显示的,不会受到影响.
- 如果在渲染阶段出现异常的话,那么整个的组件树都会被卸载掉. since react 16
    - React团队认为一个错误的UI比一个空白的UI害处会更大一些.
- 点开React中,两个TS泛型定义P代表的是Props,S代表的是State.
- 但是通过事件抛出异常的时候,ErrorBoundary是不会被捕获到的.
- 其实是有一个库的 => react-error-boundary

## 35_用useRef实现userDocumentTitle-useRef与Hook闭包详解[上]
- 第一种是使用包=> react helmet
    - 可以配置header中相关信息的配置.
- 这种是手动配置的
```
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = document.title
    console.log('渲染时的title', oldTitle);

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) { // 当不保留的时候,就显示为页面刚加载的标题
                console.log('卸载时的oldtitle', oldTitle);
                document.title = oldTitle;
            }
        }
    }, [])
}
```
## 36_用useRef实现userDocumentTitle-useRef与Hook闭包详解[下]
- react hook 与闭包,hook与闭包经典的坑
```
// 以下代码解释了react中闭包的相关问题
        const test = () => {
            let num = 0
            const effect = () => {
                num += 1
                const message = `现在的num值是${num}`
                return function unmount() {
                    console.log(message)
                }
            }
            return effect;
        }
        const add = test()
        const unmount = add()
        add()
        add()
        unmount() // 实际上这个时候打印的还是1.这是由于静态对象的重新赋值的问题
        // 闭包就是由于函数内部引用外部的变量,所以外部的变量不会被销毁.
```
- 而像React中,useMount和useEffect只会在页面加载的时候执行一次.并且里面形成了一个闭包.作用域引用的就是页面加载的时候的变量.在后续无论页面怎么渲染,变量怎么变化.useMount和useEffect都不会再执行了.
    - 如何避免.每次变量进行变化的时候,都重新更新
    ```
    useEffect(()=>{
        return ()=>{
            console.log(num)
        }
    },[num])//监听num
    ```
- 所以在闭包中遇到了依赖问题的时候,已经要首先检查依赖项的处理.
    - 注意的是,定时器如果引用外部变量,也是一个闭包.

- 对于闭包是个隐藏的知识点.可以使用useRef解决隐式闭包的问题,同时,语义更加明确.
    - useRef返回一个可变的ref对象.其中.current属性被初始化为传入的参数(initiaValue).返回的ref对象在组件的整个生命周期内保持不变.
## 37_添加项目列表和项目详情路由
- 单页面应用使用路由,是必不可少的.React-Router是应用最为广泛的配置.
- 安装
    - yarn add react-router@6 react-router-dom@6
- React Router 6中,所有的路由配置都需要有一个Routes进行包裹
    - Route也是一个组件,可以直接进行传值.
    - `<Route path={'/projects'} element={<ProjectListScreen />} ></ Route>` => 路径匹配到element.

- 以及需要安装 history
    - 我卸载掉了.没有阅读使用说明.不知道这个是干嘛.现在没有影响到项目进行.

- 报错 : useRoutes() may be used only in the context of a <Router> component.
    - 需要包裹<Router>,来自react-router-dom

- <Router>就像是自己写的Context,这样就可以在组件间共享信息了.
    - 路由的参数 / pathName
- React-router和react-router-dom的关系类似于和React和React-Dom/React-native/React-vr.
    - react是一个核心的库,里面主要涉及到了一些虚拟的,计算的,理论的逻辑.类似于组件中的State / useEffect的状态.如何来影响虚拟DOM树 / 两次虚拟DOM树的运算
        - 经过一些列计算,得出的结果就会被React-Dom消费.
    - 为什么不将所有的放置在一起.
        - 因为React-Dom主要生活在浏览器的宿主环境中.而这些DOM操作只可以在浏览器中运行.
        - React-Native是在ios/android来消费react消费的结果.
    - 而react-router主要是用来管理路由状态.计算此时此刻的路由树是怎样的.
        - 计算结果就会给react-router-dom来进行消费.或者给native来进行消费.

- link为什么在react-dom中引入.因为link会被渲染为一个a标签.处理事件等等,这些都是和宿主环境强关联的.
- React-router-dom@6中,当点击的是一个Route下面的Link的时候,就会默认认为要去的是Route的子路由
    - 就会把ProjectId给直接赋值到Project后面.比如说`/project/6`
- TS只在静态的时候处理.
## 38_添加看板和任务组路由
- 这节课主要讲了如何嵌套路由.这个v6-beta版本和现在的版本是有区别的.
    - 注意的是嵌套路由不可以有`/`出现.出现`/`意味着是跟路由
    - react-router-v5的重定向改为了`<Route path='*' element={<Navigate to={'kanban'} />} />`
- 以及使用点击logo的时候.执行了`window.localtion.origin`跳转到首页

## 39_初步实现useUrlQueryParam管理URL参数状态
- 单页面应用的特点就是,当切换路由的时候,并不会重新加载文档.无论怎么切换路由,都是会在同一个文档里面.页面也不会进行刷新.
    - 使用vue / react开发的大部分都是单页面应用.

- 但是比如说通过URL分享一个页面,是自动填入参数的.我们在单页面应用中也需要做到这个.
    - 要使用到React-Router和React-Hook相结合.

- `as const`
    - ts会认为这种数组,在ts中也可以称为集合.里面的类型都是应该保持一致的.每一个类型都是一样的.为了做到一样.就让他们都有一个共有的类型. => 这个就是TS实现的
    - 如果返回最原始的类型,就是使用 as const
    -   as const 大多数的时候就是为了解决这个问题的
        - `const a = ['jack', 12, { gender: 'male' }] as const`
- 所有的类型,都可以去阅读函数签名

- 使用 useSearchParams获得query参数

## 40_使用useMemo解决循环依赖问题

- 只有泛型允许我们进行不指定.根据传入的值,来动态的判断类型.
- 帮助我们查看,是什么一直渲染页面
    - yarn add --dev @welldone-software/why-did-you-render
    - 在组件中引入的话
    ```
    ProjectListScreen.whyDidYouRender = true;

    // 如果是Class组件
    class Test extends React.Component{
        static whyDidYouRender = true
    }
    ```
- codesandbox可以在线编写一些前端代码
```
// 以下代码会造成重估渲染页面
export default function App(){
    const obj = {name:'jack'};
    const [num,setNum] = useState(0);
    useEffect(()=>{
        console.log('effect')
        setNum(num+1) // 由于这里的变化,这其中是会重复进行渲染的.
    },[obj]); // 因为这里比对的是对象.对象比较的是内存地址.如果是基础数据的话,比对的值.
    
    return (
        <div>
        </div>
    )
}
```
- 而像这样
    - 如果发生数据变化的时候,React不会对比对象的内存地址.而是只有显式的刻意调用setObj的时候.react才会认为obj发生了改变.
        - 其他时候,都不会认为这个obj发生了改变.
```
const [obj,setObj] = useState({name:'jack'})
useEffect(()=>{

},[obj])
```
```
// 显式的指定类型
const [keys] = useState<('name'|'personId')[]>(['name','personId']) 
```
- 这节课解决了无限循环渲染列表的标题
- 基本类型可以放在依赖中,组件状态可以放到依赖中.非组件状态的对象绝对不可以放到依赖中

## 41_完成URL状态管理与JS中的iterator讲解
- unknow表示对象值的类型是没有关系的.
    - Object.fromEntries 是Object.enteris的你操作.
    - iteartor是一个遍历器.[],{},Map都是部署了iteartor的.部署了iteartor的都可以使用for of 进行操作的
- 这节课也将了iterator.这个在ES6中是有介绍的.

## 42_实现id-selecttsx解决id类型难题
- 解决发送数据为String类型的数字.但是后端需要匹配的是Number类型的数字的问题.
    - 解决办法是单独封装了一个通用的组件
- 透传Props: 允许用户在props中传递更多属性.

## 43_抽象user-select组件选择用户
- 不会包含模版代码的文件是ts文件,包含模板代码的文件是tsx文件
- 这节课主要实现了,使用user-select选择用户.

## 44_用useEditProject编辑项目
- 需要完成的需求
    - 项目的收藏和取消收藏
    - 项目的编辑和删除功能
    - 项目的创建
- 定义一个组件要先定义组件的Props
    - 封装一个其他的组件,要保证这个组件有透传的能力. => 也就是可以传递多个参数.
        - `interface PinProps extends React.ComponentProps<typeof Rate>` => 类似于这样.

- 也可以这样得到值.同样的是利用ES6的解构赋值
```
export default function Pin({ checked, onCheckedChange, ...restProps } : PinProps) {
    ...
}
```
- `onCheckedChange?.(!!num)` => 如果onCheckedChange是空的时候,那么什么也不操作.
- React Hook必须放在顶层 || 最外层,是不能够放在其他函数里的.
    - 所以对于在hook中传递参数,在调用的时候传递参数是有一些问题的.
    - 解决办法是
```
export const useEditProject = () => {
    const { run } = useAsync()
    const client = useHTTP()
    const mutate = (params: Partial<Project>) => {

    }
    return {
        // 返回一个纯函数,可以随便在别的地方进行调用.
        mutate // 这样导出.在需要使用的地方引入.就可以在所有地方调用了.
    }
}
```
- 如果两个参数获取的时机不一样,也可以尝试使用柯里化.
- 这节课主要学习了如何使用Hook进行增删改的操作.

## 45_编辑后刷新-useState的懒初始化与保存函数状态
- 以下讲到的不会正式使用到代码中,但是可以
    - 学习到更多的useState / useRef / Promise / Proxy的相关知识.
    - 包括使useState / useRef的注意事项
    - 还有其他的产生无线循环的场景
- 在组件每一次渲染的时候,都是在不停的执行组件中的代码的.每次渲染,组件中的变量都是要进行重新赋值的.
- 找BUG很重要的就是隔绝环境.独立复现.
- 如果使用useState存储函数的话,函数每次都是会被运行的.即使没有被调用.**所以在useState中保存函数,react会认为这是一个更新惰性值的操作**
    - 这个是React的惰性初始.可以参见官网.惰性初始只会在组件的初始渲染中起作用.后续渲染时,将会被忽略.如果参数需要通过复杂计算获得,则可以传入一个参数.在函数中计算并返回初始的state.此函数只在初始渲染时被调用
        - 在state中传入一个函数,react并不认为这是一个需要保存的函数.而是要获得函数返回后调用的值.
        - 惰性操作是非常消耗性能的操作.
```
import "./styles.css";
import React from "react";

export default function App() {
  const [lazyValue, setlLzyValue] = React.useState(() => {
    return "我是一个昂贵的操作";
  });
  console.log(lazyValue);
  return (
    <div className="App">
      <button
        onClick={() => {
          setlLzyValue(() => {
            console.log("每次都会被执行"); // 函数体内的代码每次点击都会被执行
            return "昂贵的操作被更新了"; // 但是如果值相同的话,那么将不会主动更新State.
          });
        }}
      >
        点击我
      </button>
      <div>123121</div>
    </div>
  );
}
```
- 如果想要在state中使用函数的话
```
import "./styles.css";
import React from "react";

export default function App() {
  const [lazyValue, setlLzyValue] = React.useState(() => ()=>{
    alert('我是一个昂贵的操作')
  });
  console.log(lazyValue);
  return (
    <div className="App">
      <button
        onClick={() => {
          setlLzyValue(() => ()=>{
            alert('我更新了一个昂贵的操作')
          });
        }}
      >
        点击我
      </button>
      <button onClick={lazyValue}>触发</button>
      <div>123121</div>
    </div>
  );
}

```

- 也可以使用这种方式进行赋值函数
    - 但是这个并不会更新,因为使用useRef定义的值,并不是组件的状态.它只是一个普通的变量.
    - useRef这个容器保存的值,由于并不是组件状态.所以并不会触发组件重新渲染.所以下面定义的callBack还是第一次渲染时的callBack.
        - 这个是使用useRef需要注意的点
```
import "./styles.css";
import React from "react";

export default function App() {
  const callBackRef = React.useRef(()=>console.log('我是一个函数'))
  const callBack = callBackRef.current //这个callBack读取到的值,如果不重新渲染组件的话,这个值并不会跟随着去更新的.
  return (
    <div className="App">
      <button
        onClick={() => {
          callBackRef.current = ()=>console.log('我被更新了');
          
        }}
      >
        点击我
      </button>
      <button onClick={callBack}>触发</button>
      <div>123121</div>
    </div>
  );
}

```
```
import "./styles.css";
import React from "react";

export default function App() {
  const callBackRef = React.useRef(()=>console.log('我是一个函数'))
  return (
    <div className="App">
      <button
        onClick={() => {
          callBackRef.current = ()=>console.log('我被更新了');
          
        }}
      >
        点击我
      </button>
      <button onClick={()=>callBack.current()}>触发</button>
      <div>123121</div>
    </div>
  );
}
```
- 解决callBack不能够及时更新的方式是如下 : 每次都动态的获取其值.
```
import "./styles.css";
import React from "react";

export default function App() {
  const callBackRef = React.useRef(() => console.log("我是一个函数"));
  return (
    <div className="App">
      <button
        onClick={() => {
          callBackRef.current = () => console.log("我被更新了");
        }}
      >
        点击我
      </button>
      {/* 强制读取currentBack的最新值 */}
      <button onClick={()=>callBackRef.current()}>触发</button>
      <div>123121</div>
    </div>
  );
}
```
- 而如果使用 : `<button onClick={callBackRef.current}>触发</button>`
     - 这个读取的是第一次加载的值.并不是动态更新之后的值.所以并不会随着改变

## 46_完成编辑后刷新功能
- Promise的状态是不可逆的
- retry主要实现的功能是:用户编辑信息后,保持编辑之前的参数,再次请求后台.
- 这里讲到了一个概念,乐观更新
- 跨组件传递状态.可以使用状态提升.把变量提升到父组件的状态.
    - 也可以使用redux进行共享变量.适用于更广泛的变量传递情况

## 47_useCallback应用,优化异步请求
- 优化 组件已经退出并销毁,但是Promise仍然会执行.之后执行state导致报`Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`的问题
    - 使用以下的组件进行判断状态.

```
export const useMountedRef = () => {
    const mountedRef = useRef(false)
    useEffect(() => {
        // 在页面被加载完的时候调用.这个时候返回的是true
        mountedRef.current = true
        return () => { // 页面被卸载的时候返回的是false
            mountedRef.current = false
        }
    })
    return mountedRef
}
```
- 使用useCallBack用的多了以后,迟早会面临的一个问题
    - 在useEffect用到了state,但是又把state加到了useEffect的依赖中.可能会造成无限循环刷新的问题.
    - 解决办法就是在useCallBack中,不要直接用到state.
        - 在useState中使用函数.使用函数会对比值是否一致.如果一致,则不进行更新数据
        ```
                setState(prevState => {
                return { ...prevState, stat: 'loading' };
            });
        ```
- useMemo和useCallBack都是为了依赖而存在的.具体说,就是非基本类型的依赖.
    - 如果定义的非基本类型想要做依赖,就需要使用useMemo || useCallBack 把非基本类型限制住.不要每次页面渲染的时候都会重新创建.
    - 经验之谈 : 
        - 如果在自定义的Hook中返回函数,那么非常大的概率使用的是useCallback.
        - 理解下 **useMemo和useHook**的区别.
- 如果涉及到依赖,一定要非常注意.
## 48_状态提升,组合组件与控制反转[上]

- 关于React中的变量提升 => 组件在代码上下文中,可以在执行代码前进行调用.
```
export const AuthenticateApp = () => {
    return (
        <div>
            <Containter>
                <PageHeader />
                ...
            </Containter>
        </div>
    )
}
const PageHeader = () => {
    return (<Header between={true}>
        ...
    </Header>)
}
```
- 其中的原理类似于这样.
```
    const print = () => d
    const d = 123;
    console.log(print());
```
- 适量的行内样式是ok的,并不是一个洪水猛兽

## 49_状态提升,组合组件与控制反转[下]
- 不止一次使用到的代码可以考虑抽象.
    - 不重复写一样的代码.
- 多层使用到同一个状态,叫做 prop drawing.
    - 使得状态变得难以维护,定义和状态离得太远了.
    - 并且耦合性变高
    - 解决办法
        - 使用组件组合`（component composition）`.
            - 这个是更轻量级的方案
            - 使用传递组件代替了传递状态.好处是状态可以统一进行管理
            - 子组件和状态解耦.以及不用担心如何去消费状态.
            - 不好的地方是将逻辑提升到组件树的更高层次来处理.[参见官网]
        - 讲到了控制反转的设计模式 : `https://zhuanlan.zhihu.com/p/60995312`
            - 现在引擎和轮胎的创建不再直接依赖它们的构造函数，而是通过 IoC 容器 (container) 来创建，使得 Car 类 和 Engine，Tires 没有了强耦合关系。代码中不再依赖于具体，而是依赖于 container 抽象容器，即要针对接口编程，不针对实现编程。过去思维中想要什么依赖，需要自己去 “拉” 改为抽象容器主动 “推” 给你，你只管使用实体就可以了。这是依赖倒转 (DIP) 的一种表现形式。
        - 使用React-redux
## 50_合并组件状态_实现useUndo
- 这节课学习的主要是redux以及redux toolkit,以及尝试自己尝试实现一个undo的hook
    - use-undo可以对state进行退回以及前进的相关操作.也是一个非常适合讲解use_Reducer的案例.
- 如果在自定义的hook中,返回函数的话,最为合理的方式的是加上一个useCallBack
- never[] 表示的是一个空数组,神恶魔也没有的一个数组
- 这节课主要完成了use-undo的实现.主要是实现了对步骤的相关记录.
    - 并且把三个互相影响的关联状态给结合到一起,减少对多state的依赖.减少了代码的复杂性

## 51_用useReducer进行状态管理.
- 泛型中的<T>表示的是Type,<D>表示的是Data
- 什么时候使用useState或者useReducer
    - 在功能上,两者是可以进行互换的.
    - useState适合于定义单个的状态,useReducer适合于定义一群会互相影响的状态.
        - 如果在适合使用useReducer的地方,使用useReducer.那么会帮助代码变得更加合理

## 52_Reducx用法介绍
- 全局状态管理的最佳实践 : 全局状态越少越简单越好.
- redux可以用到react / vue 以及js中.redux是一个可预测的状态容器.
    - github上的redux的介绍
    - 可预测指的是,状态是为一个纯函数
- react-redux是用来连接redux和react.js的
- 用法参照git上面的counter-vanilla

## 53_react-redux和Hoc
- 学习一样东西的时候,最重要的是先了解的是学习的东西起到了什么作用.在生态中占据了什么位置.
    - react-redux干了什么事情?
        - 将redux中的状态和react中的状态连接起来.
- react-redux中有一个容器组件和展示组件分离,也是高阶组件中的一个
    - 但是hook出现了之后,打破了这种模式
- **到后期需要了解React的高阶组件,以及高阶组件解决了什么问题**
```
// 类似于这样
const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI) // 这个是API的用法
```
- react非常注重抽象嗲吗和代码复用
- react中的hook的发展历程
    - mixin
    - hoc
        - 服用代码的方案,类似于python中的装饰器.
    - 组件和展示分离模式
    - render props
    - hook
        - 实现原理是闭包
## 54_为什么我们需要react-thunk
- 异步操作被认为不是纯函数.
- redux的设计理念和react是相似的.
    - 其中比较state的对象,是比较的引用地址.
- redux-thunk是用来处理异步最流行的库
    - 可以帮助我们隐藏一部或者同步的细节

## 055_配置redux-toolkit
- 使用redux-toolkit也就相当于使用redux.
    - redux-toolkit在redux的基础上封装,解决了三个问题.将复杂逻辑简单化的redux.现在也逐渐成为了使用redux的标准方式
        - 解决redux配置复杂
        - 需要安装更多的依赖
        - 需要很多模板代码.
- 安装命令 yarn add react-redux @reduxjs/toolkit
    - 这里切换了分支,因为toolkit和其他的解决方式是成竞争关系的
- immer是可以创建一个对象的影子.修改值会创建新的对象

## 056_应用redux_tooklkit管理模态框
- 需要安装redux的声明的文件
    - yarn add @types/react-redux -D
- redux会报一个错
    - could not find react-redux context value; please ensure the component is wrapped in a <Provider>
    - redux也是使用的是context / provider
    - redux推荐使用的是在最外层包裹一个Provider
- **这一块的实现的逻辑比较绕,需要自己去梳理下**

## 057_使用redux-thunk管理登陆状态
- 主要讲的是使用redux-toolkit的默认异步状态管理方案redux-thunk来管理登陆状态
    - context和redux是成竞争关系的.

## 058_使用url参数管理项目模态框状态
- 在原本的方案里使用到的是context,并不会使用到redux
    - 线上项目的ProjectModal使用的url进行状态.
- 返回tuple最大的好处是,返回值可以任意明明
    - 一般来说,返回的数据在三个以内.用toupe是比较合适的
    - 超过三个之后,使用对象是比较合适的.
        - 对象不好的地方就是名字被限制住了
```
// 类似于这样,接受的时候.可以任意命名
    return [
     projectCreate === 'true',
     open,
     close   
    ] as const
```
## 059_使用react-query来处理服务器缓存  
- react-query: 把数据用缓存的思路来进行处理.这个缓存是概念上的缓存
    - 此外,还有一个类似react-query的库.叫做SWR
    - 这个缓存在整个软件所有的地方都可以访问缓存,也可以对缓存进行更新.
    - 把redux的全局状态.换一个思路去理解.理解为缓存.reqct-query类似于redis的思路

## 060_类型守卫,用useQuery缓存工程列表
- 安装react-query.目前使用的版本是3.34
- 如果是unknow,是不可以读取上面任何的属性的
    - 这里的解决办法是手动传入泛型
    - 或者是使用类型守卫
- 类型守卫,主要目的是为了解决类型匹配的问题.
    - 如果isError的返回值为true的话,后续的TS就会把error当作为真正的Error类型
```
// 类型守卫
const isError = (value: any): value is Error => value?.message

// 由于React-Query返回的格式是unknow,这里需要使用到类型守卫.
export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type={'danger'}>{error.message}</Typography.Text>
    }
    return null
}
```
- react最擅长的就是获取列表数据.这样react-query就更多的扮演到之前的useAsync的角色

## 061_编辑和添加工程功能[上]
- 主要编写了编辑状态的相关信息

## 062_编辑和添加工程功能[下]
- Hook是没有办法在函数中使用的.
- 这两个课时主要是完成了编辑项目和添加项目.
    - 其中在编辑项目和添加项目两个hook同时设置关闭的时候.后设置的hook会不生效.目前没有找到优雅的解决办法.该问题目前的解决办法是一次进行两个变量的完全设置

## 063_使用react-query实现乐观更新
- 乐观更新在英文中是叫做 optimistic updates.
    - 是一种UI行为.在服务端返回之前,UI会提前成功.如果后端失败的话,会进行一个回滚.
- 这里涉及到一个TS的类型推断功能.主要涉及到类型签名.

## 064_抽象乐观更新通用hook
- 这节课主要抽象了乐观更新.以及完成了乐观更新的删除功能

## 065_修复url多余参数
- 主要修复了相关参数的问题.比如说从新建页面返回到主界面的时候,参数为空,但是URL界面中仍然显示相关的参数

## 066_跨组件状态管理方案总结
- 小场面
    - 状态提升 / 组合组件.比如说父组件传递props
- 缓存状态
    - react-query / swr
- 客户端状态
    - url[浏览器的url] / redux / context

- 也有一种解决办法是全用同一种方式.比如说全用redux.但是这种方式会带来的问题是,会得到一个庞大的redux树.
## 067_解决前面的3个bug
1.关闭编辑项目的表单,在创建表单的时候.数据会显示在创建表单的数据中
2.解决了点击编辑页面的时候,只有在数据加载出来的时候才会进行展示.现在的解决办法是监测的是ProjectId
3.解决了退出之后.再登录,缓存数据仍然被使用.解决办法是退出的时候,清空掉react-query的数据.

## 068_看板列表开发准备工作
- `<Route path='*' element={<Navigate to={'kanban'} />} />`
    - 如果都不符合路由,就会跳转到这个路由当中去.比如说像这样`http://localhost:3000/projects/1/kanban`
    - 默认路由执行的是一个push的动作.回退的时候,检测不到路由.又会进行匹配默认路由.就会造成一个循环.
        - 如何解决这个问题.添加一个属性`replace : true`
            - 这个时候执行的一个动作,是replace
- 编辑器是有一个重构功能.以及编辑器是有一个自动引入的功能的
- 这节课主要实现了类型定义和请求路由的编写

## 069_看板列表初步开发
- 在业务文件下下面新建的util.ts中的文件都是仅仅和业务相关的文件.
- 而在根文件夹下面的util.ts就和业务没有那么大的关联了.属于在项目里被随时使用的方法
- const { data: kanbans = [] } = uesKanbans()
    - 在TS中,设置 = []. 是添加默认数据
- 遇到map,不要忘记添加key
- react-query会做一件事.如果固定时间内发送相同的参数到相同的接口.那么会把他们合并起来,只发送一个.

## 070_添加task bug 图标
- 后端给一个type.用typeId获取type的明细
- svg图片代码出现了一些错误.需要修改webpack配置,这里由于时间限制,手动修改了svg图片内容

## 071_添加任务搜索功能
- 完成了代码添加功能

## 072_优化看板样式
- flex容器中的子元素的和父元素的元素默认是一样高的

## 073_创建看板与任务
- 创建面板的时候,乐观更新也是起作用的.说明了代码复用的好处.
- 这节课完成了添加面板数据

## 074_编辑任务功能
- 主要完成了任务的编辑功能
- 完成了搜索框的debounce设置.但是由于版本的原因.除了一些bug.现在搜索没有使用到debounce

## 075_看板和任务删除功能
- 主要完成了看板页面的删除功能

## 076_拖拽实现[上]
- 完成拖拽的库是 react-beautiful-dnd
  - 众多的拖拽库中的一个
- 拖拽也不是经常使用的功能
- React.cloneElement是克隆的一个行为.
- React.forwardRef=>这个是用户传入的时候,可以使用ref

## 077_拖拽实现[下]

## 078_拖拽持久化[上]
- html自带的元素是可以进行转发ref的

## 079_拖拽持久化[下]
- 这块知识的前置知识应该是熟悉React以及react-beautiful-dnd.现在直接学习的话,理解起来梯度过大.

## 080_乐观更新排序
- 主要实现了乐观更新排序

## 081_任务组页面[上]
- 组件使用单个闭合标签
- 完成了创建任务组的相关内容

## 082_任务组页面[下]
- 完成了新建和编辑功能

## 083_完成用户popover

## 084_开发完成,部署页面
- 快速部署站点到地址上.
    - 成本最低的方式是部署到githubpages上.
- 推荐直接部署到以及页面上,部署到二级页面上会导致路有冲突.有些麻烦.
  - 并且介绍了如何推送到github的静态页面上.  

## 085_用代码分割优化性能
- 使用useCallBack以及useMemo
- 打包的时候,使用代码分割
  - 在react使用 import(filePath)会自动进行代码分割.使用Create React App 即是开箱即用.
  - 以及react-lazy => 其实是异步加载代码.使用代码的时候,再进行加载.

## 086_使用ReactMemo优化组件性能
- React默认的行为:父组件的state修改状态,子组件会重新被渲染[无论状态是否会对子组件造成影响].
  - 如何避免
    - 使用 React.memo(). 和自己无关的状态发生改变的时候,会避免被渲染.
      - 被React.memo包裹的组件只有在两种情况下会被渲染.
        - 浅对比Props.
        - 使用全局状态的redux.
    - React.memo适合于比较耗费性能的组件.使用场景是比较少的.因为React.memo自身就已经耗费了性能.并且React本身已经非常快了.
- React.memo和useMemo的区别
  - React.memo是针对的组件,useMemo是针对的值.
  
## 087_改变默认聚焦刷新设置(使用React自带组件查看性能信息)
- React自带了一个性能追踪的功能 Profiler
  - 一个项目里可以有多个Profiler
- 造成React会多次渲染是因为React Query的默认设置.在失去又得到焦点的时候,又会重新发送请求.

## 088_使用ReactProfiler追踪性能信息
- 这个和上面的课程讲授的是一致的

## 089_自动化测试简介
- 自动化测试的好处 => 让我们对自己写的代码更有信息,防止出现'新代码破坏旧代码'的无限循环
- 分类 
  - 单元测试:传统单元测试 /  组件测试 / hook测试
    - 传统单元测试就是类似于测试某个函数的功能的
  - 集成测试
  - e2e测试 (端对端测试. end to end )
  - 粒度是从上往下越来越大的
## 090_传统单元测试
- 依赖
  - testing-library 已经被预先安装了
  - @testing-library/react-hooks @testing-library/react-hooks msw也需要安装
    - msw是mock服务器数据的.而单元测试是不应该去服务器真的请求数据的.
      - 理论上来说,也是可以使用jsonserver请求数据的.但是json-server不是用来做这个事情的.
- 在src下新建一个文件夹 __tests__
  - 这个是约定俗成的名字.
  - ject的默认设置也是该文件夹
- 单元测试的整个环境都要求是自己可以控制的.
  - 所有的请求都是mock的数据,不会是真正的发送出去.
- 测试命令是 `npm run test`