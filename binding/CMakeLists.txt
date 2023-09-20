cmake_minimum_required(VERSION 3.22)

cmake_policy(SET CMP0042 NEW)
set(CMAKE_CXX_STANDARD_REQUIRED 20)

project(MaaJSLoader)

if (APPLE)
  message("mac")
  set(CMAKE_INSTALL_RPATH "@loader_path;@executable_path")
elseif (UNIX)
  message("linux")
  set(CMAKE_INSTALL_RPATH "$ORIGIN")
endif ()

add_library(maafw SHARED IMPORTED)
add_library(maatk SHARED IMPORTED)
if (MSVC)
set_property(TARGET maafw PROPERTY IMPORTED_LOCATION "${CMAKE_SOURCE_DIR}/../install/bin/MaaFramework.dll" )
set_property(TARGET maafw PROPERTY IMPORTED_IMPLIB "${CMAKE_SOURCE_DIR}/../install/lib/MaaFramework.lib")
set_property(TARGET maatk PROPERTY IMPORTED_LOCATION "${CMAKE_SOURCE_DIR}/../install/bin/MaaToolKit.dll" )
set_property(TARGET maatk PROPERTY IMPORTED_IMPLIB "${CMAKE_SOURCE_DIR}/../install/lib/MaaToolKit.lib")
elseif (APPLE)
set_property(TARGET maafw PROPERTY IMPORTED_LOCATION "${CMAKE_SOURCE_DIR}/../install/bin/libMaaFramework.dylib")
set_property(TARGET maatk PROPERTY IMPORTED_LOCATION "${CMAKE_SOURCE_DIR}/../install/bin/libMaaToolKit.dylib")
else ()
set_property(TARGET maafw PROPERTY IMPORTED_LOCATION "${CMAKE_SOURCE_DIR}/../install/bin/libMaaFramework.so")
set_property(TARGET maatk PROPERTY IMPORTED_LOCATION "${CMAKE_SOURCE_DIR}/../install/bin/libMaaToolKit.so")
endif ()
set(MAAFW_INC "${CMAKE_SOURCE_DIR}/../install/include")

include_directories(${CMAKE_JS_INC} ${MAAFW_INC})
file(GLOB_RECURSE maa_js_loader_src *.h *.cpp)

add_library(maajs SHARED ${maa_js_loader_src} ${CMAKE_JS_SRC})
set_target_properties(maajs PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(maajs ${CMAKE_JS_LIB} maafw maatk)

execute_process(COMMAND node -p "require('node-addon-api').include" WORKING_DIRECTORY ${CMAKE_SOURCE_DIR} OUTPUT_VARIABLE NODE_ADDON_INC)
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_INC "${NODE_ADDON_INC}")
target_include_directories(maajs PRIVATE ${NODE_ADDON_INC})
add_definitions(-DNAPI_VERSION=5)

install(TARGETS maajs
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION bin
    ARCHIVE DESTINATION lib
)
