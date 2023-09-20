
#include "main.h"
#include <MaaFramework/MaaAPI.h>

#include <iostream>

static Napi::Value version(const Napi::CallbackInfo &info) {
  return Napi::String::New(info.Env(), MaaVersion());
}

static void destroy_string(Napi::Env env, MaaStringBuffer *h) {
  MaaDestroyStringBuffer(h);
}

static Napi::Value new_string(const Napi::CallbackInfo &info) {
  return Napi::External<MaaStringBuffer>::New(
      info.Env(), MaaCreateStringBuffer(), destroy_string);
}

static Napi::Value get_string(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaStringBuffer>>().Data();
  if (MaaIsStringEmpty(h)) {
    return info.Env().Null();
  } else {
    auto p = MaaGetString(h);
    auto sz = MaaGetStringSize(h);
    return Napi::String::New(info.Env(), p, sz);
  }
}

static Napi::Value set_string(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaStringBuffer>>().Data();
  if (info[1].IsNull()) {
    return Napi::Boolean::New(info.Env(), MaaClearString(h));
  } else {
    auto s = info[1].As<Napi::String>();
    std::string data = s;
    return Napi::Boolean::New(info.Env(),
                              MaaSetStringEx(h, data.c_str(), data.size()));
  }
}

static void destroy_image(Napi::Env env, MaaImageBuffer *h) {
  MaaDestroyImageBuffer(h);
}

static Napi::Value new_image(const Napi::CallbackInfo &info) {
  return Napi::External<MaaImageBuffer>::New(info.Env(), MaaCreateImageBuffer(),
                                             destroy_image);
}

static Napi::Value is_image_empty(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaImageBuffer>>().Data();
  return Napi::Boolean::New(info.Env(), MaaIsImageEmpty(h));
}

static Napi::Value clear_image(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaImageBuffer>>().Data();
  return Napi::Boolean::New(info.Env(), MaaClearImage(h));
}

static Napi::Value get_image_width(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaImageBuffer>>().Data();
  return Napi::Number::New(info.Env(), MaaGetImageWidth(h));
}

static Napi::Value get_image_height(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaImageBuffer>>().Data();
  return Napi::Number::New(info.Env(), MaaGetImageHeight(h));
}

static Napi::Value get_image_type(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaImageBuffer>>().Data();
  return Napi::Number::New(info.Env(), MaaGetImageType(h));
}

static Napi::Value get_image_encoded(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaImageBuffer>>().Data();
  auto sz = MaaGetImageEncodedSize(h);
  return Napi::Buffer<uint8_t>::Copy(info.Env(), MaaGetImageEncoded(h), sz);
}

static Napi::Value set_image_encoded(const Napi::CallbackInfo &info) {
  auto h = info[0].As<Napi::External<MaaImageBuffer>>().Data();
  auto buf = info[1].As<Napi::ArrayBuffer>();
  return Napi::Boolean::New(
      info.Env(), MaaSetImageEncoded(h, static_cast<uint8_t *>(buf.Data()),
                                     buf.ByteLength()));
}

static Napi::Value set_global_option(const Napi::CallbackInfo &info) {
  auto k = info[0].As<Napi::Number>().Int32Value();
  if (info[1].IsString()) {
    std::string s = info[1].As<Napi::String>();
    return Napi::Boolean::New(
        info.Env(),
        MaaSetGlobalOption(k, const_cast<char *>(s.c_str()), s.size()));
  } else if (info[1].IsNumber()) {
    auto v = info[1].As<Napi::Number>().Int32Value();
    return Napi::Boolean::New(info.Env(), MaaSetGlobalOption(k, &v, 4));
  } else if (info[1].IsBoolean()) {
    uint8_t v = info[1].As<Napi::Boolean>().Value() ? 1 : 0;
    return Napi::Boolean::New(info.Env(), MaaSetGlobalOption(k, &v, 1));
  } else {
    return Napi::Boolean::New(info.Env(), false);
  }
}

#define BIND(name)                                                             \
  exports.Set(Napi::String::New(env, #name), Napi::Function::New(env, name))

void InitFramework(Napi::Env env, Napi::Object exports) {
  BIND(version);

  BIND(new_string);
  BIND(get_string);
  BIND(set_string);

  BIND(new_image);
  BIND(is_image_empty);
  BIND(clear_image);
  BIND(get_image_width);
  BIND(get_image_height);
  BIND(get_image_type);
  BIND(get_image_encoded);
  BIND(set_image_encoded);

  BIND(set_global_option);
}