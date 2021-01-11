export function bin2hex(s: string) {
  //  discuss at: https://locutus.io/php/bin2hex/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Linuxworld
  // improved by: ntoniazzi (https://locutus.io/php/bin2hex:361#comment_177616)
  //   example 1: bin2hex('Kev')
  //   returns 1: '4b6576'
  //   example 2: bin2hex(String.fromCharCode(0x00))
  //   returns 2: '00'
  let i;
  let l;
  let o = "";
  let n;
  s += "";
  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? "0" + n : n;
  }
  return o;
}

export function hex2bin(s: string) {
  //  discuss at: https://locutus.io/php/hex2bin/
  // original by: Dumitru Uzun (https://duzun.me)
  //   example 1: hex2bin('44696d61')
  //   returns 1: 'Dima'
  //   example 2: hex2bin('00')
  //   returns 2: '\x00'
  //   example 3: hex2bin('2f1q')
  //   returns 3: false
  const ret = [];
  let i = 0;
  let l;
  s += "";
  for (l = s.length; i < l; i += 2) {
    const c = parseInt(s.substr(i, 1), 16);
    const k = parseInt(s.substr(i + 1, 1), 16);
    if (isNaN(c) || isNaN(k)) return false;
    ret.push((c << 4) | k);
  }
  return String.fromCharCode.apply(String, ret);
}
