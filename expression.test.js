// const IMLibFormat = require('../../src/js/INTER-Mediator-Format.js')
// const INTERMediatorLib = require('../../src/js/INTER-Mediator-Lib.js')
/*
 cd spec
 ../vendor/bin/node ../node_modules/.bin/jest
 */
let parser = require('./index.js')
let IMLibFormatLib = require('./node_modules/inter-mediator-formatter/index')

beforeEach(() => {
  IMLibFormat = IMLibFormatLib
})

test('Fundamental calculations with four arithmetic operations and power operation.', () => {
    expect(parser.evaluate('2 ^ x', {x: 3})).toBe(8)
    expect(parser.evaluate('x + y', {x: 3, y: 5})).toBe(8)
    expect(parser.evaluate('2 * x + 1', {x: 3})).toBe(7)
    expect(parser.evaluate('2 + 3 * x', {x: 4})).toBe(14)
    expect(parser.evaluate('(2 + 3) * x', {x: 4})).toBe(20)
    expect(parser.evaluate('2-3^x', {x: 4})).toBe(-79)
    expect(parser.evaluate('-2-3^x', {x: 4})).toBe(-83)
    expect(parser.evaluate('-3^x', {x: 4})).toBe(-81)
    expect(parser.evaluate('(-3)^x', {x: 4})).toBe(81)
    expect(parser.evaluate('(x+(x-3)*2)', {x: 5})).toBe(9)
    expect(parser.evaluate('(x/(x-3)*2)', {x: 5})).toBe(5)
    expect(parser.evaluate('x + y', {x: 5.1, y: 3.1})).toBe(8.2)
    expect(parser.evaluate('x + y', {x: "1,200", y: 300})).toBe(1500)
    expect(parser.evaluate('x - y', {x: "1,200", y: 300})).toBe(900)
    expect(parser.evaluate('x * y', {x: "1,200", y: 300})).toBe(360000)
    expect(parser.evaluate('x / y', {x: "1,200", y: 300})).toBe(4)
  }
)

test('Checking choice function.', () => {
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: 0, a1: 'zero', a2: 1, a3: 2})).toBe('zero')
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: 1, a1: 'zero', a2: 1, a3: 2})).toBe(1)
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: 2, a1: 'zero', a2: 1, a3: 2})).toBe(2)
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: 3, a1: 'zero', a2: 1, a3: 2})).toBe(undefined)
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: 4, a1: 'zero', a2: 1, a3: 2})).toBe(undefined)
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: -1, a1: 'zero', a2: 1, a3: 2})).toBe(undefined)
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: null, a1: 'zero', a2: 1, a3: 2})).toBe('zero')
    expect(parser.evaluate('choice(x, a1, a2, a3)', {x: undefined, a1: 'zero', a2: 1, a3: 2})).toBe('zero')
  }
)

