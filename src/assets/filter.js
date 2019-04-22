// 题目类型
function QuestionType (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '单选题'; break;
    case 2: status = '多选题'; break;
    case 3: status = '判断题'; break;
    default: status = '其他';
  }
  return status
}

let transform = {
  QuestionType: QuestionType
}
export default transform
