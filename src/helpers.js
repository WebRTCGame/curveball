function profile(code) {
    var start = new Date().getTime();
    code();
    var end = new Date().getTime();
    return end - start;
}