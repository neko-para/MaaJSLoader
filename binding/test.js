const maa = require('../install/bin/maajs.node')

const s = maa.framework.create_string_buffer()
maa.framework.set_string(s, '123\0 456')
console.log(JSON.stringify(maa.framework.get_string(s)))
