import qs from "qs";
import { logout } from './../auth-provider';
import { useAuth } from 'context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

// 这个是解决报错的解决办法
interface Config extends RequestInit {
    token?: string,
    data?: object
};
// 如同下面的代码,在前面解构,但是又加上一个可选的值,这样做是不被允许的.但是可以选择加上一个默认值
// 当一个参数有默认值的时候,就自动变成可选的了.
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig // 这个是会覆盖之前的值.比如说之前是GET.
    }
    if (config.method.toLocaleUpperCase() === 'GET') {
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

export const useHTTP = () => {
    const { user } = useAuth(); // 在所有的函数里都可以使用到useAuth获取登陆状态.因为这个是已经包装过的函数.
    // TODO 讲解TS操作符
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }); // 这里要求传递的数据类型的touple.
    // Parameters<typeof http> 这个是可以直接使用http的类型定义.现在这一块还不太清楚.
}










/**
 *  以下代码和项目没有关系,而是TS的学习
 */


// 联合类型
const myFavoriteNumber: string | number = 132;
// console.log('查看相关数据');
// console.log(myFavoriteNumber);

// 类型别名
//    这个有点像interface.都是在别的类型上组合成一个新的数据类型.
//    类型别名和interface很多情况下,都是可以互换的.
// - type和interce的区别是 
//   - 联合类型,interface是无法实现的
//   - 交叉类型也是无法实现的.
//   - interface也没法实现 Utility Types 
type favoriteNumber = string | number;
const roseFavorNumber: favoriteNumber = '56';

type Person = {
    name: string,
    age: number
}
const xiaoming: Partial<Person> = { age: 6 }; // 这样不加?,也是可以进行实现的.
const shenMiRen: Omit<Person, 'name'> = { age: 55 }; // 这样就实现了,只有age,而没有name的属性.
const shenMiRen1: Omit<Person, 'name' | 'age'> = {}; // 这样就可以把name和age进行删除.






/***
 * 又一章节 : _Ts中的UtilityTypes / Pick / Exclude / partial / Omit实现
*/

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