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