test('Checking condition function.', () => {
    expect(parser.evaluate(
      'condition(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: -5, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe(120)
    expect(parser.evaluate(
      'condition(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: 5, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe(130)
    expect(parser.evaluate(
      'condition(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: 15, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe(140)
    expect(parser.evaluate(
      'condition(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: 25, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe(undefined)
    expect(parser.evaluate(
      'condition(z<x1, a1, z<x2, a2, z<x3)',
      {z: 5, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe(130)
    expect(parser.evaluate(
      'condition(z<x1, a1, z<x2, a2, z<x3)',
      {z: 15, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe(undefined)
  }
)

test('Checking accumulate function.', () => {
    expect(parser.evaluate(
      'accumulate(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: -5, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe('120\n130\n140\n')
    expect(parser.evaluate(
      'accumulate(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: 5, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe('130\n140\n')
    expect(parser.evaluate(
      'accumulate(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: 15, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe('140\n')
    expect(parser.evaluate(
      'accumulate(z<x1, a1, z<x2, a2, z<x3, a3)',
      {z: 25, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe('')
    expect(parser.evaluate(
      'accumulate(z<x1, a1, z<x2, a2, z<x3)',
      {z: 5, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe('130\n')
    expect(parser.evaluate(
      'accumulate(z<x1, a1, z<x2, a2, z<x3)',
      {z: 15, x1: 0, a1: 120, x2: 10, a2: 130, x3: 20, a3: 140})).toBe('')
  }
)

test('Handling zero and "" with add operation', () => {
    expect(0 + 0).toBe(0)
    expect('' + 0).toBe('0')
    expect(0 + '').toBe('0')
    expect('' + '').toBe('')
    expect(parser.evaluate('x + y', {x: 0, y: 0})).toBe(0)
    expect(parser.evaluate('x + y', {x: '', y: 0})).toBe("0")
    expect(parser.evaluate('x + y', {x: 0, y: ''})).toBe("0")
    expect(parser.evaluate('x + y', {x: '', y: ''})).toBe('')
    expect(parser.evaluate('x + y', {x: 1, y: 1})).toBe(2)
    expect(parser.evaluate('x + y', {x: '', y: 1})).toBe("1")
    expect(parser.evaluate('x + y', {x: 'z', y: 1})).toBe("z1")
    expect(parser.evaluate('x + y', {x: 'z', y: ''})).toBe('z')
  }
)

test('Logical operations', () => {
    expect(parser.evaluate('a = b ', {a: 100, b: 100})).toBe(true)
    expect(parser.evaluate('a = b ', {a: 99, b: 100})).toBe(false)
    expect(parser.evaluate('a == b ', {a: 100, b: 100})).toBe(true)
    expect(parser.evaluate('a == b ', {a: 99, b: 100})).toBe(false)
    expect(parser.evaluate('a >= b ', {a: 99, b: 100})).toBe(false)
    expect(parser.evaluate('a <= b ', {a: 99, b: 100})).toBe(true)
    expect(parser.evaluate('a > b ', {a: 99, b: 100})).toBe(false)
    expect(parser.evaluate('a < b ', {a: 99, b: 100})).toBe(true)
    expect(parser.evaluate('a != b ', {a: 99, b: 100})).toBe(true)
    expect(parser.evaluate('a != b ', {a: 100, b: 100})).toBe(false)
    expect(parser.evaluate('a <> b ', {a: 99, b: 100})).toBe(true)
    expect(parser.evaluate('a && b ', {a: true, b: false})).toBe(false)
    expect(parser.evaluate('a || b ', {a: true, b: false})).toBe(true)
    expect(parser.evaluate('a > 10 && b < 10', {a: 11, b: 9})).toBe(true)
    expect(parser.evaluate('a > 10 || b < 10', {a: 11, b: 12})).toBe(true)
    expect(parser.evaluate('a && b', {a: [null], b: 12})).toBe(null)
    expect(parser.evaluate('a || b', {a: [null], b: 12})).toBe(12)
    expect(parser.evaluate('a && b', {a: 12, b: [null]})).toBe(null)
    expect(parser.evaluate('a || b', {a: 12, b: [null]})).toBe(12)
    expect(parser.evaluate('a && b', {a: [99], b: 12})).toBe(12)
    expect(parser.evaluate('a || b', {a: [99], b: 12})).toBe(99)
    expect(parser.evaluate('a → b', {a: false, b: false})).toBe(true)
    expect(parser.evaluate('a → b', {a: true, b: false})).toBe(false)
    expect(parser.evaluate('a → b', {a: false, b: true})).toBe(true)
    expect(parser.evaluate('a → b', {a: true, b: true})).toBe(true)
  }
)
test('Uncommon operations.', () => {
    expect(parser.evaluate('a + b ', {a: 'abc', b: 'def'})).toBe('abcdef')
    expect(parser.evaluate('a ⊕ b ', {a: 123, b: 456})).toBe('123456')
    expect(parser.evaluate('a ⊕ b ', {a: '123', b: '456'})).toBe('123456')
    expect(parser.evaluate('a - b ', {a: 'abcdef', b: 'def'})).toBe('abc')
    expect(parser.evaluate('a - b ', {a: 'abcdef', b: 'xyz'})).toBe('abcdef')
    expect(parser.evaluate('a - b ', {a: 'abcdef', b: 'dbfx'})).toBe('abcdef')
    expect(parser.evaluate('a ∩ b ', {a: 'abcdef', b: 'bdfx'})).toBe('bdf')
    expect(parser.evaluate('a ∪ b ', {a: 'abcdef', b: 'bdfx'})).toBe('abcdefx')
    expect(parser.evaluate('a ⊁ b ', {a: 'abcdef', b: 'bdfx'})).toBe('ace')
    expect(parser.evaluate('a ⋀ b ', {a: 'abc\ndff\nghi', b: 'dff\nstu\n'})).toBe('dff\n')
    expect(parser.evaluate('a ⋀ b ', {a: 'abc\rdff\r\nghi', b: 'dff\r\nstu'})).toBe('dff\r')
    expect(parser.evaluate('a ⋀ b ', {a: 'abc\r\ndff\r\nghi', b: 'dff\r\nstu'})).toBe('dff\r\n')
    expect(parser.evaluate('a ⋁ b ', {a: 'abc\ndff\nghi', b: 'xyz\nstu\n'})).toBe('abc\ndff\nghi\nxyz\nstu\n')
    expect(parser.evaluate('a ⊬ b ', {a: 'abc\ndff\nghi', b: 'ghi\ndkg\n'})).toBe('abc\ndff\n')
  }
)
test('Logical operations.', () => {
    expect(parser.evaluate('a <> b ', {a: 1, b: 2})).toBe(true)
    expect(parser.evaluate('a <> b ', {a: 1, b: '2'})).toBe(true)
    expect(parser.evaluate('a <> b ', {a: '1', b: '2'})).toBe(true)
    expect(parser.evaluate('a <> b ', {a: '2', b: '2'})).toBe(false)
    expect(parser.evaluate('a <> b ', {a: 2, b: '2'})).toBe(false)
    expect(2 != '02').toBe(false)
    expect(parser.evaluate('a <> b ', {a: 2, b: '02'})).toBe(false)
    expect(2 != '02x').toBe(true)
    expect(parser.evaluate('a <> b ', {a: 2, b: '02x'})).toBe(true)
    expect(2 == '02').toBe(true)
    expect(parser.evaluate('a = b ', {a: 2, b: '02'})).toBe(true)
    expect(2 == '02x').toBe(false)
    expect(parser.evaluate('a = b ', {a: 2, b: '02x'})).toBe(false)
    expect(parser.evaluate('a <> b ', {a: 'abc', b: 'def'})).toBe(true)
    expect(parser.evaluate('a != b ', {a: 1, b: 2})).toBe(true)
    expect(parser.evaluate('a != b ', {a: 1, b: '2'})).toBe(true)
    expect(parser.evaluate('a != b ', {a: '1', b: '2'})).toBe(true)
    expect(parser.evaluate('a != b ', {a: '2', b: '2'})).toBe(false)
    expect(parser.evaluate('a != b ', {a: 'abc', b: 'def'})).toBe(true)
  }
)
test('isnull function test', () => {
    expect(parser.evaluate('isnull(a)', {a: null})).toBe(true)
    expect(parser.evaluate('isnull(a)', {a: ""})).toBe(false)
    expect(parser.evaluate('isnull(a)', {a: 0})).toBe(false)
    expect(parser.evaluate('isnull(a)', {a: 1})).toBe(false)
    expect(parser.evaluate('isnull(a)', {a: false})).toBe(false)
    expect(parser.evaluate('isnull(a)', {a: undefined})).toBe(false)
  }
)

test('Functions test.', () => {
    INTERMediatorLocale = {
      'decimal_point': '.',
      'thousands_sep': ',',
      'int_curr_symbol': 'JPY ',
      'currency_symbol': '¥',
      'mon_decimal_point': '.',
      'mon_thousands_sep': ',',
      'positive_sign': '',
      'negative_sign': '-',
      'int_frac_digits': '0',
      'frac_digits': '0',
      'p_cs_precedes': '1',
      'p_sep_by_space': '0',
      'n_cs_precedes': '1',
      'n_sep_by_space': '0',
      'p_sign_posn': '1',
      'n_sign_posn': '4',
      'AM_STR': 'AM',
      'PM_STR': 'PM',
      'grouping': {
        '0': '3',
        '1': '3'
      },
      'mon_grouping': {
        '0': '3',
        '1': '3'
      }
    }
    let x
    expect(Math.round(parser.evaluate('sin(PI/4)') * 100)).toBe(71)
    expect(Math.round(parser.evaluate('cos(PI/4)') * 100)).toBe(71)
    expect(Math.round(parser.evaluate('tan(PI/4)') * 100)).toBe(100)
    expect(Math.round(parser.evaluate('asin(0.707106781186547)/PI*4*100'))).toBe(100)
    expect(Math.round(parser.evaluate('acos(0.707106781186547)/PI*4*100'))).toBe(100)
    expect(parser.evaluate('atan(1)/PI*4')).toBe(1)
    expect(Math.round(parser.evaluate('sqrt(3)') * 100)).toBe(173)
    expect(parser.evaluate('abs(3.6)')).toBe(3.6)
    expect(parser.evaluate('abs(-3.6)')).toBe(3.6)
    expect(parser.evaluate('ceil(4.6)')).toBe(5)
    expect(parser.evaluate('floor(4.6)')).toBe(4)
    expect(parser.evaluate('round(4.6)')).toBe(5)
    expect(parser.evaluate('ceil(4.4)')).toBe(5)
    expect(parser.evaluate('floor(4.4)')).toBe(4)
    expect(parser.evaluate('round(4.4)')).toBe(4)
    expect(parser.evaluate('round(2837.4629, 0)')).toBe(2837)
    expect(parser.evaluate('round(2837.4629, 1)')).toBe(2837.5)
    expect(parser.evaluate('round(2837.4629, 2)')).toBe(2837.46)
    expect(parser.evaluate('round(2837.4629, 6)')).toBe(2837.4629)
    expect(parser.evaluate('round(2837.4629, -1)')).toBe(2840)
    expect(parser.evaluate('round(2837.4629, -3)')).toBe(3000)
    expect(parser.evaluate('round(2837.4629, -4)')).toBe(0)
    expect(parser.evaluate('ceil(-4.6)')).toBe(-4)
    expect(parser.evaluate('floor(-4.6)')).toBe(-5)
    expect(parser.evaluate('round(-4.6)')).toBe(-5)
    expect(parser.evaluate('ceil(-4.4)')).toBe(-4)
    expect(parser.evaluate('floor(-4.4)')).toBe(-5)
    expect(parser.evaluate('round(-4.4)')).toBe(-4)
    expect(parser.evaluate('format(1500)')).toBe('1,500')
    expect(parser.evaluate('format(1500.9)')).toBe('1,501')
    expect(parser.evaluate('format(-1500)')).toBe('-1,500')
    expect(parser.evaluate('format(-1500.9)')).toBe('-1,501')
    expect(Math.round(parser.evaluate('exp(0.5)') * 100)).toBe(165)
    expect(Math.round(parser.evaluate('log(0.5)') * 100)).toBe(-69)
    x = parser.evaluate('random()')
    expect(x > 0 && x < 1).toBe(true)
    x = parser.evaluate('random()+1')
    expect(x > 1 && x < 2).toBe(true)
    expect(parser.evaluate('pow(2,3)')).toBe(8)
    expect(parser.evaluate('min(3,1,2,1,5,1)')).toBe(1)
    expect(parser.evaluate('max(3,1,2,1,5,1)')).toBe(5)
    expect(parser.evaluate('list(3,1,2,1,5,1)')).toBe('3\n1\n2\n1\n5\n1\n')
    expect(parser.evaluate('fac(5)')).toBe(120)
    expect(parser.evaluate('pyt(3,4)')).toBe(5)
    expect(parser.evaluate('atan2(0.5, 0.5)/PI')).toBe(0.25)

    expect(parser.evaluate('min(a)', {a: [3, 3, 2, 1, 5, 1]})).toBe(1)
    expect(parser.evaluate('max(a)', {a: [3, 3, 2, 1, 5, 1]})).toBe(5)

    expect(parser.evaluate('length(f)', {f: 'Test'})).toBe(4)
    expect(parser.evaluate('length(f)', {f: '日本語'})).toBe(3)
    expect(parser.evaluate('length(f)', {f: -3152})).toBe(5)
    expect(parser.evaluate('length(f)', {f: 23.5678})).toBe(7)
    expect(parser.evaluate('length(f)', {f: true})).toBe(4)
    expect(parser.evaluate('length(f)', {f: false})).toBe(0) // false is 0 length value
    expect(parser.evaluate('length(f)', {f: '&lt;&amp;&gt;'})).toBe(13) // not 3
  }
)

test('Equal with zero-len str vs null.', () => {
    let exp, vals, result

    exp = 'a = b'
    vals = {a: '', b: null}
    result = parser.evaluate(exp, vals)
    expect(result).toBe(false)
  }
)
test('Equal with zero-len str and numerics 0.', () => {
    let exp, vals, result

    exp = 'a = b'
    vals = {a: '', b: 0}
    result = parser.evaluate(exp, vals)
    expect(result).toBe(true)
  }
)
test('Equal with numbers and numerics 0.', () => {
    let exp, vals, result

    exp = 'a = b'
    vals = {a: '0', b: 0}
    result = parser.evaluate(exp, vals)
    expect(result).toBe(true)
  }
)
test('Equal with numbers and numerics 1.', () => {
    let exp, vals, result

    exp = 'a = b'
    vals = {a: '1', b: 1}
    result = parser.evaluate(exp, vals)
    expect(result).toBe(true)
  }
)
test('Not equal with numbers and numerics 0.', () => {
    let exp, vals, result

    exp = 'a != b'
    vals = {a: '0', b: 0}
    result = parser.evaluate(exp, vals)
    expect(result).toBe(false)
  }
)

test('Calculate integer values.', () => {
    let exp, vals, result

    exp = 'dog * cat'
    vals = {dog: [20], cat: [4]}
    result = parser.evaluate(exp, vals)
    expect(result).toBe(80)
  }
)
test('Calculate integer and float values.', () => {
    let exp, vals, result

    exp = 'round(dog * cat, 1)'
    vals = {dog: [29], cat: [4.1]}
    result = parser.evaluate(exp, vals)
    expect(result).toBe(118.9)
  }
)
test('Sum function and array variable.1', () => {
    let result = parser.evaluate('sum(p)', {p: [1, 2, 3, 4, 5]})
    expect(result).toBe(15)
  }
)
test('Sum function and array variable.2', () => {
    let result = parser.evaluate('sum(p)', {p: ['1,000', '1,000', '1,000', 5]})
    expect(result).toBe(3005)
  }
)
test(
  'Sum function and array variable.3', () => {
    let result = parser.evaluate('sum(p)', {p: [1.1, 1.1, 1.1, 5]})
    expect(result).toBe(8.3)
  }
)
test(
  'Sum function and array variable.4', () => {
    let result = parser.evaluate('sum(p)', {p: ['1,111,111', '1,111,111', '1,111,111']})
    expect(result).toBe(3333333)
  }
)
test(
  'If function and array variable.2', () => {
    let result = parser.evaluate('if(a = 1,\'b\',\'c\')', {a: [1]})
    expect(result).toBe('b')
  }
)
test(
  'If function and array variable.3', () => {
    let result = parser.evaluate('if(a = 1,\'b\',\'c\')', {a: [2]})
    expect(result).toBe('c')
  }
)
test(
  'If function and array variable.4', () => {
    let result = parser.evaluate('if((a+1) = (1+b),\'b\'+c,\'c\'+c)', {a: [2], b: [4], c: 'q'})
    expect(result).toBe('cq')
  }
)
test(
  'If function and array variable.5', () => {
    let result = parser.evaluate('if((a+1) = (1+b),\'b\'+c,\'c\'+c)', {a: [4], b: [4], c: 'q'})
    expect(result).toBe('bq')
  }
)
//    'Triple items function', () => {//        let result = parser.evaluate('(a = 1) ? 'YES' : 'NO'', {a: [1])
//        expect(result, 'YES');
//    },

test('Calculate strings.', () => {
    let exp, vals, result

    exp = 'dog + cat'
    vals = {dog: ['Bowwow!'], cat: ['Mewww']}
    result = parser.evaluate(exp, vals)
    expect(result).toBe('Bowwow!Mewww')
  }
)
test('Calculate string and numeric.', () => {
    let exp, vals, result

    exp = 'dog + cat'
    vals = {dog: ['Bowwow!'], cat: ['4.3']}
    result = parser.evaluate(exp, vals)
    expect(result).toBe('Bowwow!4.3')
  }
)
test('String constant concat variable.', () => {
    let result = parser.evaluate('\'I\\\'m a \' + exp + \'.\'', {exp: ['singer']})
    expect(result).toBe('I\'m a singer.')
  }
)
test('String substract concat variable.', () => {
    let result = parser.evaluate('exp - \'cc\'', {exp: ['saccbaccda']})
    expect(result).toBe('sabada')
  }
)
test('variables containing @ character.', () => {
    let result = parser.evaluate('c@x + c@y', {'c@x': [20], 'c@y': [2]})
    expect(result).toBe(22)
  }
)
test('Japanese characters variables.', () => {
    let result = parser.evaluate('テーブル@値1 + テーブル@値2', {'テーブル@値1': [20], 'テーブル@値2': [2]})
    expect(result).toBe(22)
  }
)
test('Wrong expression.1', () => {
  try {
    parser.evaluate('(a + b', {'a': [20], 'b': [2]})
  } catch (e) {
    expect(e.message).toBe('parse error [column 6]: unmatched "()"')
  }
})
test('Wrong expression.2', () => {
  try {
    parser.evaluate('a + b + malfunction(a)', {'a': [20], 'b': [2]})
  } catch (e) {
    expect(e.message).toBe('undefined variable: malfunction')
  }
})

test('each 3-digits should be devided.', () => {
    INTERMediatorLocale = {
      'decimal_point': '.',
      'thousands_sep': ',',
      'int_curr_symbol': 'JPY ',
      'currency_symbol': '¥',
      'mon_decimal_point': '.',
      'mon_thousands_sep': ',',
      'positive_sign': '',
      'negative_sign': '-',
      'int_frac_digits': '0',
      'frac_digits': '0',
      'p_cs_precedes': '1',
      'p_sep_by_space': '0',
      'n_cs_precedes': '1',
      'n_sep_by_space': '0',
      'p_sign_posn': '1',
      'n_sign_posn': '4',
      'AM_STR': 'AM',
      'PM_STR': 'PM',
      'grouping': {
        '0': '3',
        '1': '3'
      },
      'mon_grouping': {
        '0': '3',
        '1': '3'
      }
    }
    expect(parser.evaluate('format(999, 0)')).toBe('999')
    expect(parser.evaluate('format(1000, 0)')).toBe('1,000')
    expect(parser.evaluate('format(999999, 0)')).toBe('999,999')
    expect(parser.evaluate('format(1000000, 0)')).toBe('1,000,000')
    expect(parser.evaluate('format(1000000.678, 1)')).toBe('1,000,000.7')
    expect(parser.evaluate('format(1000000.678, 2)')).toBe('1,000,000.68')
    expect(parser.evaluate('format(1000000.678, 3)')).toBe('1,000,000.678')
    expect(parser.evaluate('format(1000000.678, 4)')).toBe('1,000,000.6780')
    expect(parser.evaluate('format(-1000000.678, 1)')).toBe('-1,000,000.7')
    expect(parser.evaluate('format(-1000000.678, 2)')).toBe('-1,000,000.68')
    expect(parser.evaluate('format(-1000000.678, 3)')).toBe('-1,000,000.678')
    expect(parser.evaluate('format(999999, -1)')).toBe('1,000,000')
    // A negative second parameter doesn't support so far.
  }
)
test('each 3-digits should be devided with currency.', () => {
    INTERMediatorLocale = {
      'decimal_point': '.',
      'thousands_sep': ',',
      'int_curr_symbol': 'JPY ',
      'currency_symbol': '¥',
      'mon_decimal_point': '.',
      'mon_thousands_sep': ',',
      'positive_sign': '',
      'negative_sign': '-',
      'int_frac_digits': '0',
      'frac_digits': '0',
      'p_cs_precedes': '1',
      'p_sep_by_space': '0',
      'n_cs_precedes': '1',
      'n_sep_by_space': '0',
      'p_sign_posn': '1',
      'n_sign_posn': '4',
      'AM_STR': 'AM',
      'PM_STR': 'PM',
      'grouping': {
        '0': '3',
        '1': '3'
      },
      'mon_grouping': {
        '0': '3',
        '1': '3'
      }
    }
    expect(parser.evaluate('currency(999, 0)')).toBe('¥999')
    expect(parser.evaluate('currency(1000, 0)')).toBe('¥1,000')
    expect(parser.evaluate('currency(999999, 0)')).toBe('¥999,999')
    expect(parser.evaluate('currency(1000000, 0)')).toBe('¥1,000,000')
    expect(parser.evaluate('currency(1000000.678, 1)')).toBe('¥1,000,000.7')
    expect(parser.evaluate('currency(1000000.678, 2)')).toBe('¥1,000,000.68')
    expect(parser.evaluate('currency(1000000.678, 3)')).toBe('¥1,000,000.678')
    expect(parser.evaluate('currency(1000000.678, 4)')).toBe('¥1,000,000.6780')
    expect(parser.evaluate('currency(-1000000.678, 1)')).toBe('¥-1,000,000.7')
    expect(parser.evaluate('currency(-1000000.678, 2)')).toBe('¥-1,000,000.68')
    expect(parser.evaluate('currency(-1000000.678, 3)')).toBe('¥-1,000,000.678')
    expect(parser.evaluate('currency(999999, -1)')).toBe('¥1,000,000')
    // A negative second parameter doesn't support so far.
  }
)

test('String functions.', () => {
    expect(parser.evaluate('substr(\'abcdefg\', 3, 2)')).toBe('de')
    expect(parser.evaluate('substr(\'abcdefg\', -2, 2)')).toBe('fg')
    expect(parser.evaluate('substr(\'abcdefg\', 3, -2)')).toBe('bc')
    expect(parser.evaluate('substr(\'abcdefg\', -3, -2)')).toBe('cd')
    expect(parser.evaluate('substr(\'abcdefg\', 3)')).toBe('d')
    expect(parser.evaluate('substr(\'abcdefg\', -2)')).toBe('f')
    expect(parser.evaluate('substr(\'abcdefg\', 3, 10)')).toBe('defg')
    expect(parser.evaluate('substr(\'abcdefg\', 3, -10)')).toBe('abc')
    expect(parser.evaluate('substr(\'abcdefg\', 300, 10)')).toBe('')
    expect(parser.evaluate('substr(\'abcdefg\', 300, -299)')).toBe('bcdefg')
    expect(parser.evaluate('substr(\'abcdefg\', -300, -10)')).toBe('')
    expect(parser.evaluate('substr(\'abcdefg\', -300, 300)')).toBe('abcdefg')
    expect(parser.evaluate('substring(\'abcdefg\', 3, 5)')).toBe('de')
    expect(parser.evaluate('substring(\'abcdefg\', -3, 5)')).toBe('e')
    expect(parser.evaluate('substring(\'abcdefg\', -3, -5)')).toBe('cd')
    expect(parser.evaluate('substring(\'abcdefg\', 3, -3)')).toBe('d')
    expect(parser.evaluate('substr(\'abcdefg\', 3)')).toBe('d')
    expect(parser.evaluate('substring(\'abcdefg\', -3)')).toBe('e')
    expect(parser.evaluate('substring(\'abcdefg\', 3, 100)')).toBe('defg')
    expect(parser.evaluate('substring(\'abcdefg\', -3, 500)')).toBe('efg')
    expect(parser.evaluate('substring(\'abcdefg\', 3, -100)')).toBe('abc')
    expect(parser.evaluate('substring(\'abcdefg\', -3, -500)')).toBe('abcd')
    expect(parser.evaluate('substring(\'abcdefg\', 300, 100)')).toBe('')
    expect(parser.evaluate('substring(\'abcdefg\', -300, 290)')).toBe('abcdefg')
    expect(parser.evaluate('substring(\'abcdefg\', 3, -100)')).toBe('abc')
    expect(parser.evaluate('substring(\'abcdefg\', -3, -500)')).toBe('abcd')
    expect(parser.evaluate('substring(\'abcdefg\', 300, -300)')).toBe('abcdefg')
    expect(parser.evaluate('substring(\'abcdefg\', -300, -500)')).toBe('')
    expect(parser.evaluate('indexof(\'abcdefg\',\'cd\')')).toBe(2)
    expect(parser.evaluate('replace(\'abcdefgabc\', 5, 8, \'yz\')')).toBe('abcdeyzbc')
    expect(parser.evaluate('substitute(\'abcdefgabc\', \'bc\', \'yz\')')).toBe('ayzdefgayz')
    expect(parser.evaluate('length(\'abcdefgabc\')')).toBe(10)
    expect(parser.evaluate('left(\'abcdefgabc\',3)')).toBe('abc')
    expect(parser.evaluate('right(\'abcdefgabc\',3)')).toBe('abc')
    expect(parser.evaluate('mid(\'abcdefgabc\', 3, 3)')).toBe('def')
    expect(parser.evaluate('tolower(\'AAABBBxxx3\')')).toBe('aaabbbxxx3')
    expect(parser.evaluate('toupper(\'AAABBBxxx3\')')).toBe('AAABBBXXX3')
  }
)
test('String Items.', () => {
    let items = 'abc\ndef\nght\njkl\nwer\ntfv'
    expect(parser.evaluate('items(x,0,1)', {x: items})).toBe('abc\n')
    expect(parser.evaluate('items(x,2,2)', {x: items})).toBe('ght\njkl\n')
    expect(parser.evaluate('items(x,4,2)', {x: items})).toBe('wer\ntfv\n')
    expect(parser.evaluate('items(x,4,20)', {x: items})).toBe('wer\ntfv\n')
    expect(parser.evaluate('items(x,4)', {x: items})).toBe('wer\ntfv\n')
  }
)
test('date time functions.', () => {
    expect(parser.evaluate('date()')).toBeGreaterThan(15000)
    expect(parser.evaluate('datetime()')).toBeGreaterThan(40000000)
    if (false) {
      expect(parser.evaluate('date(\'1970-01-02\')')).toBe(1)
      expect(parser.evaluate('date(\'2014-02-17\')')).toBe(16118)
      //expect(parser.evaluate('date('2014-02-17 09:00:00')')).toBe(16118); //browser dependency (Ch:ok, Ff:no)
      expect(parser.evaluate('datetime(\'1970-01-02 09:00:00\')')).toBe(86400)
      expect(parser.evaluate('datetime(\'2014-02-17 09:00:00\')')).toBe(16118 * 86400)
      expect(parser.evaluate('datetime(\'2014-02-17 09:23:49\')')).toBe(16118 * 86400 + 23 * 60 + 49)
      expect(parser.evaluate('datetime(\'2014-02-17\')')).toBe(16118 * 86400 - 9 * 3600)
      expect(parser.evaluate('datecomponents(2014,2,17)')).toBe(16118)
      expect(parser.evaluate('datetimecomponents(2014,2,17,9,0,0)')).toBe(1392627600)
      expect(parser.evaluate('date(\'2014-02-18\')-date(\'2014-02-17\')')).toBe(1)
      expect(parser.evaluate('date(\'2014-03-18\')-date(\'2014-02-18\')')).toBe(28)
      expect(parser.evaluate('date(\'2014-02-18\')-date(\'2013-02-18\')')).toBe(365)
      expect(parser.evaluate('datetime(\'2014-02-17 09:00:01\') - datetime(\'2014-02-17 09:00:00\')')).toBe(1)
      expect(parser.evaluate('datetime(\'2014-02-17 09:01:00\') - datetime(\'2014-02-17 09:00:00\')')).toBe(60)
      expect(parser.evaluate('datetime(\'2014-02-17 10:00:00\') - datetime(\'2014-02-17 09:00:01\')')).toBe(3599)
      expect(parser.evaluate('year(date(\'2014-02-17\'))')).toBe(2014)
      expect(parser.evaluate('month(date(\'2014-02-17\'))')).toBe(2)
      expect(parser.evaluate('day(date(\'2014-02-17\'))')).toBe(17)
      expect(parser.evaluate('weekday(date(\'2014-02-17\'))')).toBe(1)
      expect(parser.evaluate('yeard(date(\'2014-02-17\'))')).toBe(2014)
      expect(parser.evaluate('monthd(date(\'2014-02-17\'))')).toBe(2)
      expect(parser.evaluate('dayd(date(\'2014-02-17\'))')).toBe(17)
      expect(parser.evaluate('weekdayd(date(\'2014-02-17\'))')).toBe(1)
      expect(parser.evaluate('yeardt(datetime(\'2014-02-17 09:23:49\'))')).toBe(2014)
      expect(parser.evaluate('monthdt(datetime(\'2014-02-17 09:23:49\'))')).toBe(2)
      expect(parser.evaluate('daydt(datetime(\'2014-02-17 09:23:49\'))')).toBe(17)
      expect(parser.evaluate('weekdaydt(datetime(\'2014-02-17 09:23:49\'))')).toBe(1)
      expect(parser.evaluate('hourdt(datetime(\'2014-02-17 09:23:49\'))')).toBe(9)
      expect(parser.evaluate('minutedt(datetime(\'2014-02-17 09:23:49\'))')).toBe(23)
      expect(parser.evaluate('seconddt(datetime(\'2014-02-17 09:23:49\'))')).toBe(49)
      expect(parser.evaluate('addyear(date(\'2014-02-17\')).toBe(2)')).toBe(16848)
      expect(parser.evaluate('addmonth(date(\'2014-02-17\')).toBe(2)')).toBe(16177)
      expect(parser.evaluate('addday(date(\'2014-02-17\')).toBe(2)')).toBe(16120)
      expect(isNaN(parser.evaluate('addhour(datetime(\'2014-02-17 09:23:49\')).toBe(2)'))).toBe(true)
      expect(isNaN(parser.evaluate('addminute(datetime(\'2014-02-17 09:23:49\')).toBe(2)'))).toBe(true)
      expect(isNaN(parser.evaluate('addsecond(datetime(\'2014-02-17 09:23:49\')).toBe(2)'))).toBe(true)
      expect(parser.evaluate('addyeard(date(\'2014-02-17\')).toBe(2)')).toBe(16118 + 730)
      expect(parser.evaluate('addmonthd(date(\'2014-02-17\')).toBe(2)')).toBe(16118 + 59)
      expect(parser.evaluate('adddayd(date(\'2014-02-17\')).toBe(2)')).toBe(16118 + 2)
      expect(parser.evaluate('addyeardt(datetime(\'2014-02-17 09:23:49\')).toBe(2)')).toBe(1392629029 + 730 * 86400)
      expect(parser.evaluate('addmonthdt(datetime(\'2014-02-17 09:23:49\')).toBe(2)')).toBe(1392629029 + 59 * 86400)
      expect(parser.evaluate('adddaydt(datetime(\'2014-02-17 09:23:49\')).toBe(2)')).toBe(1392629029 + 2 * 86400)
      expect(parser.evaluate('addhourdt(datetime(\'2014-02-17 09:23:49\')).toBe(2)')).toBe(1392629029 + 2 * 3600)
      expect(parser.evaluate('addminutedt(datetime(\'2014-02-17 09:23:49\')).toBe(2)')).toBe(1392629029 + 2 * 60)
      expect(parser.evaluate('addseconddt(datetime(\'2014-02-17 09:23:49\')).toBe(2)')).toBe(1392629029 + 2)
      expect(parser.evaluate('endofmonth(date(\'2014-02-17\'))')).toBe(16118 + 11)
      expect(parser.evaluate('startofmonth(date(\'2014-02-17\'))')).toBe(16118 - 16)
      expect(parser.evaluate('endofmonthd(date(\'2014-02-17\'))')).toBe(16118 + 11)
      expect(parser.evaluate('startofmonthd(date(\'2014-02-17\'))')).toBe(16118 - 16)
      expect(parser.evaluate('endofmonthdt(datetime(\'2014-02-17 09:23:49\'))')).toBe(1393664399)
      expect(parser.evaluate('startofmonthdt(datetime(\'2014-02-17 09:23:49\'))')).toBe(1391180400)
      assert.greater(parser.evaluate('today()')).toBe(15000)
      assert.greater(parser.evaluate('now()')).toBe(40000000)
    }
  }
)
test('String regular expression matiching.', () => {
    let str = '1234'
    expect(parser.evaluate('test(x,\'[0-9]\')', {x: str})).toBe(true)
    expect(parser.evaluate('test(x,\'[^0-9]\')', {x: str})).toBe(false)
    let r = parser.evaluate('match(x,\'[0-9]\')', {x: str})
    expect(r[0]).toBe('1')
    expect(parser.evaluate('match(x,\'[^0-9]\')', {x: str})).toBe(null)
    str = '12abc34'
    r = parser.evaluate('match(x,\'[0-9]([a-z]+)([0-9])\')', {x: str})
    expect(r[0]).toBe('2abc3')
    expect(r[1]).toBe('abc')
    expect(r[2]).toBe('3')
  }
)
test('String Items search.', () => {
    let items = 'abc\ndef\n\njkl\nwer\ntfv'
    expect(parser.evaluate('itemIndexOf(x,\'abc\')', {x: items})).toBe(0)
    expect(parser.evaluate('itemIndexOf(x,\'def\')', {x: items})).toBe(1)
    expect(parser.evaluate('itemIndexOf(x,\'tfv\')', {x: items})).toBe(5)
    expect(parser.evaluate('itemIndexOf(x,\'wer\')', {x: items})).toBe(4)
    expect(parser.evaluate('itemIndexOf(x,\'a\')', {x: items})).toBe(-1)
    expect(parser.evaluate('itemIndexOf(x,\'\')', {x: items})).toBe(2)
  }
)
test('FileMaker field name can be variable.', () => {
    expect(parser.evaluate('テスト::フィールド + 変数', {'テスト::フィールド': 3, 変数: 4})).toBe(7)
  }
)
test('Constants for boolean.', () => {
    expect(parser.evaluate('true', {})).toBe(true)
    expect(parser.evaluate('TRUE', {})).toBe(true)
    expect(parser.evaluate('false', {})).toBe(false)
    expect(parser.evaluate('FALSE', {})).toBe(false)
    expect(parser.evaluate('if(true,a+b,a-b)', {a: 5, b: 2})).toBe(7)
    expect(parser.evaluate('if(false,a+b,a-b)', {a: 5, b: 2})).toBe(3)
  }
)
test('File path functions test.', () => {
    expect(parser.evaluate('basename(a)', {a: 'partial/path/file.ext'})).toBe('file.ext')
    expect(parser.evaluate('extname(a)', {a: 'partial.inner/path/file.ext'})).toBe('ext')
    expect(parser.evaluate('dirname(a)', {a: 'partial/path/file.ext'})).toBe('partial/path')
    expect(parser.evaluate('basename(a)', {a: 'file.ext'})).toBe('file.ext')
    expect(parser.evaluate('basename(a)', {a: 'partial/path/'})).toBe('path')
    expect(parser.evaluate('extname(a)', {a: 'file.ext'})).toBe('ext')
    expect(parser.evaluate('extname(a)', {a: 'aaaaaa'})).toBe('')
    expect(parser.evaluate('dirname(a)', {a: 'file.ext'})).toBe('')
    expect(parser.evaluate('if(\'jpg\next\ntxt\'⋀extname(a),\'T\',\'F\')', {a: 'partial/path/file.ext'})).toBe('T')
    expect(parser.evaluate('if(\'jpg\next\ntxt\'⋀extname(a),\'T\',\'F\')', {a: 'partial/path/file.jpg'})).toBe('T')
    expect(parser.evaluate('if(\'jpg\next\ntxt\'⋀extname(a),\'T\',\'F\')', {a: 'partial/path/file.txt'})).toBe('T')
    expect(parser.evaluate('if(\'jpg\next\ntxt\'⋀extname(a),\'T\',\'F\')', {a: 'partial/path/file.zip'})).toBe('F')
  }
)
test('if false test.', () => {
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: 'partial/path/file.ext'})).toBe('T')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: ''})).toBe('F')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: '\n'})).toBe('T')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: null})).toBe('F')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: undefined})).toBe('F')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: 1000})).toBe('T')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: -1000})).toBe('T')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: 0})).toBe('F')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: -1})).toBe('T')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: '1000'})).toBe('T')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: '-1000'})).toBe('T')
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: '0'})).toBe('T') // Check this!
    expect(parser.evaluate('if(a,\'T\',\'F\')', {a: '-1'})).toBe('T')
  }
)
test('Logical operator minus.', () => {
    expect(parser.evaluate('!a', {a: true})).toBe(false)
    expect(parser.evaluate('!a', {a: false})).toBe(true)
    expect(parser.evaluate('!a', {a: "string"})).toBe(false)
    expect(parser.evaluate('!a', {a: ""})).toBe(true)
    expect(parser.evaluate('!a', {a: null})).toBe(true)
    expect(parser.evaluate('!a', {a: undefined})).toBe(true)
    expect(parser.evaluate('!a', {a: NaN})).toBe(true)
    expect(parser.evaluate('!a', {a: 0})).toBe(true)
    expect(parser.evaluate('!a', {a: 1})).toBe(false)
    expect(parser.evaluate('!a', {a: -1})).toBe(false)
    expect(parser.evaluate('!a', {a: []})).toBe(false)
    expect(parser.evaluate('!a', {a: [null]})).toBe(true)
    expect(parser.evaluate('!a', {a: ['str']})).toBe(false)
    expect(parser.evaluate('!a', {a: [100, 200]})).toBe(false)
    expect(parser.evaluate('!a', {a: {}})).toBe(false)
    expect(parser.evaluate('!a', {a: {f: 100, s: 200}})).toBe(false)
  }
)
test('Percent encode/decode test.', () => {
    expect(parser.evaluate('decodeURI(a)', {a: 'STRING%28%29='}))
      .toBe('STRING()=')
    expect(parser.evaluate('encodeURI(a)', {a: 'STRING文字列='}))
      .toBe('STRING%E6%96%87%E5%AD%97%E5%88%97=')
    expect(parser.evaluate('decodeURIComponent(a)', {a: 'STRING%28%29='}))
      .toBe('STRING()=')
    expect(parser.evaluate('encodeURIComponent(a)', {a: 'STRING文字列='}))
      .toBe('STRING%E6%96%87%E5%AD%97%E5%88%97%3D')
  }
)

