export const setValue = function(key, value) {
  GM_setValue(key, value)
}
export const getValue = function(key) {
  return GM_getValue(key)
}


const setElementAttributes = function(element, attributes) {
  Object.keys(attributes).forEach(key => {
    if (key === 'innerHTML') {
      element.innerHTML = attributes[key]
    } else if (key === 'innerText') {
      element.innerText = attributes[key]
    } else {
      element.setAttribute(key, attributes[key])
    }
  })
}
export const setAttribute = function(selector, attributes) {
  const elements = document.querySelectorAll(selector)
  elements.forEach(element => setElementAttributes(element, attributes))
}
export const createElement = function(tagName, attributes) {
  const element = document.createElement(tagName)
  setElementAttributes(element, attributes)
  return element
}
export const appendElement = function(parentNode, tagName, attributes) {
  const element = createElement(tagName, attributes)
  parentNode.appendChild(element)
}
export const insertElement = function(parentNode, nextNode, tagName, attributes) {
  const element = createElement(tagName, attributes)
  parentNode.insertBefore(element, nextNode)
}
export const removeElement = function(parentNode, childNode) {
  parentNode.removeChild(childNode)
}


export const hasOwn = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export const getCookie = function(name) {
  const cookies = document.cookie.split(';').reduce((cookies, cookieString) => {
    const i = cookieString.indexOf('=')
    const name = cookieString.substr(0, i).trim()
    const value = cookieString.substr(i + 1)
    cookies[name] = value
    return cookies
  }, {})
  return cookies[name]
}

export const getColorSortByName = function(name) {
  const index = [
    /* 0: 无法判断 */
    /^<(hiw|wht)>/i, /* 1: 白 */
    /^<hig>/i,       /* 2: 绿 */
    /^<hic>/i,       /* 3: 蓝 */
    /^<hiy>/i,       /* 4: 黄 */
    /^<hiz>/i,       /* 5: 紫 */
    /^<hio>/i,       /* 6: 橙 */
    /^<(hir|ord)>/i, /* 7: 红 */
  ].findIndex(regexp => regexp.test(name))
  if (index === -1 && /^<...>/i.test(name)) console.error(name)
  return index + 1
}
