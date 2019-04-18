export const COMPONENTS = {
  Question: resolve => require(['@/components/Question'], resolve),
  Home: resolve => require(['@/views/Home'], resolve),
  Notice: resolve => require(['@/components/home/Notice'], resolve),
  Exercises: resolve => require(['@/components/home/Exercises'], resolve),
  Personal: resolve => require(['@/components/home/Personal'], resolve),
  Login: resolve => require(['@/components/home/Login'], resolve)
}