test('JSON parse test.', () => {
    const jsonstr = '{"a":1,"b":2,"c":[4,5,6],"d":{"a":7,"b":8}}'
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "a"})).toBe(1)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "b"})).toBe(2)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "c.0"})).toBe(4)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "c.1"})).toBe(5)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "d.a"})).toBe(7)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "d.b"})).toBe(8)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "x"})).toBe(undefined)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "c.9"})).toBe(undefined)
    expect(parser.evaluate('jsonparse(a,b)', {a: jsonstr, b: "d.d"})).toBe(undefined)
  }
)


test('Illegal value operating test.', () => {
    expect(parser.evaluate('a + b', {a: null, b: null})).toBe(0)
    expect(parser.evaluate('a + b', {a: NaN, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a + b', {a: "", b: ""})).toBe("")
    expect(parser.evaluate('a + b', {a: undefined, b: undefined})).toBe(NaN)
    expect(parser.evaluate('a + b', {a: 1, b: null})).toBe(1)
    expect(parser.evaluate('a + b', {a: 1, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a + b', {a: 1, b: ""})).toBe("1")
    expect(parser.evaluate('a + b', {a: 1, b: undefined})).toBe(NaN)

    expect(parser.evaluate('a - b', {a: null, b: null})).toBe(0)
    expect(parser.evaluate('a - b', {a: NaN, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a - b', {a: "", b: ""})).toBe(0)
    expect(parser.evaluate('a - b', {a: undefined, b: undefined})).toBe(NaN)
    expect(parser.evaluate('a - b', {a: 1, b: null})).toBe(1)
    expect(parser.evaluate('a - b', {a: 1, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a - b', {a: 1, b: ""})).toBe(1)
    expect(parser.evaluate('a - b', {a: 1, b: undefined})).toBe(NaN)
    expect(parser.evaluate('a - b', {b: 1, a: null})).toBe(-1)
    expect(parser.evaluate('a - b', {b: 1, a: NaN})).toBe(NaN)
    expect(parser.evaluate('a - b', {b: 1, a: ""})).toBe(-1)
    expect(parser.evaluate('a - b', {b: 1, a: undefined})).toBe(NaN)

    expect(parser.evaluate('a * b', {a: null, b: null})).toBe(0)
    expect(parser.evaluate('a * b', {a: NaN, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a * b', {a: "", b: ""})).toBe(0)
    expect(parser.evaluate('a * b', {a: undefined, b: undefined})).toBe(NaN)
    expect(parser.evaluate('a * b', {a: 1, b: null})).toBe(0)
    expect(parser.evaluate('a * b', {a: 1, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a * b', {a: 1, b: ""})).toBe(0)
    expect(parser.evaluate('a * b', {a: 1, b: undefined})).toBe(NaN)

    expect(parser.evaluate('a / b', {a: null, b: null})).toBe(NaN)
    expect(parser.evaluate('a / b', {a: null, b: 1})).toBe(0)
    expect(parser.evaluate('a / b', {a: NaN, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a / b', {a: "", b: ""})).toBe(NaN)
    expect(parser.evaluate('a / b', {a: "", b: 1})).toBe(0)
    expect(parser.evaluate('a / b', {a: undefined, b: undefined})).toBe(NaN)
    expect(parser.evaluate('a / b', {a: 1, b: null})).toBe(Infinity)
    expect(parser.evaluate('a / b', {a: 1, b: NaN})).toBe(NaN)
    expect(parser.evaluate('a / b', {a: 1, b: ""})).toBe(Infinity)
    expect(parser.evaluate('a / b', {a: 1, b: undefined})).toBe(NaN)
  }
)