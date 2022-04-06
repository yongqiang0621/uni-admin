import uniHttp from 'rt-unipc-utils/request';
//定义user类
class User {
	// 微信登录
	login(data){
		return uniHttp.post('/api/user',data)
	}

}
export const user = new User();
