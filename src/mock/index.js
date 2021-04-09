import Mock from 'mockjs';

Mock.mock('/api/userlist', 'get', {
    status: 200,
    message: '获取用户信息成功！',
    data: [
        { key: 1, nid: 1, name: 'tab', sex: '男', age: 22, school: '第一中学', desc: '热爱班级活动，尊敬老师' },
        { key: 2, nid: 2, name: 'shift', sex: '男', age: 22, school: '第一中学', desc: '热爱班级活动，尊敬老师' },
        { key: 6, nid: 6, name: 'ctrl', sex: '男', age: 22, school: '第一中学', desc: '热爱班级活动，尊敬老师' },
        { key: 4, nid: 4, name: 'caps lock', sex: '男', age: 22, school: '第一中学', desc: '热爱班级活动，尊敬老师' },
        { key: 5, nid: 5, name: 'enter', sex: '女', age: 22, school: '第一中学', desc: '热爱班级活动，尊敬老师' }
    ]
})