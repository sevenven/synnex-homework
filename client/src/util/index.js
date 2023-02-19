/**
 * handle hight light text
 * @param text：hight light text
 * @param key：hight light key
 * @returns：String with highlight
 */
export const highlightText = (text, key) => {
  if (text == null || key == null || key === '') return text;
  const highlightStr = `<span class="text-active">${key}</span>`;
  const reg = new RegExp(key, "g");
  return text.replace(reg, highlightStr);
}

function gen(name: string, mods?: Mods): string {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }

  if (Array.isArray(mods)) {
    return mods.reduce((ret, item) => ret + gen(name, item), '');
  }

  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? gen(name, key) : ''), '');
}

/**
 * bem helper
 *
 * const bem = createBEM（'button'）
 * bem() // 'button'
 * bem('text') // 'button__text'
 * bem({ disabled }) // 'button--disabled'
 * bem('text', { disabled }) // 'button__text button__text--disabled'
 * bem(['disabled', 'primary']) // 'button--disabled button--primary'
 */
export function createBEM(name: string) {
  return function (el?: Mods, mods?: Mods): string {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? `${name}__${el}` : name;

    return `${el}${gen(el, mods)}`;
  };
}

/**
 * Generate class definition scope space
 * @param name：Specify component namespace name
 * @returns：[Scope space，bem method]
 */
export function createNamespace(name: string, prefix = 'synnex') {
  const prefixedName = `${prefix}-${name}`;
  return [prefixedName, createBEM(prefixedName)];
}