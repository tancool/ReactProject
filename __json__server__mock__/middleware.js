// 因为这个是node,要使用common.js的语法
module.exports = (req, res, next) => {
    if (req.method === "POST" && req.path === '/login') {
        if (req.body.username === 'test' && req.body.password === '123') {
            console.log('yes');
            return res.status(200).json({
                user: {
                    token: 123
                }
            })
        } else {
            return res.status(400).json({ message: '用户名或者密码错误' });
        }
    }
}