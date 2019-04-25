export const COMPONENTS = {
  Question: resolve => require(['@/components/Question'], resolve),
  SignIn: resolve => require(['@/components/SignIn'], resolve),
  Home: resolve => require(['@/views/Home'], resolve),
  Notice: resolve => require(['@/components/home/Notice'], resolve),
  Exercises: resolve => require(['@/components/home/Exercises'], resolve),
  Personal: resolve => require(['@/components/home/Personal'], resolve),
  Login: resolve => require(['@/components/home/Login'], resolve),
  UnitChange: resolve => require(['@/components/unitChange/UnitChange'], resolve),
  UnitForm: resolve => require(['@/components/unitChange/UnitForm'], resolve),
  MyInfo: resolve => require(['@/components/personal/MyInfo'], resolve),
  Certificate: resolve => require(['@/components/personal/Certificate'], resolve),
  UserChoice: resolve => require(['@/components/UserChoice'], resolve),
}
