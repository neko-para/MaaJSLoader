#include "framework/main.h"

static Napi::Object Init(Napi::Env env, Napi::Object exports) {
  InitFramework(env, exports);
  return exports;
}

NODE_API_MODULE(maaj, Init)