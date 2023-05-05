import { MockMethod } from "vite-plugin-mock"
import { resultSuccess,resultError, resultPageSuccess} from '../_utils'
import { Random } from "mockjs";

const roleData :Array<any>= [
    {
        id: 1,
        name: '超级管理员',
        roleCode: 'ROLE_admin',
        description: '超级管理员',
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
      },
      {
        id: 2,
        name: '编辑员',
        roleCode: 'ROLE_editor',
        description: '编辑员',
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
      },
      {
        id: 3,
        name: '运营员',
        roleCode: 'ROLE_operater',
        description: '运营员',
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
      },
];
export default [
    {
        url: '/api/role/list',
        method: 'get',
        response: ({headers,body,query}) =>{
           const {page = 1, limit =10} = query
           const fluterResult = roleData.filter((n)=>n.name.includes(query.name || ''))
           return resultPageSuccess(page,limit, fluterResult)
        }
    },{
        url: '/api/role/info',
        method: 'get',
        response: ({ headers,body,query}) => {
            const result = roleData.find((n) => n.id == query.id);
            return resultSuccess( {... result} )
        }
    },{
        url: '/api/role/add',
        method: 'post',
        response: ({headers,body,query}) =>{
            let lastId = roleData[roleData.length -1].id
            const role = {id:lastId+1, name:body?.name, roleCode:body?.roleCode,description:body?.description,createTime: Random.now('yyyy-MM-dd HH:mm:ss')}
            roleData.push(role)
            return resultSuccess([])
        }
    },{
        url: '/api/role/del',
        method: 'post',
        response: ({headers,body,query}) =>{
            // roleData = roleData.filter((item) => item.id !== 2);
            const indexToRemove = roleData.findIndex((item) => item.id === query.id);
            if (indexToRemove !== -1) {
            roleData.splice(indexToRemove, 1);
            }
            return resultSuccess([])
        }
    }
] as MockMethod[]