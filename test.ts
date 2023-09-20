import * as maa from './addon'

const str = maa.new_string()
maa.set_string(str, '213')
console.log(maa.get_string(str))
