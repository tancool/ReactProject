import { rest } from 'msw'
import { setupServer } from 'msw/node' // 用来mock异步请求
import { http } from 'utils/http'

// 配置mock环境
const apiUrl = process.env.REACT_APP_API_URL

const server = setupServer()

// jest是对react最友好的一个测试库
// beforeAll 代表执行所有的测试之前.先来执行的回调钩子
beforeAll(() => server.listen())

// 每一个测试跑完后,都重置mock路由
afterEach(() => server.restoreHandlers())

// 所有的测试跑完后,关闭mock路由
afterAll(() => server.close())

// 代表一个测试单元
test('http方法发送异步请求', async () => {
    const endPoint = 'test-endpoint' // 请求地址
    const mockResult = { // 返回数据
        mockValue: 'mock'
    }
    server.use(
        // 模拟的一个接口
        rest.get(`${apiUrl}/${endPoint}`,
            (req, res, ctx) => {
                return res(ctx.json(mockResult))
            })
    )
    const result = await http(endPoint)
    expect(result).toEqual(mockResult)
})

test('http请求时会在header里带上token', async () => {
    const token = 'FAKE_TOKEN'
    const endpoint = 'test-endpoint'
    const mockResult = { mockValue: 'mock' }
    let request: any
    server.use(
        rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
            request = req;
            return res(ctx.json(mockResult))
        })
    )
    await http(endpoint, { token })
    expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})