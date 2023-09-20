interface MaaString {
  __brand: 'MaaString'
}

interface MaaImage {
  __brand: 'MaaImage'
}

export function version(): string

export function new_string(): MaaString
export function get_string(handle: MaaString): string | null
export function set_string(handle: MaaString, str: string | null): boolean

export function new_image(): MaaImage
export function get_image_width(handle: MaaImage): number
export function get_image_height(handle: MaaImage): number
export function get_image_type(handle: MaaImage): number
export function get_image_encoded(handle: MaaImage): Buffer
export function set_image_encoded(handle: MaaImage, buffer: ArrayBuffer): boolean

export function set_global_option(key: number, value: string | number | boolean): boolean
