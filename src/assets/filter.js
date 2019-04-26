// 题目类型
function QuestionType(value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '单选题'; break;
    case 2: status = '多选题'; break;
    case 3: status = '判断题'; break;
    default: status = '';
  }
  return status
}

function ApplicationType(value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '初次考核'; break;
    case 2: status = '换证'; break;
    case 3: status = '再教育'; break;
    default: status = '';
  }
  return status
}

function SignInType(value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '考试'; break;
    case 2: status = '模拟'; break;
    case 3: status = '培训'; break;
    default: status = '';
  }
  return status
}

let transform = {
  QuestionType: QuestionType,
  ApplicationType: ApplicationType,
  SignInType: SignInType
}
export default transform
