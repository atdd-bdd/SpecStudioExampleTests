cmake_minimum_required(VERSION 3.20)
project(ExampleTests CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# GoogleTest is fetched rather than expected on the machine, so the suite builds
# from a clean checkout with nothing installed.
include(FetchContent)
FetchContent_Declare(
  googletest
  GIT_REPOSITORY https://github.com/google/googletest.git
  GIT_TAG        v1.15.2
)
# Keep GoogleTest on the same runtime as this project under MSVC.
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

enable_testing()

# The generated tests sit next to the glue headers they include; common/ and
# production/ are reached by relative include.
file(GLOB TEST_SOURCES CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/test_*.cpp")

add_executable(example_tests ${TEST_SOURCES})
target_include_directories(example_tests PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}")
target_link_libraries(example_tests PRIVATE GTest::gtest_main)

include(GoogleTest)
gtest_discover_tests(example_tests)
