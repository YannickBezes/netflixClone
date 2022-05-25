export default {
  bind(el, binding, vnode) {
    el.clickOutside = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutside)
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutside)
  }
}
