
// 登录手机号与密码
export const getPhoneLigin= data => `/login/cellphone?phone=${data.phone}&password=${data.password} `

//个人详情
export const getinfoUser= id=> `/user/detail?uid=${id}`