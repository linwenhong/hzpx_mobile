function setCache (name, data, convert = false) {
  data = convert ? JSON.stringify(data) : data;
  localStorage.setItem(name, data)
}

function getCache (name, convert = false) {
  const data = localStorage.getItem(name);
  return convert ? JSON.parse(data) : data
}

function set (name, data, convert = false) {
  data = convert ? JSON.stringify(data) : data;
  sessionStorage.setItem(name, data)
}

function get (name, convert = false) {
  const data = sessionStorage.getItem(name);
  return convert ? JSON.parse(data) : data
}

// isPermanent 是否永久缓存
function clear (names = [], isPermanent = false) {
  names.map(name => {
    if (isPermanent) {
      localStorage.removeItem(name)
    } else {
      sessionStorage.removeItem(name)
    }
  })
}

function clearAll (isPermanent = false) {
  if (isPermanent) {
    localStorage.clear()
  } else {
    sessionStorage.clear()
  }
}

export default {
  setCache,
  getCache,
  set,
  get,
  clear,
  clearAll
}

